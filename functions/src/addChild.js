const admin = require('firebase-admin')
const index = require('../index')

exports.addDaughter = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()

    const pro1 = root.child(`users/${pushKey}`).once("value")
        .then(snap => {
            if(snap.exists()) {
                if(userObj.m !== undefined && userObj.f !== undefined) {
                    const pr2 = root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                    const pr3 = root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                    const pr4 = root.child(`users/${pushKey}/m`).set(userObj.m)
                    const pr5 = root.child(`users/${pushKey}/f`).set(userObj.f)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap2 => {
                        snap2.forEach(snap3 => {
                            if(snap3.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap3', snap3.val())
                                root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                    console.log('snap4', snap4.val().key)
                                    if((snap4.val().f !== undefined && snap4.val().f === userObj.f) && 
                                    (snap4.val().m !== undefined && snap4.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap4.val().key}`).set(snap4.val().key);
                                        root.child(`users/${snap4.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })
                    const pr7 = root.child(`users/${uid}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
                    const pr8 = root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })

                    return Promise.all([pr2, pr3, pr4, pr5, pr6, pr7, pr8]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m !== undefined && userObj.f === undefined) {
                    const pr2 = root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                    const pr4 = root.child(`users/${pushKey}/m`).set(userObj.m)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap2 => {
                        snap2.forEach(snap3 => {
                            if(snap3.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap3', snap3.val())
                                root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                    console.log('snap4', snap4.val().key)
                                    if((snap4.val().f === undefined) && 
                                    (snap4.val().m !== undefined && snap4.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap4.val().key}`).set(snap4.val().key);
                                        root.child(`users/${snap4.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })
                    const pr7 = root.child(`users/${uid}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
                    const pr8 = root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })

                    return Promise.all([pr2, pr4, pr6, pr7, pr8]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m === undefined && userObj.f !== undefined) {
                    const pr3 = root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                    const pr5 = root.child(`users/${pushKey}/f`).set(userObj.f)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap2 => {
                        snap2.forEach(snap3 => {
                            if(snap3.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap3', snap3.val())
                                root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                    console.log('snap4', snap4.val().key)
                                    if((snap4.val().m === undefined) && 
                                    (snap4.val().f !== undefined && snap4.val().f === userObj.f)) {
                                        root.child(`users/${pushKey}/siblings/${snap4.val().key}`).set(snap4.val().key);
                                        root.child(`users/${snap4.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })
                    const pr7 = root.child(`users/${uid}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
                    const pr8 = root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })

                    return Promise.all([pr3, pr5, pr6, pr7, pr8]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                }
            } else {
                if(userObj.m !== undefined && userObj.f !== undefined) {
                    const pr1 = index.createUser(data, context)
                    const pr2 = root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                    const pr3 = root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                    const pr4 = root.child(`users/${pushKey}/m`).set(userObj.m)
                    const pr5 = root.child(`users/${pushKey}/f`).set(userObj.f)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap2 => {
                        snap2.forEach(snap3 => {
                            if(snap3.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap3', snap3.val())
                                root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                    console.log('snap4', snap4.val().key)
                                    if((snap4.val().f !== undefined && snap4.val().f === userObj.f) && 
                                    (snap4.val().m !== undefined && snap4.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap4.val().key}`).set(snap4.val().key);
                                        root.child(`users/${snap4.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })
                    const pr7 = root.child(`users/${uid}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
                    const pr8 = root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
            
                    return Promise.all([pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m !== undefined && userObj.f === undefined) {
                    const pr1 = index.createUser(data, context)
                    const pr2 = root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                    const pr4 = root.child(`users/${pushKey}/m`).set(userObj.m)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap2 => {
                        snap2.forEach(snap3 => {
                            if(snap3.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap3', snap3.val())
                                root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                    console.log('snap4', snap4.val().key)
                                    if((snap4.val().f === undefined) && 
                                    (snap4.val().m !== undefined && snap4.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap4.val().key}`).set(snap4.val().key);
                                        root.child(`users/${snap4.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })
                    const pr7 = root.child(`users/${uid}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
                    const pr8 = root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
            
                    return Promise.all([pr1, pr2, pr4, pr6, pr7, pr8]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m === undefined && userObj.f !== undefined) {
                    const pr1 = index.createUser(data, context)
                    const pr3 = root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                    const pr5 = root.child(`users/${pushKey}/f`).set(userObj.f)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap2 => {
                        snap2.forEach(snap3 => {
                            if(snap3.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap3', snap3.val())
                                root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                    console.log('snap4', snap4.val().key)
                                    if((snap4.val().m === undefined) && 
                                    (snap4.val().f !== undefined && snap4.val().f === userObj.f)) {
                                        root.child(`users/${pushKey}/siblings/${snap4.val().key}`).set(snap4.val().key);
                                        root.child(`users/${snap4.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })
                    const pr7 = root.child(`users/${uid}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
                    const pr8 = root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
            
                    return Promise.all([pr1, pr3, pr5, pr6, pr7, pr8]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                }
            }
        });

    return Promise.all([pro1]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.addSon = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()

    const pro1 = root.child(`users/${pushKey}`).once("value")
        .then(snap => {
            if(snap.exists()) {
                if(userObj.m !== undefined && userObj.f !== undefined) {
                    const pr2 = root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                    const pr3 = root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                    const pr4 = root.child(`users/${pushKey}/m`).set(userObj.m)
                    const pr5 = root.child(`users/${pushKey}/f`).set(userObj.f)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap2 => {
                        snap2.forEach(snap3 => {
                            if(snap3.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap3', snap3.val())
                                root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                    console.log('snap4', snap4.val().key)
                                    if((snap4.val().f !== undefined && snap4.val().f === userObj.f) && 
                                    (snap4.val().m !== undefined && snap4.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap4.val().key}`).set(snap4.val().key);
                                        root.child(`users/${snap4.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })
                    const pr7 = root.child(`users/${uid}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
                    const pr8 = root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })

                    return Promise.all([pr2, pr3, pr4, pr5, pr6, pr7, pr8]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m !== undefined && userObj.f === undefined) {
                    const pr2 = root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                    const pr4 = root.child(`users/${pushKey}/m`).set(userObj.m)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap2 => {
                        snap2.forEach(snap3 => {
                            if(snap3.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap3', snap3.val())
                                root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                    console.log('snap4', snap4.val().key)
                                    if((snap4.val().f === undefined) && 
                                    (snap4.val().m !== undefined && snap4.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap4.val().key}`).set(snap4.val().key);
                                        root.child(`users/${snap4.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })
                    const pr7 = root.child(`users/${uid}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
                    const pr8 = root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })

                    return Promise.all([pr2, pr4, pr6, pr7, pr8]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m === undefined && userObj.f !== undefined) {
                    const pr3 = root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                    const pr5 = root.child(`users/${pushKey}/f`).set(userObj.f)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap2 => {
                        snap2.forEach(snap3 => {
                            if(snap3.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap3', snap3.val())
                                root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                    console.log('snap4', snap4.val().key)
                                    if((snap4.val().m === undefined) && 
                                    (snap4.val().f !== undefined && snap4.val().f === userObj.f)) {
                                        root.child(`users/${pushKey}/siblings/${snap4.val().key}`).set(snap4.val().key);
                                        root.child(`users/${snap4.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })
                    const pr7 = root.child(`users/${uid}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
                    const pr8 = root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })

                    return Promise.all([pr3, pr5, pr6, pr7, pr8]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                }
            } else {
                if(userObj.m !== undefined && userObj.f !== undefined) {
                    const pr1 = index.createUser(data, context)
                    const pr2 = root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                    const pr3 = root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                    const pr4 = root.child(`users/${pushKey}/m`).set(userObj.m)
                    const pr5 = root.child(`users/${pushKey}/f`).set(userObj.f)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap2 => {
                        snap2.forEach(snap3 => {
                            if(snap3.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap3', snap3.val())
                                root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                    console.log('snap4', snap4.val().key)
                                    if((snap4.val().f !== undefined && snap4.val().f === userObj.f) && 
                                    (snap4.val().m !== undefined && snap4.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap4.val().key}`).set(snap4.val().key);
                                        root.child(`users/${snap4.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })
                    const pr7 = root.child(`users/${uid}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
                    const pr8 = root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
            
                    return Promise.all([pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m !== undefined && userObj.f === undefined) {
                    const pr1 = index.createUser(data, context)
                    const pr2 = root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                    const pr4 = root.child(`users/${pushKey}/m`).set(userObj.m)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap2 => {
                        snap2.forEach(snap3 => {
                            if(snap3.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap3', snap3.val())
                                root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                    console.log('snap4', snap4.val().key)
                                    if((snap4.val().f === undefined) && 
                                    (snap4.val().m !== undefined && snap4.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap4.val().key}`).set(snap4.val().key);
                                        root.child(`users/${snap4.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })
                    const pr7 = root.child(`users/${uid}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
                    const pr8 = root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
            
                    return Promise.all([pr1, pr2, pr4, pr6, pr7, pr8]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m === undefined && userObj.f !== undefined) {
                    const pr1 = index.createUser(data, context)
                    const pr3 = root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                    const pr5 = root.child(`users/${pushKey}/f`).set(userObj.f)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap2 => {
                        snap2.forEach(snap3 => {
                            if(snap3.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap3', snap3.val())
                                root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                    console.log('snap4', snap4.val().key)
                                    if((snap4.val().m === undefined) && 
                                    (snap4.val().f !== undefined && snap4.val().f === userObj.f)) {
                                        root.child(`users/${pushKey}/siblings/${snap4.val().key}`).set(snap4.val().key);
                                        root.child(`users/${snap4.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })
                    const pr7 = root.child(`users/${uid}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
                    const pr8 = root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap2 => {
                        root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                        root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                        root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
                        root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                    })
            
                    return Promise.all([pr1, pr3, pr5, pr6, pr7, pr8]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                }
            }
        });

    return Promise.all([pro1]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}