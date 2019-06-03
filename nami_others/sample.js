const pr2 = root.child(`users/${pushKey}/m`).set(mother)
const pr3 = root.child(`users/${pushKey}/f`).set(father)

const pr4 = root.child(`users/${mother}/children/${pushKey}`).set(pushKey)
const pr5 = root.child(`users/${father}/children/${pushKey}`).set(pushKey)

const pr6 = root.child(`users/${uid}/siblings/${pushKey}`).set(pushKey)
const pr7 = root.child(`users/${pushKey}/siblings/${uid}`).set(uid)

const pr8 = root.child(`users/${uid}/siblings`).once('value').then(snap2 => {
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

const pr9 = root.child(`users/${uid}`).once('value').then(snap2 => {
    root.child(`immediate_family/${snap2.val().familyId}/${pushKey}`).set(pushKey)
    root.child(`extended_family/${snap2.val().extendedId}/${pushKey}`).set(pushKey)
})

const pr10 = root.child(`user_family/${uid}/brothers/${pushKey}`).once('value').then(snap2 => {
    root.child(`immediate_family/${snap2.val().familyId}/${uid}`).set(uid)
    root.child(`immediate_family/${snap2.val().familyId}/${mother}`).set(mother)
    root.child(`immediate_family/${snap2.val().familyId}/${father}`).set(father)
    
    root.child(`extended_family/${snap2.val().extendedId}/${uid}`).set(uid)
    root.child(`extended_family/${snap2.val().extendedId}/${mother}`).set(mother)
    root.child(`extended_family/${snap2.val().extendedId}/${father}`).set(father)
})

return Promise.all([pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8, pr9, pr10]).catch(err => {
    console.log('Error code', err.code)
    console.log(err)
})