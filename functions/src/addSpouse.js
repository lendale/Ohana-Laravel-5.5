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
        loc: `/user_family/${uid}/wives/${pushKey}/`
    }

    if (userObj.photoUrl !== undefined) {
        treeObj.img = userObj.photoUrl
    }

    const pr1 = root.child(`user_tree_go/${clanId}/${uid}/ux`).push(pushKey)
    const pr2 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
        .then(() => {
            const vir = root.child(`user_tree_go/${clanId}/${pushKey}/vir`).push(uid)
            const ms = root.child(`user_tree_go/${clanId}/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

            return Promise.all([vir, ms]).catch(err => {
                console.log('Error code', err.code)
                console.log(err)
            })
        })
    const pr3 = root.child(`user_family/${uid}/spouse_keys/ux/${pushKey}`).set(userObj.displayName)
    const pr4 = root.child(`user_tree_go/${clanId}/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)
    const pr5 = index.createPotentialUser(event)

    return Promise.all([pr1, pr2, pr3, pr4, pr5]).catch(err => {
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
        loc: `/user_family/${uid}/husbands/${pushKey}/`
    }

    if (userObj.photoUrl !== undefined) {
        treeObj.img = userObj.photoUrl
    }

    const pr1 = root.child(`user_tree_go/${clanId}/${uid}/vir`).push(pushKey)
    const pr2 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
        .then(() => {
            const ux = root.child(`user_tree_go/${clanId}/${pushKey}/ux`).push(uid)
            const ms = root.child(`user_tree_go/${clanId}/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

            return Promise.all([ux, ms]).catch(err => {
                console.log('Error code', err.code)
                console.log(err)
            })
        })
    const pr3 = root.child(`user_family/${uid}/spouse_keys/vir/${pushKey}`).set(userObj.displayName)
    const pr4 = root.child(`user_tree_go/${clanId}/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)
    const pr5 = index.createPotentialUser(event)

    return Promise.all([pr1, pr2, pr3, pr4, pr5]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}