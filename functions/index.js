const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

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
        return root.child('user_tree_go').child(userObj.clanId).child(userObj.tempKeyInClan).once('value')
            .then(snap => {
                return prevVal = snap.val()
            })
            .then(prevVal => {
                treeObj = prevVal
                treeObj.key = uid
                treeObj.img = userObj.photoUrl
                treeObj.loc = 'users'
                treeObj.bd = userObj.birthDate

                return root.child('user_tree_go').child(userObj.clanId).child(uid).set(treeObj)
            })
            .then(() => {
                updateConnectedNodes(root, userObj.clanId, userObj.tempKeyInClan, treeObj.key)
            })
            .then(() => {
                return root.child('user_tree_go').child(userObj.clanId).child(userObj.tempKeyInClan).remove()
            })
            .catch(err => {
                console.log('Error code: ' + err.code)
            })
    } else {
        treeObj = {
            key: uid,
            n: userObj.displayName,
            s: userObj.gender,
            bd: userObj.birthDate,
            loc: "users"
        }

        if (userObj.photoUrl !== undefined) {
            treeObj.img = userObj.photoUrl
        }

        return root.child('user_tree_go').child(userObj.clanId).child(uid).set(treeObj)
    }
})

exports.addMotherToClan = functions.database.ref('/user_family/{uid}/mothers/{pushKey}').onCreate(event => {
    const root = event.data.ref.root
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: "female",
        loc: "/user_family/" + uid + "/mothers/"
    }

    if (userObj.photoUrl !== undefined) {
        treeObj.img = userObj.photoUrl
    }

    if (userObj.birthDate !== undefined) {
        treeObj.bd = userObj.birthDate
    }

    return root.child('user_tree_go').child(clanId).child(uid).update({ m: pushKey })
        .then(() => {
            return root.child('user_tree_go').child(clanId).child(pushKey).set(treeObj)
        })
        .then(() => {
            createPotentialUser(event);
        })
        .then(() => {
            connectCurrentUserParents(uid, clanId, pushKey, "mother")
        })
})

exports.addFatherToClan = functions.database.ref('/user_family/{uid}/fathers/{pushKey}').onCreate(event => {
    const root = event.data.ref.root
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: "male",
        loc: "/user_family/" + uid + "/fathers/"
    }

    if (userObj.photoUrl !== undefined) {
        treeObj.img = userObj.photoUrl
    }

    if (userObj.birthDate !== undefined) {
        treeObj.bd = userObj.birthDate
    }

    return root.child('user_tree_go').child(clanId).child(uid).update({ f: pushKey })
        .then(() => {
            return root.child('user_tree_go').child(clanId).child(pushKey).set(treeObj)
        })
        .then(() => {
            createPotentialUser(event);
        })
        .then(() => {
            connectCurrentUserParents(uid, clanId, pushKey, "father")
        })
})

exports.addSonToClan = functions.database.ref('/user_family/{uid}/sons/{pushKey}').onCreate(event => {
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    const root = event.data.ref.root
    const currentUserGender = root.child('users').child(uid).child('gender').once('value')

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: "male",
        loc: "/user_family/" + uid + "/sons/"
    }

    return currentUserGender.then(result => {
        if (userObj.photoUrl !== undefined) {
            treeObj.img = userObj.photoUrl
        }

        if (userObj.birthDate !== undefined) {
            treeObj.bd = userObj.birthDate
        }

        if (result.val() === "male") {
            treeObj.f = uid
        } else {
            treeObj.m = uid
        }

        return root.child("user_tree_go").child(clanId).child(pushKey).set(treeObj)
    }).then(function() {
        createPotentialUser(event);
    })
})

exports.addDaughterToClan = functions.database.ref('/user_family/{uid}/daughters/{pushKey}').onCreate(event => {
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    const root = event.data.ref.root
    const currentUserGender = root.child('users').child(uid).child('gender').once('value')

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: "female",
        loc: "/user_family/" + uid + "/daughters/"
    }

    return currentUserGender.then(result => {
        if (userObj.photoUrl !== undefined) {
            treeObj.img = userObj.photoUrl
        }

        if (userObj.birthDate !== undefined) {
            treeObj.bd = userObj.birthDate
        }

        if (result.val() === "male") {
            treeObj.f = uid
        } else {
            treeObj.m = uid
        }

        return root.child("user_tree_go").child(clanId).child(pushKey).set(treeObj)
    }).then(function() {
        createPotentialUser(event)
    })

})

exports.addWifeToClan = functions.database.ref('/user_family/{uid}/wives/{pushKey}').onCreate(event => {
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    const root = event.data.ref.root

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        ms: userObj.maritalStatus,
        bd: userObj.birthDate,
        s: 'female',
        loc: "/user_family/" + uid + "/wives/",
        vir: uid
    }

    if (userObj.photoUrl !== undefined) {
        treeObj.img = userObj.photoUrl
    }

    const pr1 = root.child("user_tree_go").child(clanId).child(uid).update({ ux: pushKey })
    const pr2 = root.child("user_tree_go").child(clanId).child(pushKey).set(treeObj)
    const pr3 = root.child("user_family").child(uid).child('spouse_keys').push(pushKey)

    return Promise.all([pr1, pr2, pr3])
})

exports.addHusbandToClan = functions.database.ref('/user_family/{uid}/husbands/{pushKey}').onCreate(event => {
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    const root = event.data.ref.root

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        ms: userObj.maritalStatus,
        bd: userObj.birthDate,
        s: 'male',
        loc: "/user_family/" + uid + "/husbands/",
        ux: uid
    }

    if (userObj.photoUrl !== undefined) {
        treeObj.img = userObj.photoUrl
    }

    const pr1 = root.child("user_tree_go").child(clanId).child(uid).update({ vir: pushKey })
    const pr2 = root.child("user_tree_go").child(clanId).child(pushKey).set(treeObj)
    const pr3 = root.child("user_family").child(uid).child('spouse_keys').push(pushKey)

    return Promise.all([pr1, pr2, pr3])
})

function updateCurrentUser(uid, clanId, pushKey, property, ref) {
    let updateObj = new Object()

    if (property === 'm') {
        updateObj.m = pushKey
    } else if (property === 'f') {
        updateObj.f = pushKey
    }

    return ref.child('user_tree_go').child(clanId).child(uid).update(updateObj)
}

function connectCurrentUserParents(uid, clanId, key, parentType) {
    const userTreeRef = admin.database().ref().child('user_tree_go')
    const parent = userTreeRef.child(clanId).child(uid).once("value")

    if (parentType === "mother") {
        parent.then(snapshot => {
            if (!(snapshot.val().f === undefined)) {
                const pr1 = userTreeRef.child(clanId).child(key).update({ vir: snapshot.val().f })
                const pr2 = userTreeRef.child(clanId).child(snapshot.val().f).update({ ux: key })

                return Promise.all([pr1, pr2])
            } else {
                return
            }
        })
    } else if (parentType === "father") {
        parent.then(snapshot => {
            if (!(snapshot.val().m === undefined)) {
                const pr1 = userTreeRef.child(clanId).child(key).update({ ux: snapshot.val().m })
                const pr2 = userTreeRef.child(clanId).child(snapshot.val().m).update({ vir: key })

                return Promise.all([pr1, pr2])
            } else {
                return
            }
        })
    }
}

function updateConnectedNodes(rootRef, clanId, oldId, newId) {
    return rootRef.child('user_tree_go').child(clanId).once('value').then(snapshot => {
        let updateObj = {}

        snapshot.forEach(childSnapshot => {
            let childSnap = childSnapshot.val()

            if (!(childSnap.m === undefined)) {
                if (childSnap.m === oldId) {
                    console.log('M', childSnap.m)
                    updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/m`] = newId
                }
            }

            if (!(childSnap.f === undefined)) {
                if (childSnap.f === oldId) {
                    console.log('F', childSnap.f)
                    updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/f`] = newId
                }
            }

            if (!(childSnap.ux === undefined)) {
                if (childSnap.ux === oldId) {
                    console.log('Ux', childSnap.ux)
                    updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/ux`] = newId
                }
            }

            if (!(childSnap.vir === undefined)) {
                if (childSnap.vir === oldId) {
                    console.log('Vir', childSnap.vir)
                    updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/vir`] = newId
                }
            }
        })

        return updateObj
    }).then(updateObj => {
        console.log(updateObj)
        rootRef.update(updateObj)
    })
}

function createPotentialUser(event) {
    let potentialUsersRef = admin.database().ref().child('potential_users')
    let userObj = event.data.val()
    let tempKey = event.params.pushKey

    userObj.tempKeyInClan = tempKey

    return potentialUsersRef.child(tempKey).set(userObj)
}

function updateChildParentKey(uid, clanId, key, parentType) {
    admin
        .database()
        .ref()
        .child("user_tree_go")
        .child(clanId)
        .once("value")
        .then(function(snapshot) {
            snapshot.forEach(childSnapshot => {
                if (childSnapshot.val().f === uid && parentType === "mother") {}
            });
        });
}

/* ========================
    Notifications Functions
    ======================== */
exports.sendNotifications = functions.database.ref('/notifications/{notificationId}').onWrite((event) => {

    if (event.data.previous.val()) {
        return;
    }

    if (!event.data.exists()) {
        return;
    }
    // Setup notification
    const NOTIFICATION_SNAPSHOT = event.data;
    const payload = {
        notification: {
            title: `New Message from ${NOTIFICATION_SNAPSHOT.val().user}! `,
            body: NOTIFICATION_SNAPSHOT.val().message,
            icon: NOTIFICATION_SNAPSHOT.val().avatar,
            click_action: `https://${functions.config().firebase.authDomain}`
        }
    }

    // const currUser = admin.auth().currentUser.uid;
    // const gen_id = admin.database().ref().child('users').child(currUser).child('gen_Id');
    //       gen_id.once('value').then(function(shotty){

    // Clean invalid tokens
    function cleanInvalidTokens(tokensWithKey, results) {

        const invalidTokens = [];

        results.forEach((result, i) => {
            if (!result.error)
                return;

            console.error("Error with Token: ", tokensWithKey[i].token);

            switch (result.error.code) {
                case "messaging/invalid-registration-token":
                case "messaging/registration-token-not-registered":
                    invalidTokens.push(admin.database.ref('/tokens').child(tokensWithKey[i].key).remove());
                    break;
                default:
                    break;
            }

        });

        return Promise.all(invalidTokens);

    }

    // admin.auth().verifyIdToken(idToken)
    //     .then(function(decodedToken) {
    //         var uid = decodedToken.uid;
    //         const gen_id = admin.database().ref().child('users').child(uid).child('gen_Id');
    //         gen_id.once('value').then(function(snapshot) {
    //             var key = snapshot.val();

    return admin.database().ref('/tokens').once('value').then((data) => {

        if (!data.val()) return;

        const snapshot = data.val();
        const tokens = [];
        const tokensWithKey = [];



        for (let key in snapshot) {
            tokens.push(snapshot[key].token);
            tokensWithKey.push({
                token: snapshot[key].token,
                key: key
            });
        }

        return admin.messaging().sendToDevice(tokens, payload)
            .then((response) => cleanInvalidTokens(tokensWithKey, response.results))
            .then(() => admin.database().ref('/notifications').child(NOTIFICATION_SNAPSHOT.key).remove())


    });
});