// function addChild(downloadURL) {
function addChild() {
    var firstName = $("#child_first_name").val();
    var middleName = $("#child_middle_name").val();
    var lastName = $("#child_last_name").val();
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
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        role: role,
        birthDate: birthDate,
        clanId: userClanId,
        familyId: userFamilyId,
        merged: false,
        parenthood: parenthood,
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
    }
    else if (gender === "male") {
        person.relationship = "son";
        userFamilyRef.child(currentUser.uid).child('sons').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 10000);
    } else {
        person.relationship = "daughter";
        userFamilyRef.child(currentUser.uid).child('daughters').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 10000);
    }
}

function handleChildPic(eventData){
    uid = firebase.auth().currentUser.uid;
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    var childPicKey = firebase.database().ref().child('child').push().getKey();
    var fileNameOnStorage = childPicKey + '.' + fileExtension;
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
        addChild(downloadURL);
        console.log(downloadURL)
        console.log('Addded to the Storage')
    })
}