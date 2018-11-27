function searchBar() {
    var input = $("#search_input").val();
    var searchedResult;

    if(input !== "") {
        usersRef
            .once("value")
            .then(snapshot => {
                snapshot.forEach(childSnap => {
                    if(childSnap.val().displayName.toLowerCase() == input) {
                        $("#search_found").css('display', '');
                        $("#search_found2").css('display', '');
                        $("#search_found3").css('display', '');

                        $("#search_first_name")
                            .empty()
                            .attr("value", childSnap.val().firstName);
                        $("#search_last_name")
                            .empty()
                            .attr("value", childSnap.val().lastName);
                        $("#seach_email")
                            .empty()
                            .attr("value", childSnap.val().email);
                        $("#search_birth_date")
                            .empty()
                            .attr("value", childSnap.val().birthDate);
                        $("#search_no_result").css('display', 'none');

                        $('#search_confirm').click(function() {
                            searchedResult = childSnap.val();
                            searchedResultModal(searchedResult);
                        })
                    }
                    else if(childSnap.val().email == input) {
                        $("#search_found").css('display', '');
                        $("#search_found2").css('display', '');
                        $("#search_found3").css('display', '');

                        $("#search_first_name")
                            .empty()
                            .attr("value", childSnap.val().firstName);
                        $("#search_last_name")
                            .empty()
                            .attr("value", childSnap.val().lastName);
                        $("#seach_email")
                            .empty()
                            .attr("value", childSnap.val().email);
                        $("#search_birth_date")
                            .empty()
                            .attr("value", childSnap.val().birthDate);
                        $("#search_no_result").css('display', 'none');
                    }
                    else {
                        $("#search_no_result").css('display', '');
                        $("#search_none_input")
                            .empty()
                            .attr("value", 'This person is not an existing user.');
                    }
                });
            });
    }
    else {
        $("#search_no_result").css('display', '');
        $("#search_none_input")
            .empty()
            .attr("value", 'Nothing is inputted.');

    }
}

function searchedResultModal(data) {
    $("#modal_add_existing_member")
        .modal('show');

    $('#add_father2').click(function() {
        displayExistingFather(data);
        resetForm();
    })

    $('#add_spouse2').click(function() {
        displayExistingSpouse(data);
        resetForm();
    })
}

function displayExistingFather(data) {
    $("#modal_add_existing_father")
        .modal('show');

    $("#existing_father_first_name")
        .empty()
        .attr("value", data.firstName);

    if (!(data.middleName === null || data.middleName === undefined)) {
        $("#existing_father_middle_name")
            .empty()
            .attr("value", data.middleName);
    } else {
        $("#existing_father_middle_name")
            .empty();
    }

    $("#existing_father_last_name")
        .empty()
        .attr("value", data.lastName);

    if (data.gender === "male") {
        $('#existing_father_gender')
            .val("male").change();
    } else {
            $('#existing_father_gender')
            .val("female").change();
    }

    if (data.livingStatus === "Living") {
        $('#existing_father_living_status')
            .val("Living").change();
    } else {
        $('#existing_father_living_status')
            .val("Deceased").change();
    }

    if (data.role === "guest") {
        $('#existing_father_role_in_tree')
            .val("guest").change();
    } else {
        $('#existing_father_role_in_tree')
            .val("contributor").change();
    }

    if (!(data.email === null || data.email === undefined)) {
        $("#existing_father_email")
            .empty()
            .attr("value", data.email);
    } else {
        $("#existing_father_email")
            .empty();
    }

    $('#existing_father_birth_date')
        .empty()
        .attr("value", data.birthDate);

    if (!(data.birthPlace === null || data.birthPlace === undefined)) {
        $("#existing_father_birth_place")
            .empty()
            .attr("value", data.birthPlace);
    } else {
        $("#existing_father_birth_place")
            .empty();
    }

    if (!(data.photoURL === null || data.photoURL === undefined)) {
        $("#existing_father_pic")
            .attr("src", data.photoURL);
    } else {
        $("#existing_father_pic")
            .empty();
    }

    if (!(data.street_address === null || data.street_address === undefined)) {
        $("#existing_father_street_address")
            .empty()
            .attr("value", data.street_address);
    } else {
        $("#existing_father_street_address")
            .empty();
    }

    if (!(data.barangay === null || data.barangay === undefined)) {
        $("#existing_father_barangay")
            .empty()
            .attr("value", data.barangay);
    } else {
        $("#existing_father_barangay")
            .empty();
    }

    if (!(data.city === null || data.city === undefined)) {
        $("#existing_father_city")
            .empty()
            .attr("value", data.city);
    } else {
        $("#existing_father_city")
            .empty();
    }

    if (!(data.postal_code === null || data.postal_code === undefined)) {
        $("#existing_father_postal_code")
            .empty()
            .attr("value", data.postal_code);
    } else {
        $("#existing_father_postal_code")
            .empty();
    }

    $('#save_existing_father').click(function() {
        saveExistingFather();
    })
}

function saveExistingFather() {
    var firstName = $("#existing_father_first_name").val();
    var middleName = $("#existing_father_middle_name").val();
    var lastName = $("#existing_father_last_name").val();
    var gender = $("#existing_father_gender").val();
    var livingStatus = $("#existing_father_living_status").val();
    var role = $("#existing_father_role_in_tree").val();
    var email = $("#existing_father_email").val();
    var birthDate = $('#existing_father_birth_date').val();
    var birthPlace = $('#existing_father_birth_place').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        role: role,
        birthDate: birthDate,
        relationship: "father",
        clanId: userClanId,
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
    
    userFamilyRef.child(currentUser.uid).child('fathers').push(person);
    showSuccess();
    setTimeout(function() {
        return location.reload();
    }, 5000);
}

function displayExistingSpouse(data) {
    $("#modal_add_existing_spouse")
        .modal('show');

    $("#existing_spouse_first_name")
        .empty()
        .attr("value", data.firstName);

    if (!(data.middleName === null || data.middleName === undefined)) {
        $("#existing_spouse_middle_name")
            .empty()
            .attr("value", data.middleName);
    } else {
        $("#existing_spouse_middle_name")
            .empty();
    }

    $("#existing_spouse_last_name")
        .empty()
        .attr("value", data.lastName);

    if (data.gender === "male") {
        $('#existing_spouse_gender')
            .val("male").change();
    } else {
            $('#existing_spouse_gender')
            .val("female").change();
    }

    if (data.livingStatus === "Living") {
        $('#existing_spouse_living_status')
            .val("Living").change();
    } else {
        $('#existing_spouse_living_status')
            .val("Deceased").change();
    }

    if (data.role === "guest") {
        $('#existing_spouse_role_in_tree')
            .val("guest").change();
    } else {
        $('#existing_spouse_role_in_tree')
            .val("contributor").change();
    }

    if (!(data.email === null || data.email === undefined)) {
        $("#existing_spouse_email")
            .empty()
            .attr("value", data.email);
    } else {
        $("#existing_spouse_email")
            .empty();
    }

    $('#existing_spouse_birth_date')
        .empty()
        .attr("value", data.birthDate);

    if (!(data.birthPlace === null || data.birthPlace === undefined)) {
        $("#existing_spouse_birth_place")
            .empty()
            .attr("value", data.birthPlace);
    } else {
        $("#existing_spouse_birth_place")
            .empty();
    }

    if (!(data.photoURL === null || data.photoURL === undefined)) {
        $("#existing_spouse_pic")
            .attr("src", data.photoURL);
    } else {
        $("#existing_spouse_pic")
            .empty();
    }

    if (!(data.street_address === null || data.street_address === undefined)) {
        $("#existing_spouse_street_address")
            .empty()
            .attr("value", data.street_address);
    } else {
        $("#existing_spouse_street_address")
            .empty();
    }

    if (!(data.barangay === null || data.barangay === undefined)) {
        $("#existing_spouse_barangay")
            .empty()
            .attr("value", data.barangay);
    } else {
        $("#existing_spouse_barangay")
            .empty();
    }

    if (!(data.city === null || data.city === undefined)) {
        $("#existing_spouse_city")
            .empty()
            .attr("value", data.city);
    } else {
        $("#existing_spouse_city")
            .empty();
    }

    if (!(data.postal_code === null || data.postal_code === undefined)) {
        $("#existing_spouse_postal_code")
            .empty()
            .attr("value", data.postal_code);
    } else {
        $("#existing_spouse_postal_code")
            .empty();
    }

    $('#save_existing_spouse').click(function() {
        saveExistingSpouse(data.uid);
    })
}

function saveExistingSpouse(userKey) {
    var firstName = $("#existing_spouse_first_name").val();
    var middleName = $("#existing_spouse_middle_name").val();
    var lastName = $("#existing_spouse_last_name").val();
    var gender = $("#existing_spouse_gender").val();
    var livingStatus = $("#existing_spouse_living_status").val();
    var maritalStatus = $("#existing_spouse_relationship").val();
    var role = $("#existing_spouse_role_in_tree").val();
    var email = $("#existing_spouse_email").val();
    var birthDate = $('#existing_spouse_birth_date').val();
    var birthPlace = $('#existing_spouse_birth_place').val();
    var currentUserId = currentUser.uid;

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        role: role,
        birthDate: birthDate,
        clanId: userClanId,
        merged: false,
        addedBy: currentUserId,
        maritalStatus: maritalStatus
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

    if (gender === "male") {
        person.relationship = "husband";
        userFamilyRef.child(currentUserId).child('husbands').child(userKey).set(person);
        setTimeout(function() {
            return location.reload();
        }, 5000);
    } else {
        person.relationship = "wife";
        userFamilyRef.child(currentUser.uid).child('wives').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
    }
}