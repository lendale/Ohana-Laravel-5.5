const admin = require('firebase-admin')
const index = require('../index')

exports.addSister = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()
    var familyId;
    let treeObj = new Object()

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: 'female',
        loc: `/user_family/${uid}/sisters/${pushKey}/`,
        bd: userObj.birthDate
    }

    if (userObj.photoURL !== undefined) {
        treeObj.img = userObj.photoURL
    }

    const db = admin.database()
    const usersRef = db.ref().child('users')

    const pro = usersRef.child(uid).once("value")
        .then(snap => {
            familyId = snap.val().familyId;
        });

    const pro1 = usersRef.child(pushKey).once("value")
        .then(snap => {
            if(snap.exists()) {
                const pr2 = root.child(`user_immediate_family/${familyId}/${pushKey}`).set(treeObj)
                const pr3 = root.child(`user_immediate_family/${familyId}/${uid}`).once('value').then(snap => {
                    const mother = root.child(`user_immediate_family/${familyId}/${pushKey}/m`).set(snap.val().m);
                    const father = root.child(`user_immediate_family/${familyId}/${pushKey}/f`).set(snap.val().f);
                    const motherChild = root.child(`user_immediate_family/${familyId}/${snap.val().m}/children`).push(pushKey);
                    const fatherChild = root.child(`user_immediate_family/${familyId}/${snap.val().f}/children`).push(pushKey);

                    return Promise.all([mother, father, motherChild, fatherChild]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                })
                const pr4 = root.child(`user_immediate_family/${familyId}/${uid}/siblings`).push(pushKey);
                const pr5 = root.child(`user_immediate_family/${familyId}/${pushKey}/siblings`).push(uid);

                return Promise.all([pr2, pr3, pr4, pr5]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            } else {
                const pr1 = index.createUser(data, context)
                const pr2 = root.child(`user_immediate_family/${familyId}/${pushKey}`).set(treeObj)
                const pr3 = root.child(`user_immediate_family/${familyId}/${uid}`).once('value').then(snap => {
                    const mother = root.child(`user_immediate_family/${familyId}/${pushKey}/m`).set(snap.val().m);
                    const father = root.child(`user_immediate_family/${familyId}/${pushKey}/f`).set(snap.val().f);
                    const motherChild = root.child(`user_immediate_family/${familyId}/${snap.val().m}/children`).push(pushKey);
                    const fatherChild = root.child(`user_immediate_family/${familyId}/${snap.val().f}/children`).push(pushKey);

                    return Promise.all([mother, father, motherChild, fatherChild]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                })
                const pr4 = root.child(`user_immediate_family/${familyId}/${uid}/siblings`).once('value').then(snap => {
                    snap.forEach(snap2 => {
                        console.log(snap2.val())
                        if((snap2.val() !== pushKey) || (snap2.val() !== uid)) {
                            return root.child(`user_immediate_family/${familyId}/${pushKey}/siblings`).push(snap2.val());
                        }
                    })
                })
                const pr5 = root.child(`user_immediate_family/${familyId}/${uid}/siblings`).push(pushKey);
                const pr6 = root.child(`user_immediate_family/${familyId}/${pushKey}/siblings`).push(uid);

                return Promise.all([pr1, pr2, pr3, pr5, pr6]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            }
        });

    return Promise.all([pro1]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.addBrother = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()
    var familyId;
    let treeObj = new Object()

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: 'male',
        loc: `/user_family/${uid}/brothers/${pushKey}/`,
        bd: userObj.birthDate
    }

    if (userObj.photoURL !== undefined) {
        treeObj.img = userObj.photoURL
    }

    const db = admin.database()
    const usersRef = db.ref().child('users')

    const pro = usersRef.child(uid).once("value")
        .then(snap => {
            familyId = snap.val().familyId;
        });

    const pro1 = usersRef.child(pushKey).once("value")
        .then(snap => {
            if(snap.exists()) {
                const pr2 = root.child(`user_immediate_family/${familyId}/${pushKey}`).set(treeObj)
                const pr3 = root.child(`user_immediate_family/${familyId}/${uid}`).once('value').then(snap => {
                    const mother = root.child(`user_immediate_family/${familyId}/${pushKey}/m`).set(snap.val().m);
                    const father = root.child(`user_immediate_family/${familyId}/${pushKey}/f`).set(snap.val().f);
                    const motherChild = root.child(`user_immediate_family/${familyId}/${snap.val().m}/children`).push(pushKey);
                    const fatherChild = root.child(`user_immediate_family/${familyId}/${snap.val().f}/children`).push(pushKey);

                    return Promise.all([mother, father, motherChild, fatherChild]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                })
                const pr4 = root.child(`user_immediate_family/${familyId}/${uid}/siblings`).push(pushKey);
                const pr5 = root.child(`user_immediate_family/${familyId}/${pushKey}/siblings`).push(uid);

                return Promise.all([pr2, pr3, pr4, pr5]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            } else {
                const pr1 = index.createUser(data, context)
                const pr2 = root.child(`user_immediate_family/${familyId}/${pushKey}`).set(treeObj)
                const pr3 = root.child(`user_immediate_family/${familyId}/${uid}`).once('value').then(snap => {
                    const mother = root.child(`user_immediate_family/${familyId}/${pushKey}/m`).set(snap.val().m);
                    const father = root.child(`user_immediate_family/${familyId}/${pushKey}/f`).set(snap.val().f);
                    const motherChild = root.child(`user_immediate_family/${familyId}/${snap.val().m}/children`).push(pushKey);
                    const fatherChild = root.child(`user_immediate_family/${familyId}/${snap.val().f}/children`).push(pushKey);

                    return Promise.all([mother, father, motherChild, fatherChild]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                })
                const pr4 = root.child(`user_immediate_family/${familyId}/${uid}/siblings`).push(pushKey);
                const pr5 = root.child(`user_immediate_family/${familyId}/${pushKey}/siblings`).push(uid);

                return Promise.all([pr1, pr2, pr3, pr4, pr5]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            }
        });

    return Promise.all([pro1]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}