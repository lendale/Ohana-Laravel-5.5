require('babel-polyfill')

const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const parents = require('./src/addParent')
const spouse = require('./src/addSpouse')
const children = require('./src/addChild')
const notif = require('./src/notifications')
const djob = require('./src/cronJob')
const eReminder= require('./src/eventsReminder')

exports.addCurrentUserToClan = functions.database.ref('/users/{uid}').onCreate((data, context) => {
    const root = data.ref.root
    let uid = context.params.uid
    let userObj = data.val()
    let treeObj = new Object()
    let prevVal = new Object()

    if (userObj.wasPotential) {
        return root.child(`user_tree_go/${userObj.clanId}/${userObj.tempKeyInClan}`).once('value')
            .then(snap => {
                return prevVal = snap.val()
            })
            .then(prevVal => {
                treeObj = prevVal
                treeObj.key = uid
                treeObj.loc = `/users/${uid}/`
                treeObj.bd = userObj.birthDate

                if ((userObj.photoURL !== undefined)) {
                    treeObj.img = userObj.photoURL
                }

                return root.child(`user_tree_go/${userObj.clanId}/${uid}`).set(treeObj)
            })
            .then(() => {
                return root.child(`user_tree_go/${userObj.clanId}/${userObj.tempKeyInClan}`).remove()
            })
            .then(() => {
                return root.child(`potential_users/${userObj.tempKeyInClan}`).remove()
            })
            .then(() => {
                return updateConnectedNodes(root, userObj.clanId, userObj.tempKeyInClan, treeObj.key, uid)
            }).catch(err => {
                console.log('Error code', err.code)
                console.log(err)
            })
    } else {
        treeObj = {
            key: uid,
            n: userObj.displayName,
            s: userObj.gender,
            bd: userObj.birthDate,
            loc: `/users/${uid}/`,
        }

        console.log(userObj.photoURL)

        if (userObj.photoURL !== undefined) {
            treeObj.img = userObj.photoURL
        }

        return root.child(`user_tree_go/${userObj.clanId}/${uid}`).set(treeObj)
    }
})

exports.addMotherToClan = functions.database.ref('/user_family/{uid}/mothers/{pushKey}').onCreate((data, context) => {
    return parents.addMother(data, context)
})

exports.addFatherToClan = functions.database.ref('/user_family/{uid}/fathers/{pushKey}').onCreate((data, context) => {
    return parents.addFather(data, context)
})

exports.addWifeToClan = functions.database.ref('/user_family/{uid}/wives/{pushKey}').onCreate((data, context) => {
    return spouse.addWife(data, context)
})

exports.addHusbandToClan = functions.database.ref('/user_family/{uid}/husbands/{pushKey}').onCreate((data, context) => {
    return spouse.addHusband(data, context)
})

exports.addDaughterToClan = functions.database.ref('/user_family/{uid}/daughters/{pushKey}').onCreate((data, context) => {
    return children.addDaughter(data, context)
})

exports.addSonToClan = functions.database.ref('/user_family/{uid}/sons/{pushKey}').onCreate((data, context) => {
    return children.addSon(data, context)
})

function updateConnectedNodes(rootRef, clanId, oldId, newId, currentUserId) {
    const pr1 = rootRef.child(`user_tree_go/${clanId}`).once('value').then(snapshot => {
        let updateObj = {}

        snapshot.forEach(childSnapshot => {
            let childSnap = childSnapshot.val()

            if (!(childSnap.m === null || childSnap.m === undefined)) {
                if (childSnap.m === oldId) {
                    updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/m`] = newId
                }
            }

            if (!(childSnap.f === null || childSnap.f === undefined)) {
                if (childSnap.f === oldId) {
                    updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/f`] = newId
                }
            }

            if (!(childSnap.ux === null || childSnap.ux === undefined)) {
                let ux = Object.entries(childSnap.ux)

                ux.forEach(([key, value]) => {
                    if (value === oldId) {
                        updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/ux/${key}`] = newId
                    }
                })
            }

            if (!(childSnap.vir === null || childSnap.vir === undefined)) {
                let vir = Object.entries(childSnap.vir)

                vir.forEach(([key, value]) => {
                    if (value === oldId) {
                        updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/vir/${key}`] = newId
                    }
                })
            }

            if (!(childSnap.ms === null || childSnap.ms === undefined)) {
                let ms = Object.entries(childSnap.ms)

                ms.forEach(([key, value]) => {
                    if (key === oldId) {
                        return rootRef.child(`user_tree_go/${clanId}/${childSnap.key}/ms/${newId}`).set(value)
                            .then(() => {
                                return rootRef.child(`user_tree_go/${clanId}/${childSnap.key}/ms/${oldId}`).remove()
                            })
                    }
                })
            }
        })

        return updateObj
    }).then(updateObj => {
        // console.log('Update Object', updateObj)
        return rootRef.update(updateObj)
    })

    const pr2 = rootRef.child(`user_family/${oldId}`).once('value').then(snapshot => {
        return rootRef.child(`user_family/${currentUserId}`).set(snapshot.val())
            // if (snapshot.key === oldId) {
            //     prevVal = snapshot.val()
            //     console.log('PREV', prevVal)

        //     prevVal.forEach()

        //     return rootRef.child(`user_family/${currentUserId}`).set(prevVal)
        // }
        // snapshot.forEach(childSnap => {
        //         console.log('child', childSnap.val())
        //     })
        console.log('OLD ID', oldId)
    }).then(() => {
        return rootRef.child(`user_family/${oldId}`).remove()
    })

    // const pr3 = rootRef.child(`user_family/${oldId}/spouse_keys/vir`).once('value').then(snapshot => {
    //     snapshot.forEach(childSnapshot => {
    //         if (childSnapshot.key === oldId) {
    //             return rootRef.child(`user_family/${currentUserId}/spouse_keys/vir/${newId}`).set(childSnapshot.value)
    //         }
    //     })
    // }).then(() => {
    //     return rootRef.child(`user_family/${currentUserId}/spouse_keys/vir/${oldId}`).remove()
    // })

    return Promise.all([pr1, pr2]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.createPotentialUser = function(data, context) {
    let potentialUsersRef = admin.database().ref().child('potential_users')
    let userObj = data.val()
    let tempKey = context.params.pushKey

    userObj.tempKeyInClan = tempKey

    return potentialUsersRef.child(tempKey).set(userObj)
}

exports.notifications = functions.database.ref('/notifications/{uid}/{notificationId}').onWrite((event) => {
    return notif.sendNotifications(event)
})

exports.cronJob = functions.https.onRequest((req, res) => {
    return djob.dateJob(req, res)   
}) 

exports.eventsReminder = functions.database.ref('/eventsReminder/{uid}/{notificationId}').onWrite((event) =>{
    return eReminder.eventsReminder(event)
})