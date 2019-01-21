const admin = require('firebase-admin')
const index = require('../index')

exports.addMother = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()
    let clanId = userObj.clanId
    let familyId = userObj.familyId
    let treeObj = new Object()

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: 'female',
        loc: `/user_family/${uid}/mothers/${pushKey}/`,
        bd: userObj.birthDate
    }

    if (userObj.photoURL !== undefined) {
        treeObj.img = userObj.photoURL
    }

    const db = admin.database()
    const usersRef = db.ref().child('users')

    const pro = usersRef.child(pushKey).once("value")
        .then(snap => {
            if(snap.exists()) {
                const pr2 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
                const pr3 = root.child(`user_tree_go/${clanId}/${uid}/m`).set(pushKey)
                const pr4 = root.child(`user_tree_go/${clanId}/${pushKey}/children`).push(uid)
                const pr5 = root.child(`user_immediate_family/${familyId}/${pushKey}`).set(treeObj)
                const pr6 = root.child(`user_immediate_family/${familyId}/${uid}/m`).set(pushKey)
                const pr7 = root.child(`user_immediate_family/${familyId}/${pushKey}/children`).push(uid)
                const pr8 = connectCurrentUserParents(uid, clanId, familyId, pushKey, "mother", userObj.displayName)

                return Promise.all([pr2, pr3, pr4, pr5, pr6, pr7, pr8]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            }
            else {
                const pr1 = index.createPotentialUser(data, context)
                const pr2 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
                const pr3 = root.child(`user_tree_go/${clanId}/${uid}/m`).set(pushKey)
                const pr4 = root.child(`user_tree_go/${clanId}/${pushKey}/children`).push(uid)
                const pr5 = root.child(`user_immediate_family/${familyId}/${pushKey}`).set(treeObj)
                const pr6 = root.child(`user_immediate_family/${familyId}/${uid}/m`).set(pushKey)
                const pr7 = root.child(`user_immediate_family/${familyId}/${pushKey}/children`).push(uid)
                const pr8 = connectCurrentUserParents(uid, clanId, familyId, pushKey, "mother", userObj.displayName)

                return Promise.all([pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            }

        });

    return Promise.all([pro]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.addFather = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()
    let clanId = userObj.clanId
    let familyId = userObj.familyId
    let treeObj = new Object()

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: 'male',
        loc: `/user_family/${uid}/fathers/${pushKey}/`,
        bd: userObj.birthDate
    }

    if (userObj.photoURL !== undefined) {
        treeObj.img = userObj.photoURL
    }

    const db = admin.database()
    const usersRef = db.ref().child('users')

    const pro = usersRef.child(pushKey).once("value")
        .then(snap => {
            if(snap.exists()) {
                const pr2 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
                const pr3 = root.child(`user_tree_go/${clanId}/${uid}/f`).set(pushKey)
                const pr4 = root.child(`user_tree_go/${clanId}/${pushKey}/children`).push(uid)
                const pr5 = root.child(`user_immediate_family/${familyId}/${pushKey}`).set(treeObj)
                const pr6 = root.child(`user_immediate_family/${familyId}/${uid}/f`).set(pushKey)
                const pr7 = root.child(`user_immediate_family/${familyId}/${pushKey}/children`).push(uid)
                const pr8 = connectCurrentUserParents(uid, clanId, familyId, pushKey, "mother", userObj.displayName)

                return Promise.all([pr2, pr3, pr4, pr5, pr6, pr7, pr8]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            }
            else {
                const pr1 = index.createPotentialUser(data, context)
                const pr2 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
                const pr3 = root.child(`user_tree_go/${clanId}/${uid}/f`).set(pushKey)
                const pr4 = root.child(`user_tree_go/${clanId}/${pushKey}/children`).push(uid)
                const pr5 = root.child(`user_immediate_family/${familyId}/${pushKey}`).set(treeObj)
                const pr6 = root.child(`user_immediate_family/${familyId}/${uid}/f`).set(pushKey)
                const pr7 = root.child(`user_immediate_family/${familyId}/${pushKey}/children`).push(uid)
                const pr8 = connectCurrentUserParents(uid, clanId, familyId, pushKey, "mother", userObj.displayName)

                return Promise.all([pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            }

        });

    return Promise.all([pro]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

function connectCurrentUserParents(uid, clanId, familyId, key, parentType, name) {
    const db = admin.database()
    const userTreeRef = db.ref().child('user_tree_go')
    const userFamRef = db.ref().child('user_family')
    const userImmRef = db.ref().child('user_immediate_family')
    const father = userTreeRef.child(`${clanId}/${uid}/f`)
    const mother = userTreeRef.child(`${clanId}/${uid}/m`)

    if (parentType === 'mother') {
        return father.once('value').then(snapshot => {
            if (snapshot.exists()) {
                const pr1 = userTreeRef.child(`${clanId}/${key}/vir`).push(snapshot.val())
                    .then(() => {
                        return userTreeRef.child(`${clanId}/${key}/ms/${snapshot.val()}`).set('married')
                    })
                const pr2 = userTreeRef.child(`${clanId}/${snapshot.val()}/ux`).push(key)
                    .then(() => {
                        return userTreeRef.child(`${clanId}/${snapshot.val()}/ms/${key}`).set('married')
                    })
                // const pr3 = userFamRef.child(`${snapshot.val()}/spouse_keys/ux/${key}`).set(name)
                //     .then(() => {
                //         return userTreeRef.child(`${clanId}/${snapshot.val()}/n`).once('value')
                //             .then(n => {
                //                 return userFamRef.child(`${key}/spouse_keys/vir/${snapshot.val()}`).set(n.val())
                //             })
                //     })
                const pr4 = userImmRef.child(`${familyId}/${key}/vir`).push(snapshot.val())
                    .then(() => {
                        return userImmRef.child(`${familyId}/${key}/ms/${snapshot.val()}`).set('married')
                    })
                const pr5 = userImmRef.child(`${familyId}/${snapshot.val()}/ux`).push(key)
                    .then(() => {
                        return userImmRef.child(`${familyId}/${snapshot.val()}/ms/${key}`).set('married')
                    })

                return Promise.all([pr1, pr2, pr3, pr4, pr5]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            } else {
                return
            }
        })
    } else if (parentType === 'father') {
        return mother.once('value').then(snapshot => {
            if (snapshot.exists()) {
                const pr1 = userTreeRef.child(`${clanId}/${key}/ux`).push(snapshot.val())
                    .then(() => {
                        return userTreeRef.child(`${clanId}/${key}/ms/${snapshot.val()}`).set('married')
                    })
                const pr2 = userTreeRef.child(`${clanId}/${snapshot.val()}/vir`).push(key)
                    .then(() => {
                        return userTreeRef.child(`${clanId}/${snapshot.val()}/ms/${key}`).set('married')
                    })
                // const pr3 = userFamRef.child(`${snapshot.val()}/spouse_keys/vir/${key}`).set(name)
                //     .then(() => {
                //         return userTreeRef.child(`${clanId}/${snapshot.val()}/n`).once('value')
                //             .then(n => {
                //                 return userFamRef.child(`${key}/spouse_keys/ux/${snapshot.val()}`).set(n.val())
                //             })
                //     })
                const pr4 = userImmRef.child(`${familyId}/${key}/ux`).push(snapshot.val())
                    .then(() => {
                        return userImmRef.child(`${familyId}/${key}/ms/${snapshot.val()}`).set('married')
                    })
                const pr5 = userImmRef.child(`${familyId}/${snapshot.val()}/vir`).push(key)
                    .then(() => {
                        return userImmRef.child(`${familyId}/${snapshot.val()}/ms/${key}`).set('married')
                    })

                return Promise.all([pr1, pr2, pr3, pr4, pr5]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            } else {
                return
            }
        })
    }
}