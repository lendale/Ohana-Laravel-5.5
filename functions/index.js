require('babel-polyfill')

const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const parents = require('./src/addParent')
const spouse = require('./src/addSpouse')
const children = require('./src/addChild')
const sibling = require('./src/addSibling')
const notif = require('./src/notifications')
const djob = require('./src/cronJob')
const eReminder= require('./src/eventsReminder')

exports.addCurrentUserToClan = functions.database.ref('/users/{uid}').onCreate((data, context) => {
    const root = data.ref.root
    let uid = context.params.uid;
    let photo = admin.database().ref('users').child(uid).child('photoURL')
    let userObj = data.val();
    let treeObj = new Object()
    let prevVal = new Object()
    
    // photo.once('value').then(function(snapshot) {
    //     pic = snapshot.val();
    //     console.log(pic)
    // });

    console.log('re', userObj.registered)
    console.log('fa', userObj.familyId)
    console.log('flag', userObj.flag)

    if (userObj.registered === false) {
    	console.log('sud 2 if')
        if(userObj.familyId !== undefined) {
        	console.log('sud 3')
            treeObj = {
                key: uid,
                n: userObj.displayName,
                s: userObj.gender,
                bd: userObj.birthDate,
                loc: `/users/${uid}/`,
            }

            const pr1 = root.child(`user_immediate_family/${userObj.familyId}/${uid}`).set(treeObj)

            return Promise.all([pr1]).catch(err => {
                console.log('Error code', err.code)
                console.log(err)
            })
        }
    }
    else {
    	console.log('sud 2 else')
    	treeObj = {
    	    key: uid,
    	    n: userObj.displayName,
    	    s: userObj.gender,
    	    bd: userObj.birthDate,
    	    loc: `/users/${uid}/`,
    	}

    	const pr1 = root.child(`user_immediate_family/${userObj.familyId}/${uid}`).set(treeObj)

    	return Promise.all([pr1]).catch(err => {
    	    console.log('Error code', err.code)
    	    console.log(err)
    	})
    }
})

exports.addMotherToClan = functions.database.ref('/user_family/{uid}/mothers/{pushKey}').onCreate((data, context) => {
    return parents.addMother(data, context)
})

exports.addFatherToClan = functions.database.ref('/user_family/{uid}/fathers/{pushKey}').onCreate((data, context) => {
    return parents.addFather(data, context)
})

exports.addWifeToClan = functions.database.ref('/user_family/{uid}/wives/{pushKey}').onCreate((data, context) => {
    return spouse.addWife(data, context)
})

exports.addHusbandToClan = functions.database.ref('/user_family/{uid}/husbands/{pushKey}').onCreate((data, context) => {
    return spouse.addHusband(data, context)
})

exports.addDaughterToClan = functions.database.ref('/user_family/{uid}/daughters/{pushKey}').onCreate((data, context) => {
    return children.addDaughter(data, context)
})

exports.addSonToClan = functions.database.ref('/user_family/{uid}/sons/{pushKey}').onCreate((data, context) => {
    return children.addSon(data, context)
})

exports.addSisterToClan = functions.database.ref('/user_family/{uid}/sisters/{pushKey}').onCreate((data, context) => {
    return sibling.addSister(data, context)
})

exports.addBrotherToClan = functions.database.ref('/user_family/{uid}/brothers/{pushKey}').onCreate((data, context) => {
    return sibling.addBrother(data, context)
})

exports.createUser = function(data, context) {
    let usersRef = admin.database().ref().child('users')
    let userObj = data.val()
    let uid = context.params.pushKey

    userObj.uid = uid

    return usersRef.child(uid).set(userObj)
}

function updateConnectedNodes(rootRef, clanId, oldId, newId, currentUserId) {
    const pr1 = rootRef.child(`user_tree_go/${clanId}`).once('value').then(snapshot => {
        let updateObj = {}

        snapshot.forEach(childSnapshot => {
            let childSnap = childSnapshot.val()

            if (!(childSnap.m === null || childSnap.m === undefined)) {
                if (childSnap.m === oldId) {
                    updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/m`] = newId
                }
            }

            if (!(childSnap.f === null || childSnap.f === undefined)) {
                if (childSnap.f === oldId) {
                    updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/f`] = newId
                }
            }

            if (!(childSnap.ux === null || childSnap.ux === undefined)) {
                let ux = Object.entries(childSnap.ux)

                ux.forEach(([key, value]) => {
                    if (value === oldId) {
                        updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/ux/${key}`] = newId
                    }
                })
            }

            if (!(childSnap.vir === null || childSnap.vir === undefined)) {
                let vir = Object.entries(childSnap.vir)

                vir.forEach(([key, value]) => {
                    if (value === oldId) {
                        updateObj[`user_tree_go/${clanId}/${childSnapshot.key}/vir/${key}`] = newId
                    }
                })
            }

            if (!(childSnap.ms === null || childSnap.ms === undefined)) {
                let ms = Object.entries(childSnap.ms)

                ms.forEach(([key, value]) => {
                    if (key === oldId) {
                        return rootRef.child(`user_tree_go/${clanId}/${childSnap.key}/ms/${newId}`).set(value)
                            .then(() => {
                                return rootRef.child(`user_tree_go/${clanId}/${childSnap.key}/ms/${oldId}`).remove()
                            })
                    }
                })
            }
        })

        return updateObj
    }).then(updateObj => {
        // console.log('Update Object', updateObj)
        return rootRef.update(updateObj)
    })

    const pr2 = rootRef.child(`user_family/${oldId}`).once('value').then(snapshot => {
        return rootRef.child(`user_family/${currentUserId}`).set(snapshot.val())
            // if (snapshot.key === oldId) {
            //     prevVal = snapshot.val()
            //     console.log('PREV', prevVal)

        //     prevVal.forEach()

        //     return rootRef.child(`user_family/${currentUserId}`).set(prevVal)
        // }
        // snapshot.forEach(childSnap => {
        //         console.log('child', childSnap.val())
        //     })
        console.log('OLD ID', oldId)
    }).then(() => {
        return rootRef.child(`user_family/${oldId}`).remove()
    })

    // const pr3 = rootRef.child(`user_family/${oldId}/spouse_keys/vir`).once('value').then(snapshot => {
    //     snapshot.forEach(childSnapshot => {
    //         if (childSnapshot.key === oldId) {
    //             return rootRef.child(`user_family/${currentUserId}/spouse_keys/vir/${newId}`).set(childSnapshot.value)
    //         }
    //     })
    // }).then(() => {
    //     return rootRef.child(`user_family/${currentUserId}/spouse_keys/vir/${oldId}`).remove()
    // })

    return Promise.all([pr1, pr2]).catch(err => {
        console.log('Error code', err.code)
        console.log(err)
    })
}

exports.notifications = functions.database.ref('/notifications/{uid}/{notificationId}').onWrite((event) => {
    return notif.sendNotifications(event)
})

exports.cronJob = functions.https.onRequest((req, res) => {
    return djob.dateJob(req, res)   
}) 

exports.eventsReminder = functions.database.ref('/eventsReminder/{uid}/{notificationId}').onWrite((event) =>{
    return eReminder.eventsReminder(event)
})