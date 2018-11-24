firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        f = user.uid;
        const firebaseRef = firebase.database().ref();
        const gen_id = firebaseRef.child('users').child(f).child('clanId');
        gen_id.once('value').then(function(snapshot) {
            key = snapshot.val();

            var eventsRef = firebaseRef.child('events').child(key);


            eventsRef.once('value').then((data) => {

                const snapshot = data.val();

                eData(snapshot);
                deleteClick(snapshot);
                
                
            });
        });
    } else {

        console.log('no user logged in');

    }
});

function eData(data) {


    var w = data;
    var keys = Object.keys(w);
    var e = 0;
    var d = keys[e];
    var data = [];

    




    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var date = w[k].Date;
        var description = w[k].Description;
        var event = w[k].Event;
        var time = w[k].Time;
        var title = w[k].Title;
        var name = w[k].uName;
        var photo = w[k].Photo;
        var clanID = w[k].key

        data.push({
            Date: date,
            Description: description,
            Event: event,
            Time: time,
            Title: title,
            Name: name,
            Photo: photo,
            cKey: k,
            ii: i
            

        });
        // console.log(k);
        renderCards(data);
       
       
    }
}

function renderCards(data) {
    
    var html = '';
    $.each(data, function(key, value) {

        html += ' <div class="rotating-card-container manual-flip col-xs-3" style="width:400px;"><div class="card card-rotate" style="height:280px;"><div class="front"><div class="card-content"><h5><img src="' + value.Photo + '" alt="" class="avatar img-raised" style=" border-radius: 50%; width: 60px; height: 60px;vertical-align: middle;" ></i> '+ value.Name+'</h5><h4 class="card-title" style="text-align: center;"><a href="#pablo">'+value.Event+'</a></h4><p class="card-description" style="text-align: center;">'+value.Title+'</p><div class="footer text-center"><button type="button" name="button" class="btn btn-success btn-fill btn-round btn-rotate"><i class="material-icons">refresh</i> Rotate...</button></div></div></div><div class="back"><div class="card-content"><br><p class="card-description">'+ value.Description +' <p class="card-description"><i class="material-icons">schedule</i>' + value.Date + ' - ' + value.Time + '</p></p><div class="footer text-center"><a href="#pablo" class="btn btn-success btn-just-icon btn-fill btn-round btn-wd"><i class="material-icons">mode_edit</i></a><button href="#pablo" class="btn btn-danger btn-just-icon btn-fill btn-round" data-toggle="modal" data-target="#smallAlertModal"><i class="material-icons">delete</i></button><br></br><button type="button" name="button" class="btn btn-simple btn-round btn-rotate"><i class="material-icons">refresh</i> Back...</button></div></div></div></div></div>';

        html += '<div class="modal fade" id="smallAlertModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog modal-small "><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="material-icons">clear</i></button></div><div class="modal-body text-center"><h5>Are you sure you want to delete? </h5></div><div class="modal-footer text-center"><button type="button" class="btn" data-dismiss="modal">Never mind</button><button type="button" class="btn btn-success" onclick="deleteClick('+ value.cKey +')">Yes</button></div></div></div></div>';

        html += '</div>';

    });
    $('#card-container').html(html);
   

}

function deleteClick(clicked_key){
   
  var id = [];
  var cKey = id[clicked_key];

  console.log();

   const firebaseRef = firebase.database().ref();
   const gen_id = firebaseRef.child('users').child(f).child('clanId');
   gen_id.once('value').then(function(snapshot) {
        key = snapshot.val();

        return console.log(cKey.value);
        
        })
   
    }



$(document).ready(function() {
    $("#notificationLink").click(function() {
        $("#notificationContainer").fadeToggle(300);
        $("#notification_count").fadeOut("slow");
        return false;
    });

    //Document Click hiding the popup 
    $(document).click(function() {
        $("#notificationContainer").hide();
    });

    //Popup on click
    $("#notificationContainer").click(function() {
        return false;
    });

});


// // // // //  
// CRONJOB  //
// // // // // 

firebase.database().ref('/sampleDate').child('Date:').once('value').then((data) => {

    shortDate = data.val()
    console.log(shortDate)

    firebase.database().ref('/events').once('value').then((data) => {

        EventsClan = data.val();
        var eKey = Object.keys(EventsClan);

        eKey.forEach(function(element) {

            firebase.database().ref('/events').child(element).once('value').then(function(data) {

                key = data.val();
                var kKey = Object.keys(key)

                kKey.forEach(function(elements) {

                    EventsDate = firebase.database().ref('/events').child(element).child(elements).child('Date')
                    EventsDate.on('value', snapshot => {

                        var dKey = snapshot.val();

                        if (dKey == shortDate) {

                            var user = firebase.database().ref('/events').child(element).child(elements).child('uName')
                            user.on('value', snapshot => {

                                var username = snapshot.val();

                                var eUser = firebase.database().ref('/events').child(element).child(elements).child('uid')
                                eUser.on('value', snapshot => {

                                    var uUid = snapshot.val();

                                    var ePhoto = firebase.database().ref('/events').child(element).child(elements).child('Photo')
                                    ePhoto.on('value', snapshot => {

                                        var photo = snapshot.val();

                                        var firebaseRef = firebase.database().ref();

                                        firebaseRef
                                            .child('/eventsReminder')
                                            .child(uUid)
                                            .push({
                                                user: username,
                                                message: 'remind',
                                                Photo: photo

                                            })

                                        if (dKey < shortDate) {
                                            firebase.database().ref('/events').child(element).remove()
                                        } else {
                                            console.log('nothing to remove')
                                        }
                                    })
                                })
                            })
                        } else {

                            console.log('false')
                        }
                    });
                })
            })
        })
    })
})


// // // // // // // // 
// EVENTES REMINDER  //
// // // // // // // //

// eRUID = firebase.database().ref('eventsReminder')
// eRUID.on('value', snapshot => {

//     let eUID = snapshot.val();
//     var uid = Object.keys(eUID);


//     uid.forEach(function(uid) {

//         var uUid = uid;
//         console.log(uUid);
//         var eRKey = eRUID.child(uid)
//         eRKey.on('value', snapshot => {

//             let eKey = snapshot.val();
//             let key = Object.keys(eKey)

//             key.forEach(function(key) {

//                 var eUser = eRKey.child(key).child('user')
//                 eUser.on('value', snapshot => {

//                     let user = snapshot.val();

//                     var ePhoto = eRKey.child(key).child('Photo')
//                     ePhoto.on('value', snapshot => {

//                         let photo = snapshot.val();

//                         var firebaseRef = firebase.database().ref('/notifications');

//                         if(user == 'null' )
//                         {
//                            console.log('1');
//                         }
//                         else if(photo == 'null'){

//                            console.log('2')
//                         }
//                         else{

//                              firebaseRef
//                             .child(uUid)
//                             .push({
//                                 user: user,
//                                 message: 'remind',
//                                 avatar: photo

//                             })

//                         return eRKey.remove()

//                         }                        

//                     })

//                 })

//             })
//         })

//     })

// })

