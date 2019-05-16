const admin = require('firebase-admin')
const index = require('../index')

exports.addMother = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()

    const db = admin.database()
    const usersRef = db.ref().child('users')

    const pro1 = usersRef.child(pushKey).once("value")
        .then(snap => {
            if(snap.exists()) {
                root.child(`users/${uid}/m`).set(pushKey)
                root.child(`users/${pushKey}/children/${uid}`).set(uid)
                connectCurrentUserParents(uid, pushKey, "mother", userObj.displayName)
            } else {
                index.createUser(data, context)
                root.child(`users/${uid}/m`).set(pushKey)
                root.child(`users/${pushKey}/children/${uid}`).set(uid)
                connectCurrentUserParents(uid, pushKey, "mother", userObj.displayName)
            }
        });

    return Promise.all([pro1]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.addFather = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()

    const db = admin.database()
    const usersRef = db.ref().child('users')

    const pro1 = usersRef.child(pushKey).once("value")
        .then(snap => {
            if(snap.exists()) {
                root.child(`users/${uid}/f`).set(pushKey)
                root.child(`users/${pushKey}/children/${uid}`).set(uid)
                connectCurrentUserParents(uid, pushKey, "father", userObj.displayName)
            } else {
                index.createUser(data, context)
                root.child(`users/${uid}/f`).set(pushKey)
                root.child(`users/${pushKey}/children/${uid}`).set(uid)
                connectCurrentUserParents(uid, pushKey, "father", userObj.displayName)
            }
        });

    return Promise.all([pro1]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

function connectCurrentUserParents(uid, key, parentType, name) {
    const db = admin.database()
    const usersRef = db.ref().child('users')
    const father = usersRef.child(`${uid}/f`)
    const mother = usersRef.child(`${uid}/m`)

    if (parentType === 'mother') {
        return father.once('value').then(snapshot => {
            if (snapshot.exists()) {
                const pr1 = usersRef.child(`${key}/vir/${snapshot.val()}`).set(snapshot.val())
                    .then(() => {
                        return usersRef.child(`${key}/ms/${snapshot.val()}`).set('married')
                    })
                const pr2 = usersRef.child(`${snapshot.val()}/ux/${key}`).set(key)
                    .then(() => {
                        return usersRef.child(`${snapshot.val()}/ms/${key}`).set('married')
                    })

                return Promise.all([pr1, pr2]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            }
        })
    } else if (parentType === 'father') {
        return mother.once('value').then(snapshot => {
            if (snapshot.exists()) {
                const pr1 = usersRef.child(`${key}/ux/${snapshot.val()}`).set(snapshot.val())
                    .then(() => {
                        return usersRef.child(`${key}/ms/${snapshot.val()}`).set('married')
                    })
                const pr2 = usersRef.child(`${snapshot.val()}/vir/${key}`).set(key)
                    .then(() => {
                        return usersRef.child(`${snapshot.val()}/ms/${key}`).set('married')
                    })

                return Promise.all([pr1, pr2]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            }
        })
    }
}