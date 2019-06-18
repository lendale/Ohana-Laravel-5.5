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
    let userObj = data.val();
    let userGender = userObj.gender;
    let parentType, siblingType, spouseType, childType;
    
    if (userObj.registered === true) {        
        const pro = root.child(`users/${uid}`).once("value").then(snapshot => {
            if(userGender === "female") {
                parentType = "mother";
                siblingType = "sister";
                spouseType = "wife";
                childType = "daughter";
            } else if(userGender === "male") {
                parentType = "father";
                siblingType = "brother";
                spouseType = "husband";
                childType = "son";
            }

            root.child(`immediate_family/${snapshot.val().familyId}/user`).set(uid)
            root.child(`extended_family/${snapshot.val().extendedId}/${uid}`).set(uid)
            root.child(`extended_family/${snapshot.val().extendedId}/${snapshot.val().oldKey}`).remove()

            // user's father
            root.child(`users/${snapshot.val().f}/children`).once('value').then(snap => {
                snap.forEach(snap2 => {
                    if(snap2.val() === snapshot.val().oldKey) {
                        root.child(`users/${snapshot.val().f}/children/${snapshot.val().oldKey}`).remove()
                        root.child(`users/${snapshot.val().f}/children/${uid}`).set(uid)
                    }
                })
            })

            root.child(`users/${snapshot.val().f}`).once('value').then(snap => {
                root.child(`immediate_family/${snap.val().familyId}/${childType}/${snapshot.val().oldKey}`).remove()
                root.child(`immediate_family/${snap.val().familyId}/${childType}/${uid}`).set(uid)

                root.child(`extended_family/${snap.val().extendedId}/${snapshot.val().oldKey}`).remove()
                root.child(`extended_family/${snap.val().extendedId}/${uid}`).set(uid)
           })

            // user's mother
            root.child(`users/${snapshot.val().m}/children`).once('value').then(snap => {
                snap.forEach(snap2 => {
                    if(snap2.val() === snapshot.val().oldKey) {
                        root.child(`users/${snapshot.val().m}/children/${snapshot.val().oldKey}`).remove()
                        root.child(`users/${snapshot.val().m}/children/${uid}`).set(uid)
                    }
                })
            })

            root.child(`users/${snapshot.val().m}`).once('value').then(snap => {
                root.child(`immediate_family/${snap.val().familyId}/${childType}/${snapshot.val().oldKey}`).remove()
                root.child(`immediate_family/${snap.val().familyId}/${childType}/${uid}`).set(uid)

                root.child(`extended_family/${snap.val().extendedId}/${snapshot.val().oldKey}`).remove()
                root.child(`extended_family/${snap.val().extendedId}/${uid}`).set(uid)
            })

            // user's siblings
            root.child(`users/${uid}/siblings`).once('value').then(snap => {
                snap.forEach(snap2 => {
                    if(snap2.val() !== snapshot.val().oldKey) {
                        root.child(`users/${snap2.val()}/siblings/${snapshot.val().oldKey}`).remove()
                        root.child(`users/${snap2.val()}/siblings/${uid}`).set(uid)

                        root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                            root.child(`immediate_family/${snap3.val().familyId}/${siblingType}/${snapshot.val().oldKey}`).remove()
                            root.child(`immediate_family/${snap3.val().familyId}/${siblingType}/${uid}`).set(uid)
            
                            root.child(`extended_family/${snap3.val().extendedId}/${snapshot.val().oldKey}`).remove()
                            root.child(`extended_family/${snap3.val().extendedId}/${uid}`).set(uid)
                        })
                    }
                })
            })

            // user's spouse
            root.child(`users/${uid}/ux`).once('value').then(snap => {
                snap.forEach(snap2 => {
                    root.child(`users/${snap2.val()}/vir/${userObj.oldKey}`).remove()
                    root.child(`users/${snap2.val()}/vir/${uid}`).set(uid)
                    root.child(`users/${snap2.val()}/ms/${userObj.oldKey}`).once('value').then(snap3 => {
                        root.child(`users/${snap2.val()}/ms/${uid}`).set(snap3.val())
                        root.child(`users/${snap2.val()}/ms/${userObj.oldKey}`).remove()
                    })

                    root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                        root.child(`immediate_family/${snap3.val().familyId}/${spouseType}/${snapshot.val().oldKey}`).remove()
                        root.child(`immediate_family/${snap3.val().familyId}/${spouseType}/${uid}`).set(uid)
        
                        root.child(`extended_family/${snap3.val().extendedId}/${snapshot.val().oldKey}`).remove()
                        root.child(`extended_family/${snap3.val().extendedId}/${uid}`).set(uid)
                    })
                })
            })

            // user's children
            root.child(`users/${uid}/children`).once('value').then(snap => {
                snap.forEach(snap2 => {
                    if(snapshot.val().gender == "male")
                        root.child(`users/${snap2.val()}/f`).set(uid)
                    else if(snapshot.val().gender == "female")
                        root.child(`users/${snap2.val()}/m`).set(uid)
                    
                    root.child(`users/${snap2.val()}`).once('value').then(snap3 => {
                        root.child(`immediate_family/${snap3.val().familyId}/${parentType}/${snapshot.val().oldKey}`).remove()
                        root.child(`immediate_family/${snap3.val().familyId}/${parentType}`).set(uid)
            
                        root.child(`extended_family/${snap3.val().extendedId}/${snapshot.val().oldKey}`).remove()
                        root.child(`extended_family/${snap3.val().extendedId}/${uid}`).set(uid)
                    })
                })
            })
        })

        return Promise.all([pro]).catch(err => {
            console.log('Error code', err.code)
            console.log(err)
        })
    } else {
        console.log("sud 2 else")
    }

    return root.child(`users/${uid}/oldKey`).remove()
})

exports.createUser = function(data, context) {
    const root = data.ref.root
    let userObj = data.val()
    let uid = context.params.pushKey
    userObj.key = uid

    root.child(`users/${uid}`).update(userObj)
    root.child(`immediate_family/${userObj.familyId}/user`).set(uid)
    root.child(`extended_family/${userObj.extendedId}/${uid}`).set(uid)
}

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

exports.notifications = functions.database.ref('/notifications/{uid}/{notificationId}').onWrite((event) => {
    return notif.sendNotifications(event)
})

exports.cronJob = functions.https.onRequest((req, res) => {
    return djob.dateJob(req, res)   
}) 

exports.eventsReminder = functions.database.ref('/eventsReminder/{uid}/{notificationId}').onWrite((event) =>{
    return eReminder.eventsReminder(event)
})