if(userObj.gender === "female") {
    console.log('sud 2 fem')

    const parent = root.child(`users/${userObj.m}/children`).once('value').then(snap => {
        snap.forEach(snap2 => {
            if(snap2.val() === userObj.oldKey) {
                root.child(`users/${userObj.m}/children/${userObj.oldKey}`).remove()
                root.child(`users/${userObj.m}/children/${userObj.key}`).set(userObj.key)
            }
        })
    })

    const parent2 = root.child(`users/${userObj.f}/children`).once('value').then(snap => {
        snap.forEach(snap2 => {
            if(snap2.val() === userObj.oldKey) {
                root.child(`users/${userObj.f}/children/${userObj.oldKey}`).remove()
                root.child(`users/${userObj.f}/children/${userObj.key}`).set(userObj.key)
            }
        })
    })

    const sibling = root.child(`users/${userObj.key}/siblings`).once('value').then(snap => {
        snap.forEach(snap2 => {
            if(snap2.val() !== userObj.oldKey) {
                root.child(`users/${snap2.val()}/siblings/${userObj.oldKey}`).remove()
                root.child(`users/${snap2.val()}/siblings/${userObj.key}`).set(userObj.key)
            }
        })
    })

    const spouse = root.child(`users/${userObj.key}/vir`).once('value').then(snap => {
        snap.forEach(snap2 => {
            root.child(`users/${snap2.val()}/ux/${userObj.oldKey}`).remove()
            root.child(`users/${snap2.val()}/ux/${userObj.key}`).set(userObj.key)
            root.child(`users/${snap2.val()}/ms/${userObj.oldKey}`).once('value').then(snap3 => {
                root.child(`users/${snap2.val()}/ms/${userObj.key}`).set(snap3.val())
                root.child(`users/${snap2.val()}/ms/${userObj.oldKey}`).remove()
            })
        })
    })

    
    
    const child = root.child(`users/${userObj.key}/children`).once('value').then(snap => {
        snap.forEach(snap2 => {
            root.child(`users/${snap2.val()}/m`).set(userObj.key)
        })
    })

    return Promise.all([parent, parent2, sibling, spouse, child]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}