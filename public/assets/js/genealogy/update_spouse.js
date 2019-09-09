var userData; 

function updateSpouseModal(data) {
    console.log('update spouse')
    userData = data; 
    
    var template = null
    $('#modal_update_parent').on('show.bs.modal', function (event) {
        if (template == null) {
            template = $(this).html()
        } else {
            $(this).html(template)
        }
    })

    $("#modal_update_spouse")
        .modal('show');
    
    $("#modal_update_spouse_title")
        .empty()
        .append('Update Details of ' + data.displayName);
    
    if (!(data.photoURL === null || data.photoURL === undefined)) {
        $("#update_spouse_pic_view")
            .attr("src", data.photoURL);
    } else {
        $("#update_spouse_pic_view")
            .empty();
    }

    $("#update_spouse_first_name")
        .empty()
        .attr("value", data.firstName);
    
    if (data.middleName !== undefined || data.middleName !== null) {
        $("#update_spouse_middle_name")
            .empty()
            .attr("value", data.middleName);
    } else {
        $("#update_spouse_middle_name")
            .empty();
    }

    $("#update_spouse_last_name")
        .empty()
        .attr("value", data.lastName);
    
    if (data.gender === "male") {
        $('#update_spouse_gender')
            .val("male").change();
    } else {
        $('#update_spouse_gender')
            .val("female").change();
    }

    if (data.livingStatus === "living") {
        $('#update_spouse_living_status')
            .val("living").change();
    } else {
        $('#update_spouse_living_status')
            .val("deceased").change();
    }

    if (data.email !== undefined || data.email !== null) {
        $("#update_spouse_email")
            .empty()
            .attr("value", data.email);
    } else {
        $("#update_spouse_email")
            .empty();
    }
    
    $('#update_spouse_birth_date')
        .empty()
        .attr("value", data.birthDate);

    if (data.birthPlace !== undefined || data.birthPlace !== null) {
        $("#update_spouse_birth_place")
            .empty()
            .attr("value", data.birthPlace);
    } else {
        $("#update_spouse_birth_place")
            .empty();
    }

    $('#update_spouse').click(function() {
        updateSpouse(data);
    })
}

function updateSpouse(data, downloadURL, picLink) {
    var photoPic = $('#update_spouse_pic').attr('src');
    var firstName = $("#update_spouse_first_name").val();
    var middleName = $("#update_spouse_middle_name").val();
    var lastName = $("#update_spouse_last_name").val();
    var gender = $("#update_spouse_gender").val();
    var livingStatus = $("#update_spouse_living_status").val();
    var email = $("#update_spouse_email").val();
    var birthDate = $('#update_spouse_birth_date').val();
    var birthPlace = $('#update_spouse_birth_place').val();
    var registered = data.registered;
    var maritalStatus = $("#update_spouse_relationship").val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        registered: registered,
        maritalStatus: maritalStatus,
    };

    if (downloadURL !== undefined) {
        person.photoURL = downloadURL
        person.photoLink = picLink
    } else if (photoPic !== undefined) {
        person.photoURL = photoPic;
        person.photoLink = picLink
    } else {
        console.log('no image');
    }

    if (middleName.length > 0) {
        person.middleName = middleName;
    }

    if (email.length > 0) {
        person.email = email;
    }

    if (birthPlace.length > 0) {
        person.birthPlace = birthPlace;
    }

    if (
        person.firstName == "" ||
        person.lastName == "" ||
        person.gender == null ||
        person.livingStatus == null ||
        person.birthDate == "" ||
        person.maritalStatus == null 
    ) {
        $("#error_details")
            .modal('show');
        
        $("#error_details_node")
            .empty()
            .append('Required fields are empty.');
        
        setTimeout(function() {
            $("#error_details").modal('hide');
        }, 1000);

        setTimeout(function() {
            $("#modal_update_spouse").modal('show');
        }, 1000);
    }
    else {
        usersRef.child(data.key).update(person);
        usersRef.child(data.key).child("ms").child(currentUser.uid).set(maritalStatus);
        usersRef.child(currentUser.uid).child("ms").child(data.key).set(maritalStatus);
        showUpdate();
        setTimeout(function() {
            return location.reload();
        }, 2000);
    }
}

function handleSpouseUpdatePic(eventData){
    var file = eventData.target.files[0];
    var fileExtension = file.name.split(".").pop();
    var picKey = FIREBASE_DATABASE.ref().child('url_display_pics').child(currentUser.uid).push().getKey();
    var fileNameOnStorage = picKey + '.' + fileExtension;
    var picLink = 'PROFILE-PICS/' + fileNameOnStorage
    var storageRef = FIREBASE_STORAGE.ref(picLink);

    if(file.size <= 100000) {
        if(userData.photoLink !== undefined && userData.photoURL !== undefined) {
            firebase.storage().ref(userData.photoLink).delete();
            usersRef.child(userData.key).child('photoLink').remove()
            usersRef.child(userData.key).child('photoURL').remove()
            console.log('deleted and removed')
            uploadPic()
        } else {
            uploadPic()
        }

        function uploadPic() {
            var submit_spouse_btn = '<button id="update_spouse_pic" type="button" class="btn btn-success add" data-dismiss="modal">Save</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';
            $('#update_footer_spouse').html(submit_spouse_btn);

            $('#update_spouse_pic').click(function() {    
                var task = storageRef.put(file);
                console.log('stored')
                task.on('state_changed',
                    function complete() {
                        downloadURL = task.snapshot.downloadURL;

                        swal({
                            imageUrl: "assets/img/icons/loader.gif",
                            imageWidth: '90',
                            imageHeight: '90',
                            title: 'Processing Information',
                            text: "This might take a while..",
                            timer: 5000,
                            showConfirmButton: false
                        }).then(function(){},
                            function(dismiss) {
                                if (dismiss === "timer") {
                                    updateSpouse(userData, downloadURL, picLink);
                                }
                            })
                    })
            })
        }
    } else {
        console.log('photo size too large')
    }
}

function handleSpouseRemovePic() {
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this photo!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((isConfirm) => {
        if (isConfirm) {
            delPic()
        }
    })

    function delPic() {
       firebase.storage().ref(userData.photoLink).delete();
       usersRef.child(userData.key).child('photoLink').remove()
       usersRef.child(userData.key).child('photoURL').remove()
       showSuccessPhotoDelete()
       console.log('photo deleted')
    }
}
