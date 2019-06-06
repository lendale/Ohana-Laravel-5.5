const admin = require('firebase-admin')
const index = require('../index')

exports.addSister = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    var mother;
    var father;

    const pro1 = root.child(`users/${pushKey}`).once("value").then(snap => {
        if(snap.exists()) {
            root.child(`users/${uid}/siblings/${pushKey}`).set(pushKey)
            root.child(`users/${pushKey}/siblings/${uid}`).set(uid)

            root.child(`users/${uid}/siblings`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    if(snap3.val() !== pushKey) {
                        root.child(`users/${pushKey}/siblings/${snap3.val()}`).set(snap3.val())
                        root.child(`users/${snap3.val()}/siblings/${pushKey}`).set(pushKey)

                        root.child(`users/${snap3.val()}`).once("value").then(snap4 => {
                            root.child(`immediate_family/${snap4.val().familyId}/${pushKey}`).set(pushKey)
                            root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                        })

                        root.child(`user_family/${uid}/sisters/${pushKey}`).once('value').then(snap4 => {
                            root.child(`immediate_family/${snap4.val().familyId}/${snap3.val()}`).set(snap3.val())
                            root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                        })
                    }
                })
            })

            root.child(`users/${uid}`).once('value').then(snap2 => {
                mother = snap2.val().m;
                father = snap2.val().f;

                root.child(`users/${pushKey}/m`).set(mother)
                root.child(`users/${pushKey}/f`).set(father)

                root.child(`users/${mother}/children/${pushKey}`).set(pushKey)
                root.child(`users/${father}/children/${pushKey}`).set(pushKey)

                root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)

                root.child(`users/${mother}`).once('value').then(snap3 => {
                    root.child(`immediate_family/${snap3.val().familyId}/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })

                root.child(`users/${father}`).once('value').then(snap3 => {
                    root.child(`immediate_family/${snap3.val().familyId}/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })
            })
            
            root.child(`user_family/${uid}/sisters/${pushKey}`).once('value').then(snap2 => {    
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`immediate_family/${snap2.val().familyId}/${mother}`).set(mother)
                root.child(`immediate_family/${snap2.val().familyId}/${father}`).set(father)
                
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${mother}`).set(mother)
                root.child(`extended_family/${snap2.val().extendedId}/${father}`).set(father)
            })

            root.child(`users/${uid}/children`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })

                    root.child(`user_family/${uid}/sisters/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    }) 
                })
            })

            root.child(`users/${uid}/ux`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })
                    root.child(`user_family/${uid}/sisters/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    }) 
                })
            })

            root.child(`users/${uid}/vir`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })
                    root.child(`user_family/${uid}/sisters/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    }) 
                })
            })
        } else {
            index.createUser(data, context)

            root.child(`users/${uid}/siblings/${pushKey}`).set(pushKey)
            root.child(`users/${pushKey}/siblings/${uid}`).set(uid)

            root.child(`users/${uid}/siblings`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    if(snap3.val() !== pushKey) {
                        root.child(`users/${pushKey}/siblings/${snap3.val()}`).set(snap3.val())
                        root.child(`users/${snap3.val()}/siblings/${pushKey}`).set(pushKey)

                        root.child(`users/${snap3.val()}`).once("value").then(snap4 => {
                            root.child(`immediate_family/${snap4.val().familyId}/${pushKey}`).set(pushKey)
                            root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                        })

                        root.child(`user_family/${uid}/sisters/${pushKey}`).once('value').then(snap4 => {
                            root.child(`immediate_family/${snap4.val().familyId}/${snap3.val()}`).set(snap3.val())
                            root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                        })
                    }
                })
            })

            root.child(`users/${uid}`).once('value').then(snap2 => {
                mother = snap2.val().m;
                father = snap2.val().f;

                root.child(`users/${pushKey}/m`).set(mother)
                root.child(`users/${pushKey}/f`).set(father)

                root.child(`users/${mother}/children/${pushKey}`).set(pushKey)
                root.child(`users/${father}/children/${pushKey}`).set(pushKey)

                root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)

                root.child(`users/${mother}`).once('value').then(snap3 => {
                    root.child(`immediate_family/${snap3.val().familyId}/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })

                root.child(`users/${father}`).once('value').then(snap3 => {
                    root.child(`immediate_family/${snap3.val().familyId}/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })
            })
            
            root.child(`user_family/${uid}/sisters/${pushKey}`).once('value').then(snap2 => {    
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`immediate_family/${snap2.val().familyId}/${mother}`).set(mother)
                root.child(`immediate_family/${snap2.val().familyId}/${father}`).set(father)
                
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${mother}`).set(mother)
                root.child(`extended_family/${snap2.val().extendedId}/${father}`).set(father)
            })

            root.child(`users/${uid}/children`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })

                    root.child(`user_family/${uid}/sisters/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    }) 
                })
            })

            root.child(`users/${uid}/ux`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })
                    root.child(`user_family/${uid}/sisters/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    }) 
                })
            })

            root.child(`users/${uid}/vir`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })
                    root.child(`user_family/${uid}/sisters/${pushKey}`).once('value').then(snap4 => {
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

exports.addBrother = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    var mother;
    var father;

    const pro1 = root.child(`users/${pushKey}`).once("value").then(snap => {
        if(snap.exists()) {
            root.child(`users/${uid}/siblings/${pushKey}`).set(pushKey)
            root.child(`users/${pushKey}/siblings/${uid}`).set(uid)

            root.child(`users/${uid}/siblings`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    if(snap3.val() !== pushKey) {
                        root.child(`users/${pushKey}/siblings/${snap3.val()}`).set(snap3.val())
                        root.child(`users/${snap3.val()}/siblings/${pushKey}`).set(pushKey)

                        root.child(`users/${snap3.val()}`).once("value").then(snap4 => {
                            root.child(`immediate_family/${snap4.val().familyId}/${pushKey}`).set(pushKey)
                            root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                        })

                        root.child(`user_family/${uid}/brothers/${pushKey}`).once('value').then(snap4 => {
                            root.child(`immediate_family/${snap4.val().familyId}/${snap3.val()}`).set(snap3.val())
                            root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                        })
                    }
                })
            })

            root.child(`users/${uid}`).once('value').then(snap2 => {
                mother = snap2.val().m;
                father = snap2.val().f;

                root.child(`users/${pushKey}/m`).set(mother)
                root.child(`users/${pushKey}/f`).set(father)

                root.child(`users/${mother}/children/${pushKey}`).set(pushKey)
                root.child(`users/${father}/children/${pushKey}`).set(pushKey)

                root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)

                root.child(`users/${mother}`).once('value').then(snap3 => {
                    root.child(`immediate_family/${snap3.val().familyId}/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })

                root.child(`users/${father}`).once('value').then(snap3 => {
                    root.child(`immediate_family/${snap3.val().familyId}/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })
            })
            
            root.child(`user_family/${uid}/brothers/${pushKey}`).once('value').then(snap2 => {    
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`immediate_family/${snap2.val().familyId}/${mother}`).set(mother)
                root.child(`immediate_family/${snap2.val().familyId}/${father}`).set(father)
                
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${mother}`).set(mother)
                root.child(`extended_family/${snap2.val().extendedId}/${father}`).set(father)
            })

            root.child(`users/${uid}/children`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })

                    root.child(`user_family/${uid}/brothers/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    }) 
                })
            })

            root.child(`users/${uid}/ux`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })
                    root.child(`user_family/${uid}/brothers/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    }) 
                })
            })

            root.child(`users/${uid}/vir`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })
                    root.child(`user_family/${uid}/brothers/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    }) 
                })
            })
        } else {
            index.createUser(data, context)

            root.child(`users/${uid}/siblings/${pushKey}`).set(pushKey)
            root.child(`users/${pushKey}/siblings/${uid}`).set(uid)

            root.child(`users/${uid}/siblings`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    if(snap3.val() !== pushKey) {
                        root.child(`users/${pushKey}/siblings/${snap3.val()}`).set(snap3.val())
                        root.child(`users/${snap3.val()}/siblings/${pushKey}`).set(pushKey)

                        root.child(`users/${snap3.val()}`).once("value").then(snap4 => {
                            root.child(`immediate_family/${snap4.val().familyId}/${pushKey}`).set(pushKey)
                            root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                        })

                        root.child(`user_family/${uid}/brothers/${pushKey}`).once('value').then(snap4 => {
                            root.child(`immediate_family/${snap4.val().familyId}/${snap3.val()}`).set(snap3.val())
                            root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                        })
                    }
                })
            })

            root.child(`users/${uid}`).once('value').then(snap2 => {
                mother = snap2.val().m;
                father = snap2.val().f;

                root.child(`users/${pushKey}/m`).set(mother)
                root.child(`users/${pushKey}/f`).set(father)

                root.child(`users/${mother}/children/${pushKey}`).set(pushKey)
                root.child(`users/${father}/children/${pushKey}`).set(pushKey)

                root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
                root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)

                root.child(`users/${mother}`).once('value').then(snap3 => {
                    root.child(`immediate_family/${snap3.val().familyId}/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })

                root.child(`users/${father}`).once('value').then(snap3 => {
                    root.child(`immediate_family/${snap3.val().familyId}/${pushKey}`).set(pushKey)
                    root.child(`extended_family/${snap3.val().extendedId}/${pushKey}`).set(pushKey)
                })
            })
            
            root.child(`user_family/${uid}/brothers/${pushKey}`).once('value').then(snap2 => {    
                root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
                root.child(`immediate_family/${snap2.val().familyId}/${mother}`).set(mother)
                root.child(`immediate_family/${snap2.val().familyId}/${father}`).set(father)
                
                root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
                root.child(`extended_family/${snap2.val().extendedId}/${mother}`).set(mother)
                root.child(`extended_family/${snap2.val().extendedId}/${father}`).set(father)
            })

            root.child(`users/${uid}/children`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })

                    root.child(`user_family/${uid}/brothers/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    }) 
                })
            })

            root.child(`users/${uid}/ux`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })
                    root.child(`user_family/${uid}/brothers/${pushKey}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${snap3.val()}`).set(snap3.val())
                    }) 
                })
            })

            root.child(`users/${uid}/vir`).once('value').then(snap2 => {
                snap2.forEach(snap3 => {
                    root.child(`users/${snap3.val()}`).once('value').then(snap4 => {
                        root.child(`extended_family/${snap4.val().extendedId}/${pushKey}`).set(pushKey)
                    })
                    root.child(`user_family/${uid}/brothers/${pushKey}`).once('value').then(snap4 => {
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