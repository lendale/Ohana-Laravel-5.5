const admin = require('firebase-admin')
const index = require('../index')

exports.addWife = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()

    const db = admin.database()
    const usersRef = db.ref().child('users')

    const pro1 = usersRef.child(pushKey).once("value")
        .then(snap => {
            if(snap.exists()) {
                const pr2 = root.child(`users/${uid}/ux/${pushKey}`).set(pushKey)
                const pr3 = root.child(`users/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)
                const vir = root.child(`users/${pushKey}/vir/${uid}`).set(uid)
                const ms = root.child(`users/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

                return Promise.all([pr2, pr3, vir, ms]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            } else {
                const pr1 = index.createUser(data, context)
                const pr2 = root.child(`users/${uid}/ux/${pushKey}`).set(pushKey)
                const pr3 = root.child(`users/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)
                const vir = root.child(`users/${pushKey}/vir/${uid}`).set(uid)
                const ms = root.child(`users/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

                return Promise.all([pr1, pr2, pr3, vir, ms]).catch(err => {
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

    const db = admin.database()
    const usersRef = db.ref().child('users')

    const pro1 = usersRef.child(pushKey).once("value")
        .then(snap => {
            if(snap.exists()) {
                const pr2 = root.child(`users/${uid}/vir/${pushKey}`).set(pushKey)
                const pr3 = root.child(`users/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)
                const ux = root.child(`users/${pushKey}/ux/${uid}`).set(uid)
                const ms = root.child(`users/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

                return Promise.all([pr2, pr3, ux, ms]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            } else {
                const pr1 = index.createUser(data, context)
                const pr2 = root.child(`users/${uid}/vir/${pushKey}`).set(pushKey)
                const pr3 = root.child(`users/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)
                const ux = root.child(`users/${pushKey}/ux/${uid}`).set(uid)
                const ms = root.child(`users/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

                return Promise.all([pr1, pr2, pr3, ux, ms]).catch(err => {
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