firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const currUser = firebase.auth().currentUser.uid;

        retrieveExtended(currUser)
        retrieveImmediate(currUser)

    } else {
        console.log('no user logged in');
    }
});

var cardData = [];
var immidiate_family = [];
var extended_family = [];


console.log(cardData)

function retrieveImmediate(uid) {

    const currUser = uid;
    var firebaseRef = firebase.database().ref();
    var immidiateFamilyRef = firebaseRef.child('immediate_family');
    var eventsPrivacyRef = firebaseRef.child('events_privacy').child('Immediate');
    var eventsRef = firebaseRef.child('events')
    var immidiatedId = firebaseRef.child('users').child(currUser).child('familyId');

    immidiatedId.once('value').then(function(snapshot) {
        immidiatedId = snapshot.val();
        immidiateFamilyRef.child(immidiatedId).once('value')
            .then(function(data) {
                // console.log(data.val())
                immidiate_family.push(data.val())
                data.forEach(function(childDataKeys) {
                    // console.log(childDataKeys.key)
                    if (childDataKeys.key == "brother") {
                        // console.log(childDataKeys.val())
                        childDataKeys.forEach(function(brother) {
                            eventsPrivacyRef.child(brother.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        eventsRef.child(data2.val()).child(data2.val()).once('value')
                                            .then(function(data) {
                                                cardData.push(data.val())
                                                clanRenderCards(currUser)
                                            })
                                    })
                                })
                        })
                    } else if (childDataKeys.key == "sister") {
                        // console.log(childDataKeys.val())
                        childDataKeys.forEach(function(sister) {
                            eventsPrivacyRef.child(sister.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        eventsRef.child(data2.val()).child(data2.val()).once('value')
                                            .then(function(data) {
                                                cardData.push(data.val())
                                                clanRenderCards(currUser)
                                            })
                                    })
                                })
                        })

                    } else if (childDataKeys.key == "son") {
                        // console.log(childDataKeys.val())
                        childDataKeys.forEach(function(son) {
                            eventsPrivacyRef.child(son.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        eventsRef.child(data2.val()).child(data2.val()).once('value')
                                            .then(function(data) {
                                                cardData.push(data.val())
                                                clanRenderCards(currUser)
                                            })
                                    })
                                })
                        })
                    } else if (childDataKeys.key == "daughter") {
                        // console.log(childDataKeys.val())
                        childDataKeys.forEach(function(daughter) {
                            eventsPrivacyRef.child(daughter.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        eventsRef.child(data2.val()).child(data2.val()).once('value')
                                            .then(function(data) {
                                                cardData.push(data.val())
                                                clanRenderCards(currUser)
                                            })
                                    })
                                })
                        })
                    } else if (childDataKeys.key == "wife") {
                        // console.log(childDataKeys.val())
                        childDataKeys.forEach(function(wife) {
                            eventsPrivacyRef.child(wife.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        eventsRef.child(data2.val()).child(data2.val()).once('value')
                                            .then(function(data) {
                                                cardData.push(data.val())
                                                clanRenderCards(currUser)
                                            })
                                    })
                                })
                        })
                    } else if (childDataKeys.key == "husband") {
                        // console.log(childDataKeys.val())
                        childDataKeys.forEach(function(husband) {
                            eventsPrivacyRef.child(husband.val()).once('value')
                                .then(function(snap) {
                                    snap.forEach(function(data2) {
                                        eventsRef.child(data2.val()).child(data2.val()).once('value')
                                            .then(function(data) {
                                                cardData.push(data.val())
                                                clanRenderCards(currUser)
                                            })
                                    })
                                })
                        })
                    } else if (childDataKeys.key == "father") {
                        // console.log(childDataKeys.val())
                        eventsPrivacyRef.child(childDataKeys.val()).once('value')
                            .then(function(snap) {
                                snap.forEach(function(data2) {
                                    eventsRef.child(data2.val()).child(data2.val()).once('value')
                                        .then(function(data) {
                                            cardData.push(data.val())
                                            clanRenderCards(currUser)
                                        })
                                })
                            })
                    } else if (childDataKeys.key == "mother") {
                        // console.log(childDataKeys.val())
                        eventsPrivacyRef.child(childDataKeys.val()).once('value')
                            .then(function(snap) {
                                snap.forEach(function(data2) {
                                    eventsRef.child(data2.val()).child(data2.val()).once('value')
                                        .then(function(data) {
                                            cardData.push(data.val())
                                            clanRenderCards(currUser)
                                        })
                                })
                            })
                    } else if (childDataKeys.key == "user") {
                        // console.log(childDataKeys.val())
                        eventsPrivacyRef.child(childDataKeys.val()).once('value')
                            .then(function(snap) {
                                snap.forEach(function(data2) {
                                    eventsRef.child(data2.val()).child(data2.val()).once('value')
                                        .then(function(data) {
                                            cardData.push(data.val())
                                            clanRenderCards(currUser)
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
    var eventsPrivacyRef = firebaseRef.child('events_privacy').child('Extended');
    var eventsRef = firebaseRef.child('events')
    var extendedId = firebaseRef.child('users').child(currUser).child('extendedId');

    extendedId.once('value').then(function(snapshot) {
        extendedId = snapshot.val();
        extendedFamilyRef.child(extendedId).once('value')
            .then(function(data) {
                extended_family.push(data.val())
                data.forEach(function(childDataKeys) {
                    eventsPrivacyRef.child(childDataKeys.val()).once('value')
                        .then(function(snap) {
                            snap.forEach(function(data2) {
                                eventsRef.child(data2.val()).child(data2.val()).once('value')
                                    .then(function(data) {
                                        cardData.push(data.val())
                                        clanRenderCards(currUser)
                                    })
                            })
                        })
                })
            })
    })
}

function clanRenderCards(uid) {

    // console.log(cardData)
    const currUser = uid;
    var html = '';

    $.each(cardData, function(key, value) {

        if (value.uid != currUser) {

            html += '<div class="card text-center"><div class="card-header"></div><div class="card-body col-xs-3"><img class="img" style="max-width:200px; max-height:200px; width: auto; height: auto;"  src="' + value.event_cover + '" /><h4 class="card-title" style="text-align: center;"><a>' + value.Event + '</a></h4></div><div class="card-footer text-muted"><h4><div class="card-title col-xs-5" style="font-family: Sans-serif;">' + value.Title + '<h5>' + value.Description + '</h5><h5 style="font-family: Sans-serif; font-size: 15px;"><i class="material-icons">location_on</i>' + value.Venue + '<br><i class="material-icons">schedule</i>' + value.Date + ' · ' + value.Time + '<br>by ' + value.uName + '</h5></div></h4><br><div class="col-xs-3"  style="width: 200px;  right: -120px;"><label class="control-label" style=" right: 20px;">Response</label><select id="' + value.event_key + '" onclick="responseEvent(this.value, this.id)" class="form-control" required ><option value=""></option><option value="Going"> Going </option><option value="Maybe">Maybe</option><option value="Not Going">Not Going</option></select><br><button href="#pablo" class="btn btn-primary btn-just-icon btn-fill btn-round" data-toggle="modal" data-target="#smallAlertModal"><i class="material-icons" id="' + key + '" onclick="validateResponse(this.id)" data-toggle="modal" data-target=".bd-example-modal-sm">format_list_bulleted</i></button><br></div></div>';
            // html += ' <div class="rotating-card-container manual-flip col-xs-3" style="width:400px; height:400px"><div class="card card-rotate"><div class="front"><div class="card-content"><h5 style="text-align: center; font-family: Sans-serif; font-size: 20px;  font-weight: bold;"><div class="card-image"><a href="#pablo"><div class="atvImg"><img class="img" src="' + value.event_cover + '"  /></div></a>' + value.uName + '</h5><h4 class="card-title" style="text-align: center;"><a href="#pablo">' + value.Event + '</a></h4><p class="card-description" style="text-align: center;">' + value.Title + '</p><div class="footer text-center"><button type="button" name="button" class="btn btn-danger btn-fill btn-round btn-just-icon btn-rotate"><i class="material-icons">refresh</i></button></div></div></div><div class="back"><div class="card-content"><br><p class="card-description">' + value.Description + ' <p class="card-description"><i class="material-icons">location_on</i>' + value.Venue + '<br><i class="material-icons">schedule</i>' + value.Date + ' - ' + value.Time + '</p></p><div class="form-group label-floating" style="width: 100px;  right: -120px;"><label class="control-label" style=" right: 20px;">Response</label><select id="' + value.event_key + '" onclick="responseEvent(this.value, this.id)" class="form-control" required ><option value=""></option><option value="Going"> Going </option><option value="Not Going">Not Going</option></select><span class="material-input"></span></div><div class="footer text-center"><button type="button" name="button" class="btn btn-simple btn-round btn-rotate"><i class="material-icons">refresh</i> Back...</button></div></div></div></div></div>';

            html += '</div>';
        } else {

            html += '<div class="card text-center"><div class="card-header"></div><div class="card-body col-xs-3"><img class="img" style="max-width:200px; max-height:200px; width: auto; height: auto;" src="' + value.event_cover + '" /><h4 class="card-title" style="text-align: center;"><a>' + value.Event + '</a></h4></div><div class="card-footer text-muted"><h4><div class="card-title col-xs-5" style="font-family: Sans-serif;">' + value.Title + '<h5>' + value.Description + '</h5><h5 style="font-family: Sans-serif; font-size: 15px;"><i class="material-icons">location_on</i>' + value.Venue + '<br><i class="material-icons">schedule</i>' + value.Date + ' · ' + value.Time + '<br>by ' + value.uName + '</h5></div></h4><br><button href="#pablo" class="btn btn-success btn-just-icon btn-fill btn-round btn-wd"><i class="material-icons" data-toggle="modal" data-target="#myModal" id="' + key + '" onClick="validateUpdate(this.id)">mode_edit</i></button><br><br><button href="#pablo" class="btn btn-danger btn-just-icon btn-fill btn-round" data-toggle="modal" data-target="#smallAlertModal"><i class="material-icons" id="' + key + '" onclick="deleteClick(this.id)">delete</i></button><br><br><button href="#pablo" class="btn btn-primary btn-just-icon btn-fill btn-round" data-toggle="modal" data-target="#smallAlertModal"><i class="material-icons" id="' + key + '" onclick="validateResponse(this.id)" data-toggle="modal" data-target=".bd-example-modal-sm">format_list_bulleted</i></button><br></br></div></div>';
            // html += ' <div class="rotating-card-container manual-flip col-xs-3" style="width:400px; height:400px"><div class="card card-rotate"><div class="front"><div class="card-content"><h5 style="text-align: center; font-family: Sans-serif; font-size: 20px;  font-weight: bold;"><div class="card-image"><a href="#pablo"><div class="atvImg"><img class="img" src="' + value.event_cover + '" /></div></a>' + value.uName + '</h5><h4 class="card-title" style="text-align: center;"><a href="#pablo">' + value.Event + '</a></h4><p class="card-description" style="text-align: center;">' + value.Title + '</p><div class="footer text-center"><button type="button" name="button" class="btn btn-danger btn-fill btn-round btn-just-icon btn-rotate"><i class="material-icons">refresh</i></button></div></div></div><div class="back"><div class="card-content"><br><p class="card-description">' + value.Description + ' <p class="card-description"><i class="material-icons">location_on</i>' + value.Venue + '<br><i class="material-icons">schedule</i>' + value.Date + ' - ' + value.Time + '</p></p><div class="footer text-center"><button href="#pablo" class="btn btn-success btn-just-icon btn-fill btn-round btn-wd"><i class="material-icons" data-toggle="modal" data-target="#myModal" id="' + key + '" onClick="validateUpdate(this.id)">mode_edit</i></button><button href="#pablo" class="btn btn-danger btn-just-icon btn-fill btn-round" data-toggle="modal" data-target="#smallAlertModal"><i class="material-icons" id="' + key + '" onclick="deleteClick(this.id)">delete</i></button><button href="#pablo" class="btn btn-primary btn-just-icon btn-fill btn-round" data-toggle="modal" data-target="#smallAlertModal"><i class="material-icons" id="' + key + '" onclick="validateResponse(this.id)" data-toggle="modal" data-target=".bd-example-modal-sm">format_list_bulleted</i></button><br></br><button type="button" name="button" class="btn btn-simple btn-round btn-rotate"><i class="material-icons">refresh</i>Back...</button></div></div></div></div></form></div>';

            html += '';

        }

    });

    $('#card-container').html(html);

}

function responseEvent(response, eventKey) {

    const firebaseRef = firebase.database().ref();
    var currentUser = firebase.auth().currentUser.uid;
    console.log(response)

    if (response == "Going") {
        firebaseRef
            .child("event_response")
            .child(eventKey)
            .child(response)
            .child(currentUser)
            .set(currentUser);

        firebaseRef.child("event_response").child(eventKey).child("Maybe").child(currentUser).remove()
        firebaseRef.child("event_response").child(eventKey).child("Not Going").child(currentUser).remove()
    } else if (response == "Maybe") {
        firebaseRef
            .child("event_response")
            .child(eventKey)
            .child(response)
            .child(currentUser)
            .set(currentUser);

        firebaseRef.child("event_response").child(eventKey).child("Going").child(currentUser).remove()
        firebaseRef.child("event_response").child(eventKey).child("Not Going").child(currentUser).remove()
    } else if (response == "Not Going") {
        firebaseRef
            .child("event_response")
            .child(eventKey)
            .child(response)
            .child(currentUser)
            .set(currentUser);

        firebaseRef.child("event_response").child(eventKey).child("Going").child(currentUser).remove()
        firebaseRef.child("event_response").child(eventKey).child("Maybe").child(currentUser).remove()
    }

}

function goingList(clicked_key) {

    const firebaseRef = firebase.database().ref();
    var currentUser = firebase.auth().currentUser.uid;
    var users = firebaseRef.child('users');
    var immediatedId = firebaseRef.child('users').child(currentUser).child('familyId');
    var extendedId = firebaseRef.child('users').child(currentUser).child('extendedId');
    var immediateFamilyRef = firebaseRef.child('immediate_family');
    var extendedFamilyRef = firebaseRef.child('extended_family');
    console.log(clicked_key.Privacy)
    var names = [];



    if (clicked_key.Privacy == "Immediate") {

        immediatedId.once('value').then(function(snapshot) {
            immediatedId = snapshot.val();
            immediateFamilyRef.child(immediatedId).once('value')
                .then(function(data) {
                    data.forEach(function(childDataKeys) {

                        if (childDataKeys.key == "brother") {

                            childDataKeys.forEach(function(brother) {
                                users.child(brother.val()).once('value')
                                    .then(function(snap) {
                                        names.push(snap.val())

                                        return viewResponse(names, clicked_key)

                                    })
                            })
                        } else if (childDataKeys.key == "sister") {

                            childDataKeys.forEach(function(sister) {
                                users.child(sister.val()).once('value')
                                    .then(function(snap) {
                                        names.push(snap.val())

                                        return viewResponse(names, clicked_key)

                                    })
                            })
                        } else if (childDataKeys.key == "son") {

                            childDataKeys.forEach(function(son) {
                                users.child(son.val()).once('value')
                                    .then(function(snap) {
                                        names.push(snap.val())

                                        return viewResponse(names, clicked_key)

                                    })
                            })
                        } else if (childDataKeys.key == "daughter") {

                            childDataKeys.forEach(function(daughter) {
                                users.child(daughter.val()).once('value')
                                    .then(function(snap) {
                                        names.push(snap.val())

                                        return viewResponse(names, clicked_key)

                                    })
                            })
                        } else if (childDataKeys.key == "husband") {

                            childDataKeys.forEach(function(husband) {
                                users.child(husband.val()).once('value')
                                    .then(function(snap) {
                                        names.push(snap.val())

                                        return viewResponse(names, clicked_key)

                                    })
                            })
                        } else if (childDataKeys.key == "wife") {

                            childDataKeys.forEach(function(wife) {
                                users.child(wife.val()).once('value')
                                    .then(function(snap) {
                                        names.push(snap.val())

                                        return viewResponse(names, clicked_key)

                                    })
                            })
                        } else if (childDataKeys.key == "father") {

                            users.child(childDataKeys.val()).once('value')
                                .then(function(snap) {
                                    names.push(snap.val())

                                    return viewResponse(names, clicked_key)

                                })

                        } else if (childDataKeys.key == "mother") {

                            users.child(childDataKeys.val()).once('value')
                                .then(function(snap) {
                                    names.push(snap.val())

                                    return viewResponse(names, clicked_key)

                                })
                        } else if (childDataKeys.key == "user") {

                            users.child(childDataKeys.val()).once('value')
                                .then(function(snap) {
                                    names.push(snap.val())

                                    return viewResponse(names, clicked_key)

                                })
                        }
                    })

                })
        })

    } else if (clicked_key.Privacy == "Extended") {

        extendedId.once('value').then(function(snapshot) {
            extendedId = snapshot.val();
            extendedFamilyRef.child(extendedId).once('value')
                .then(function(data) {
                    data.forEach(function(childDataKeys) {
                        users.child(childDataKeys.val()).once('value')
                            .then(function(snap) {
                                names.push(snap.val())

                                return viewResponse(names, clicked_key)

                            })
                    })

                })
        })

    }

}

function viewResponse(names, clicked_key) {

    const firebaseRef = firebase.database().ref();
    var going = '';
    var maybe = '';
    var notGoing = '';

    firebaseRef.child('event_response').child(clicked_key.event_key).child('Going').once('value')
        .then(function(snap) {

            snap.forEach(function(res) {

                var resG = res.val();

                $.each(names, function(key, value) {
                    
                    if (resG.indexOf(value.key) != -1) {

                        going += '<img src="' + value.photoURL + '" alt="Circle Image" style="width:40px; height:40px" class="img-circle">&emsp;' + value.displayName + ' <p style="color: green;"> Going</p><br><br>';
                    }

                })

                $('#going').html(going);

            })

            firebaseRef.child('event_response').child(clicked_key.event_key).child('Maybe').once('value')
                .then(function(snap) {

                    snap.forEach(function(res) {

                        var resM = res.val();

                        
                        $.each(names, function(key, value) {

                            if (resM.indexOf(value.key) != -1) {

                                maybe += '<img src="' + value.photoURL + '" alt="Circle Image" style="width:40px; height:40px" class="img-circle">&emsp;' + value.displayName + ' <p style="color: orange;">Maybe</p><br><br>';
                            }

                        })

                        $('#maybe').html(maybe);
                    })

                })
            firebaseRef.child('event_response').child(clicked_key.event_key).child('Not Going').once('value')
                .then(function(snap) {

                    snap.forEach(function(res) {

                        var resNG = res.val();
                       
                        $.each(names, function(key, value) {
                            
                            if (resNG.indexOf(value.key) != -1) {

                                notGoing += '<img src="' + value.photoURL + '" alt="Circle Image" style="width:40px; height:40px" class="img-circle">&emsp;' + value.displayName + ' <p style="color: red;">Not Going</p><br><br>';
                            }

                        })

                        $('#notGoing').html(notGoing);
                    })

                })
        })
}

function deleteClick(clicked_key) {

    var clicked_event = cardData[clicked_key];
    console.log(clicked_event.Privacy)

    var currentUser = firebase.auth().currentUser.uid;
    const firebaseRef = firebase.database().ref();

    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this event!",
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((isConfirm) => {
        if (isConfirm) {
            firebase.storage().ref(clicked_event.event_cover_link).delete();
            firebaseRef.child('events').child(clicked_event.event_key).child(clicked_event.event_key).remove();
            firebaseRef.child('events_privacy').child(clicked_event.Privacy).child(currentUser).child(clicked_event.event_key).remove();
            firebaseRef.child("event_response").child(clicked_event.event_key).remove();
            return window.location.replace("http://localhost:8000/events");
            

        }
        else if (isCancel){

           swal("wohooo", "Your imaginary file is safe :)", "error");
        }
    })


}


function eventUpdate(clicked_key) {

    var clicked_event = cardData[clicked_key];
    var eventKey = '';
    var title = '';
    var desc = '';
    var event = '';
    var venue = '';
    var date = '';
    var time = '';

    console.log(clicked_event.Title)

    eventKey += '<input id="eventKey" name="eventKey" type="text" class="form-control" value="' + clicked_event.event_key + '" style="display:none;">'

    $('#eventKeyy').html(eventKey);

    title += '<label class="control-label"></small></label><input id="eventTitle" name="eventTitle" type="text" class="form-control" value="' + clicked_event.Title + '">';

    $('#title').html(title);

    desc += '<label class="control-label"></small></label><input id="desc" name="description" type="text" class="form-control" value="' + clicked_event.Description + '">';

    $('#descc').html(desc);

    if (clicked_event.Event == 'Birthday') {

        event += '<label class="control-label"></label><select id="eventSlct" class="form-control" required ><option value=""></option><option value="Birthday" selected> Birthday </option><option value="Obituary">Obituary</option><option value="Wedding">Wedding</option><option value="Baptism">Baptism</option><option value="...">...</option></select>';

    } else if (clicked_event.Event == 'Obituary') {
        event += '<label class="control-label"></label><select id="eventSlct" class="form-control" required ><option value=""></option><option value="Birthday"> Birthday </option><option value="Obituary" selected>Obituary</option><option value="Wedding">Wedding</option><option value="Baptism">Baptism</option><option value="...">...</option></select>';

    } else if (clicked_event.Event == 'Wedding') {
        event += '<label class="control-label"></label><select id="eventSlct" class="form-control" required ><option value=""></option><option value="Birthday" > Birthday </option><option value="Obituary">Obituary</option><option value="Wedding" selected>Wedding</option><option value="Baptism">Baptism</option><option value="...">...</option></select>';

    } else {

        event += '<label class="control-label"></label><select id="eventSlct" class="form-control" required ><option value=""></option><option value="Birthday" > Birthday </option><option value="Obituary">Obituary</option><option value="Wedding">Wedding</option><option value="Baptism" selected>Baptism</option><option value="...">...</option></select>';

    }
    $('#event').html(event);

    venue += '<div class="form-group label-floating"><i class="material-icons">location_on</i><label for="Venue" class="control-label"></label><input id="venue" name="venue" type="text" class="form-control" value="' + clicked_event.Venue + '"></div>';

    $('#venue1').html(venue);

    date += ' <div class="input-group"><span class="input-group-addon"><i class="material-icons">calendar_today</i></span><input id="Date" name="Date" type="text" class="datepicker form-control" autocomplete="off" value="' + clicked_event.Date + '"required></div></div>';

    $('#date').html(date);

    time += '<input id="time" type="text" placeholder="Time" class="datetimepicker form-control" value="' + clicked_event.Time + '" autocomplete="off">';

    $('#timee').html(time);

}

function responseCount(clicked_key) {

    const firebaseRef = firebase.database().ref();
    var goingCounter = '';
    var maybeCounter = '';
    var notGoingCounter = '';

    firebaseRef.child('event_response').child(clicked_key.event_key).child('Going').once('value')
        .then(function(snap) {

            var count = snap.numChildren();

            goingCounter += 'Going(' + count + ')';


            $('#goingCounter').html(goingCounter);
        })

    firebaseRef.child('event_response').child(clicked_key.event_key).child('Maybe').once('value')
        .then(function(snap) {

            var count = snap.numChildren();

            maybeCounter += 'Maybe(' + count + ')';


            $('#maybeCounter').html(maybeCounter);
        })

    firebaseRef.child('event_response').child(clicked_key.event_key).child('Not Going').once('value')
        .then(function(snap) {

            var count = snap.numChildren();

            notGoingCounter += 'Not Going(' + count + ')';


            $('#notGoingCounter').html(notGoingCounter);
        })
}

function validateResponse(clicked_key) {
    var selected_event = cardData[clicked_key]

    $('#responseModal').modal('show');
    goingList(selected_event)
    responseCount(selected_event)

}

function validateUpdate(clicked_key) {
    var selected_event = cardData[clicked_key]

    $('#updateModal').modal('show');
    eventUpdate(clicked_key)

}