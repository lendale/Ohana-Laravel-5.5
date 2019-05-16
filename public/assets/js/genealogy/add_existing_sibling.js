function displayExistingSibling(data) {
    $("#modal_add_existing_sibling")
        .modal('show');
    
    if (!(data.photoURL === undefined || data.photoURL === null)) {
        $("#existing_sibling_pic_view")
            .attr("src", data.photoURL);
    } else {
        $("#existing_sibling_pic_view")
            .empty();
    }

    $("#existing_sibling_first_name")
        .empty()
        .attr("value", data.firstName);

    if (!(data.middleName === undefined || data.middleName === null)) {
        $("#existing_sibling_middle_name")
            .empty()
            .attr("value", data.middleName);
    } else {
        $("#existing_sibling_middle_name")
            .empty();
    }

    $("#existing_sibling_last_name")
        .empty()
        .attr("value", data.lastName);

    if (data.gender === "male") {
        $('#existing_sibling_gender')
            .val("male").change();
    } else {
        $('#existing_sibling_gender')
            .val("female").change();
    }

    if (data.livingStatus === "living") {
        $('#existing_sibling_living_status')
            .val("living").change();
    } else {
        $('#existing_sibling_living_status')
            .val("deceased").change();
    }

    if (!(data.email === undefined || data.email === null)) {
        $("#existing_sibling_email")
            .empty()
            .attr("value", data.email);
    } else {
        $("#existing_sibling_email")
            .empty();
    }

    $('#existing_sibling_birth_date')
        .empty()
        .attr("value", data.birthDate);

    if (!(data.birthPlace === undefined || data.birthPlace === null)) {
        $("#existing_sibling_birth_place")
            .empty()
            .attr("value", data.birthPlace);
    } else {
        $("#existing_sibling_birth_place")
            .empty();
    }

    $('#save_existing_sibling').click(function() {
        saveExistingSibling(data);
    })
}

function saveExistingSibling(data, downloadURL) {
    var photoPic = $("#existing_sibling_pic").val();
    var firstName = $("#existing_sibling_first_name").val();
    var middleName = $("#existing_sibling_middle_name").val();
    var lastName = $("#existing_sibling_last_name").val();
    var gender = $("#existing_sibling_gender").val();
    var livingStatus = $("#existing_sibling_living_status").val();
    var email = $("#existing_sibling_email").val();
    var birthDate = $('#existing_sibling_birth_date').val();
    var birthPlace = $('#existing_sibling_birth_place').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        registered: true,
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
            $("#error_details")
                .modal('hide');
        }, 1000);
        
        setTimeout(function() {
            $("#modal_add_existing_sibling")
                .modal('show');
        }, 1000);
    }
    else {
        if (gender === "male") {
            person.relationship = "brother";
            userFamilyRef.child(currentUser.uid).child('brothers').child(data.key).set(person);
            showSuccess();
            setTimeout(function() {
                return location.reload();
            }, 5000);
        } else {
            person.relationship = "sister";
            userFamilyRef.child(currentUser.uid).child('sisters').child(data.key).set(person);
            showSuccess();
            setTimeout(function() {
                return location.reload();
            }, 5000);
        }
    }
}