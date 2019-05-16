function updateParentModal(data) {
    console.log('update parent')
    $("#modal_update_parent").on("hidden.bs.modal", function(){
        return location.reload();
    });

    $("#modal_update_parent")
        .modal('show');
    
    $("#modal_update_parent_title")
        .empty()
        .append('Update Details of ' + data.displayName);
    
    if (!(data.photoURL === null || data.photoURL === undefined)) {
        $("#update_parent_pic_view")
            .attr("src", data.photoURL);
    } else {
        $("#update_parent_pic_view")
            .empty();
    }

    $("#update_parent_first_name")
        .empty()
        .attr("value", data.firstName);
    
    if (data.middleName !== undefined || data.middleName !== null) {
        $("#update_parent_middle_name")
            .empty()
            .attr("value", data.middleName);
    } else {
        $("#update_parent_middle_name")
            .empty();
    }

    $("#update_parent_last_name")
        .empty()
        .attr("value", data.lastName);
    
    if (data.gender === "male") {
        $('#update_parent_gender')
            .val("male").change();
    } else {
        $('#update_parent_gender')
            .val("female").change();
    }

    if (data.livingStatus === "living") {
        $('#update_parent_living_status')
            .val("living").change();
    } else {
        $('#update_parent_living_status')
            .val("deceased").change();
    }

    if (data.email !== undefined || data.email !== null) {
        $("#update_parent_email")
            .empty()
            .attr("value", data.email);
    } else {
        $("#update_parent_email")
            .empty();
    }
    
    $('#update_parent_birth_date')
        .empty()
        .attr("value", data.birthDate);

    if (data.birthPlace !== undefined || data.birthPlace !== null) {
        $("#update_parent_birth_place")
            .empty()
            .attr("value", data.birthPlace);
    } else {
        $("#update_parent_birth_place")
            .empty();
    }

    $('#update_parent').click(function() {
        updateParent(data);
    })
}

function updateParent(data, downloadURL) {
    var photoPic = $('#update_parent_pic').attr('src');
    var firstName = $("#update_parent_first_name").val();
    var middleName = $("#update_parent_middle_name").val();
    var lastName = $("#update_parent_last_name").val();
    var gender = $("#update_parent_gender").val();
    var livingStatus = $("#update_parent_living_status").val();
    var email = $("#update_parent_email").val();
    var birthDate = $('#update_parent_birth_date').val();
    var birthPlace = $('#update_parent_birth_place').val();
    var registered = data.registered;

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        registered: registered,
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

    if (
        person.firstName == "" ||
        person.lastName == "" ||
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
            $("#error_details").modal('hide');
        }, 1000);

        setTimeout(function() {
            $("#modal_update_parent").modal('show');
        }, 1000);
    }
    else {
        usersRef.child(data.key).update(person);
        showUpdate();
        setTimeout(function() {
            return location.reload();
        }, 2000);
    }
}