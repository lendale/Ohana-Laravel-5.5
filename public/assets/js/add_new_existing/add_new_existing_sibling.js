function searchSibling(downloadURL) {
    var firstName = $("#sibling_first_name").val();
    var middleName = $("#sibling_middle_name").val();
    var lastName = $("#sibling_last_name").val();
    var displayName = firstName + " " + lastName;
    var gender = $("#sibling_gender").val();
    var livingStatus = $("#sibling_living_status").val();
    var email = $("#sibling_email").val();
    var birthDate = $('#sibling_birth_date').val();
    var birthPlace = $('#sibling_birth_place').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: displayName,
        email: email,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
    };

    if (downloadURL !== undefined){
        person.photoURL = downloadURL
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
        person.birthDate == ""
    ) {
        $("#error_details")
            .modal('show');

        $("#error_details_node")
            .empty()
            .append('Required fields are empty.');

        setTimeout(function() {
            $("#modal_add_sibling")
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
                            displayExistingSibling(snap2.val())
                        })

                        return true;
                    }
                    else {
                        console.log('1');
                        if (person.gender === "male") {
                            person.relationship = "brother";
                            person.registered = false;
                            userFamilyRef.child(currentUser.uid).child('brothers').push(person);
                            showSuccess();
                            setTimeout(function() {
                                return location.reload();
                            }, 10000);
                            return true;
                        } else {
                            person.relationship = "sister";
                            person.registered = false;
                            userFamilyRef.child(currentUser.uid).child('sisters').push(person);
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
