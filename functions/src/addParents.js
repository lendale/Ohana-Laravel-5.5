const admin = require('firebase-admin')
const index = require('../index')

exports.addMother = function(event) {
    const root = event.data.ref.root
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: 'female',
        loc: `/user_family/${uid}/mothers/`
    }

    if (userObj.photoUrl !== undefined) {
        treeObj.img = userObj.photoUrl
    }

    if (userObj.birthDate !== undefined) {
        treeObj.bd = userObj.birthDate
    }

    return root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
        .then(() => {
            return root.child(`user_tree_go/${clanId}/${uid}`).update({ m: pushKey })
        })
        .then(() => {
            connectCurrentUserParents(uid, clanId, pushKey, "mother")
        })
        .then(() => {
            index.createPotentialUser(event)
        })
        .catch(err => {
            console.log('Error code', err.code)
            console.log(err)
        })
}

exports.addFather = function(event) {
    const root = event.data.ref.root
    let uid = event.params.uid
    let pushKey = event.params.pushKey
    let userObj = event.data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: 'male',
        loc: `/user_family/${uid}/fathers/`
    }

    if (userObj.photoUrl !== undefined) {
        treeObj.img = userObj.photoUrl
    }

    if (userObj.birthDate !== undefined) {
        treeObj.bd = userObj.birthDate
    }

    return root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
        .then(() => {
            return root.child(`user_tree_go/${clanId}/${uid}`).update({ f: pushKey })
        })
        .then(() => {
            index.createPotentialUser(event);
        })
        .then(() => {
            connectCurrentUserParents(uid, clanId, pushKey, "father")
        })
        .catch(err => {
            console.log('Error code', err.code)
            console.log(err)
        })
}

function connectCurrentUserParents(uid, clanId, key, parentType) {
    const userTreeRef = admin.database().ref().child('user_tree_go')
    const parent = userTreeRef.child(`${clanId}/${uid}`).once("value")

    if (parentType === "mother") {
        parent.then(snapshot => {
            if (!(snapshot.val().f === null || snapshot.val().f === undefined)) {
                const pr1 = userTreeRef.child(`${clanId}/${key}/vir`).push(snapshot.val().f).then(() => {
                    userTreeRef.child(`${clanId}/${key}/ms/${snapshot.val().f}`).set('married')
                })
                const pr2 = userTreeRef.child(`${clanId}/${snapshot.val().f}/ux`).push(key).then(() => {
                    userTreeRef.child(`${clanId}/${snapshot.val().f}/ms/${key}`).set('married')
                })

                return Promise.all([pr1, pr2]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            } else {
                return
            }
        })
    } else if (parentType === "father") {
        parent.then(snapshot => {
            if (!(snapshot.val().m === null || snapshot.val().m === undefined)) {
                const pr1 = userTreeRef.child(`${clanId}/${key}/ux`).push(snapshot.val().m).then(() => {
                    userTreeRef.child(`${clanId}/${key}/ms/${snapshot.val().m}`).set('married')
                })
                const pr2 = userTreeRef.child(`${clanId}/${snapshot.val().m}/vir`).push(key).then(() => {
                    userTreeRef.child(`${clanId}/${snapshot.val().m}/ms/${key}`).set('married')
                })

                return Promise.all([pr1, pr2]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            } else {
                return
            }
        })
    }
}