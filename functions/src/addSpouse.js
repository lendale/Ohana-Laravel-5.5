const admin = require('firebase-admin')
const index = require('../index')

exports.addWife = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()
    var familyId;
    let treeObj = new Object()

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        bd: userObj.birthDate,
        s: 'female',
        loc: `/user_family/${uid}/wives/${pushKey}/`
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
                    .then(() => {
                        const vir = root.child(`user_immediate_family/${familyId}/${pushKey}/vir`).push(uid)
                        const ms = root.child(`user_immediate_family/${familyId}/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

                        return Promise.all([vir, ms]).catch(err => {
                            console.log('Error code', err.code)
                            console.log(err)
                        })
                    })
                const pr3 = root.child(`user_immediate_family/${familyId}/${uid}/ux`).push(pushKey)
                const pr4 = root.child(`user_immediate_family/${familyId}/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)

                return Promise.all([pr2, pr3, pr4]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            } else {
                const pr1 = index.createUser(data, context)
                const pr2 = root.child(`user_immediate_family/${familyId}/${pushKey}`).set(treeObj)
                    .then(() => {
                        const vir = root.child(`user_immediate_family/${familyId}/${pushKey}/vir`).push(uid)
                        const ms = root.child(`user_immediate_family/${familyId}/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

                        return Promise.all([vir, ms]).catch(err => {
                            console.log('Error code', err.code)
                            console.log(err)
                        })
                    })
                const pr3 = root.child(`user_immediate_family/${familyId}/${uid}/ux`).push(pushKey)
                const pr4 = root.child(`user_immediate_family/${familyId}/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)

                return Promise.all([pr1, pr2, pr3, pr4]).catch(err => {
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

exports.addHusband = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()
    var familyId;
    let treeObj = new Object()

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        bd: userObj.birthDate,
        s: 'male',
        loc: `/user_family/${uid}/husbands/${pushKey}/`
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
                    .then(() => {
                        const ux = root.child(`user_immediate_family/${familyId}/${pushKey}/ux`).push(uid)
                        const ms = root.child(`user_immediate_family/${familyId}/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

                        return Promise.all([ux, ms]).catch(err => {
                            console.log('Error code', err.code)
                            console.log(err)
                        })
                    })
                const pr3 = root.child(`user_immediate_family/${familyId}/${uid}/vir`).push(pushKey)
                const pr4 = root.child(`user_immediate_family/${familyId}/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)

                return Promise.all([pr2, pr3, pr4]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            } else {
                const pr1 = index.createUser(data, context)
                const pr2 = root.child(`user_immediate_family/${familyId}/${pushKey}`).set(treeObj)
                    .then(() => {
                        const ux = root.child(`user_immediate_family/${familyId}/${pushKey}/ux`).push(uid)
                        const ms = root.child(`user_immediate_family/${familyId}/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

                        return Promise.all([ux, ms]).catch(err => {
                            console.log('Error code', err.code)
                            console.log(err)
                        })
                    })
                const pr3 = root.child(`user_immediate_family/${familyId}/${uid}/vir`).push(pushKey)
                const pr4 = root.child(`user_immediate_family/${familyId}/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)

                return Promise.all([pr1, pr2, pr3, pr4]).catch(err => {
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