function addSibling(downloadURL) {
    var firstName = $("#sibling_first_name").val();
    var middleName = $("#sibling_middle_name").val();
    var lastName = $("#sibling_last_name").val();
    var gender = $("#sibling_gender").val();
    var livingStatus = $("#sibling_living_status").val();
    var email = $("#sibling_email").val();
    var birthDate = $('#sibling_birth_date').val();
    var birthPlace = $('#sibling_birth_place').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        email: email,
        gender: gender,
        livingStatus: livingStatus,
        birthDate: birthDate,
        registered: false,
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

    var submit_sibling = '<button id="save_siblingwithPhoto" type="button" class="btn btn-success add" data-dismiss="modal">Save With Photo</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>';

    $('#submit_sibling_btn').html(submit_sibling);

    console.log('FILE:', file)
    console.log('FILENAME:', fileName)
    console.log('FILE EXTENSION:', fileExtension)

    $('#save_siblingwithPhoto').click(function() {
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
                            // addSibling(downloadURL);
                            searchSibling(downloadURL);
                            }
                    })
        })

    })
}