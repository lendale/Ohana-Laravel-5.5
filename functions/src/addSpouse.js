const admin = require('firebase-admin')
const index = require('../index')

exports.addWife = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()

    const pro1 = root.child(`users/${pushKey}`).once("value").then(snap => {
        if(snap.exists()) {
            root.child(`users/${uid}/ux/${pushKey}`).set(pushKey)
            root.child(`users/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)

            root.child(`users/${pushKey}/vir/${uid}`).set(uid)
            root.child(`users/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

            root.child(`users/${uid}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/wife/${pushKey}`).set(pushKey)
                root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)

                root.child(`users/${snap2.val().m}`).once('value').then(snap3 => {
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })

                root.child(`users/${snap2.val().f}`).once('value').then(snap3 => {
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })

                root.child(`user_family/${uid}/wives/${pushKey}`).once('value').then(snap3 => {
                    root.child(`immediate_family/${snap3.val().familyId}/husband/${uid}`).set(uid)

                    root.child(`extended_family/${snap3.val().extendedId}/${uid}`).set(uid)
                    root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().m}`).set(snap2.val().m)
                    root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().f}`).set(snap2.val().f)
                })
            })

            root.child(`users/${uid}/siblings`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once("value").then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })

                    root.child(`user_family/${uid}/wives/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    })
                })
            })

            root.child(`users/${uid}/children`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once("value").then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })

                    root.child(`user_family/${uid}/wives/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    })
                })
            })
        } else {
            index.createUser(data, context)

            root.child(`users/${uid}/ux/${pushKey}`).set(pushKey)
            root.child(`users/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)

            root.child(`users/${pushKey}/vir/${uid}`).set(uid)
            root.child(`users/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

            root.child(`users/${uid}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/wife/${pushKey}`).set(pushKey)
                root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)

                root.child(`users/${snap2.val().m}`).once('value').then(snap3 => {
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })

                root.child(`users/${snap2.val().f}`).once('value').then(snap3 => {
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })

                root.child(`user_family/${uid}/wives/${pushKey}`).once('value').then(snap3 => {
                    root.child(`immediate_family/${snap3.val().familyId}/husband/${uid}`).set(uid)

                    root.child(`extended_family/${snap3.val().extendedId}/${uid}`).set(uid)
                    root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().m}`).set(snap2.val().m)
                    root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().f}`).set(snap2.val().f)
                })
            })

            root.child(`users/${uid}/siblings`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once("value").then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })

                    root.child(`user_family/${uid}/wives/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    })
                })
            })

            root.child(`users/${uid}/children`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once("value").then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })

                    root.child(`user_family/${uid}/wives/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    })
                })
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
            root.child(`users/${uid}/vir/${pushKey}`).set(pushKey)
            root.child(`users/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)

            root.child(`users/${pushKey}/ux/${uid}`).set(uid)
            root.child(`users/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

            root.child(`users/${uid}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/husband/${pushKey}`).set(pushKey)
                root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)

                root.child(`users/${snap2.val().m}`).once('value').then(snap3 => {
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })

                root.child(`users/${snap2.val().f}`).once('value').then(snap3 => {
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })

                root.child(`user_family/${uid}/husbands/${pushKey}`).once('value').then(snap3 => {
                    root.child(`immediate_family/${snap3.val().familyId}/wife/${uid}`).set(uid)

                    root.child(`extended_family/${snap3.val().extendedId}/${uid}`).set(uid)
                    root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().m}`).set(snap2.val().m)
                    root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().f}`).set(snap2.val().f)
                })
            })

            root.child(`users/${uid}/siblings`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once("value").then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })

                    root.child(`user_family/${uid}/husbands/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    })
                })
            })

            root.child(`users/${uid}/children`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once("value").then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })

                    root.child(`user_family/${uid}/husbands/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    })
                })
            })
        } else {
            index.createUser(data, context)

            root.child(`users/${uid}/vir/${pushKey}`).set(pushKey)
            root.child(`users/${uid}/ms/${pushKey}`).set(userObj.maritalStatus)

            root.child(`users/${pushKey}/ux/${uid}`).set(uid)
            root.child(`users/${pushKey}/ms/${uid}`).set(userObj.maritalStatus)

            root.child(`users/${uid}`).once('value').then(snap2 => {
                root.child(`immediate_family/${snap2.val().familyId}/husband/${pushKey}`).set(pushKey)
                root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)

                root.child(`users/${snap2.val().m}`).once('value').then(snap3 => {
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })

                root.child(`users/${snap2.val().f}`).once('value').then(snap3 => {
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })

                root.child(`user_family/${uid}/husbands/${pushKey}`).once('value').then(snap3 => {
                    root.child(`immediate_family/${snap3.val().familyId}/wife/${uid}`).set(uid)

                    root.child(`extended_family/${snap3.val().extendedId}/${uid}`).set(uid)
                    root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().m}`).set(snap2.val().m)
                    root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().f}`).set(snap2.val().f)
                })
            })

            root.child(`users/${uid}/siblings`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once("value").then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })

                    root.child(`user_family/${uid}/husbands/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    })
                })
            })

            root.child(`users/${uid}/children`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once("value").then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })

                    root.child(`user_family/${uid}/husbands/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    })
                })
            })
        }
    })

    return Promise.all([pro1]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}