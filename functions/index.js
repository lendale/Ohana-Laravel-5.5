const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const parents = require('./src/addParents')
const children = require('./src/addChildren')
const spouse = require('./src/addSpouse')

// Deploy specific functions => firebase deploy --only functions:func1,func2,etc..

/* ========================
        Tree Functions
    ======================== */

exports.genealogy = functions.https.onRequest((req, res) => {
    res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
    </head>
    <body>
      <h1>Hello!</h1>
    </body>
    <script type="text/javascript">
        window.onload = () => {
            alert("Hello! I am an alert box!!");
        }
    </script>
  </html>`);
})

exports.addCurrentUserToClan = functions.database.ref('/users/{uid}').onCreate(event => {
    const root = event.data.ref.root
    let uid = event.params.uid
    let userObj = event.data.val()
    let treeObj = new Object()
    let prevVal = new Object()

    if (userObj.wasPotential) {
        const pr1 = root.child(`user_tree_go/${userObj.clanId}/${userObj.tempKeyInClan}`).once('value')
            .then(snap => {
                return prevVal = snap.val()
            })
            .then(prevVal => {
                treeObj = prevVal
                console.log('PREV', treeObj)
                console.log('UID', uid)
                treeObj.key = uid
                treeObj.loc = 'users'
                treeObj.bd = userObj.birthDate

                if ((userObj.photoUrl !== undefined)) {
                    treeObj.img = userObj.photoUrl
                }

                return root.child(`user_tree_go/${userObj.clanId}/${uid}`).set(treeObj)
            })
            .then(() => {
                return root.child(`user_tree_go/${userObj.clanId}/${userObj.tempKeyInClan}`).remove()
            })

        const pr2 = updateConnectedNodes(root, userObj.clanId, userObj.tempKeyInClan, treeObj.key, uid)

        return Promise.all([pr1, pr2]).catch(err => {
            console.log('Error code', err.code)
            console.log(err)
        })
    } else {
        treeObj = {
            key: uid,
            n: userObj.displayName,
            s: userObj.gender,
            bd: userObj.birthDate,
            loc: 'users'
        }

        if ((userObj.photoUrl !== undefined)) {
            treeObj.img = userObj.photoUrl
        }

        return root.child(`user_tree_go/${userObj.clanId}/${uid}`).set(treeObj)
    }
})

exports.addMotherToClan = functions.database.ref('/user_family/{uid}/mothers/{pushKey}').onCreate(event => {
    return parents.addMother(event)
})

exports.addFatherToClan = functions.database.ref('/user_family/{uid}/fathers/{pushKey}').onCreate(event => {
    return parents.addFather(event)
})

exports.addSonToClan = functions.database.ref('/user_family/{uid}/sons/{pushKey}').onCreate(event => {
    return children.addSon(event)
})

exports.addDaughterToClan = functions.database.ref('/user_family/{uid}/daughters/{pushKey}').onCreate(event => {
    return children.addDaughter(event)
})

exports.addWifeToClan = functions.database.ref('/user_family/{uid}/wives/{pushKey}').onCreate(event => {
    return spouse.addWife(event)
})

exports.addHusbandToClan = functions.database.ref('/user_family/{uid}/husbands/{pushKey}').onCreate(event => {
    return spouse.addHusband(event)
})

function updateConnectedNodes(rootRef, clanId, oldId, newId, currentUserId) {
    const pr1 = rootRef.child(`user_tree_go/${clanId}`).once('value').then(snapshot => {
        let updateObj = {}

        snapshot.forEach(childSnapshot => {
            let childSnap = childSnapshot.val()

            if (!(childSnap.m === null || childSnap.m === undefined)) {
                if (childSnap.m === oldId) {
                    console.log("M", childSnap.m)
                    updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/m`] = newId
                }
            }

            if (!(childSnap.f === null || childSnap.f === undefined)) {
                if (childSnap.f === oldId) {
                    console.log("F", childSnap.f);
                    updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/f`] = newId;
                }
            }

            if (!(childSnap.ux === null || childSnap.ux === undefined)) {
                if (childSnap.ux === oldId) {
                    console.log("Ux", childSnap.ux)
                    updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/ux`] = newId
                }
            }

            if (!(childSnap.vir === null || childSnap.vir === undefined)) {
                if (childSnap.vir === oldId) {
                    console.log("Vir", childSnap.vir)
                    updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/vir`] = newId
                }
            }

            if (!(childSnap.ux === null || childSnap.ux === undefined)) {
                let ux = childSnap.ux

                ux.forEach(item => {
                    if (item.value === oldId) {
                        updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/${item.key}`] = newId
                    }
                });
            }

            if (!(childSnap.vir === null || childSnap.vir === undefined)) {
                let vir = childSnap.vir

                vir.forEach(item => {
                    if (item.value === oldId) {
                        updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/${item.key}`] = newId
                    }
                });
            }
        })

        return updateObj
    }).then(updateObj => {
        console.log(updateObj)
        return rootRef.update(updateObj)
    })

    const pr2 = rootRef.child(`user_family/${currentUserId}/spouse_keys/ux`).once('value')
        .then(snapshot => {
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.key === oldId) {
                    return rootRef.child(`user_family/${currentUserId}/spouse_keys/ux/${newId}`).set(childSnapshot.value)
                }
            })
        })
    const pr3 = rootRef.child(`user_family/${currentUserId}/spouse_keys/ux/${oldId}`).remove()
        // .then(() => {
        //     return rootRef.child(`user_family/${currentUserId}/spouse_keys/ux/${oldId}`).remove()
        // })

    return Promise.all([pr1, pr2, pr3]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.createPotentialUser = function(event) {
    let potentialUsersRef = admin.database().ref().child('potential_users')
    let userObj = event.data.val()
    let tempKey = event.params.pushKey

    userObj.tempKeyInClan = tempKey

    return potentialUsersRef.child(tempKey).set(userObj)
}