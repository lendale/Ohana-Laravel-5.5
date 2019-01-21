function searchChild(downloadURL) {
    var firstName = $("#child_first_name").val();
    var middleName = $("#child_middle_name").val();
    var lastName = $("#child_last_name").val();
    var displayName = firstName + " " + lastName;
    var gender = $("#child_gender").val();
    var livingStatus = $("#child_living_status").val();
    var role = $("#child_role_in_tree").val();
    var email = $('#child_email').val();
    var birthDate = $('#child_birth_date').val();
    var birthPlace = $('#child_birth_place').val();
    var parenthood = $('#child_parenthood').val();
    var parentSpouseKey = $(`input[name='availableParents']:checked`).val();

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
        person.parenthood == null ||
        person.birthDate == "" ||
        parentSpouseKey == null
    ) {
        $("#error_details")
            .modal('show');

        $("#error_details_node")
            .empty()
            .append('Required fields are empty.');

        setTimeout(function() {
            $("#modal_add_child")
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
                            displayExistingChild(snap2.val())
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
                            displayExistingChild(snap2.val())
                        })

                        return true;
                    }
                    else searchChild2(person)
                })
            })
    }
}

function searchChild2(person) {
    console.log(person)
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
                        displayExistingChild(snap2.val())
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
                        displayExistingChild(snap2.val())
                    })

                    return true;
                }
                else {
                    console.log('3');
                    if (person.gender === "male") {
                        person.relationship = "son";
                        userFamilyRef.child(currentUser.uid).child('sons').push(person);
                        showSuccess();
                        setTimeout(function() {
                            return location.reload();
                        }, 10000);
                        return true;
                    } else {
                        person.relationship = "daughter";
                        userFamilyRef.child(currentUser.uid).child('daughters').push(person);
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
