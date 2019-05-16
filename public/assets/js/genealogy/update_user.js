function updateUsersModal(data) {
    console.log('update user')
    $("#modal_update_users")
        .modal('show');

    $("#modal_update_title")
        .empty()
        .append('Update Details of ' + data.displayName);
    
    if (data.photoURL !== undefined || data.photoURL !== null) {
        $("#users_pic_view")
            .attr("src", data.photoURL);
    } else {
        $("#users_pic_view")
            .empty();
    }

    $("#users_first_name")
        .empty()
        .attr("value", data.firstName);
    
    if (data.middleName !== undefined || data.middleName !== null) {
        $("#users_middle_name")
            .empty()
            .attr("value", data.middleName);
    } else {
        $("#users_middle_name")
            .empty();
    }

    $("#users_last_name")
        .empty()
        .attr("value", data.lastName);
    
    if (data.gender === "male") {
        $('#users_gender')
            .val("male").change();
    } else {
        $('#users_gender')
            .val("female").change();
    }

    if (data.livingStatus === "living") {
        $('#users_living_status')
            .val("living").change();
    } else {
        $('#users_living_status')
            .val("deceased").change();
    }

    if (data.email !== undefined || data.email !== null) {
        $("#users_email")
            .empty()
            .attr("value", data.email);
    } else {
        $("#users_email")
            .empty();
    }

    $('#users_birth_date')
        .empty()
        .attr("value", data.birthDate);

    if (data.birthPlace !== undefined || data.birthPlace !== null) {
        $("#users_birth_place")
            .empty()
            .attr("value", data.birthPlace);
    } else {
        $("#users_birth_place")
            .empty();
    }

    if (data.streetAddress !== undefined || data.streetAddress !== null) {
        $("#users_street_address")
            .empty()
            .attr("value", data.streetAddress);
    } else {
        $("#users_street_address")
            .empty();
    }

    if (data.barangay !== undefined || data.barangay !== null) {
        $("#users_barangay")
            .empty()
            .attr("value", data.barangay);
    } else {
        $("#users_barangay")
            .empty();
    }

    if (data.city !== undefined || data.city !== null) {
        $("#users_city")
            .empty()
            .attr("value", data.city);
    } else {
        $("#users_city")
            .empty();
    }

    if (data.postalCode !== undefined || data.postalCode !== null) {
        $("#users_postal_code")
            .empty()
            .attr("value", data.postalCode);
    } else {
        $("#users_postal_code")
            .empty();
    }

    $('#update_users').click(function() {
        updateUsers(data);
    })
}

function updateUsers(data, downloadURL) {
    var photoPic = $('#users_pic').attr('src');
    var firstName = $("#users_first_name").val();
    var middleName = $("#users_middle_name").val();
    var lastName = $("#users_last_name").val();
    var gender = $("#users_gender").val();
    var livingStatus = $("#users_living_status").val();
    var email = $("#users_email").val();
    var birthDate = $('#users_birth_date').val();
    var birthPlace = $('#users_birth_place').val();
    var registered = data.registered;
    var street_address = $('#users_street_address').val();
    var barangay = $('#users_barangay').val();
    var city = $('#users_city').val();
    var postal_code = $('#users_postal_code').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        registered: registered,
    };

    if (downloadURL !== undefined) {
        person.photoURL = downloadURL
    } else if (photoPic !== undefined) {
        person.photoURL = photoPic;
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

    if (street_address.length > 0) {
        person.streetAddress = street_address;
    }

    if (barangay.length > 0) {
        person.barangay = barangay;
    }

    if (city.length > 0) {
        person.city = city;
    }

    if (postal_code.length > 0) {
        person.postalCode = postal_code;
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
        }, 1000);

        setTimeout(function() {
            $("#modal_update_users").modal('show');
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

function handleWizardPic(eventData) {
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    var picKey = FIREBASE_DATABASE.ref().child('url_display_pics').child(currentUser.uid).push().getKey();
    var fileNameOnStorage = picKey + '.' + fileExtension;
    var storageRef = FIREBASE_STORAGE.ref('PROFILE-PICS/' + fileNameOnStorage);

    console.log(file)
    console.log(fileName)

    if(file.size <= 100000) {
        $('#next').on('click', function() {
            if(file == null) {
                console.log('handlewizardpic')
                showPhotoNull()
            } else {
                var task = storageRef.put(file);
                console.log('lahos sa next button')
                task.on('state_changed',
                    function complete() {
                        uid = firebase.auth().currentUser.uid;
                        downloadURL = task.snapshot.downloadURL;
                        console.log(downloadURL)
                        createAcctWithEmailAndPass(downloadURL);
                })
            }
        }) 
    } else {
        showPhotoError()
    }
}