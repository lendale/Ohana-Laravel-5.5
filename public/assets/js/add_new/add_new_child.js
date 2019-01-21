function addChild(downloadURL) {
    var firstName = $("#child_first_name").val();
    var middleName = $("#child_middle_name").val();
    var lastName = $("#child_last_name").val();
    var gender = $("#child_gender").val();
    var livingStatus = $("#child_living_status").val();
    var email = $('#child_email').val();
    var birthDate = $('#child_birth_date').val();
    var birthPlace = $('#child_birth_place').val();
    var parenthood = $('#child_parenthood').val();
    var parentSpouseKey = $(`input[name='availableParents']:checked`).val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        email: email,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        registered: false,
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

    if (birthPlace.length > 0) {
        person.birthPlace = birthPlace;
    }

    if (
        person.firstName == "" ||
        person.lastName == "" ||
        person.email == "" ||
        person.gender == null ||
        person.livingStatus == null ||
        person.birthDate == "" ||
        person.parenthood == null ||
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
    else {
        if (gender === "male") {
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
    
    var submit_child = '<button id="save_childwithPhoto" type="button" class="btn btn-success add" data-dismiss="modal">Save With Photo</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';

    $('#submit_child_btn').html(submit_child);

    console.log('FILE:', file)
    console.log('FILENAME:', fileName)
    console.log('FILE EXTENSION:', fileExtension)

    $('#save_childwithPhoto').click(function() {
    var task = PicStorageRef.put(file);
    task.on('state_changed', 
        function complete(){
            var downloadURL = task.snapshot.downloadURL;
            swal({
                imageUrl: "assets/img/icons/loader.gif",
                imageWidth: '90',
                imageHeight: '90',
                title: 'Processing Information',
                text: "This might take a while..",
                timer: 5000,
                showConfirmButton: false
                }).then(function(){},
                    function(dismiss) {
                        if (dismiss === "timer") {
                            // addChild(downloadURL);
                            searchChild(downloadURL);
                        }
                })
            })
    })
}