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
        loc: `/user_family/${uid}/mothers/${pushKey}/`
    }

    if (userObj.photoUrl !== undefined) {
        treeObj.img = userObj.photoUrl
    }

    if (userObj.birthDate !== undefined) {
        treeObj.bd = userObj.birthDate
    }


    const pr1 = root.child(`user_tree_go/${clanId}/${uid}/m`).set(pushKey);
    const pr2 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
    const pr3 = connectCurrentUserParents(uid, clanId, pushKey, 'mother')
    const pr4 = index.createPotentialUser(event)

    return Promise.all([pr1, pr2, pr3, pr4]).catch(err => {
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
        loc: `/user_family/${uid}/fathers/${pushKey}/`
    }

    if (userObj.photoUrl !== undefined) {
        treeObj.img = userObj.photoUrl
    }

    if (userObj.birthDate !== undefined) {
        treeObj.bd = userObj.birthDate
    }

    const pr1 = root.child(`user_tree_go/${clanId}/${uid}/f`).set(pushKey);
    const pr2 = root.child(`user_tree_go/${clanId}/${pushKey}`).set(treeObj)
    const pr3 = index.createPotentialUser(event)
    const pr4 = connectCurrentUserParents(uid, clanId, pushKey, 'father')

    return Promise.all([pr1, pr2, pr3, pr4]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

function connectCurrentUserParents(uid, clanId, key, parentType) {
    const userTreeRef = admin.database().ref().child('user_tree_go')
    const father = userTreeRef.child(`${clanId}/${uid}/f`)
    const mother = userTreeRef.child(`${clanId}/${uid}/m`)

    if (parentType === 'mother') {
        father.once('value').then(snapshot => {
            if (snapshot.exists()) {
                const pr1 = userTreeRef.child(`${clanId}/${key}/vir`).push(snapshot.val().f).then(() => {
                    return userTreeRef.child(`${clanId}/${key}/ms/${snapshot.val().f}`).set('married')
                })
                const pr2 = userTreeRef.child(`${clanId}/${snapshot.val()}/ux`).push(key).then(() => {
                    return userTreeRef.child(`${clanId}/${snapshot.val()}/ms/${key}`).set('married')
                })

                return Promise.all([pr1, pr2]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            } else {
                return
            }
        })
    } else if (parentType === 'father') {
        mother.once('value').then(snapshot => {
            if (snapshot.exists()) {
                const pr1 = userTreeRef.child(`${clanId}/${key}/ux`).push(snapshot.val().m).then(() => {
                    return userTreeRef.child(`${clanId}/${key}/ms/${snapshot.val().m}`).set('married')
                })
                const pr2 = userTreeRef.child(`${clanId}/${snapshot.val()}/vir`).push(key).then(() => {
                    return userTreeRef.child(`${clanId}/${snapshot.val()}/ms/${key}`).set('married')
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