const admin = require('firebase-admin')
const index = require('../index')

exports.addWife = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()
    let clanId = userObj.clanId
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

    const pr1 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
        .then(() => {
            const vir = root.child(`user_tree_go/${clanId}/${pushKey}/vir`).push(uid)
            const ms = root.child(`user_tree_go/${clanId}/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

            return Promise.all([vir, ms]).catch(err => {
                console.log('Error code', err.code)
                console.log(err)
            })
        })
    const pr2 = root.child(`user_tree_go/${clanId}/${uid}/ux`).push(pushKey)
    const pr3 = root.child(`user_tree_go/${clanId}/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)
    const pr4 = index.createPotentialUser(data, context)
    // const pr5 = root.child(`user_family/${uid}/spouse_keys/ux/${pushKey}`).set(userObj.displayName)
    // const pr6 = root.child(`users/${uid}`).once('value').then(snap => {
    //     const pr7 = root.child(`user_family/${pushKey}/husbands/${uid}`).set(snap.val())
    //     const pr8 = root.child(`user_family/${pushKey}/spouse_keys/vir/${uid}`).set(snap.val().displayName)
    //     return Promise.all([pr7, pr8]).catch(err => {
    //         console.log('Error code', err.code)
    //         console.log(err)
    //     })
    // })

    return Promise.all([pr1, pr2, pr3, pr4, pr5, pr6]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.addHusband = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()
    let clanId = userObj.clanId
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

    const pr1 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
        .then(() => {
            const ux = root.child(`user_tree_go/${clanId}/${pushKey}/ux`).push(uid)
            const ms = root.child(`user_tree_go/${clanId}/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

            return Promise.all([ux, ms]).catch(err => {
                console.log('Error code', err.code)
                console.log(err)
            })
        })
    const pr2 = root.child(`user_tree_go/${clanId}/${uid}/vir`).push(pushKey)
    const pr3 = root.child(`user_tree_go/${clanId}/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)
    const pr4 = index.createPotentialUser(data, context)
    // const pr5 = root.child(`user_family/${uid}/spouse_keys/vir/${pushKey}`).set(userObj.displayName)
    // const pr6 = root.child(`users/${uid}`).once('value').then(snap => {
    //     const pr7 = root.child(`user_family/${pushKey}/wives/${uid}`).set(snap.val())
    //     const pr8 = root.child(`user_family/${pushKey}/spouse_keys/ux/${uid}`).set(snap.val().displayName)
    //     return Promise.all([pr7, pr8]).catch(err => {
    //         console.log('Error code', err.code)
    //         console.log(err)
    //     })
    // })

    return Promise.all([pr1, pr2, pr3, pr4, pr5, pr6]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}