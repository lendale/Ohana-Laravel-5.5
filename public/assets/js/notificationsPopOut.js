firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const currUser = firebase.auth().currentUser.uid;

        retrieveExtended(currUser)
        retrieveImmediate(currUser)

    } else {
        console.log('no user logged in');
    }
});

var notifData = [];
var immidiate_family = [];
var extended_family = [];


function retrieveImmediate(uid) {

    const currUser = uid;
    var firebaseRef = firebase.database().ref();
    var immidiateFamilyRef = firebaseRef.child('immediate_family');
    var notifPrivacyRef = firebaseRef.child('notif_privacy').child('Immediate');
    var notifRef = firebaseRef.child('notifications')
    var immidiatedId = firebaseRef.child('users').child(currUser).child('familyId');

    immidiatedId.once('value').then(function(snapshot) {
        immidiatedId = snapshot.val();
        immidiateFamilyRef.child(immidiatedId).once('value')
            .then(function(data) {
                // console.log(data.val())
                immidiate_family.push(data.val())
                data.forEach(function(childDataKeys){
                    // console.log(childDataKeys.key)
                    if (childDataKeys.key == "brother"){
                        // console.log(childDataKeys.val())
                        childDataKeys.forEach(function(brother){
                            notifPrivacyRef.child(brother.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        notifRef.child(data2.val()).child(data2.val()).once('value')
                                        .then(function(data) {
                                            notifData.push(data.val())
                                            notifications(currUser)
                                        })
                                    })
                                })
                        })
                    }
                    else if (childDataKeys.key == "sister"){
                            // console.log(childDataKeys.val())
                        childDataKeys.forEach(function(sister){
                            notifPrivacyRef.child(sister.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        notifRef.child(data2.val()).child(data2.val()).once('value')
                                        .then(function(data) {
                                            notifData.push(data.val())
                                            notifications(currUser)
                                        })
                                    })
                                })
                        })

                    }
                   else if (childDataKeys.key == "son"){
                        // console.log(childDataKeys.val())
                        childDataKeys.forEach(function(son){
                            notifPrivacyRef.child(son.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        notifRef.child(data2.val()).child(data2.val()).once('value')
                                        .then(function(data) {
                                            notifData.push(data.val())
                                            notifications(currUser)
                                        })
                                    })
                                })
                        })
                    }
                   else if (childDataKeys.key == "daughter"){
                        // console.log(childDataKeys.val())
                        childDataKeys.forEach(function(daughter){
                            notifPrivacyRef.child(daughter.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        notifRef.child(data2.val()).child(data2.val()).once('value')
                                        .then(function(data) {
                                            notifData.push(data.val())
                                            notifications(currUser)
                                        })
                                    })
                                })
                        })
                    }
                   else if (childDataKeys.key == "wife"){
                        // console.log(childDataKeys.val())
                        childDataKeys.forEach(function(wife){
                            notifPrivacyRef.child(wife.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        notifRef.child(data2.val()).child(data2.val()).once('value')
                                        .then(function(data) {
                                            notifData.push(data.val())
                                            notifications(currUser)
                                        })
                                    })
                                })
                        })
                    }
                   else if (childDataKeys.key == "husband"){
                        // console.log(childDataKeys.val())
                        childDataKeys.forEach(function(husband){
                            notifPrivacyRef.child(husband.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        notifRef.child(data2.val()).child(data2.val()).once('value')
                                        .then(function(data) {
                                            notifData.push(data.val())
                                            notifications(currUser)
                                        })
                                    })
                                })
                        })
                    }
                    else if (childDataKeys.key == "father"){
                        // console.log(childDataKeys.val())
                            notifPrivacyRef.child(childDataKeys.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        notifRef.child(data2.val()).child(data2.val()).once('value')
                                        .then(function(data) {
                                            notifData.push(data.val())
                                            notifications(currUser)
                                        })
                                    })
                                })
                    }
                    else if (childDataKeys.key == "mother"){
                        // console.log(childDataKeys.val())
                            notifPrivacyRef.child(childDataKeys.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        notifRef.child(data2.val()).child(data2.val()).once('value')
                                        .then(function(data) {
                                            notifData.push(data.val())
                                            notifications(currUser)
                                        })
                                    })
                                })
                    }
                    else if (childDataKeys.key == "user"){
                        // console.log(childDataKeys.val())
                             notifPrivacyRef.child(childDataKeys.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        notifRef.child(data2.val()).child(data2.val()).once('value')
                                        .then(function(data) {
                                            notifData.push(data.val())
                                            notifications(currUser)
                                        })
                                    })
                                })
                    }
                })
               
            })
    })
}

function retrieveExtended(uid) {

    const currUser = uid;
    var firebaseRef = firebase.database().ref();
    var extendedFamilyRef = firebaseRef.child('extended_family');
    var notifPrivacyRef = firebaseRef.child('notif_privacy').child('Extended');
    var notifRef = firebaseRef.child('notifications')
    var extendedId = firebaseRef.child('users').child(currUser).child('extendedId');

    extendedId.once('value').then(function(snapshot) {
        extendedId = snapshot.val();
        extendedFamilyRef.child(extendedId).once('value')
            .then(function(data) {
                extended_family.push(data.val())
                data.forEach(function(childDataKeys) {
                    notifPrivacyRef.child(childDataKeys.val()).once('value')
                        .then(function(snap) {
                            snap.forEach(function(data2) {
                                notifRef.child(data2.val()).child(data2.val()).once('value')
                                    .then(function(data) {
                                        notifData.push(data.val())
                                        notifications(currUser)
                                    })
                            })
                        })
                })
            })
    })
}

function notifications(){

const currUser = uid;

    var html = '';

    $.each(notifData, function(key, value) {


            if (value.uid != currUser) {
                
            html += '<div class="notification-read"><i class="fa fa-times" aria-hidden="true"></i></div><img class="notification-img" src="' + value.icon + '" alt="Icone Notification" /><div class="notifications-body"><p class="notification-texte"><stong>' + value.user + '</stong>function has invited you to a <stong>' + value.message + '</stong></p><p class="notification-date text-muted"><i class="fa fa-clock-o" aria-hidden="true"></i></p></div>';
            html += '<br><br>';

        }
        else{


        }
      
});
    $('#notif-container').html(html);
}



        // $(document).ready(function()
        //     {
        //     $("#notificationLink").click(function()
        //     {
        //     $("#notif-container").fadeToggle(300);
        //     $("#notification_count").fadeOut("slow");
        //     return false;
        //     });

        //     //Document Click hiding the popup 
        //     $(document).click(function()
        //     {
        //     $("#notif-container").hide();
        //     });

        //     //Popup on click
        //     $("#notif-container").click(function()
        //     {
        //     return false;
        //     });

        //     });