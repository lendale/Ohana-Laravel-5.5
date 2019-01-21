function searchSpouse(downloadURL) {
    var firstName = $("#spouse_first_name").val();
    var middleName = $("#spouse_middle_name").val();
    var lastName = $("#spouse_last_name").val();
    var displayName = firstName + " " + lastName;
    var gender = $("#spouse_gender").val();
    var livingStatus = $("#spouse_living_status").val();
    var maritalStatus = $("#spouse_relationship").val();
    var role = $("#spouse_role_in_tree").val();
    var email = $("#spouse_email").val();
    var birthDate = $('#spouse_birth_date').val();
    var birthPlace = $('#spouse_birth_place').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: displayName,
        gender: gender,
        livingStatus: livingStatus,
        maritalStatus: maritalStatus,
        role: role,
        birthDate: birthDate,
        clanId: userClanId,
        familyId: userFamilyId,
        merged: false,
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
        person.maritalStatus == null ||
        person.role == null ||
        person.birthDate == ""
    ) {
        $("#error_details")
            .modal('show');

        $("#error_details_node")
            .empty()
            .append('Required fields are empty.');

        setTimeout(function() {
            $("#modal_add_spouse")
                .modal('show');
        }, 1000);
    } else {
        usersRef.once("value")
            .then(snap => {
                snap.forEach(snap2 => {
                    if(snap2.val().email == email) {
                        $('#modal_add_choice').modal('show');
                        $("#search_bar").hide();
                        $("#search_found").show();
                        $("#search_found2").show();
                        $("#search_found3").show();

                        $("#search_first_name")
                            .empty()
                            .attr("value", snap2.val().firstName);
                        $("#search_last_name")
                            .empty()
                            .attr("value", snap2.val().lastName);
                        $("#seach_email")
                            .empty()
                            .attr("value", snap2.val().email);
                        $("#search_birth_date")
                            .empty()
                            .attr("value", snap2.val().birthDate);

                        $('#search_confirm').click(function() {
                            displayExistingSpouse(snap2.val())
                        })

                        return true;
                    }
                    else if(snap2.val().displayName.toLowerCase() == displayName.toLowerCase()) {
                        $('#modal_add_choice').modal('show');
                        $("#search_bar").hide();
                        $("#search_found").show();
                        $("#search_found2").show();
                        $("#search_found3").show();

                        $("#search_first_name")
                            .empty()
                            .attr("value", snap2.val().firstName);
                        $("#search_last_name")
                            .empty()
                            .attr("value", snap2.val().lastName);
                        $("#seach_email")
                            .empty()
                            .attr("value", snap2.val().email);
                        $("#search_birth_date")
                            .empty()
                            .attr("value", snap2.val().birthDate);

                        $('#search_confirm').click(function() {
                            displayExistingSpouse(snap2.val())
                        })

                        return true;
                    }
                    else searchSpouse2(person)
                })
            })
    }
}

function searchSpouse2(person) {
    console.log(person.firstName)
    if(person !== null || person !== undefined) {
        userPotentialRef.once("value")
        .then(snap => {
            snap.forEach(snap2 => {
                if(snap2.val().email == person.email) {
                    console.log('1')
                    $('#modal_add_choice').modal('show');
                    $("#search_bar").hide();
                    $("#search_found").show();
                    $("#search_found2").show();
                    $("#search_found3").show();

                    $("#search_first_name")
                        .empty()
                        .attr("value", snap2.val().firstName);
                    $("#search_last_name")
                        .empty()
                        .attr("value", snap2.val().lastName);
                    $("#seach_email")
                        .empty()
                        .attr("value", snap2.val().email);
                    $("#search_birth_date")
                        .empty()
                        .attr("value", snap2.val().birthDate);

                    $('#search_confirm').click(function() {
                        displayExistingSpouse(snap2.val())
                    })

                    return true;
                }
                else if(snap2.val().displayName.toLowerCase() == person.displayName.toLowerCase()) {
                    console.log('2')
                    $('#modal_add_choice').modal('show');
                    $("#search_bar").hide();
                    $("#search_found").show();
                    $("#search_found2").show();
                    $("#search_found3").show();

                    $("#search_first_name")
                        .empty()
                        .attr("value", snap2.val().firstName);
                    $("#search_last_name")
                        .empty()
                        .attr("value", snap2.val().lastName);
                    $("#seach_email")
                        .empty()
                        .attr("value", snap2.val().email);
                    $("#search_birth_date")
                        .empty()
                        .attr("value", snap2.val().birthDate);

                    $('#search_confirm').click(function() {
                        displayExistingSpouse(snap2.val())
                    })

                    return true;
                }
                else {
                    console.log('3');
                    if (person.gender === "male") {
                        person.relationship = "husband";
                        userFamilyRef.child(currentUser.uid).child('husbands').push(person);
                        showSuccess();
                        setTimeout(function() {
                            return location.reload();
                        }, 10000);
                        return true;
                    } else {
                        person.relationship = "wife";
                        userFamilyRef.child(currentUser.uid).child('wives').push(person);
                        showSuccess();
                        setTimeout(function() {
                            return location.reload();
                        }, 10000);
                        return true;
                    }
                }
            })
        })
    }
}
