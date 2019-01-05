// function addSibling(downloadURL) {
function addSibling() {
    var firstName = $("#sibling_first_name").val();
    var middleName = $("#sibling_middle_name").val();
    var lastName = $("#sibling_last_name").val();
    var gender = $("#sibling_gender").val();
    var livingStatus = $("#sibling_living_status").val();
    var role = $("#sibling_role_in_tree").val();
    var email = $("#sibling_email").val();
    var birthDate = $('#sibling_birth_date').val();
    var birthPlace = $('#sibling_birth_place').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        role: role,
        birthDate: birthDate,
        clanId: userClanId,
        familyId: userFamilyId,
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
            $("#modal_add_sibling")
                .modal('show');
        }, 1000);
    }
    else if (gender === "male") {
        person.relationship = "brother";
        userFamilyRef.child(currentUser.uid).child('brothers').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 10000);
    }
    else {
        person.relationship = "sister";
        userFamilyRef.child(currentUser.uid).child('sisters').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 10000);
    }
}

function handleSiblingPic(eventData){
    // uid = firebase.auth().currentUser.uid;
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    var motherPicKey = firebase.database().ref().child('mothers').push().getKey();
    var fileNameOnStorage = motherPicKey + '.' + fileExtension;
    var PicStorageRef = FIREBASE_STORAGE.ref('PROFILE-PICS/' + fileNameOnStorage);
    var task = PicStorageRef.put(file);

    task.on('state_changed', 
    function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // uploader.value = percentage;
        console.log('Upload is ' + percentage + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                showLoading();
                break;
        }
    },
    function error(err) {
        window.alert('ERROR');
    },
        function(){
        var downloadURL = task.snapshot.downloadURL;
        addSibling(downloadURL);
        console.log(downloadURL)
        console.log('Addded to the Storage')
    })
}