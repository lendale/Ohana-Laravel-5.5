function displayExistingParent(data) {
    $("#modal_add_existing_parent")
        .modal('show');

    $("#existing_parent_first_name")
        .empty()
        .attr("value", data.firstName);

    if (!(data.middleName === null || data.middleName === undefined)) {
        $("#existing_parent_middle_name")
            .empty()
            .attr("value", data.middleName);
    } else {
        $("#existing_parent_middle_name")
            .empty();
    }

    $("#existing_parent_last_name")
        .empty()
        .attr("value", data.lastName);

    if (data.gender === "male") {
        $('#existing_parent_gender')
            .val("male").change();
    } else {
            $('#existing_parent_gender')
            .val("female").change();
    }

    if (data.livingStatus === "Living") {
        $('#existing_parent_living_status')
            .val("Living").change();
    } else {
        $('#existing_parent_living_status')
            .val("Deceased").change();
    }

    if (data.role === "guest") {
        $('#existing_parent_role_in_tree')
            .val("guest").change();
    } else {
        $('#existing_parent_role_in_tree')
            .val("contributor").change();
    }

    if (!(data.email === null || data.email === undefined)) {
        $("#existing_parent_email")
            .empty()
            .attr("value", data.email);
    } else {
        $("#existing_parent_email")
            .empty();
    }

    $('#existing_parent_birth_date')
        .empty()
        .attr("value", data.birthDate);

    if (!(data.birthPlace === null || data.birthPlace === undefined)) {
        $("#existing_parent_birth_place")
            .empty()
            .attr("value", data.birthPlace);
    } else {
        $("#existing_parent_birth_place")
            .empty();
    }

    if (!(data.photoURL === null || data.photoURL === undefined)) {
        $("#existing_parent_pic")
            .attr("src", data.photoURL);
    } else {
        $("#existing_parent_pic")
            .empty();
    }

    if (!(data.street_address === null || data.street_address === undefined)) {
        $("#existing_parent_street_address")
            .empty()
            .attr("value", data.street_address);
    } else {
        $("#existing_parent_street_address")
            .empty();
    }

    if (!(data.barangay === null || data.barangay === undefined)) {
        $("#existing_parent_barangay")
            .empty()
            .attr("value", data.barangay);
    } else {
        $("#existing_parent_barangay")
            .empty();
    }

    if (!(data.city === null || data.city === undefined)) {
        $("#existing_parent_city")
            .empty()
            .attr("value", data.city);
    } else {
        $("#existing_parent_city")
            .empty();
    }

    if (!(data.postal_code === null || data.postal_code === undefined)) {
        $("#existing_parent_postal_code")
            .empty()
            .attr("value", data.postal_code);
    } else {
        $("#existing_parent_postal_code")
            .empty();
    }

    $('#save_existing_parent').click(function() {
        saveExistingParent(data);
    })
}

function saveExistingParent(data) {
    var firstName = $("#existing_parent_first_name").val();
    var middleName = $("#existing_parent_middle_name").val();
    var lastName = $("#existing_parent_last_name").val();
    var gender = $("#existing_parent_gender").val();
    var livingStatus = $("#existing_parent_living_status").val();
    var role = $("#existing_parent_role_in_tree").val();
    var email = $("#existing_parent_email").val();
    var birthDate = $('#existing_parent_birth_date').val();
    var birthPlace = $('#existing_parent_birth_place').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        role: role,
        birthDate: birthDate,
        clanId: userClanId,
        familyId: userFamilyId,
        merged: false,
        // photoURL: downloadURL
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
        person.livingStatus == null ||
        person.role == null ||
        person.birthDate == ""
    ) {
        $("#error_details")
            .modal('show');

        $("#error_details_node")
            .empty()
            .append('Required fields are empty.');
        
        setTimeout(function() {
            $("#modal_add_existing_parent")
                .modal('show');
        }, 1000);
    }
    else if (gender === "male") {
        person.relationship = "father";
        if(data.uid === null || data.uid === undefined) {
            userFamilyRef.child(currentUser.uid).child('fathers').child(data.tempKeyInClan).set(person);
        }
        else if(data.uid !== null || data.uid !== undefined) {
            userFamilyRef.child(currentUser.uid).child('fathers').child(data.uid).set(person);
        }
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 10000);
    } else {
        person.relationship = "mother";
        if(data.uid === null || data.uid === undefined) {
            userFamilyRef.child(currentUser.uid).child('mothers').child(data.tempKeyInClan).set(person);
        }
        else if(data.uid !== null || data.uid !== undefined) {
            userFamilyRef.child(currentUser.uid).child('mothers').child(data.uid).set(person);
        }
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 10000);
    }
}