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

    var tree = {
        n: firstName + " " + lastName,
        s: gender,
        bd: birthDate,
    }

    userTreeRef.child(userClanId).push(tree);
    

    else {
        userFamilyRef.child(currentUser.uid).child('father').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
    }
}