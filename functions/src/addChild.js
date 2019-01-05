const admin = require('firebase-admin')
const index = require('../index')

exports.addDaughter = function(data, context) {
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

    const pr1 = index.createPotentialUser(data, context);
    const pr2 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
    const pr3 = root.child(`user_tree_go/${clanId}/${uid}/children`).push(pushKey)
    const pr4 = root.child(`user_immediate_family/${familyId}/${pushKey}`).set(treeObj)
    const pr5 = root.child(`user_immediate_family/${familyId}/${uid}/children`).push(pushKey)

    return Promise.all([pr1, pr2, pr3, pr4, pr5]).catch(err => {
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
    let familyId = userObj.familyId
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

    const pr1 = index.createPotentialUser(data, context);
    const pr2 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj);
    const pr3 = root.child(`user_tree_go/${clanId}/${uid}/children`).push(pushKey)
    const pr4 = root.child(`user_immediate_family/${familyId}/${pushKey}`).set(treeObj)
    const pr5 = root.child(`user_immediate_family/${familyId}/${uid}/children`).push(pushKey)

    return Promise.all([pr1, pr2, pr3, pr4, pr5]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}