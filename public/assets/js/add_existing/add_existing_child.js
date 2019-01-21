function displayExistingChild(data) {
    $("#modal_add_existing_child")
        .modal('show');

    $('div#modal_add_existing_child h4').empty()
    $('div#modal_add_existing_child h4').append("Add a Child for " + currentUser.displayName)

    $("#existing_child_first_name")
        .empty()
        .attr("value", data.firstName);

    if (!(data.middleName === null || data.middleName === undefined)) {
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

    if (data.livingStatus === "Living") {
        $('#existing_child_living_status')
            .val("Living").change();
    } else {
        $('#existing_child_living_status')
            .val("Deceased").change();
    }

    if (data.role === "guest") {
        $('#existing_child_role_in_tree')
            .val("guest").change();
    } else {
        $('#existing_child_role_in_tree')
            .val("contributor").change();
    }

    if (!(data.email === null || data.email === undefined)) {
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

    if (!(data.birthPlace === null || data.birthPlace === undefined)) {
        $("#existing_child_birth_place")
            .empty()
            .attr("value", data.birthPlace);
    } else {
        $("#existing_child_birth_place")
            .empty();
    }

    if (!(data.photoURL === null || data.photoURL === undefined)) {
        $("#existing_child_pic")
            .attr("src", data.photoURL);
    } else {
        $("#existing_child_pic")
            .empty();
    }

    if (!(data.street_address === null || data.street_address === undefined)) {
        $("#existing_child_street_address")
            .empty()
            .attr("value", data.street_address);
    } else {
        $("#existing_child_street_address")
            .empty();
    }

    if (!(data.barangay === null || data.barangay === undefined)) {
        $("#existing_child_barangay")
            .empty()
            .attr("value", data.barangay);
    } else {
        $("#existing_child_barangay")
            .empty();
    }

    if (!(data.city === null || data.city === undefined)) {
        $("#existing_child_city")
            .empty()
            .attr("value", data.city);
    } else {
        $("#existing_child_city")
            .empty();
    }

    if (!(data.postal_code === null || data.postal_code === undefined)) {
        $("#existing_child_postal_code")
            .empty()
            .attr("value", data.postal_code);
    } else {
        $("#existing_child_postal_code")
            .empty();
    }

    $('#save_existing_child').click(function() {
        saveExistingChild(data);
    })
}

function saveExistingChild(data) {
    var firstName = $("#existing_child_first_name").val();
    var middleName = $("#existing_child_middle_name").val();
    var lastName = $("#existing_child_last_name").val();
    var gender = $("#existing_child_gender").val();
    var livingStatus = $("#existing_child_living_status").val();
    var email = $("#existing_child_email").val();
    var birthDate = $('#existing_child_birth_date').val();
    var birthPlace = $('#existing_child_birth_place').val();
    var parenthood = $('#existing_child_parenthood').val();
    var parentSpouseKey = $(`input[name='availableParents2']:checked`).val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        email: email,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        registered: true,
        parenthood: parenthood,
    };

    if (parentSpouseKey === currentUser.uid && currentUserGender === 'male') {
        person.parentKeys = { f: currentUser.uid };
    } else if (parentSpouseKey === currentUser.uid && currentUserGender === 'female') {
        person.parentKeys = { m: currentUser.uid };
    } else if (parentSpouseKey !== currentUser.uid && currentUserGender === 'male') {
        person.parentKeys = { f: currentUser.uid, m: parentSpouseKey };
    } else if (parentSpouseKey !== currentUser.uid && currentUserGender === 'female') {
        person.parentKeys = { m: currentUser.uid, f: parentSpouseKey };
    }

    if (middleName.length > 0) {
        person.middleName = middleName;
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
            userFamilyRef.child(currentUser.uid).child('sons').child(data.uid).set(person);
            showSuccess();
            setTimeout(function() {
                return location.reload();
            }, 10000);
        } else {
            person.relationship = "daughter";
            userFamilyRef.child(currentUser.uid).child('daughters').child(data.uid).set(person);
            showSuccess();
            setTimeout(function() {
                return location.reload();
            }, 10000);
        }
    }
}