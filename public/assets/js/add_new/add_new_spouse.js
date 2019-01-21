function addSpouse(downloadURL) {
    var firstName = $("#spouse_first_name").val();
    var middleName = $("#spouse_middle_name").val();
    var lastName = $("#spouse_last_name").val();
    var gender = $("#spouse_gender").val();
    var livingStatus = $("#spouse_living_status").val();
    var maritalStatus = $("#spouse_relationship").val();
    var email = $("#spouse_email").val();
    var birthDate = $('#spouse_birth_date').val();
    var birthPlace = $('#spouse_birth_place').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        email: email,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        registered: false,
        maritalStatus: maritalStatus,
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
        person.birthDate == "" ||
        person.maritalStatus == null
    ) {
        $("#error_details")
            .modal('show');

        $("#error_details_node")
            .empty()
            .append('Required fields are empty.');
        
        setTimeout(function() {
            $("#modal_add_spouse")
                .modal('show');
        }, 1000);
    }
    else if (gender === "male") {
        person.relationship = "husband";
        userFamilyRef.child(currentUser.uid).child('husbands').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 10000);
    } else {
        person.relationship = "wife";
        userFamilyRef.child(currentUser.uid).child('wives').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 10000);
    }
}

function handleSpousePic(eventData){
    uid = firebase.auth().currentUser.uid;
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    var spousePicKey = firebase.database().ref().child('spouse').push().getKey();
    var fileNameOnStorage = spousePicKey + '.' + fileExtension;
    var PicStorageRef = FIREBASE_STORAGE.ref('PROFILE-PICS/' + fileNameOnStorage);

    var submit_spouse = '<button id="save_spousewithPhoto" type="button" class="btn btn-success add" data-dismiss="modal">Save With Photo</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';

    $('#submit_spouse_btn').html(submit_spouse);

    $('#save_spousewithPhoto').click(function() {
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
                            // addSpouse(downloadURL);
                            searchSpouse(downloadURL);
                        }
                })
    })
})
}