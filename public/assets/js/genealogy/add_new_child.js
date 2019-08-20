function addChild(downloadURL, picLink) {
    var firstName = $("#child_first_name").val();
    var middleName = $("#child_middle_name").val();
    var lastName = $("#child_last_name").val();
    var gender = $("#child_gender").val();
    var livingStatus = $("#child_living_status").val();
    var email = $('#child_email').val();
    var birthDate = $('#child_birth_date').val();
    var birthPlace = $('#child_birth_place').val();
    var parenthood = $('#child_parenthood').val();
    var parentSpouseKey = $(`input[name='availableParents']:checked`).val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        extendedId: memberExtId,
        familyId: memberImmId,
        parenthood: parenthood,
    };

    if (downloadURL !== undefined){
        person.photoURL = downloadURL
        person.photoLink = picLink
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

    if (parentSpouseKey === currentUser.uid && currentUserGender === 'male') {
        person.f = currentUser.uid;
    } else if (parentSpouseKey === currentUser.uid && currentUserGender === 'female') {
        person.m = currentUser.uid;
    } else if (parentSpouseKey !== currentUser.uid && currentUserGender === 'male') {
        person.f = currentUser.uid;
        person.m = parentSpouseKey;
    } else if (parentSpouseKey !== currentUser.uid && currentUserGender === 'female') {
        person.f = parentSpouseKey;
        person.m = currentUser.uid;
    }

    if (
        person.firstName == "" ||
        person.lastName == "" ||
        person.gender == null ||
        person.livingStatus == null ||
        person.birthDate == "" ||
        person.parenthood == null ||
        parentSpouseKey == null
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
                $("#modal_add_child").modal('hide');

                for (const prop in userData) {
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
                        displayExistingChild(userData[prop])
                    })

                    $('#search_disconfirm').click(function() {
                        disconfirmSaveButtonChild(person);
                    })
                }
            }
            else {
                console.log("non!");
                if (person.gender === "male") {
                    person.relationship = "son";
                    person.registered = false;
                    userFamilyRef.child(currentUser.uid).child('sons').push(person);
                    showSuccess();
                    setTimeout(function() {
                        return location.reload();
                    }, 7000);
                    return true;
                } else {
                    person.relationship = "daughter";
                    person.registered = false;
                    userFamilyRef.child(currentUser.uid).child('daughters').push(person);
                    showSuccess();
                    setTimeout(function() {
                        return location.reload();
                    }, 7000);
                    return true;
                }
            }
        });
    }
}

function disconfirmSaveButtonChild(person) {
    console.log('disconfirm save')
    if (person.gender === "male") {
        person.relationship = "son";
        person.registered = false;
        userFamilyRef.child(currentUser.uid).child('sons').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 7000);
        return true;
    } else {
        person.relationship = "daughter";
        person.registered = false;
        userFamilyRef.child(currentUser.uid).child('daughters').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 7000);
        return true;
    }
}

function handleChildPic(eventData) {
    uid = firebase.auth().currentUser.uid;
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    var childPicKey = firebase.database().ref().child('child').push().getKey();
    var fileNameOnStorage = childPicKey + '.' + fileExtension;
    var picLink = 'PROFILE-PICS/' + fileNameOnStorage;
    var PicStorageRef = FIREBASE_STORAGE.ref(picLink);

    if(file.size <= 100000) {
        var submit_child = '<button id="save_childwithPhoto" type="button" class="btn btn-success add" data-dismiss="modal">Save WIth Photo</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';
        $('#submit_child_btn').html(submit_child);

        console.log('FILE:', file)
        console.log('FILENAME:', fileName)
        console.log('FILE EXTENSION:', fileExtension)

        $('#save_childwithPhoto').click(function() {
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
                            addChild(downloadURL, picLink);
                        }
                    })
                })
        })
    } else {
        showPhotoError()
    }
}

function removeChildPic() {
    var save_photo_btn  ='<button onclick="addChild()" type="button" class="btn btn-success add" data-dismiss="modal">Save Origggg</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';

    $('#submit_child_btn').html(save_photo_btn);
}