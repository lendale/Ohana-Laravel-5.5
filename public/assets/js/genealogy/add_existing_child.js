function displayExistingChild(data) {
    $("#modal_add_existing_child")
        .modal('show');
    
    if (!(data.photoURL === undefined || data.photoURL === null)) {
        $("#existing_child_pic_view")
            .attr("src", data.photoURL);
    } else {
        $("#existing_child_pic_view")
            .empty();
    }

    $("#existing_child_first_name")
        .empty()
        .attr("value", data.firstName);

    if (!(data.middleName === undefined || data.middleName === null)) {
        $("#existing_child_middle_name")
            .empty()
            .attr("value", data.middleName);
    } else {
        $("#existing_child_middle_name")
            .empty();
    }

    $("#existing_child_last_name")
        .empty()
        .attr("value", data.lastName);

    if (data.gender === "male") {
        $('#existing_child_gender')
            .val("male").change();
    } else {
        $('#existing_child_gender')
            .val("female").change();
    }

    if (data.livingStatus === "living") {
        $('#existing_child_living_status')
            .val("living").change();
    } else {
        $('#existing_child_living_status')
            .val("deceased").change();
    }

    if (!(data.email === undefined || data.email === null)) {
        $("#existing_child_email")
            .empty()
            .attr("value", data.email);
    } else {
        $("#existing_child_email")
            .empty();
    }

    $('#existing_child_birth_date')
        .empty()
        .attr("value", data.birthDate);

    if (!(data.birthPlace === undefined || data.birthPlace === null)) {
        $("#existing_child_birth_place")
            .empty()
            .attr("value", data.birthPlace);
    } else {
        $("#existing_child_birth_place")
            .empty();
    }

    $('#existing_child_parenthood')
        .empty()
        .attr("value", data.parenthood);

    $('#save_existing_child').click(function() {
        saveExistingChild(data);
    })
}

function saveExistingChild(data, downloadURL) {
    var photoPic = $("#existing_child_pic").val();
    var firstName = $("#existing_child_first_name").val();
    var middleName = $("#existing_child_middle_name").val();
    var lastName = $("#existing_child_last_name").val();
    var gender = $("#existing_child_gender").val();
    var livingStatus = $("#existing_child_living_status").val();
    var email = $("#existing_child_email").val();
    var birthDate = $('#existing_child_birth_date').val();
    var birthPlace = $('#existing_child_birth_place').val();
    var parenthood = $('#existing_child_parenthood').val();
    var parentSpouseKey2 = $(`input[name='availableParents2']:checked`).val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        registered: true,
        parenthood: parenthood,
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

    // if (data.streetAddress !== "") {
    //     person.streetAddress = data.streetAddress;
    // }

    // if (data.barangay !== "") {
    //     person.barangay = data.barangay;
    // }

    // if (data.city !== "") {
    //     person.city = data.city;
    // }

    // if (data.postal_code !== "") {
    //     person.postalCode = data.postal_code;
    // }

    if (parentSpouseKey2 === currentUser.uid && currentUserGender === 'male') {
        person.f = currentUser.uid;
    } else if (parentSpouseKey2 === currentUser.uid && currentUserGender === 'female') {
        person.m = currentUser.uid;
    } else if (parentSpouseKey2 !== currentUser.uid && currentUserGender === 'male') {
        person.f = currentUser.uid;
        person.m = parentSpouseKey2;
    } else if (parentSpouseKey2 !== currentUser.uid && currentUserGender === 'female') {
        person.f = parentSpouseKey2;
        person.m = currentUser.uid;
    }

    if (
        person.firstName == "" ||
        person.lastName == "" ||
        person.gender == null ||
        person.livingStatus == null ||
        person.birthDate == "" ||
        person.parenthood == null ||
        parentSpouseKey2 == null
    ) {
        $("#error_details")
            .modal('show');

        $("#error_details_node")
            .empty()
            .append('Required fields are empty.');

        setTimeout(function() {
            $("#error_details")
                .modal('hide');
        }, 1000);
        
        setTimeout(function() {
            $("#modal_add_existing_child")
                .modal('show');
        }, 1000);
    }
    else {
        if (gender === "male") {
            person.relationship = "son";
            userFamilyRef.child(currentUser.uid).child('sons').child(data.key).set(person);
            showSuccess();
            setTimeout(function() {
                return location.reload();
            }, 5000);
        } else {
            person.relationship = "daughter";
            userFamilyRef.child(currentUser.uid).child('daughters').child(data.key).set(person);
            showSuccess();
            setTimeout(function() {
                return location.reload();
            }, 5000);
        }
    }
}