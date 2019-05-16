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
    
    if (userObj.registered === true) {
        console.log('userObj.registered')
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
        } else {
            console.log('sud 2 male')

            const parent = root.child(`users/${userObj.f}/children`).once('value').then(snap => {
                snap.forEach(snap2 => {
                    if(snap2.val() === userObj.oldKey) {
                        root.child(`users/${userObj.f}/children/${userObj.oldKey}`).remove()
                        root.child(`users/${userObj.f}/children/${userObj.key}`).set(userObj.key)
                    }
                })
            })

            const parent2 = root.child(`users/${userObj.m}/children`).once('value').then(snap => {
                snap.forEach(snap2 => {
                    if(snap2.val() === userObj.oldKey) {
                        root.child(`users/${userObj.m}/children/${userObj.oldKey}`).remove()
                        root.child(`users/${userObj.m}/children/${userObj.key}`).set(userObj.key)
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

            const spouse = root.child(`users/${userObj.key}/ux`).once('value').then(snap => {
                snap.forEach(snap2 => {
                    root.child(`users/${snap2.val()}/vir/${userObj.oldKey}`).remove()
                    root.child(`users/${snap2.val()}/vir/${userObj.key}`).set(userObj.key)
                    root.child(`users/${snap2.val()}/ms/${userObj.oldKey}`).once('value').then(snap3 => {
                        root.child(`users/${snap2.val()}/ms/${userObj.key}`).set(snap3.val())
                        root.child(`users/${snap2.val()}/ms/${userObj.oldKey}`).remove()
                    })
                })
            })
            
            const child = root.child(`users/${userObj.key}/children`).once('value').then(snap => {
                snap.forEach(snap2 => {
                    root.child(`users/${snap2.val()}/f`).set(userObj.key)
                })
            })

            return Promise.all([parent, parent2, sibling, spouse, child]).catch(err => {
                console.log('Error code', err.code)
                console.log(err)
            })
        }
    } else console.log('sud 2 else')
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
    userObj.key = uid

    return usersRef.child(uid).set(userObj)
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