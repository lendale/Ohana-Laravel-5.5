const admin = require('firebase-admin')
const index = require('../index')

exports.addSon = function(event) {
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    const root = event.data.ref.root
    const currentUserGender = root.child(`users/${uid}/gender`).once('value')

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: 'male',
        loc: `/user_family/${uid}/sons/`
    }

    if (!(userObj.photoUrl === undefined)) {
        treeObj.img = userObj.photoUrl
    }

    if (!(userObj.birthDate === undefined)) {
        treeObj.bd = userObj.birthDate
    }

    if (!(userObj.parentKeys.f === undefined)) {
        treeObj.f = userObj.parentKeys.f
    }

    if (!(userObj.parentKeys.m === undefined)) {
        treeObj.m = userObj.parentKeys.m
    }

    const pr1 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
    const pr2 = index.createPotentialUser(event)

    return Promise.all([pr1, pr2]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.addDaughter = function(event) {
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    const root = event.data.ref.root
    const currentUserGender = root.child(`users/${uid}/gender`).once('value')

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: 'female',
        loc: `/user_family/${uid}/daughters/`
    }

    if (!(userObj.photoUrl === undefined)) {
        treeObj.img = userObj.photoUrl
    }

    if (!(userObj.birthDate === undefined)) {
        treeObj.bd = userObj.birthDate
    }

    if (!(userObj.parentKeys.f === undefined)) {
        treeObj.f = userObj.parentKeys.f
    }

    if (!(userObj.parentKeys.m === undefined)) {
        treeObj.m = userObj.parentKeys.m
    }

    const pr1 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
    const pr2 = index.createPotentialUser(event)

    return Promise.all([pr1, pr2]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}