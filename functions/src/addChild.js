const admin = require('firebase-admin')
const index = require('../index')

exports.addDaughter = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()

    const db = admin.database()
    const usersRef = db.ref().child('users')

    const pro1 = usersRef.child(pushKey).once("value")
        .then(snap => {
            if(snap.exists()) {
                if(userObj.m !== undefined && userObj.f !== undefined) {
                    const pr2 = root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                    const pr3 = root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                    const pr4 = root.child(`users/${pushKey}/m`).set(userObj.m)
                    const pr5 = root.child(`users/${pushKey}/f`).set(userObj.f)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap => {
                        snap.forEach(snap2 => {
                            if(snap2.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap2', snap2.val())
                                root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                                    console.log('snap3', snap3.val().key)
                                    if((snap3.val().f !== undefined && snap3.val().f === userObj.f) && 
                                    (snap3.val().m !== undefined && snap3.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap3.val().key}`).set(snap3.val().key);
                                        root.child(`users/${snap3.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })

                    return Promise.all([pr2, pr3, pr4, pr5, pr6]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m !== undefined && userObj.f === undefined) {
                    const pr2 = root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                    const pr4 = root.child(`users/${pushKey}/m`).set(userObj.m)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap => {
                        snap.forEach(snap2 => {
                            if(snap2.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap2', snap2.val())
                                root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                                    console.log('snap3', snap3.val().key)
                                    if((snap3.val().f === undefined) && 
                                    (snap3.val().m !== undefined && snap3.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap3.val().key}`).set(snap3.val().key);
                                        root.child(`users/${snap3.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })

                    return Promise.all([pr2, pr4, pr6]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m === undefined && userObj.f !== undefined) {
                    const pr3 = root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                    const pr5 = root.child(`users/${pushKey}/f`).set(userObj.f)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap => {
                        snap.forEach(snap2 => {
                            if(snap2.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap2', snap2.val())
                                root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                                    console.log('snap3', snap3.val().key)
                                    if((snap3.val().m === undefined) && 
                                    (snap3.val().f !== undefined && snap3.val().f === userObj.f)) {
                                        root.child(`users/${pushKey}/siblings/${snap3.val().key}`).set(snap3.val().key);
                                        root.child(`users/${snap3.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })

                    return Promise.all([pr3, pr5, pr6]).catch(err => {
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
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap => {
                        snap.forEach(snap2 => {
                            if(snap2.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap2', snap2.val())
                                root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                                    console.log('snap3', snap3.val().key)
                                    if((snap3.val().f !== undefined && snap3.val().f === userObj.f) && 
                                    (snap3.val().m !== undefined && snap3.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap3.val().key}`).set(snap3.val().key);
                                        root.child(`users/${snap3.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })

                    return Promise.all([pr1, pr2, pr3, pr4, pr5, pr6]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m !== undefined && userObj.f === undefined) {
                    const pr1 = index.createUser(data, context)
                    const pr2 = root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                    const pr4 = root.child(`users/${pushKey}/m`).set(userObj.m)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap => {
                        snap.forEach(snap2 => {
                            if(snap2.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap2', snap2.val())
                                root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                                    console.log('snap3', snap3.val().key)
                                    if((snap3.val().f === undefined) && 
                                    (snap3.val().m !== undefined && snap3.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap3.val().key}`).set(snap3.val().key);
                                        root.child(`users/${snap3.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })

                    return Promise.all([pr1, pr2, pr4, pr6]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m === undefined && userObj.f !== undefined) {
                    const pr1 = index.createUser(data, context)
                    const pr3 = root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                    const pr5 = root.child(`users/${pushKey}/f`).set(userObj.f)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap => {
                        snap.forEach(snap2 => {
                            if(snap2.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap2', snap2.val())
                                root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                                    console.log('snap3', snap3.val().key)
                                    if((snap3.val().m === undefined) && 
                                    (snap3.val().f !== undefined && snap3.val().f === userObj.f)) {
                                        root.child(`users/${pushKey}/siblings/${snap3.val().key}`).set(snap3.val().key);
                                        root.child(`users/${snap3.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })

                    return Promise.all([pr1, pr3, pr5, pr6]).catch(err => {
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

    const db = admin.database()
    const usersRef = db.ref().child('users')

    const pro1 = usersRef.child(pushKey).once("value")
        .then(snap => {
            if(snap.exists()) {
                if(userObj.m !== undefined && userObj.f !== undefined) {
                    const pr2 = root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                    const pr3 = root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                    const pr4 = root.child(`users/${pushKey}/m`).set(userObj.m)
                    const pr5 = root.child(`users/${pushKey}/f`).set(userObj.f)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap => {
                        snap.forEach(snap2 => {
                            if(snap2.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap2', snap2.val())
                                root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                                    console.log('snap3', snap3.val().key)
                                    if((snap3.val().f !== undefined && snap3.val().f === userObj.f) && 
                                    (snap3.val().m !== undefined && snap3.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap3.val().key}`).set(snap3.val().key);
                                        root.child(`users/${snap3.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })

                    return Promise.all([pr2, pr3, pr4, pr5, pr6]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m !== undefined && userObj.f === undefined) {
                    const pr2 = root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                    const pr4 = root.child(`users/${pushKey}/m`).set(userObj.m)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap => {
                        snap.forEach(snap2 => {
                            if(snap2.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap2', snap2.val())
                                root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                                    console.log('snap3', snap3.val().key)
                                    if((snap3.val().f === undefined) && 
                                    (snap3.val().m !== undefined && snap3.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap3.val().key}`).set(snap3.val().key);
                                        root.child(`users/${snap3.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })

                    return Promise.all([pr2, pr4, pr6]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m === undefined && userObj.f !== undefined) {
                    const pr3 = root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                    const pr5 = root.child(`users/${pushKey}/f`).set(userObj.f)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap => {
                        snap.forEach(snap2 => {
                            if(snap2.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap2', snap2.val())
                                root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                                    console.log('snap3', snap3.val().key)
                                    if((snap3.val().m === undefined) && 
                                    (snap3.val().f !== undefined && snap3.val().f === userObj.f)) {
                                        root.child(`users/${pushKey}/siblings/${snap3.val().key}`).set(snap3.val().key);
                                        root.child(`users/${snap3.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })

                    return Promise.all([pr3, pr5, pr6]).catch(err => {
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
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap => {
                        snap.forEach(snap2 => {
                            if(snap2.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap2', snap2.val())
                                root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                                    console.log('snap3', snap3.val().key)
                                    if((snap3.val().f !== undefined && snap3.val().f === userObj.f) && 
                                    (snap3.val().m !== undefined && snap3.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap3.val().key}`).set(snap3.val().key);
                                        root.child(`users/${snap3.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })

                    return Promise.all([pr1, pr2, pr3, pr4, pr5, pr6]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m !== undefined && userObj.f === undefined) {
                    const pr1 = index.createUser(data, context)
                    const pr2 = root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                    const pr4 = root.child(`users/${pushKey}/m`).set(userObj.m)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap => {
                        snap.forEach(snap2 => {
                            if(snap2.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap2', snap2.val())
                                root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                                    console.log('snap3', snap3.val().key)
                                    if((snap3.val().f === undefined) && 
                                    (snap3.val().m !== undefined && snap3.val().m === userObj.m)) {
                                        root.child(`users/${pushKey}/siblings/${snap3.val().key}`).set(snap3.val().key);
                                        root.child(`users/${snap3.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })

                    return Promise.all([pr1, pr2, pr4, pr6]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                } else if(userObj.m === undefined && userObj.f !== undefined) {
                    const pr1 = index.createUser(data, context)
                    const pr3 = root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                    const pr5 = root.child(`users/${pushKey}/f`).set(userObj.f)
                    const pr6 = root.child(`users/${uid}/children`).once('value').then(snap => {
                        snap.forEach(snap2 => {
                            if(snap2.val() !== pushKey) {
                                console.log('children compare - not same')
                                console.log('pushKey', pushKey)
                                console.log('snap2', snap2.val())
                                root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                                    console.log('snap3', snap3.val().key)
                                    if((snap3.val().m === undefined) && 
                                    (snap3.val().f !== undefined && snap3.val().f === userObj.f)) {
                                        root.child(`users/${pushKey}/siblings/${snap3.val().key}`).set(snap3.val().key);
                                        root.child(`users/${snap3.val().key}/siblings/${pushKey}`).set(pushKey);
                                    } else console.log('parents - not same')
                                })
                            }
                        })
                    })

                    return Promise.all([pr1, pr3, pr5, pr6]).catch(err => {
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