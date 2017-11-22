const admin = require('firebase-admin')
const index = require('../index')

exports.addWife = function(event) {
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    const root = event.data.ref.root

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        bd: userObj.birthDate,
        s: 'female',
        loc: `/user_family/${uid}/wives/`
    }

    if (userObj.photoUrl !== undefined) {
        treeObj.img = userObj.photoUrl
    }

    const pr1 = root.child(`user_tree_go/${clanId}/${uid}/ux`).push(pushKey)
    const pr2 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj).then(snap => {
        return root.child(`user_tree_go/${clanId}/${pushKey}/vir`).push(uid).then(() => {
            return root.child(`user_tree_go${clanId}/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)
        }).then(() => {
            return root.child(`user_tree_go/${clanId}/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)
        })
    }).then(() => {
        index.createPotentialUser(event)
    })
    const pr3 = root.child(`user_family${uid}/spouse_keys/ux/${pushKey}`).set(userObj.displayName)

    return Promise.all([pr1, pr2, pr3]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.addHusband = function(event) {
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    const root = event.data.ref.root

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        bd: userObj.birthDate,
        s: 'male',
        loc: `/user_family/${uid}/husbands/`
    }

    if (userObj.photoUrl !== undefined) {
        treeObj.img = userObj.photoUrl
    }

    const pr1 = root.child(`user_tree_go/${clanId}/${uid}/vir`).push(pushKey)
    const pr2 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj).then(snap => {
        return root.child(`user_tree_go/${clanId}/${pushKey}/ux`).push(uid).then(() => {
            return root.child(`user_tree_go/${clanId}/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)
        }).then(() => {
            return root.child(`user_tree_go/${clanId}/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)
        })
    }).then(() => {
        index.createPotentialUser(event)
    })
    const pr3 = root.child(`user_family/${uid}/spouse_keys/vir/${pushKey}`).set(userObj.displayName)

    return Promise.all([pr1, pr2, pr3]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}