var userData; 

function updateChildModal(data) {
    console.log('update child')
    userData = data;
    
    var template = null
    $('#modal_update_parent').on('show.bs.modal', function (event) {
        if (template == null) {
            template = $(this).html()
        } else {
            $(this).html(template)
        }
    })

    $("#modal_update_child")
        .modal('show');
    
    $("#modal_update_child_title")
        .empty()
        .append('Update Details of ' + data.displayName);
    
    if (!(data.photoURL === null || data.photoURL === undefined)) {
        $("#update_child_pic_view")
            .attr("src", data.photoURL);
    } else {
        $("#update_child_pic_view")
            .empty();
    }

    $("#update_child_first_name")
        .empty()
        .attr("value", data.firstName);
    
    if (data.middleName !== undefined || data.middleName !== null) {
        $("#update_child_middle_name")
            .empty()
            .attr("value", data.middleName);
    } else {
        $("#update_child_middle_name")
            .empty();
    }

    $("#update_child_last_name")
        .empty()
        .attr("value", data.lastName);
    
    if (data.gender === "male") {
        $('#update_child_gender')
            .val("male").change();
    } else {
        $('#update_child_gender')
            .val("female").change();
    }

    if (data.livingStatus === "living") {
        $('#update_child_living_status')
            .val("living").change();
    } else {
        $('#update_child_living_status')
            .val("deceased").change();
    }

    if (data.email !== undefined || data.email !== null) {
        $("#update_child_email")
            .empty()
            .attr("value", data.email);
    } else {
        $("#update_child_email")
            .empty();
    }
    
    $('#update_child_birth_date')
        .empty()
        .attr("value", data.birthDate);

    if (data.birthPlace !== undefined || data.birthPlace !== null) {
        $("#update_child_birth_place")
            .empty()
            .attr("value", data.birthPlace);
    } else {
        $("#update_child_birth_place")
            .empty();
    }

    if (data.parenthood === "biological") {
        $('#update_child_parenthood')
            .val("biological").change();
    } else {
        $('#update_child_parenthood')
            .val("adopted").change();
    }

    if(currentUserGender == "female") {
        if(data.f) document.getElementById(data.f).checked = true;
        else document.getElementById(currentUser.uid).checked = true;
    } else {
        if(data.m) document.getElementById(data.m).checked = true;
        else document.getElementById(currentUser.uid).checked = true;
    }

    $('#update_child').click(function() {
        updateChild(data);
    })
}

function updateChild(data, downloadURL, picLink) {
    var photoPic = $('#update_child_pic').attr('src');
    var firstName = $("#update_child_first_name").val();
    var middleName = $("#update_child_middle_name").val();
    var lastName = $("#update_child_last_name").val();
    var gender = $("#update_child_gender").val();
    var livingStatus = $("#update_child_living_status").val();
    var email = $("#update_child_email").val();
    var birthDate = $('#update_child_birth_date').val();
    var birthPlace = $('#update_child_birth_place').val();
    var registered = data.registered;
    var parenthood = $('#update_child_parenthood').val();
    var parentSpouseKey3 = $(`input[name='availableParents3']:checked`).val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        registered: registered,
        parenthood: parenthood,
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

    if (parentSpouseKey3 === currentUser.uid && currentUserGender === 'male') {
        usersRef.child(data.m).child("children").child(data.key).remove();
        usersRef.child(data.key).child("m").remove();
        person.f = currentUser.uid;
    } else if (parentSpouseKey3 === currentUser.uid && currentUserGender === 'female') {
        usersRef.child(data.f).child("children").child(data.key).remove();
        usersRef.child(data.key).child("f").remove();
        person.m = currentUser.uid;
    } else if (parentSpouseKey3 !== currentUser.uid && currentUserGender === 'male') {
        person.f = currentUser.uid;
        person.m = parentSpouseKey3;
    } else if (parentSpouseKey3 !== currentUser.uid && currentUserGender === 'female') {
        person.f = parentSpouseKey3;
        person.m = currentUser.uid;
    }

    if (
        person.firstName == "" ||
        person.lastName == "" ||
        person.gender == null ||
        person.livingStatus == null ||
        person.birthDate == "" ||
        person.parenthood == null ||
        parentSpouseKey3 == null        
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
            $("#modal_update_child").modal('show');
        }, 1000);
    }
    else {
        usersRef.child(data.key).update(person);
        showUpdate();
        setTimeout(function() {
            return location.reload();
        }, 2000);
    }
}

function handleChildUpdatePic(eventData){
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
        } else{
            uploadPic()
        }

        function uploadPic() {
            var submit_user_btn = '<button id="update_child_pic" type="button" class="btn btn-success add" data-dismiss="modal">Save</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';
            $('#update_footer_child').html(submit_user_btn);

            $('#update_child_pic').click(function() {
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
                                    updateChildModal(userData, downloadURL, picLink);
                                }
                            })
                        })
            })
        }
    } else {
        console.log('photo size too large')
    }
}

function handleChildRemovePic() {
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