function addSibling(downloadURL) {
    var firstName = $("#sibling_first_name").val();
    var middleName = $("#sibling_middle_name").val();
    var lastName = $("#sibling_last_name").val();
    var gender = $("#sibling_gender").val();
    var livingStatus = $("#sibling_living_status").val();
    var email = $("#sibling_email").val();
    var birthDate = $('#sibling_birth_date').val();
    var birthPlace = $('#sibling_birth_place').val();

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
                $("#modal_add_sibling").modal('hide');

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
                        displayExistingSibling(userData[prop])
                    })

                    $('#search_disconfirm').click(function() {
                        disconfirmSaveButtonSibling(person);
                    })
                }
            }
            else {
                console.log("non!");
                if (person.gender === "male") {
                    person.relationship = "brother";
                    person.registered = false;
                    userFamilyRef.child(currentUser.uid).child('brothers').push(person);
                    showSuccess();
                    setTimeout(function() {
                        return location.reload();
                    }, 7000);
                    return true;
                } else {
                    person.relationship = "sister";
                    person.registered = false;
                    userFamilyRef.child(currentUser.uid).child('sisters').push(person);
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

function disconfirmSaveButtonSibling(person) {
    console.log('disconfirm save')
    if (person.gender === "male") {
        person.relationship = "brother";
        person.registered = false;
        userFamilyRef.child(currentUser.uid).child('brothers').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 7000);
        return true;
    } else {
        person.relationship = "sister";
        person.registered = false;
        userFamilyRef.child(currentUser.uid).child('sisters').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 7000);
        return true;
    }
}

function handleSiblingPic(eventData) {
    uid = firebase.auth().currentUser.uid;
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    var siblingPicKey = firebase.database().ref().child('sibling').push().getKey();
    var fileNameOnStorage = siblingPicKey + '.' + fileExtension;
    var PicStorageRef = FIREBASE_STORAGE.ref('PROFILE-PICS/' + fileNameOnStorage);

    if(file.size <= 100000) {
        var submit_sibling = '<button id="save_siblingwithPhoto" type="button" class="btn btn-success add" data-dismiss="modal">Save With Photo</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';
        $('#submit_sibling_btn').html(submit_sibling);

        console.log('FILE:', file)
        console.log('FILENAME:', fileName)
        console.log('FILE EXTENSION:', fileExtension)

        $('#save_siblingwithPhoto').click(function() {
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
                            addSibling(downloadURL);
                        }
                    })
                })
        })
    } else {
        showPhotoError()
    }
}

function removeSiblingPic() {
    var save_photo_btn  ='<button onclick="addSibling()" type="button" class="btn btn-success add" data-dismiss="modal">Save Origggg</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';

    $('#submit_sibling_btn').html(save_photo_btn);
}