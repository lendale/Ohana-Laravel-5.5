firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        f = user.uid;
        const firebaseRef = firebase.database().ref();
        const im_id  = firebaseRef.child('users').child(f).child('familyId');
        

        im_id.once('value').then(function(snapshot) {
            key = snapshot.val();

            var eventsRef = firebaseRef.child('events').child(key);


            eventsRef.once('value').then((data) => {

                const snapshot = data.val();

                iData(snapshot);
                 
                
            });
        });

    } else {

        console.log('no user logged in');

    }
});


function iData(iData) {


    var w = iData;
    var keys = Object.keys(w);
    var e = 0;
    var d = keys[e];
    var iData = [];

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

        iData.push({
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
        clanRenderCards(iData);
        console.log(iData)
    }
}

function clanRenderCards(iData) {

    const currUser = firebase.auth().currentUser.uid;

    
    var html = '';

  

    $.each(iData, function(key, value) {
        


         if(value.uid != currUser){


        html += ' <div class="rotating-card-container manual-flip col-xs-3" style="width:400px; height:400px"><div class="card card-rotate" style="height:400px;"><div class="front"><div class="card-content"><h5 style="text-align: center; font-family: Sans-serif; font-size: 20px;  font-weight: bold;"><div class="card-image"><a href="#pablo"><div class="atvImg" style="max-width: 1000px; height: 200px;"><img class="img" src="assets/img/events.jpg"  /></div></a>'+ value.Name+'</h5><h4 class="card-title" style="text-align: center;"><a href="#pablo">'+value.Event+'</a></h4><p class="card-description" style="text-align: center;">'+value.Title+'</p><div class="footer text-center"><button type="button" name="button" class="btn btn-danger btn-fill btn-round btn-just-icon btn-rotate"><i class="material-icons">refresh</i></button></div></div></div><div class="back"><div class="card-content"><br><p class="card-description">'+ value.Description +' <p class="card-description"><i class="material-icons">location_on</i>'+ value.Venue + '<br><i class="material-icons">schedule</i>' + value.Date + ' - ' + value.Time + '</p></p><div class="form-group label-floating" style="width: 100px;  right: -120px;"><label class="control-label" style=" right: 20px;">Response</label><select id="eventSlct" class="form-control" required ><option value=""></option><option value="Going"> Going </option><option value="Not Going">Not Going</option></select><span class="material-input"></span></div><div class="footer text-center"><button type="button" name="button" class="btn btn-simple btn-round btn-rotate"><i class="material-icons">refresh</i> Back...</button></div></div></div></div></div>';

        html += '</div>';
    }

    else{

         html += ' <div class="rotating-card-container manual-flip col-xs-3" style="width:400px; height:400px"><div class="card card-rotate" style="height:400px;"><div class="front"><div class="card-content"><h5 style="text-align: center; font-family: Sans-serif; font-size: 20px;  font-weight: bold;"><div class="card-image"><a href="#pablo"><div class="atvImg" style="max-width: 1000px; height: 200px;"><img class="img" src="assets/img/events.jpg"  /></div></a>'+ value.Name+'</h5><h4 class="card-title" style="text-align: center;"><a href="#pablo">'+value.Event+'</a></h4><p class="card-description" style="text-align: center;">'+value.Title+'</p><div class="footer text-center"><button type="button" name="button" class="btn btn-danger btn-fill btn-round btn-just-icon btn-rotate"><i class="material-icons">refresh</i></button></div></div></div><div class="back"><div class="card-content"><br><p class="card-description">'+ value.Description +' <p class="card-description"><i class="material-icons">location_on</i>'+ value.Venue + '<br><i class="material-icons">schedule</i>' + value.Date + ' - ' + value.Time + '</p></p><div class="footer text-center"><a href="#pablo" class="btn btn-success btn-just-icon btn-fill btn-round btn-wd"><i class="material-icons">mode_edit</i></a><button href="#pablo" class="btn btn-danger btn-just-icon btn-fill btn-round" data-toggle="modal" data-target="#smallAlertModal"><i class="material-icons" id="'+ value.cKey +'" onclick="extendedDeleteClick(this.id)">delete</i></button><br></br><button type="button" name="button" class="btn btn-simple btn-round btn-rotate"><i class="material-icons">refresh</i> Back...</button></div></div></div></div></div>';

        html += '</div>';

    }

    });
    $('#card-container').html(html);
   

}  



function extededDeleteClick(clicked_key){
   
 
  var cKey = clicked_key;

  console.log(cKey);

   const firebaseRef = firebase.database().ref();
   im_id.once('value').then(function(snapshot) {
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