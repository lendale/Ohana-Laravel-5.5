const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// Deploy specific functions => firebase deploy --only functions:func1,func2,etc..

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

/* ========================
        Tree Functions
    ======================== */
exports.addCurrentUserToClan = functions.database.ref('/users/{uid}').onCreate(event => {
    const root = event.data.ref.root
    let uid = event.params.uid
    let userObj = event.data.val()
    let treeObj = new Object()

    if (userObj.photoUrl === undefined) {
        treeObj = { key: uid, n: userObj.displayName, s: userObj.gender, loc: "users" }
    } else {
        treeObj = { key: uid, n: userObj.displayName, s: userObj.gender, loc: "users", img: userObj.photoUrl }
    }

    return root.child('user_tree_go').child(userObj.clanId).child(uid).set(treeObj)
})

exports.addMotherToClan = functions.database.ref('/user_family/{uid}/mothers/{pushKey}').onCreate(event => {
    const root = event.data.ref.root
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    if (userObj.photoUrl === undefined) {
        treeObj = { key: pushKey, n: userObj.displayName, s: "female", loc: "user_mothers" }
    } else {
        treeObj = { key: pushKey, n: userObj.displayName, s: "female", loc: "user_mothers", img: userObj.photoUrl }
    }

    updateCurrentUser(uid, clanId, pushKey, "m", root)
    connectCurrentUserParents(uid, clanId, pushKey, "mother")
    createPotentialUser(event)

    return root.child('user_tree_go').child(clanId).child(pushKey).set(treeObj)
})

exports.addFatherToClan = functions.database.ref('/user_family/{uid}/fathers/{pushKey}').onCreate(event => {
    const root = event.data.ref.root
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    if (userObj.photoUrl === undefined) {
        treeObj = { key: pushKey, n: userObj.displayName, s: "male", loc: "user_fathers" }
    } else {
        treeObj = { key: pushKey, n: userObj.displayName, s: "male", loc: "user_fathers", img: userObj.photoUrl }
    }

    updateCurrentUser(uid, clanId, pushKey, "f", root)
    connectCurrentUserParents(uid, clanId, pushKey, "father")
    createPotentialUser(event)

    return root.child('user_tree_go').child(clanId).child(pushKey).set(treeObj)
})

exports.addSonToClan = functions.database.ref('/user_family/{uid}/sons/{pushKey}').onCreate(event => {
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    const root = event.data.ref.root
    const currentUser = root.child('users').child(uid).once('value')
    var currentUserGender;

    return currentUser
        .then(function(snapshot) {
            currentUserGender = snapshot.val().gender;
        })
        .then(function() {
            if (userObj.photoUrl === undefined) {
                treeObj = { key: pushKey, n: userObj.displayName, s: "male", loc: "user_sons" };
            } else {
                treeObj = { key: pushKey, n: userObj.displayName, s: "male", loc: "user_sons", img: userObj.photoUrl };
            }

            if (currentUserGender === "male") {
                treeObj.f = uid;
            } else {
                treeObj.m = uid;
            }
        })
        .then(() => {
            root
                .child("user_tree_go")
                .child(clanId)
                .child(pushKey)
                .set(treeObj);
        })
        .then(() => {
            createPotentialUser(event);
        });
})

exports.addDaughterToClan = functions.database.ref('/user_family/{uid}/daughters/{pushKey}').onCreate(event => {
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    const root = event.data.ref.root
    const currentUser = root.child('users').child(uid).once('value')
    var currentUserGender;

    return currentUser
        .then(function(snapshot) {
            currentUserGender = snapshot.val().gender;
        })
        .then(() => {
            if (userObj.photoUrl === undefined) {
                treeObj = { key: pushKey, n: userObj.displayName, s: "female", loc: "user_daughters" };
            } else {
                treeObj = { key: pushKey, n: userObj.displayName, s: "male", loc: "user_daughters", img: userObj.photoUrl };
            }

            if (currentUserGender === "male") {
                treeObj.f = uid;
            } else {
                treeObj.m = uid;
            }
        })
        .then(() => {
            root
                .child("user_tree_go")
                .child(clanId)
                .child(pushKey)
                .set(treeObj);
        })
        .then(function() {
            createPotentialUser(event);
        });
})

exports.addWifeToClan = functions.database.ref('/user_family/{uid}/wives/{pushKey}').onCreate(event => {
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    const root = event.data.ref.root

    if (userObj.photoUrl === undefined) {
        treeObj = {
            key: pushKey,
            n: userObj.displayName,
            s: 'female',
            loc: "user_wives",
            vir: uid
        };
    } else {
        treeObj = {
            key: pushKey,
            n: userObj.displayName,
            s: 'female',
            img: userObj.photoUrl,
            loc: "user_wives",
            vir: uid
        };
    }

    const pr1 = root.child("user_tree_go").child(clanId).child(uid).update({ ux: pushKey })
    const pr2 = root.child("user_tree_go").child(clanId).child(pushKey).set(treeObj)

    return Promise.all([pr1, pr2])
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
        parent.then(function(snapshot) {
            if (snapshot.val().f !== null) {
                userTreeRef.child(clanId).child(key).update({ vir: snapshot.val().f })
                userTreeRef.child(clanId).child(snapshot.val().f).update({ ux: key })
            }
        })
    } else if (parentType === "father") {
        parent.then(function(snapshot) {
            if (snapshot.val().m !== null) {
                userTreeRef.child(clanId).child(key).update({ ux: snapshot.val().m })
                userTreeRef.child(clanId).child(snapshot.val().m).update({ vir: key })
            }
        })
    }
}

function createPotentialUser(event) {
    let potentialUsersRef = admin.database().ref().child('potential_users')
    let userObj = event.data.val()

    userObj.tempKeyInClan = event.params.pushKey

    potentialUsersRef.push(userObj)
}

function updateChildParentKey(uid, clanId, key, parentType) {
    admin
        .database()
        .ref()
        .child("user_tree_go")
        .child(clanId)
        .once("value")
        .then(function(snapshot) {
            snapshot.forEach(childsnapshot => {
                if (childsnapshot.val().f === uid && parentType === "mother") {}
            });
        });
}

function checkPotentialUser(displayName) {
    var newDisplayName;
    var exists = false;

    admin
        .database()
        .ref()
        .child("potential_users")
        .once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childsnapshot) {
                newDisplayName = childsnapshot.val().displayName;

                if (displayName === newDisplayName) {
                    exists = true;
                }
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