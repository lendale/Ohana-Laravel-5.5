function searchParent(downloadURL) {
    var firstName = $("#parent_first_name").val();
    var middleName = $("#parent_middle_name").val();
    var lastName = $("#parent_last_name").val();
    var displayName = firstName + " " + lastName;
    var gender = $("#parent_gender").val();
    var livingStatus = $("#parent_living_status").val();
    var role = $("#parent_role_in_tree").val();
    var email = $("#parent_email").val();
    var birthDate = $('#parent_birth_date').val();
    var birthPlace = $('#parent_birth_place').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: displayName,
        gender: gender,
        livingStatus: livingStatus,
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
        person.role == null ||
        person.birthDate == ""
    ) {
        $("#error_details")
            .modal('show');

        $("#error_details_node")
            .empty()
            .append('Required fields are empty.');

        setTimeout(function() {
            $("#modal_add_parent")
                .modal('show');
        }, 1000);
    } else {
        usersRef.once("value")
            .then(snap => {
                snap.forEach(snap2 => {
                    if((snap2.val().email == email) ||
                        (snap2.val().displayName.toLowerCase() == displayName.toLowerCase())) {
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
                            displayExistingParent(snap2.val())
                        })

                        return true;
                    }
                    else searchParent2(person)
                })
            })
    }
}

function searchParent2(person) {
    console.log(person.email)
    userPotentialRef.once("value")
    .then(snap => {
        snap.forEach(snap2 => {
            if((snap2.val().email == person.email) ||
                (snap2.val().displayName.toLowerCase() == person.displayName.toLowerCase())) {
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
                    displayExistingParent(snap2.val())
                })

                return true;
            }
            else {
                console.log('3');
                if (person.gender === "male") {
                    person.relationship = "father";
                    userFamilyRef.child(currentUser.uid).child('fathers').push(person);
                    showSuccess();
                    setTimeout(function() {
                        return location.reload();
                    }, 10000);
                    return true;
                } else {
                    person.relationship = "mother";
                    userFamilyRef.child(currentUser.uid).child('mothers').push(person);
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
