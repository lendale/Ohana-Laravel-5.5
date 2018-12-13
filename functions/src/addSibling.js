const admin = require('firebase-admin')
const index = require('../index')

exports.addSister = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()
    var userMotherKey;
    var userFatherKey;

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: 'female',
        loc: `/user_family/${uid}/sisters/${pushKey}/`,
        bd: userObj.birthDate
    }

    if (userObj.photoURL !== undefined) {
        treeObj.img = userObj.photoURL
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
    const pr4 = root.child(`user_tree_go/${clanId}/${uid}`).once('value').then(snap => {
        const mother = root.child(`user_tree_go/${clanId}/${pushKey}/m`).set(snap.val().m);
        const father = root.child(`user_tree_go/${clanId}/${pushKey}/f`).set(snap.val().f);

        return Promise.all([mother, father]).catch(err => {
            console.log('Error code', err.code)
            console.log(err)
        })
    })

    return Promise.all([pr1, pr2, pr3, pr4]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.addBrother = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()
    let clanId = userObj.clanId
    let treeObj = new Object()
    var userMotherKey;
    var userFatherKey;

    treeObj = {
        key: pushKey,
        n: userObj.displayName,
        s: 'male',
        loc: `/user_family/${uid}/brothers/${pushKey}/`,
        bd: userObj.birthDate
    }

    if (userObj.photoURL !== undefined) {
        treeObj.img = userObj.photoURL
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
    const pr4 = root.child(`user_tree_go/${clanId}/${uid}`).once('value').then(snap => {
        const mother = root.child(`user_tree_go/${clanId}/${pushKey}/m`).set(snap.val().m);
        const father = root.child(`user_tree_go/${clanId}/${pushKey}/f`).set(snap.val().f);

        return Promise.all([mother, father]).catch(err => {
            console.log('Error code', err.code)
            console.log(err)
        })
    })

    return Promise.all([pr1, pr2, pr3, pr4]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}