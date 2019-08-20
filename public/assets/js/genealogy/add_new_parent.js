function addParent(downloadURL, picLink) {
    var firstName = $("#parent_first_name").val();
    var middleName = $("#parent_middle_name").val();
    var lastName = $("#parent_last_name").val();
    var gender = $("#parent_gender").val();
    var livingStatus = $("#parent_living_status").val();
    var email = $("#parent_email").val();
    var birthDate = $('#parent_birth_date').val();
    var birthPlace = $('#parent_birth_place').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        extendedId: memberExtId,
        familyId: memberImmId,
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

    if (
        person.firstName == "" ||
        person.lastName == "" ||
        person.gender == null ||
        person.livingStatus == null ||
        person.birthDate == ""
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
                $("#modal_add_parent").modal('hide');

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
                        displayExistingParent(userData[prop])
                    })

                    $('#search_disconfirm').click(function() {
                        disconfirmSaveButtonParent(person);
                    })
                }
            }
            else {
                console.log("non!");
                if (person.gender === "male") {
                    person.relationship = "father";
                    person.registered = false;
                    userFamilyRef.child(currentUser.uid).child('fathers').push(person);
                    showSuccess();
                    setTimeout(function() {
                        return location.reload();
                    }, 7000);
                    return true;
                } else {
                    person.relationship = "mother";
                    person.registered = false;
                    userFamilyRef.child(currentUser.uid).child('mothers').push(person);
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

function disconfirmSaveButtonParent(person) {
    console.log('disconfirm save')
    if (person.gender === "male") {
        person.relationship = "father";
        person.registered = false;
        userFamilyRef.child(currentUser.uid).child('fathers').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 7000);
        return true;
    } else {
        person.relationship = "mother";
        person.registered = false;
        userFamilyRef.child(currentUser.uid).child('mothers').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 7000);
        return true;
    }
}

function handleParentPic(eventData) {
    uid = firebase.auth().currentUser.uid;
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    var parentPicKey = firebase.database().ref().child('parent').push().getKey();
    var fileNameOnStorage = parentPicKey + '.' + fileExtension;
    var picLink = 'PROFILE-PICS/' + fileNameOnStorage
    var PicStorageRef = FIREBASE_STORAGE.ref(picLink);

    if(file.size <= 100000) {
        var submit_parent = '<button id="save_parentwithPhoto" type="button" class="btn btn-success add" data-dismiss="modal">Save WIth Photo</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';
        $('#submit_parent_btn').html(submit_parent);

        console.log('FILE:', file)
        console.log('FILENAME:', fileName)
        console.log('FILE EXTENSION:', fileExtension)

        $('#save_parentwithPhoto').click(function() {
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
                            addParent(downloadURL, picLink);
                        }
                    })
                })
        })
    } else {
        showPhotoError()
    }
}

function removeParentPic() {
    var save_photo_btn  ='<button onclick="addParent()" type="button" class="btn btn-success add" data-dismiss="modal">Save Origggg</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';

    $('#submit_parent_btn').html(save_photo_btn);
}