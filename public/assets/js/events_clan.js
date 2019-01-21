firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        f = user.uid;
        const firebaseRef = firebase.database().ref();
        const gen_id = firebaseRef.child('users').child(f).child('clanId');
        // const ex_id  = firebaseRef.child('users').child(f).child('extId');
        // const im_id  = firebaseRef.child('users').child(f).child('immId');

        gen_id.once('value').then(function(snapshot) {
            key = snapshot.val();

            var eventsRef = firebaseRef.child('events').child(key);


            eventsRef.once('value').then((data) => {

                const snapshot = data.val();

                gData(snapshot);
                 
                
            });
        });

        // ex_id.once('value').then(function(snapshot) {
        //     key = snapshot.val();

        //     var eventsRef = firebaseRef.child('events').child(key);


        //     eventsRef.once('value').then((data) => {

        //         const snapshot = data.val();

        //         eData(snapshot);
                 
                
        //     });
        // });

        // im_id.once('value').then(function(snapshot) {
        //     key = snapshot.val();

        //     var eventsRef = firebaseRef.child('events').child(key);


        //     eventsRef.once('value').then((data) => {

        //         const snapshot = data.val();

        //         eData(snapshot);
                 
                
        //     });
        // });
    } else {

        console.log('no user logged in');

    }
});


function gData(cdata) {


    var w = cdata;
    var keys = Object.keys(w);
    var e = 0;
    var d = keys[e];
    var cdata = [];

    for (var i = 0; i < keys.length; i++) {
        var k           = keys[i];
        var date        = w[k].Date;
        var description = w[k].Description;
        var event       = w[k].Event;
        var time        = w[k].Time;
        var title       = w[k].Title;
        var name        = w[k].uName;
        var photo       = w[k].Photo;
        var clanID      = w[k].key;
        var venue       = w[k].Venue;
        var uid         = w[k].uid;

        cdata.push({
            Date: date,
            Description: description,
            Event: event,
            Time: time,
            Title: title,
            Name: name,
            Photo: photo,
            Venue: venue,
            cKey: k,
            uid: uid,
            ii: i
        
        });
        clanRenderCards(cdata);
        console.log(cdata)
    }
}

function clanRenderCards(cdata) {

    const currUser = firebase.auth().currentUser.uid;

    
    var html = '';

  

    $.each(cdata, function(key, value) {
        


         if(value.uid != currUser){


        html += ' <div class="rotating-card-container manual-flip col-xs-3" style="width:400px; height:400px"><div class="card card-rotate" style="height:400px;"><div class="front"><div class="card-content"><h5 style="text-align: center; font-family: Sans-serif; font-size: 20px;  font-weight: bold;"><div class="card-image"><a href="#pablo"><div class="atvImg" style="max-width: 1000px; height: 200px;"><img class="img" src="assets/img/events.jpg"  /></div></a>'+ value.Name+'</h5><h4 class="card-title" style="text-align: center;"><a href="#pablo">'+value.Event+'</a></h4><p class="card-description" style="text-align: center;">'+value.Title+'</p><div class="footer text-center"><button type="button" name="button" class="btn btn-danger btn-fill btn-round btn-just-icon btn-rotate"><i class="material-icons">refresh</i></button></div></div></div><div class="back"><div class="card-content"><br><p class="card-description">'+ value.Description +' <p class="card-description"><i class="material-icons">location_on</i>'+ value.Venue + '<br><i class="material-icons">schedule</i>' + value.Date + ' - ' + value.Time + '</p></p><div class="form-group label-floating" style="width: 100px;  right: -120px;"><label class="control-label" style=" right: 20px;">Response</label><select id="eventSlct" class="form-control" required ><option value=""></option><option value="Going"> Going </option><option value="Not Going">Not Going</option></select><span class="material-input"></span></div><div class="footer text-center"><button type="button" name="button" class="btn btn-simple btn-round btn-rotate"><i class="material-icons">refresh</i> Back...</button></div></div></div></div></div>';

        html += '</div>';
    }

    else{

         html += ' <div class="rotating-card-container manual-flip col-xs-3" style="width:400px; height:400px"><div class="card card-rotate" style="height:400px;"><div class="front"><div class="card-content"><h5 style="text-align: center; font-family: Sans-serif; font-size: 20px;  font-weight: bold;"><div class="card-image"><a href="#pablo"><div class="atvImg" style="max-width: 1000px; height: 200px;"><img class="img" src="assets/img/events.jpg"  /></div></a>'+ value.Name+'</h5><h4 class="card-title" style="text-align: center;"><a href="#pablo">'+value.Event+'</a></h4><p class="card-description" style="text-align: center;">'+value.Title+'</p><div class="footer text-center"><button type="button" name="button" class="btn btn-danger btn-fill btn-round btn-just-icon btn-rotate"><i class="material-icons">refresh</i></button></div></div></div><div class="back"><div class="card-content"><br><p class="card-description">'+ value.Description +' <p class="card-description"><i class="material-icons">location_on</i>'+ value.Venue + '<br><i class="material-icons">schedule</i>' + value.Date + ' - ' + value.Time + '</p></p><div class="footer text-center"><a href="#pablo" class="btn btn-success btn-just-icon btn-fill btn-round btn-wd"><i class="material-icons">mode_edit</i></a><button href="#pablo" class="btn btn-danger btn-just-icon btn-fill btn-round" data-toggle="modal" data-target="#smallAlertModal"><i class="material-icons" id="'+ value.cKey +'" onclick="ClanDeleteClick(this.id)">delete</i></button><br></br><button type="button" name="button" class="btn btn-simple btn-round btn-rotate"><i class="material-icons">refresh</i> Back...</button></div></div></div></div></div>';

        html += '</div>';

    }

    });
    $('#card-container').html(html);
   

}  



function clanDeleteClick(clicked_key){
   
 
  var cKey = clicked_key;

  console.log(cKey);

   const firebaseRef = firebase.database().ref();
   gen_id.once('value').then(function(snapshot) {
        key = snapshot.val();
        
        swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this event!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((isConfirm) => {
        if (isConfirm) {
            firebaseRef.child('events').child(key).child(cKey).remove();

            return window.location.replace("http://localhost:8000/events");
        }
      })
   
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

// firebase.database().ref('/sampleDate').child('Date:').once('value').then((data) => {

//     shortDate = data.val()
//     console.log(shortDate)

//     firebase.database().ref('/events').once('value').then((data) => {

//         EventsClan = data.val();
//         var eKey = Object.keys(EventsClan);

//         eKey.forEach(function(element) {

//             firebase.database().ref('/events').child(element).once('value').then(function(data) {

//                 key = data.val();
//                 var kKey = Object.keys(key)

//                 kKey.forEach(function(elements) {

//                     EventsDate = firebase.database().ref('/events').child(element).child(elements).child('Date')
//                     EventsDate.on('value', snapshot => {

//                         var dKey = snapshot.val();

//                         if (dKey == shortDate) {

//                             var user = firebase.database().ref('/events').child(element).child(elements).child('uName')
//                             user.on('value', snapshot => {

//                                 var username = snapshot.val();

//                                 var eUser = firebase.database().ref('/events').child(element).child(elements).child('uid')
//                                 eUser.on('value', snapshot => {

//                                     var uUid = snapshot.val();

//                                     var ePhoto = firebase.database().ref('/events').child(element).child(elements).child('Photo')
//                                     ePhoto.on('value', snapshot => {

//                                         var photo = snapshot.val();

//                                         var firebaseRef = firebase.database().ref();

//                                         firebaseRef
//                                             .child('/eventsReminder')
//                                             .child(uUid)
//                                             .push({
//                                                 user: username,
//                                                 message: 'remind',
//                                                 Photo: photo

//                                             })

//                                         if (dKey < shortDate) {
//                                             firebase.database().ref('/events').child(element).remove()
//                                         } else {
//                                             console.log('nothing to remove')
//                                         }
//                                     })
//                                 })
//                             })
//                         } else {

//                             console.log('')
//                         }
//                     });
//                 })
//             })
//         })
//     })
// })


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

