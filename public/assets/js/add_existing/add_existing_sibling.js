function displayExistingSibling(data) {
    $("#modal_add_existing_sibling")
        .modal('show');

    $('div#modal_add_existing_sibling h4').empty()
    $('div#modal_add_existing_sibling h4').append("Add a Sibling for " + currentUser.displayName)

    $("#existing_sibling_first_name")
        .empty()
        .attr("value", data.firstName);

    if (!(data.middleName === null || data.middleName === undefined)) {
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

    if (data.livingStatus === "Living") {
        $('#existing_sibling_living_status')
            .val("Living").change();
    } else {
        $('#existing_sibling_living_status')
            .val("Deceased").change();
    }

    if (data.role === "guest") {
        $('#existing_sibling_role_in_tree')
            .val("guest").change();
    } else {
        $('#existing_sibling_role_in_tree')
            .val("contributor").change();
    }

    if (!(data.email === null || data.email === undefined)) {
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

    if (!(data.birthPlace === null || data.birthPlace === undefined)) {
        $("#existing_sibling_birth_place")
            .empty()
            .attr("value", data.birthPlace);
    } else {
        $("#existing_sibling_birth_place")
            .empty();
    }

    if (!(data.photoURL === null || data.photoURL === undefined)) {
        $("#existing_sibling_pic")
            .attr("src", data.photoURL);
    } else {
        $("#existing_sibling_pic")
            .empty();
    }

    if (!(data.street_address === null || data.street_address === undefined)) {
        $("#existing_sibling_street_address")
            .empty()
            .attr("value", data.street_address);
    } else {
        $("#existing_sibling_street_address")
            .empty();
    }

    if (!(data.barangay === null || data.barangay === undefined)) {
        $("#existing_sibling_barangay")
            .empty()
            .attr("value", data.barangay);
    } else {
        $("#existing_sibling_barangay")
            .empty();
    }

    if (!(data.city === null || data.city === undefined)) {
        $("#existing_sibling_city")
            .empty()
            .attr("value", data.city);
    } else {
        $("#existing_sibling_city")
            .empty();
    }

    if (!(data.postal_code === null || data.postal_code === undefined)) {
        $("#existing_sibling_postal_code")
            .empty()
            .attr("value", data.postal_code);
    } else {
        $("#existing_sibling_postal_code")
            .empty();
    }

    $('#save_existing_sibling').click(function() {
        saveExistingSibling(data);
    })
}

function saveExistingSibling(data) {
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
        email: email,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        registered: true,
    };

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
        person.email == "" ||
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
            $("#modal_add_existing_sibling")
                .modal('show');
        }, 1000);

    }
    else if (gender === "male") {
        person.relationship = "brother";
        userFamilyRef.child(currentUser.uid).child('brothers').child(data.uid).set(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 10000);
    } else {
        person.relationship = "sister";
        userFamilyRef.child(currentUser.uid).child('sisters').child(data.uid).set(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 10000);
    }
}