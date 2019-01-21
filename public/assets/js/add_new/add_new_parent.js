function addParent(downloadURL) {
    var firstName = $("#parent_first_name").val();
    var middleName = $("#parent_middle_name").val();
    var lastName = $("#parent_last_name").val();
    var gender = $("#parent_gender").val();
    var livingStatus = $("#parent_living_status").val();
    var email = $("#parent_email").val();
    var birthDate = $('#parent_birth_date').val();
    var birthPlace = $('#parent_birth_place').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        email: email,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        registered: false,
        flag: false,
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
    uid = firebase.auth().currentUser.uid;
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    var parentPicKey = firebase.database().ref().child('parent').push().getKey();
    var fileNameOnStorage = parentPicKey + '.' + fileExtension;
    var PicStorageRef = FIREBASE_STORAGE.ref('PROFILE-PICS/' + fileNameOnStorage);
    var task = PicStorageRef.put(file);

    var submit_parent = '<button id="save_parentwithPhoto" type="button" class="btn btn-success add" data-dismiss="modal">Save With Photo</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';

    $('#submit_parent_btn').html(submit_parent);

    console.log('FILE:', file)
    console.log('FILENAME:', fileName)
    console.log('FILE EXTENSION:', fileExtension)

    $('#save_parentwithPhoto').click(function() {
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
                            // addParent(downloadURL);
                            searchParent(downloadURL);
                            }
                    })
        })

    })
}