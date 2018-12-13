function searchBar() {
    var input = $("#search_input").val();
    var searchedResult;

    if(input !== "") {
        usersRef
            .once("value")
            .then(snapshot => {
                snapshot.forEach(childSnap => {
                    if(childSnap.val().displayName.toLowerCase() == input) {
                        console.log('1st if')
                        $("#search_no_result").css('display', 'none');
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

                        $('#search_confirm').click(function() {
                            searchedResult = childSnap.val();
                            searchedResultModal(searchedResult);
                        })
                    }
                    else if(childSnap.val().email == input) {
                        console.log('2 if')
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
                    // else {
                    //     console.log('3 if')
                    //     $("#search_no_result").css('display', '');
                    //     $("#search_none_input")
                    //         .empty()
                    //         .attr("value", 'This person is not an existing user.');
                    // }
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

    $('#add_parent2').click(function() {
        displayExistingParent(data);
    })

    $('#add_sibling2').click(function() {
        displayExistingSibling(data);
    })

    $('#add_spouse2').click(function() {
        displayExistingSpouse(data);
    })

    $('#add_child2').click(function() {
        displayExistingChild(data);
    })
}

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
        saveExistingParent(data.uid);
    })
}

function saveExistingParent(userKey) {
    var firstName = $("#existing_parent_first_name").val();
    var middleName = $("#existing_parent_middle_name").val();
    var lastName = $("#existing_parent_last_name").val();
    var gender = $("#existing_parent_gender").val();
    var livingStatus = $("#existing_parent_living_status").val();
    var maritalStatus = $("#existing_parent_relationship").val();
    var role = $("#existing_parent_role_in_tree").val();
    var email = $("#existing_parent_email").val();
    var birthDate = $('#existing_parent_birth_date').val();
    var birthPlace = $('#existing_parent_birth_place').val();
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
        person.relationship = "father";
        userFamilyRef.child(currentUserId).child('fathers').child(userKey).set(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
    } else {
        person.relationship = "mother";
        userFamilyRef.child(currentUserId).child('mothers').child(userKey).set(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
    }
}

function displayExistingSibling(data) {
    $("#modal_add_existing_sibling")
        .modal('show');

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
        saveExistingSibling(data.uid);
    })
}

function saveExistingSibling(userKey) {
    var firstName = $("#existing_sibling_first_name").val();
    var middleName = $("#existing_sibling_middle_name").val();
    var lastName = $("#existing_sibling_last_name").val();
    var gender = $("#existing_sibling_gender").val();
    var livingStatus = $("#existing_sibling_living_status").val();
    var role = $("#existing_sibling_role_in_tree").val();
    var email = $("#existing_sibling_email").val();
    var birthDate = $('#existing_sibling_birth_date').val();
    var birthPlace = $('#existing_sibling_birth_place').val();
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
        person.relationship = "brother";
        userFamilyRef.child(currentUserId).child('brothers').child(userKey).set(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
    } else {
        person.relationship = "sister";
        userFamilyRef.child(currentUserId).child('sisters').child(userKey).set(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
    }
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
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
    } else {
        person.relationship = "wife";
        userFamilyRef.child(currentUserId).child('wives').child(userKey).set(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
    }
}

function displayExistingChild(data) {
    $("#modal_add_existing_child")
        .modal('show');

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
        saveExistingChild(data.uid);
    })
}

function saveExistingChild(userKey) {
    var firstName = $("#existing_child_first_name").val();
    var middleName = $("#existing_child_middle_name").val();
    var lastName = $("#existing_child_last_name").val();
    var gender = $("#existing_child_gender").val();
    var livingStatus = $("#existing_child_living_status").val();
    var parenthood = $("#existing_child_parenthood").val();
    var role = $("#existing_child_role_in_tree").val();
    var email = $("#existing_child_email").val();
    var birthDate = $('#existing_child_birth_date').val();
    var birthPlace = $('#existing_child_birth_place').val();
    var parentSpouseKey = $(`input[name='availableParents']:checked`).val();
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
        parenthood: parenthood
        // photoURL: downloadURL
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

    if (email.length > 0) {
        person.email = email;
    }

    if (birthPlace.length > 0) {
        person.birthPlace = birthPlace;
    }

    if (gender === "male") {
        person.relationship = "son";
        userFamilyRef.child(currentUserId).child('sons').child(userKey).set(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
    } else {
        person.relationship = "daughter";
        userFamilyRef.child(currentUserId).child('daughters').child(userKey).set(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
    }
}