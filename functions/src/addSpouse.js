const admin = require('firebase-admin')
const index = require('../index')

exports.addWife = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()

    const pro1 = root.child(`users/${pushKey}`).once("value").then(snap => {
        if(snap.exists()) {
            const pr2 = root.child(`users/${uid}/ux/${pushKey}`).set(pushKey)
            const pr3 = root.child(`users/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)

            const vir = root.child(`users/${pushKey}/vir/${uid}`).set(uid)
            const ms = root.child(`users/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

            const pr4 = root.child(`users/${uid}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
            })
            const pr5 = root.child(`user_family/${uid}/wives/${pushKey}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
            })
            
            return Promise.all([pr2, pr3, vir, ms, pr4, pr5]).catch(err => {
                console.log('Error code', err.code)
                console.log(err)
            })
        } else {
            const pr1 = index.createUser(data, context)
            const pr2 = root.child(`users/${uid}/ux/${pushKey}`).set(pushKey)
            const pr3 = root.child(`users/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)

            const vir = root.child(`users/${pushKey}/vir/${uid}`).set(uid)
            const ms = root.child(`users/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

            const pr4 = root.child(`users/${uid}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
            })
            const pr5 = root.child(`user_family/${uid}/wives/${pushKey}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
            })
            
            return Promise.all([pr1, pr2, pr3, vir, ms, pr4, pr5]).catch(err => {
                console.log('Error code', err.code)
                console.log(err)
            })
        }
    })

    return Promise.all([pro1]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.addHusband = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()

    const pro1 = root.child(`users/${pushKey}`).once("value").then(snap => {
        if(snap.exists()) {
            const pr2 = root.child(`users/${uid}/vir/${pushKey}`).set(pushKey)
            const pr3 = root.child(`users/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)

            const ux = root.child(`users/${pushKey}/ux/${uid}`).set(uid)
            const ms = root.child(`users/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

            const pr4 = root.child(`users/${uid}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
            })
            const pr5 = root.child(`user_family/${uid}/husbands/${pushKey}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
            })
            
            return Promise.all([pr2, pr3, ux, ms, pr4, pr5]).catch(err => {
                console.log('Error code', err.code)
                console.log(err)
            })
        } else {
            index.createUser(data, context)
            root.child(`users/${uid}/vir/${pushKey}`).set(pushKey)
            root.child(`users/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)

            root.child(`users/${pushKey}/ux/${uid}`).set(uid)
            root.child(`users/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

            root.child(`users/${uid}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)

                root.child(`users/${snap2.val().m}`).once('value').then(snap3 => {
                    root.child(`immediate_family/${snap3.val().familyId}/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })

                root.child(`users/${snap2.val().f}`).once('value').then(snap3 => {
                    root.child(`immediate_family/${snap3.val().familyId}/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })

                root.child(`users/${uid}/siblings`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== pushKey) {
                            root.child(`users/${pushKey}/siblings/${snap3.val()}`).set(snap3.val())
                            root.child(`users/${snap3.val()}/siblings/${pushKey}`).set(pushKey)
    
                            root.child(`users/${snap3.val()}`).once("value").then(snap4 => {
                                root.child(`immediate_family/${snap4.val().familyId}/${pushKey}`).set(pushKey)
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                        }
                    })
                })
            })
            root.child(`user_family/${uid}/husbands/${pushKey}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
            })
        }
    })

    return Promise.all([pro1]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}