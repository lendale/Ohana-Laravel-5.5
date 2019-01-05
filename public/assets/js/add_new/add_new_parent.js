// function addParent(downloadURL) {
function addParent() {
    var firstName = $("#parent_first_name").val();
    var middleName = $("#parent_middle_name").val();
    var lastName = $("#parent_last_name").val();
    var gender = $("#parent_gender").val();
    var livingStatus = $("#parent_living_status").val();
    var role = $("#parent_role_in_tree").val();
    var email = $("#parent_email").val();
    var birthDate = $('#parent_birth_date').val();
    var birthPlace = $('#parent_birth_place').val();

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
            $("#modal_add_parent")
                .modal('show');
        }, 1000);
    }
    else if (gender === "male") {
        person.relationship = "father";
        userFamilyRef.child(currentUser.uid).child('fathers').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 10000);
    } else {
        person.relationship = "mother";
        userFamilyRef.child(currentUser.uid).child('mothers').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 10000);
    }
}

function handleParentPic(eventData){
    // uid = firebase.auth().currentUser.uid;
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    var fatherPicKey = firebase.database().ref().child('fathers').push().getKey();
    var fileNameOnStorage = fatherPicKey + '.' + fileExtension;
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
        addParent(downloadURL);
        console.log(downloadURL)
        console.log('Addded to the Storage')
    })
}