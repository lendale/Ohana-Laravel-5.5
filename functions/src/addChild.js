const admin = require('firebase-admin')
const index = require('../index')

exports.addDaughter = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()

    const pro1 = root.child(`users/${pushKey}`).once("value").then(snap => {
        if(snap.exists()) {
            if(userObj.m !== undefined) {
                root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                root.child(`users/${pushKey}/m`).set(userObj.m)

                root.child(`users/${userObj.m}/children`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== pushKey) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                var siblingType;
                                if(snap4.val().gender === "female") siblingType = "sister";
                                else siblingType = "brother";

                                if(snap4.val().f === userObj.f && snap4.val().m === userObj.m) {
                                    root.child(`users/${pushKey}/siblings/${snap3.val()}`).set(snap3.val());
                                    root.child(`users/${snap3.val()}/siblings/${pushKey}`).set(pushKey);

                                    root.child(`immediate_family/${snap4.val().familyId}/sister/${pushKey}`).set(pushKey)
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)

                                    root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`immediate_family/${snap4.val().familyId}/${siblingType}/${snap3.val()}`).set(snap3.val())
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                } else {
                                    console.log('parents - not same')
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)

                                    root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                }
                            })
                        }
                    })
                })

                root.child(`users/${userObj.m}`).once('value').then(snap2 => {                
                    root.child(`immediate_family/${snap2.val().familyId}/daughter/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
    
                    root.child(`users/${snap2.val().m}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`users/${snap2.val().f}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap3 => {
                        root.child(`immediate_family/${snap3.val().familyId}/mother`).set(userObj.m)
    
                        root.child(`extended_family/${snap3.val().extendedId}/${userObj.m}`).set(userObj.m)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().m}`).set(snap2.val().m)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().f}`).set(snap2.val().f)
                    })
                })         
                
                root.child(`users/${userObj.m}/siblings`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                        })
                        root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                        })
                    })
                })

                root.child(`users/${userObj.m}/ux`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.m) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })

                root.child(`users/${userObj.m}/vir`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.f) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })
            }

            if(userObj.f !== undefined) {
                root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                root.child(`users/${pushKey}/f`).set(userObj.f)
                
                root.child(`users/${userObj.f}/children`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== pushKey) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                var siblingType;
                                if(snap4.val().gender === "female") siblingType = "sister";
                                else siblingType = "brother";

                                if(snap4.val().f === userObj.f && snap4.val().m === userObj.m) {
                                    root.child(`users/${pushKey}/siblings/${snap3.val()}`).set(snap3.val());
                                    root.child(`users/${snap3.val()}/siblings/${pushKey}`).set(pushKey);

                                    root.child(`immediate_family/${snap4.val().familyId}/sister/${pushKey}`).set(pushKey)
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)

                                    root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`immediate_family/${snap4.val().familyId}/${siblingType}/${snap3.val()}`).set(snap3.val())
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                } else {
                                    console.log('parents - not same')
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)

                                    root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                }
                            })
                        }
                    })
                })
                
                root.child(`users/${userObj.f}`).once('value').then(snap2 => {                
                    root.child(`immediate_family/${snap2.val().familyId}/daughter/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
    
                    root.child(`users/${snap2.val().m}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`users/${snap2.val().f}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap3 => {
                        root.child(`immediate_family/${snap3.val().familyId}/father`).set(userObj.f)
    
                        root.child(`extended_family/${snap3.val().extendedId}/${userObj.f}`).set(userObj.f)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().m}`).set(snap2.val().m)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().f}`).set(snap2.val().f)
                    })
                })

                root.child(`users/${userObj.f}/siblings`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                        })
                        root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                        })
                    })
                })

                root.child(`users/${userObj.f}/ux`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.m) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })

                root.child(`users/${userObj.f}/vir`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.f) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })
            }
        } else {
            index.createUser(data, context)

            if(userObj.m !== undefined) {
                root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                root.child(`users/${pushKey}/m`).set(userObj.m)

                root.child(`users/${userObj.m}/children`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== pushKey) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                var siblingType;
                                if(snap4.val().gender === "female") siblingType = "sister";
                                else siblingType = "brother";

                                if(snap4.val().f === userObj.f && snap4.val().m === userObj.m) {
                                    root.child(`users/${pushKey}/siblings/${snap3.val()}`).set(snap3.val());
                                    root.child(`users/${snap3.val()}/siblings/${pushKey}`).set(pushKey);

                                    root.child(`immediate_family/${snap4.val().familyId}/sister/${pushKey}`).set(pushKey)
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)

                                    root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`immediate_family/${snap4.val().familyId}/${siblingType}/${snap3.val()}`).set(snap3.val())
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                } else {
                                    console.log('parents - not same')
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)

                                    root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                }
                            })
                        }
                    })
                })

                root.child(`users/${userObj.m}`).once('value').then(snap2 => {                
                    root.child(`immediate_family/${snap2.val().familyId}/daughter/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
    
                    root.child(`users/${snap2.val().m}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`users/${snap2.val().f}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap3 => {
                        root.child(`immediate_family/${snap3.val().familyId}/mother`).set(userObj.m)
    
                        root.child(`extended_family/${snap3.val().extendedId}/${userObj.m}`).set(userObj.m)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().m}`).set(snap2.val().m)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().f}`).set(snap2.val().f)
                    })
                })         
                
                root.child(`users/${userObj.m}/siblings`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                        })
                        root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                        })
                    })
                })

                root.child(`users/${userObj.m}/ux`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.m) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })

                root.child(`users/${userObj.m}/vir`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.f) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })
            }

            if(userObj.f !== undefined) {
                root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                root.child(`users/${pushKey}/f`).set(userObj.f)
                
                root.child(`users/${userObj.f}/children`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== pushKey) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                var siblingType;
                                if(snap4.val().gender === "female") siblingType = "sister";
                                else siblingType = "brother";

                                if(snap4.val().f === userObj.f && snap4.val().m === userObj.m) {
                                    root.child(`users/${pushKey}/siblings/${snap3.val()}`).set(snap3.val());
                                    root.child(`users/${snap3.val()}/siblings/${pushKey}`).set(pushKey);

                                    root.child(`immediate_family/${snap4.val().familyId}/sister/${pushKey}`).set(pushKey)
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)

                                    root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`immediate_family/${snap4.val().familyId}/${siblingType}/${snap3.val()}`).set(snap3.val())
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                } else {
                                    console.log('parents - not same')
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)

                                    root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                }
                            })
                        }
                    })
                })
                
                root.child(`users/${userObj.f}`).once('value').then(snap2 => {                
                    root.child(`immediate_family/${snap2.val().familyId}/daughter/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
    
                    root.child(`users/${snap2.val().m}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`users/${snap2.val().f}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap3 => {
                        root.child(`immediate_family/${snap3.val().familyId}/father`).set(userObj.f)
    
                        root.child(`extended_family/${snap3.val().extendedId}/${userObj.f}`).set(userObj.f)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().m}`).set(snap2.val().m)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().f}`).set(snap2.val().f)
                    })
                })

                root.child(`users/${userObj.f}/siblings`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                        })
                        root.child(`user_family/${uid}/daughters/${pushKey}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                        })
                    })
                })

                root.child(`users/${userObj.f}/ux`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.m) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })

                root.child(`users/${userObj.f}/vir`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.f) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })
            }
        }
    })

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

    const pro1 = root.child(`users/${pushKey}`).once("value").then(snap => {
        if(snap.exists()) {
            if(userObj.m !== undefined) {
                root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                root.child(`users/${pushKey}/m`).set(userObj.m)

                root.child(`users/${userObj.m}/children`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== pushKey) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                var siblingType;
                                if(snap4.val().gender === "female") siblingType = "sister";
                                else siblingType = "brother";
    
                                if(snap4.val().f === userObj.f && snap4.val().m === userObj.m) {
                                    root.child(`users/${pushKey}/siblings/${snap3.val()}`).set(snap3.val());
                                    root.child(`users/${snap3.val()}/siblings/${pushKey}`).set(pushKey);
    
                                    root.child(`immediate_family/${snap4.val().familyId}/brother/${pushKey}`).set(pushKey)
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
    
                                    root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`immediate_family/${snap4.val().familyId}/${siblingType}/${snap3.val()}`).set(snap3.val())
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                } else {
                                    console.log('parents - not same')
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
    
                                    root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                }
                            })
                        }
                    })
                })

                root.child(`users/${userObj.m}`).once('value').then(snap2 => {                
                    root.child(`immediate_family/${snap2.val().familyId}/son/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
    
                    root.child(`users/${snap2.val().m}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`users/${snap2.val().f}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap3 => {
                        root.child(`immediate_family/${snap3.val().familyId}/mother`).set(userObj.m)
    
                        root.child(`extended_family/${snap3.val().extendedId}/${userObj.m}`).set(userObj.m)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().m}`).set(snap2.val().m)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().f}`).set(snap2.val().f)
                    })
                })

                root.child(`users/${userObj.m}/siblings`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                        })
                        root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                        })
                    })
                })

                root.child(`users/${uid}/ux`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.m) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })

                root.child(`users/${uid}/vir`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.f) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })
            }

            if(userObj.f !== undefined) {
                root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                root.child(`users/${pushKey}/f`).set(userObj.f)

                root.child(`users/${userObj.f}/children`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== pushKey) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                var siblingType;
                                if(snap4.val().gender === "female") siblingType = "sister";
                                else siblingType = "brother";
    
                                if(snap4.val().f === userObj.f && snap4.val().m === userObj.m) {
                                    root.child(`users/${pushKey}/siblings/${snap3.val()}`).set(snap3.val());
                                    root.child(`users/${snap3.val()}/siblings/${pushKey}`).set(pushKey);
    
                                    root.child(`immediate_family/${snap4.val().familyId}/brother/${pushKey}`).set(pushKey)
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
    
                                    root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`immediate_family/${snap4.val().familyId}/${siblingType}/${snap3.val()}`).set(snap3.val())
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                } else {
                                    console.log('parents - not same')
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
    
                                    root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                }
                            })
                        }
                    })
                })
                
                root.child(`users/${userObj.f}`).once('value').then(snap2 => {                
                    root.child(`immediate_family/${snap2.val().familyId}/son/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
    
                    root.child(`users/${snap2.val().m}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`users/${snap2.val().f}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap3 => {
                        root.child(`immediate_family/${snap3.val().familyId}/father`).set(userObj.f)
    
                        root.child(`extended_family/${snap3.val().extendedId}/${userObj.f}`).set(userObj.f)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().m}`).set(snap2.val().m)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().f}`).set(snap2.val().f)
                    })
                })
    
                root.child(`users/${userObj.f}/siblings`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                        })
                        root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                        })
                    })
                })
    
                root.child(`users/${uid}/ux`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.m) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })

                root.child(`users/${uid}/vir`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.f) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })
            }
        } else {
            index.createUser(data, context)

            if(userObj.m !== undefined) {
                root.child(`users/${userObj.m}/children/${pushKey}`).set(pushKey)
                root.child(`users/${pushKey}/m`).set(userObj.m)

                root.child(`users/${userObj.m}/children`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== pushKey) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                var siblingType;
                                if(snap4.val().gender === "female") siblingType = "sister";
                                else siblingType = "brother";
    
                                if(snap4.val().f === userObj.f && snap4.val().m === userObj.m) {
                                    root.child(`users/${pushKey}/siblings/${snap3.val()}`).set(snap3.val());
                                    root.child(`users/${snap3.val()}/siblings/${pushKey}`).set(pushKey);
    
                                    root.child(`immediate_family/${snap4.val().familyId}/brother/${pushKey}`).set(pushKey)
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
    
                                    root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`immediate_family/${snap4.val().familyId}/${siblingType}/${snap3.val()}`).set(snap3.val())
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                } else {
                                    console.log('parents - not same')
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
    
                                    root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                }
                            })
                        }
                    })
                })

                root.child(`users/${userObj.m}`).once('value').then(snap2 => {                
                    root.child(`immediate_family/${snap2.val().familyId}/son/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
    
                    root.child(`users/${snap2.val().m}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`users/${snap2.val().f}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap3 => {
                        root.child(`immediate_family/${snap3.val().familyId}/mother`).set(userObj.m)
    
                        root.child(`extended_family/${snap3.val().extendedId}/${userObj.m}`).set(userObj.m)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().m}`).set(snap2.val().m)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().f}`).set(snap2.val().f)
                    })
                })

                root.child(`users/${userObj.m}/siblings`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                        })
                        root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                        })
                    })
                })

                root.child(`users/${uid}/ux`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.m) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })

                root.child(`users/${uid}/vir`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.f) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })
            }

            if(userObj.f !== undefined) {
                root.child(`users/${userObj.f}/children/${pushKey}`).set(pushKey)
                root.child(`users/${pushKey}/f`).set(userObj.f)

                root.child(`users/${userObj.f}/children`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== pushKey) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                var siblingType;
                                if(snap4.val().gender === "female") siblingType = "sister";
                                else siblingType = "brother";
    
                                if(snap4.val().f === userObj.f && snap4.val().m === userObj.m) {
                                    root.child(`users/${pushKey}/siblings/${snap3.val()}`).set(snap3.val());
                                    root.child(`users/${snap3.val()}/siblings/${pushKey}`).set(pushKey);
    
                                    root.child(`immediate_family/${snap4.val().familyId}/brother/${pushKey}`).set(pushKey)
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
    
                                    root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`immediate_family/${snap4.val().familyId}/${siblingType}/${snap3.val()}`).set(snap3.val())
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                } else {
                                    console.log('parents - not same')
                                    root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
    
                                    root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap4 => {
                                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                                    })
                                }
                            })
                        }
                    })
                })
                
                root.child(`users/${userObj.f}`).once('value').then(snap2 => {                
                    root.child(`immediate_family/${snap2.val().familyId}/son/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
    
                    root.child(`users/${snap2.val().m}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`users/${snap2.val().f}`).once('value').then(snap3 => {
                        root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                    })
    
                    root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap3 => {
                        root.child(`immediate_family/${snap3.val().familyId}/father`).set(userObj.f)
    
                        root.child(`extended_family/${snap3.val().extendedId}/${userObj.f}`).set(userObj.f)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().m}`).set(snap2.val().m)
                        root.child(`extended_family/${snap3.val().extendedId}/${snap2.val().f}`).set(snap2.val().f)
                    })
                })
    
                root.child(`users/${userObj.f}/siblings`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                        })
                        root.child(`user_family/${uid}/sons/${pushKey}`).once('value').then(snap4 => {
                            root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                        })
                    })
                })
    
                root.child(`users/${uid}/ux`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.m) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })

                root.child(`users/${uid}/vir`).once('value').then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(snap3.val() !== userObj.f) {
                            root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                            })
                            root.child(`user_family/${uid}/fathers/${pushKey}`).once('value').then(snap4 => {
                                root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                            }) 
                        }
                    })
                })
            }
        }
    })

    return Promise.all([pro1]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}