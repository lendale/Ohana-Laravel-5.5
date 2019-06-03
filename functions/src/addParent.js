const admin = require('firebase-admin')
const index = require('../index')

exports.addMother = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey

    const pro1 = root.child(`users/${pushKey}`).once("value").then(snap => {
        if(snap.exists()) {
            root.child(`users/${uid}/m`).set(pushKey)
            root.child(`users/${pushKey}/children/${uid}`).set(uid)
            
            root.child(`users/${uid}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
            })

            root.child(`user_family/${uid}/mothers/${pushKey}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
            })
            
            connectCurrentUserParents(uid, pushKey, "mother")
        } else {
            index.createUser(data, context)
            root.child(`users/${uid}/m`).set(pushKey)
            root.child(`users/${pushKey}/children/${uid}`).set(uid)

            root.child(`users/${uid}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
            })

            root.child(`user_family/${uid}/mothers/${pushKey}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
            })
            
            connectCurrentUserParents(uid, pushKey, "mother")
        }
    })

    return Promise.all([pro1]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.addFather = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey

    const pro1 = root.child(`users/${pushKey}`).once("value").then(snap => {
        if(snap.exists()) {
            root.child(`users/${uid}/f`).set(pushKey)
            root.child(`users/${pushKey}/children/${uid}`).set(uid)

            root.child(`users/${uid}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
            })

            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
            })
            
            connectCurrentUserParents(uid, pushKey, "father")
        } else {
            index.createUser(data, context)
            root.child(`users/${uid}/f`).set(pushKey)
            root.child(`users/${pushKey}/children/${uid}`).set(uid)

            root.child(`users/${uid}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
            })

            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
            })
            connectCurrentUserParents(uid, pushKey, "father")
        }
    })

    return Promise.all([pro1]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

function connectCurrentUserParents(uid, key, parentType) {
    const db = admin.database()
    const usersRef = db.ref().child('users')
    const immFamRef = db.ref().child('immediate_family')
    const extFamRef = db.ref().child('extended_family')
    const father = usersRef.child(`${uid}/f`)
    const mother = usersRef.child(`${uid}/m`)

    if (parentType === 'mother') {
        return father.once('value').then(snapshot => {
            if (snapshot.exists()) {
                const pr1 = usersRef.child(`${key}/vir/${snapshot.val()}`).set(snapshot.val()).then(() => {
                    return usersRef.child(`${key}/ms/${snapshot.val()}`).set('married')
                })
                const pr2 = usersRef.child(`${snapshot.val()}/ux/${key}`).set(key).then(() => {
                    return usersRef.child(`${snapshot.val()}/ms/${key}`).set('married')
                })
                const pr3 = usersRef.child(`${key}`).once("value").then(snap => {
                    immFamRef.child(`${snap.val().familyId}/${snapshot.val()}`).set(snapshot.val())
                    extFamRef.child(`${snap.val().extendedId}/${snapshot.val()}`).set(snapshot.val())
                })
                const pr4 = usersRef.child(`${snapshot.val()}`).once("value").then(snap => {
                    immFamRef.child(`${snap.val().familyId}/${key}`).set(key)
                    extFamRef.child(`${snap.val().extendedId}/${key}`).set(key)
                })

                return Promise.all([pr1, pr2, pr3, pr4]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            }
        })
    } else if (parentType === 'father') {
        return mother.once('value').then(snapshot => {
            if (snapshot.exists()) {
                const pr1 = usersRef.child(`${key}/ux/${snapshot.val()}`).set(snapshot.val()).then(() => {
                    return usersRef.child(`${key}/ms/${snapshot.val()}`).set('married')
                })
                const pr2 = usersRef.child(`${snapshot.val()}/vir/${key}`).set(key).then(() => {
                    return usersRef.child(`${snapshot.val()}/ms/${key}`).set('married')
                })
                const pr3 = usersRef.child(`${key}`).once("value").then(snap => {
                    immFamRef.child(`${snap.val().familyId}/${snapshot.val()}`).set(snapshot.val())
                    extFamRef.child(`${snap.val().extendedId}/${snapshot.val()}`).set(snapshot.val())
                })
                const pr4 = usersRef.child(`${snapshot.val()}`).once("value").then(snap => {
                    immFamRef.child(`${snap.val().familyId}/${key}`).set(key)
                    extFamRef.child(`${snap.val().extendedId}/${key}`).set(key)
                })

                return Promise.all([pr1, pr2, pr3, pr4]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            }
        })
    }
}