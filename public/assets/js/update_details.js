function updateUsersModal(data) {
    $("#modal_update_users")
        .modal('show');

    $("#modal_update_title")
        .empty()
        .append('Update Details of ' + data.displayName);

    $("#users_first_name")
        .empty()
        .attr("value", data.firstName);
    $("#users_last_name")
        .empty()
        .attr("value", data.lastName);
    $('#users_birth_date')
        .empty()
        .attr("value", data.birthDate);

    if (data.gender === "male") {
        $('#users_gender')
            .val("male").change();
    } else {
        $('#users_gender')
            .val("female").change();
    }
    
    if (data.middleName !== null || data.middleName !== undefined) {
        $("#users_middle_name")
            .empty()
            .attr("value", data.middleName);
    } else {
        $("#users_middle_name")
            .empty();
    }

    if (data.email !== null || data.email !== undefined) {
        $("#users_email")
            .empty()
            .attr("value", data.email);
    } else {
        $("#users_email")
            .empty();
    }

    if (data.birthPlace !== null || data.birthPlace !== undefined) {
        $("#users_birth_place")
            .empty()
            .attr("value", data.birthPlace);
    } else {
        $("#users_birth_place")
            .empty();
    }

    if (data.photoURL !== null || data.photoURL !== undefined) {
        $("#users_pic")
            .attr("src", data.photoURL);
    } else {
        $("#users_pic")
            .empty();
    }

    if (data.livingStatus === "Living") {
        $('#users_living_status')
            .val("Living").change();
    } else {
        $('#users_living_status')
            .val("Deceased").change();
    }

    if (data.role === "guest") {
        $('#users_role_in_tree')
            .val("guest").change();
    } else {
        $('#users_role_in_tree')
            .val("contributor").change();
    }

    if (data.street_address !== null || data.street_address !== undefined) {
        $("#users_street_address")
            .empty()
            .attr("value", data.street_address);
    } else {
        $("#users_street_address")
            .empty();
    }

    if (data.barangay !== null || data.barangay !== undefined) {
        $("#users_barangay")
            .empty()
            .attr("value", data.barangay);
    } else {
        $("#users_barangay")
            .empty();
    }

    if (data.city !== null || data.city !== undefined) {
        $("#users_city")
            .empty()
            .attr("value", data.city);
    } else {
        $("#users_city")
            .empty();
    }

    if (data.postal_code !== null || data.postal_code !== undefined) {
        $("#users_postal_code")
            .empty()
            .attr("value", data.postal_code);
    } else {
        $("#users_postal_code")
            .empty();
    }

    $('#update_users').click(function() {
        updateUsers(data);
    })
}

function updateUsers(data) {
    var firstName = $("#users_first_name").val();
    var middleName = $("#users_middle_name").val();
    var lastName = $("#users_last_name").val();
    var gender = $("#users_gender").val();
    var livingStatus = $("#users_living_status").val();
    var role = $("#users_role_in_tree").val();
    var email = $("#users_email").val();
    var birthDate = $('#users_birth_date').val();
    var birthPlace = $('#users_birth_place').val();
    var photoPic = $('#users_pic').attr('src');
    var streetAddress = $('#users_street_address').val();
    var barangay = $('#users_barangay').val();
    var city = $('#users_city').val();
    var postalCode = $('#users_postal_code').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        role: role,
        birthDate: birthDate,
        clanId: userClanId,
        merged: false
    };

    var tree = {
        n: firstName + " " + lastName,
        s: gender,
        bd: birthDate,
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

    if (streetAddress.length > 0) {
        person.street_address = streetAddress;
    }

    if (barangay.length > 0) {
        person.barangay = barangay;
    }

    if (city.length > 0) {
        person.city = city;
    }

    if (postalCode.length > 0) {
        person.postal_code = postalCode;
    }

    if (photoPic !== "assets/img/placeholder.jpg") {
        person.photoURL = photoPic;
        tree.img = photoPic;
    }
    else {
        console.log('no image');
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
            .append('Required fields are empty. Website will refresh shortly.');
        // return location.reload();
    }
    else {

        if (data.uid === null || data.uid === undefined) {
            userPotentialRef.child(data.tempKeyInClan).update(person);
            userTreeRef.child(userClanId).child(data.tempKeyInClan).update(tree);
        }
        else {
            usersRef.child(data.uid).update(person);
            userTreeRef.child(userClanId).child(data.uid).update(tree);
        }

        $("#error_details")
            .modal('show');

        $("#error_details_node")
            .empty()
            .append(person.displayName+'s data successfully updated. Website will refresh shortly.');
        return location.reload();
    }
}
