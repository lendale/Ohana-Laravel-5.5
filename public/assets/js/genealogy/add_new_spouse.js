function addSpouse(downloadURL) {
    var firstName = $("#spouse_first_name").val();
    var middleName = $("#spouse_middle_name").val();
    var lastName = $("#spouse_last_name").val();
    var gender = $("#spouse_gender").val();
    var livingStatus = $("#spouse_living_status").val();
    var email = $("#spouse_email").val();
    var birthDate = $('#spouse_birth_date').val();
    var birthPlace = $('#spouse_birth_place').val();
    var maritalStatus = $("#spouse_relationship").val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        maritalStatus: maritalStatus,
    };

    if (downloadURL !== undefined){
        person.photoURL = downloadURL
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
        }, 3000);
    } else {
        usersRef.orderByChild("displayName").equalTo(person.displayName).once("value", snap => {
            if (snap.exists()) {
                const userData = snap.val();
                console.log("exists!", snap.val());
                $("#modal_add_spouse").modal('hide');

                for (const prop in userData) {
                    console.log(userData[prop]);
                    $('#modal_add_choice').modal('show');
                    $("#search_bar").hide();
                    $("#search_found").show();
                    $("#search_found2").show();
                    $("#search_found3").show();

                    $("#search_first_name")
                        .empty()
                        .attr("value", userData[prop].firstName);
                    $("#search_last_name")
                        .empty()
                        .attr("value", userData[prop].lastName);
                    $("#seach_email")
                        .empty()
                        .attr("value", userData[prop].email);
                    $("#search_birth_date")
                        .empty()
                        .attr("value", userData[prop].birthDate);

                    $('#search_confirm').click(function() {
                        displayExistingSpouse(userData[prop])
                    })

                    $('#search_disconfirm').click(function() {
                        disconfirmSaveButtonSpouse(person);
                    })
                }
            }
            else {
                console.log("non!");
                if (person.gender === "male") {
                    person.relationship = "husband";
                    person.registered = false;
                    userFamilyRef.child(currentUser.uid).child('husbands').push(person);
                    showSuccess();
                    setTimeout(function() {
                        return location.reload();
                    }, 5000);
                    return true;
                } else {
                    person.relationship = "wife";
                    person.registered = false;
                    userFamilyRef.child(currentUser.uid).child('wives').push(person);
                    showSuccess();
                    setTimeout(function() {
                        return location.reload();
                    }, 5000);
                    return true;
                }
            }
        });
    }
}

function disconfirmSaveButtonSpouse(person) {
    console.log('disconfirm save')
    if (person.gender === "male") {
        person.relationship = "husband";
        person.registered = false;
        userFamilyRef.child(currentUser.uid).child('husbands').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
        return true;
    } else {
        person.relationship = "wife";
        person.registered = false;
        userFamilyRef.child(currentUser.uid).child('wives').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
        return true;
    }
}

function handleSpousePic(eventData) {
    uid = firebase.auth().currentUser.uid;
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    var spousePicKey = firebase.database().ref().child('spouse').push().getKey();
    var fileNameOnStorage = spousePicKey + '.' + fileExtension;
    var PicStorageRef = FIREBASE_STORAGE.ref('PROFILE-PICS/' + fileNameOnStorage);

    if(file.size <= 100000) {
        var submit_spouse = '<button id="save_spousewithPhoto" type="button" class="btn btn-success add" data-dismiss="modal">Save With Photo</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';
        $('#submit_spouse_btn').html(submit_spouse);

        console.log('FILE:', file)
        console.log('FILENAME:', fileName)
        console.log('FILE EXTENSION:', fileExtension)

        $('#save_spousewithPhoto').click(function() {
            var task = PicStorageRef.put(file);
            task.on('state_changed',
            function complete() {
                var downloadURL = task.snapshot.downloadURL;
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
                            addSpouse(downloadURL);
                        }
                    })
                })
        })
    } else {
        showPhotoError()
    }
}

function removeSpousePic() {
    var save_photo_btn  ='<button onclick="addSpouse()" type="button" class="btn btn-success add" data-dismiss="modal">Save Origggg</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';

    $('#submit_spouse_btn').html(save_photo_btn);
}