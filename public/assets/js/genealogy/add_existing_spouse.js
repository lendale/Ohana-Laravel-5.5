function displayExistingSpouse(data) {
    $("#modal_add_existing_spouse")
        .modal('show');
    
    if (!(data.photoURL === undefined || data.photoURL === null)) {
        $("#existing_spouse_pic_view")
            .attr("src", data.photoURL);
    } else {
        $("#existing_spouse_pic_view")
            .empty();
    }

    $("#existing_spouse_first_name")
        .empty()
        .attr("value", data.firstName);

    if (!(data.middleName === undefined || data.middleName === null)) {
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

    if (data.livingStatus === "living") {
        $('#existing_spouse_living_status')
            .val("living").change();
    } else {
        $('#existing_spouse_living_status')
            .val("deceased").change();
    }

    if (!(data.email === undefined || data.email === null)) {
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

    if (!(data.birthPlace === undefined || data.birthPlace === null)) {
        $("#existing_spouse_birth_place")
            .empty()
            .attr("value", data.birthPlace);
    } else {
        $("#existing_spouse_birth_place")
            .empty();
    }

    $('#save_existing_spouse').click(function() {
        saveExistingSpouse(data);
    })
}

function saveExistingSpouse(data, downloadURL) {
    var photoPic = $("#existing_spouse_pic").val();
    var firstName = $("#existing_spouse_first_name").val();
    var middleName = $("#existing_spouse_middle_name").val();
    var lastName = $("#existing_spouse_last_name").val();
    var gender = $("#existing_spouse_gender").val();
    var livingStatus = $("#existing_spouse_living_status").val();
    var email = $("#existing_spouse_email").val();
    var birthDate = $('#existing_spouse_birth_date').val();
    var birthPlace = $('#existing_spouse_birth_place').val();
    var maritalStatus = $("#existing_spouse_relationship").val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        registered: true,
        maritalStatus: maritalStatus,
    };

    if (downloadURL !== undefined) {
        person.photoURL = downloadURL
    } else if (photoPic !== undefined) {
        person.photoURL = photoPic;
    } else {
        console.log('no image');
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

    // if (data.streetAddress !== "") {
    //     person.streetAddress = data.streetAddress;
    // }

    // if (data.barangay !== "") {
    //     person.barangay = data.barangay;
    // }

    // if (data.city !== "") {
    //     person.city = data.city;
    // }

    // if (data.postal_code !== "") {
    //     person.postalCode = data.postal_code;
    // }

    if (
        person.firstName == "" ||
        person.lastName == "" ||
        person.gender == null ||
        person.livingStatus == null ||
        person.birthDate == "" ||
        person.maritalStatus == null
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
            $("#modal_add_existing_spouse")
                .modal('show');
        }, 1000);
    }
    else {
        if (gender === "male") {
            person.relationship = "husband";
            userFamilyRef.child(currentUser.uid).child('husbands').child(data.key).set(person);
            showSuccess();
            setTimeout(function() {
                return location.reload();
            }, 5000);
        } else {
            person.relationship = "wife";
            userFamilyRef.child(currentUser.uid).child('wives').child(data.key).set(person);
            showSuccess();
            setTimeout(function() {
                return location.reload();
            }, 5000);
        }
    }
}