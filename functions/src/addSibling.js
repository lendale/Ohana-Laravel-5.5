const admin = require('firebase-admin')
const index = require('../index')

exports.addSister = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()

    const db = admin.database()
    const usersRef = db.ref().child('users')

    const pro1 = usersRef.child(pushKey).once("value")
        .then(snap => {
            if(snap.exists()) {
                const pr2 = root.child(`users/${uid}`).once('value').then(snap => {
                    const mother = root.child(`users/${pushKey}/m`).set(snap.val().m);
                    const father = root.child(`users/${pushKey}/f`).set(snap.val().f);
                    const motherChild = root.child(`users/${snap.val().m}/children/${pushKey}`).set(pushKey);
                    const fatherChild = root.child(`users/${snap.val().f}/children/${pushKey}`).set(pushKey);

                    return Promise.all([mother, father, motherChild, fatherChild]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                })
                const pr3 = root.child(`users/${uid}/siblings/${pushKey}`).set(pushKey);
                const pr4 = root.child(`users/${pushKey}/siblings/${uid}`).set(uid);
                const pr5 = root.child(`users/${uid}/siblings`).once('value').then(snap => {
                    snap.forEach(snap2 => {
                        if(snap2.val() !== pushKey) {
                            console.log('sibling compare - not same')
                            const pr51 = root.child(`users/${pushKey}/siblings/${snap2.val()}`).set(snap2.val());
                            const pr52 = root.child(`users/${snap2.val()}/siblings/${pushKey}`).set(pushKey);

                            return Promise.all([pr51, pr52]).catch(err => {
                                console.log('Error code', err.code)
                                console.log(err)
                            })
                        }
                    })
                })

                return Promise.all([pr2, pr3, pr4, pr5]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            } else {
                const pr1 = index.createUser(data, context)
                const pr2 = root.child(`users/${uid}`).once('value').then(snap => {
                    const mother = root.child(`users/${pushKey}/m`).set(snap.val().m);
                    const father = root.child(`users/${pushKey}/f`).set(snap.val().f);
                    const motherChild = root.child(`users/${snap.val().m}/children/${pushKey}`).set(pushKey);
                    const fatherChild = root.child(`users/${snap.val().f}/children/${pushKey}`).set(pushKey);

                    return Promise.all([mother, father, motherChild, fatherChild]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                })
                const pr3 = root.child(`users/${uid}/siblings/${pushKey}`).set(pushKey);
                const pr4 = root.child(`users/${pushKey}/siblings/${uid}`).set(uid);
                const pr5 = root.child(`users/${uid}/siblings`).once('value').then(snap => {
                    snap.forEach(snap2 => {
                        if(snap2.val() !== pushKey) {
                            console.log('sibling compare - not same')
                            const pr51 = root.child(`users/${pushKey}/siblings/${snap2.val()}`).set(snap2.val());
                            const pr52 = root.child(`users/${snap2.val()}/siblings/${pushKey}`).set(pushKey);

                            return Promise.all([pr51, pr52]).catch(err => {
                                console.log('Error code', err.code)
                                console.log(err)
                            })
                        }
                    })
                })

                return Promise.all([pr1, pr2, pr3, pr4, pr5]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            }
        });

    return Promise.all([pro1]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.addBrother = function(data, context) {
    const root = data.ref.root
    let uid = context.params.uid
    let pushKey = context.params.pushKey
    let userObj = data.val()

    const db = admin.database()
    const usersRef = db.ref().child('users')

    const pro1 = usersRef.child(pushKey).once("value")
        .then(snap => {
            if(snap.exists()) {
                const pr2 = root.child(`users/${uid}`).once('value').then(snap => {
                    const mother = root.child(`users/${pushKey}/m`).set(snap.val().m);
                    const father = root.child(`users/${pushKey}/f`).set(snap.val().f);
                    const motherChild = root.child(`users/${snap.val().m}/children/${pushKey}`).set(pushKey);
                    const fatherChild = root.child(`users/${snap.val().f}/children/${pushKey}`).set(pushKey);

                    return Promise.all([mother, father, motherChild, fatherChild]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                })
                const pr3 = root.child(`users/${uid}/siblings/${pushKey}`).set(pushKey);
                const pr4 = root.child(`users/${pushKey}/siblings/${uid}`).set(uid);
                const pr5 = root.child(`users/${uid}/siblings`).once('value').then(snap => {
                    snap.forEach(snap2 => {
                        if(snap2.val() !== pushKey) {
                            console.log('sibling compare - not same')
                            const pr51 = root.child(`users/${pushKey}/siblings/${snap2.val()}`).set(snap2.val());
                            const pr52 = root.child(`users/${snap2.val()}/siblings/${pushKey}`).set(pushKey);

                            return Promise.all([pr51, pr52]).catch(err => {
                                console.log('Error code', err.code)
                                console.log(err)
                            })
                        }
                    })
                })

                return Promise.all([pr2, pr3, pr4, pr5]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            } else {
                const pr1 = index.createUser(data, context)
                const pr2 = root.child(`users/${uid}`).once('value').then(snap => {
                    const mother = root.child(`users/${pushKey}/m`).set(snap.val().m);
                    const father = root.child(`users/${pushKey}/f`).set(snap.val().f);
                    const motherChild = root.child(`users/${snap.val().m}/children/${pushKey}`).set(pushKey);
                    const fatherChild = root.child(`users/${snap.val().f}/children/${pushKey}`).set(pushKey);

                    return Promise.all([mother, father, motherChild, fatherChild]).catch(err => {
                        console.log('Error code', err.code)
                        console.log(err)
                    })
                })
                const pr3 = root.child(`users/${uid}/siblings/${pushKey}`).set(pushKey);
                const pr4 = root.child(`users/${pushKey}/siblings/${uid}`).set(uid);
                const pr5 = root.child(`users/${uid}/siblings`).once('value').then(snap => {
                    snap.forEach(snap2 => {
                        if(snap2.val() !== pushKey) {
                            console.log('sibling compare - not same')
                            const pr51 = root.child(`users/${pushKey}/siblings/${snap2.val()}`).set(snap2.val());
                            const pr52 = root.child(`users/${snap2.val()}/siblings/${pushKey}`).set(pushKey);

                            return Promise.all([pr51, pr52]).catch(err => {
                                console.log('Error code', err.code)
                                console.log(err)
                            })
                        }
                    })
                })

                return Promise.all([pr1, pr2, pr3, pr4, pr5]).catch(err => {
                    console.log('Error code', err.code)
                    console.log(err)
                })
            }
        });

    return Promise.all([pro1]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}