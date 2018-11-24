const admin = require('firebase-admin')
const index = require('../index')

exports.addDaughter = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: 'female',
        loc: `/user_family/${uid}/daughters/${pushKey}/`,
        bd: userObj.birthDate
    }

    if (userObj.photoURL !== undefined) {
        treeObj.img = userObj.photoURL
    }

    if (userObj.parentKeys.f !== undefined) {
        treeObj.f = userObj.parentKeys.f
    }

    if (userObj.parentKeys.m !== undefined) {
        treeObj.m = userObj.parentKeys.m
    }

    const pr1 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj);
    const pr2 = index.createPotentialUser(data, context);
    // const pr3 = root.child(`users/${uid}`).once('value').then(snap => {
    //     if (snap.val().gender === 'male') {
    //         return root.child(`user_family/${pushKey}/fathers/${uid}`).set(snap.val())
    //     } else {
    //         return root.child(`user_family/${pushKey}/mothers/${uid}`).set(snap.val())
    //     }
    // })

    return Promise.all([pr1, pr2, pr3]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.addSon = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: 'male',
        loc: `/user_family/${uid}/sons/${pushKey}/`,
        bd: userObj.birthDate
    }

    if (userObj.photoURL !== undefined) {
        treeObj.img = userObj.photoURL
    }

    if (userObj.parentKeys.f !== undefined) {
        treeObj.f = userObj.parentKeys.f
    }

    if (userObj.parentKeys.m !== undefined) {
        treeObj.m = userObj.parentKeys.m
    }

    const pr1 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj);
    const pr2 = index.createPotentialUser(data, context);
    // const pr3 = root.child(`users/${uid}`).once('value').then(snap => {
    //     if (snap.val().gender === 'male') {
    //         return root.child(`user_family/${pushKey}/fathers/${uid}`).set(snap.val())
    //     } else {
    //         return root.child(`user_family/${pushKey}/mothers/${uid}`).set(snap.val())
    //     }
    // })

    return Promise.all([pr1, pr2, pr3]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}