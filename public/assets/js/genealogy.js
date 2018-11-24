/* ========================
      Variables
    ======================== */

const FIREBASE_DATABASE = firebase.database();
const FIREBASE_STORAGE = firebase.storage();
const rootRef = firebase.database().ref();
const usersRef = rootRef.child('users');
const userFamilyRef = rootRef.child('user_family');
const userTreeRef = rootRef.child('user_tree_go');
const userPotentialRef = rootRef.child('potential_users');

var treeData = [];
var userClanId;
var currentUser;
var currentUserGender;
var potentialuser;

/* ========================
      Event Listeners
    ======================== */

firebase.auth().onAuthStateChanged(handleAuthStateChanged);

function handleAuthStateChanged(user) {
    if (user) {
        currentUser = user
        getUserData(user.uid);
    } else {}
}

/* ========================
      Functions
    ======================== */

function getUserData(uid) {
    usersRef
        .child(uid)
        .once("value")
        .then(result => {
            currentUserGender = result.val().gender;
            userClanId = result.val().clanId;
            return userClanId;
        })
        .then(userClanId => {
            getTreeData(uid, userClanId);
        });
}

function getTreeData(uid, clanId) {
    userTreeRef
        .child(clanId)
        .once("value")
        .then(snapshot => {
            snapshot.forEach(childSnapshot => {
                let obj = childSnapshot.val();
                let virs = [];
                let uxs = [];

                if (!(obj.ux === undefined || obj.ux === null)) {
                    let arrUx = Object.values(obj.ux);

                    obj.ux = arrUx;
                }

                if (!(obj.vir === undefined || obj.vir === null)) {
                    let arrVir = Object.values(obj.vir);

                    obj.vir = arrVir;
                }

                if (!(obj.ms === undefined || obj.ms === null)) {
                    let arrMs = Object.values(obj.ms);

                    obj.ms = arrMs;
                }

                treeData.push(obj);
            });

            return treeData;
        })
        .then(treeData => {
            initGenogram(treeData, uid);
        })
        .then(() => {
            getAvailableParents(uid, clanId);
        });
}

function getAvailableParents(uid, clanId) {
    var motherKeys = [];
    var motherNames = [];
    var fatherKeys = [];
    var fatherNames = [];

    let single = $(`
            <git class="radio">
                <label>
                    <input type="radio" name="availableParents" value="${currentUser.uid}">
                    ${currentUser.displayName}
                </label>
            </div>
        `);
    single.appendTo("#parents_container");

    // userTreeRef.child(`${userClanId}/${currentUser.uid}/ux`).once('value').then(snap => {
    //     if (snap.exists()) {
    //         motherKeys = Object.keys(snap.val());
    //         motherNames = Object.values(snap.val());
    //     }
    // })

    // userFamilyRef.child(uid).child('spouse_keys').child('ux').once('value').then(snap => {

    //     if (!(snap.val() === undefined || snap.val() === null)) {
    //         motherKeys = Object.keys(snap.val());
    //         motherNames = Object.values(snap.val());

    //         snap.forEach(childSnap => {
    //             let div = $(`
    //                     <div class="radio">
    //                         <label>
    //                             <input type="radio" name="availableParents" value="${childSnap.key}">
    //                             ${currentUser.displayName} and ${childSnap.val()}
    //                         </label>
    //                     </div>
    //                 `);
    //             div.appendTo("#parents_container");
    //         });
    //     } else {
    //         return;
    //     }
    // });

    // userFamilyRef.child(uid).child('spouse_keys').child('vir').once('value').then(snap => {

    //     if (!(snap.val() === undefined || snap.val() === null)) {
    //         fatherKeys = Object.keys(snap.val());
    //         fatherNames = Object.values(snap.val());

    //         snap.forEach(childSnap => {
    //             let div = $(`
    //                     <div class="radio">
    //                         <label>
    //                             <input type="radio" name="availableParents" value="${childSnap.key}">
    //                             ${currentUser.displayName} and ${childSnap.val()}
    //                         </label>
    //                     </div>
    //                 `);
    //             div.appendTo("#parents_container");
    //         });
    //     } else {
    //         return;
    //     }
    // });

    userTreeRef.child(clanId).child(uid).child('vir').once('value').then(snap => {
        if (!(snap.val() === undefined || snap.val() === null)) {
            fatherKeys = Object.keys(snap.val());
            fatherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                userTreeRef.child(clanId).child(childSnap.val()).once('value').then(snap => {
                    let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" name="availableParents" value="${snap.val().key}">
                                    ${currentUser.displayName} and ${snap.val().n}
                                </label>
                            </div>
                        `);
                    div.appendTo("#parents_container");
                });
            });
        }
    })
}

function addFamilyMember() {
    var gender = $("select.select-gender").val();
    var livingStatus = $("select.select-status").val();
    var role = $("select.select-role").val();
    var firstName = $(".first-name").val();
    var middleName = $(".middle-name").val();
    var lastName = $(".last-name").val();
    var birthDate = $(".birth-date").val();
    var birthPlace = $(".birth-place").val();

    var person = {
        gender: gender,
        relationship: "father",
        livingStatus: livingStatus,
        role: role,
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        birthDate: birthDate,
        clanId: userClanId
    };

    if (middleName.length > 0) {
        person.middleName = middleName;
    }

    if (birthPlace.length > 0) {
        person.birthPlace = birthPlace;
    }

    console.log(person);

    //   userFamilyRef.child(currentUser.uid).child("fathers").push(person);
}

function addFather(downloadURL) {
    var firstName = $("#father_first_name").val();
    var middleName = $("#father_middle_name").val();
    var lastName = $("#father_last_name").val();
    var gender = $("#father_gender").val();
    var livingStatus = $("#father_living_status").val();
    var role = $("#father_role_in_tree").val();
    var email = $("#father_email").val();
    var birthDate = $('#father_birth_date').val();
    var birthPlace = $('#father_birth_place').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        role: role,
        birthDate: birthDate,
        relationship: "father",
        clanId: userClanId,
        merged: false,
        photoURL: downloadURL
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
        person.livingStatus == null ||
        person.role == null ||
        person.birthDate == ""
    ) {
        $("#error_details")
            .modal('show');

        $("#error_details_node")
            .empty()
            .append('Required fields are empty. Website will refresh shortly.');
        return location.reload();
    }
    else {
        userFamilyRef.child(currentUser.uid).child('fathers').push(person);
        return location.reload();
    }
}

function handleFatherPic(eventData){
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
        addFather(downloadURL);
        console.log(downloadURL)
        console.log('Addded to the Storage')
    })
}

function addMother(downloadURL) {
    var firstName = $("#mother_first_name").val();
    var middleName = $("#mother_middle_name").val();
    var lastName = $("#mother_maiden_name").val();
    var gender = $("#mother_gender").val();
    var livingStatus = $("#mother_living_status").val();
    var role = $("#mother_role_in_tree").val();
    var email = $("#mother_email").val();
    var birthDate = $('#mother_birth_date').val();
    var birthPlace = $('#mother_birth_place').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        role: role,
        birthDate: birthDate,
        relationship: "mother",
        clanId: userClanId,
        merged: false,
        photoURL: downloadURL
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
        person.livingStatus == null ||
        person.role == null ||
        person.birthDate == ""
    ) {
        $("#error_details")
            .modal('show');

        $("#error_details_node")
            .empty()
            .append('Required fields are empty. Website will refresh shortly.');
        return location.reload();
    }
    else {
        userFamilyRef.child(currentUser.uid).child('mothers').push(person);
        return location.reload();
    }
}

function handleMotherPic(eventData){
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
        addMother(downloadURL);
        console.log(downloadURL)
        console.log('Addded to the Storage')
    })

}

function addSpouse(downloadURL) {
    var firstName = $("#spouse_first_name").val();
    var middleName = $("#spouse_middle_name").val();
    var lastName = $("#spouse_last_name").val();
    var gender = $("#spouse_gender").val();
    var livingStatus = $("#spouse_living_status").val();
    var maritalStatus = $("#spouse_relationship").val();
    var role = $("#spouse_role_in_tree").val();
    var email = $("#spouse_email").val();
    var birthDate = $('#spouse_birth_date').val();
    var birthPlace = $('#spouse_birth_place').val();

    var person = {
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        gender: gender,
        livingStatus: livingStatus,
        maritalStatus: maritalStatus,
        role: role,
        birthDate: birthDate,
        clanId: userClanId,
        merged: false,
        photoURL: downloadURL
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
        person.maritalStatus == null ||
        person.role == null ||
        person.birthDate == ""
    ) {
        $("#error_details")
            .modal('show');

        $("#error_details_node")
            .empty()
            .append('Required fields are empty. Website will refresh shortly.');
        return location.reload();
    }
    else if (gender === "male") {
        person.relationship = "husband";
        userFamilyRef.child(currentUser.uid).child('husbands').push(person);
        return location.reload();
    } else {
        person.relationship = "wife";
        userFamilyRef.child(currentUser.uid).child('wives').push(person);
        return location.reload();
    }
}

function handleSpousePic(eventData){
    // uid = firebase.auth().currentUser.uid;
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    var spousePicKey = firebase.database().ref().child('spouse').push().getKey();
    var fileNameOnStorage = spousePicKey + '.' + fileExtension;
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
        addSpouse(downloadURL);
        console.log(downloadURL)
        console.log('Addded to the Storage')
    })
}

function addChild(downloadURL) {
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
        merged: false,
        parenthood: parenthood,
        photoURL: downloadURL
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
            .append('Required fields are empty. Website will refresh shortly.');
        return location.reload();
    }
    else if (gender === "male") {
        person.relationship = "son";
        userFamilyRef.child(currentUser.uid).child('sons').push(person);
        return location.reload();
    } else {
        person.relationship = "daughter";
        userFamilyRef.child(currentUser.uid).child('daughters').push(person);
        return location.reload();
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

function resetForm() {
    $('form#form_add_father').get(0).reset();
    $('form#form_add_mother').get(0).reset();
    $('form#form_add_spouse').get(0).reset();
    $('form#form_add_child').get(0).reset();
}

function showLoading() {
    swal({
        imageUrl: "assets/img/grow-tree.gif",
        title: "Loading Photo...",
        // text: "Please wait",
        timer: 7000,
        showConfirmButton: false
        // type: "success"
    })
}

function showSuccess() {
    swal({
        // imageUrl: "assets/img/grow-tree.gif",
        title: "Successfully Added",
        // text: "Please wait",
        timer: 7000,
        showConfirmButton: false,
        type: "success"
    })
}

$(document).ready(function() {
    materialKit.initFormExtendedDatetimepickers();

    $('ul#ul_tabs li#li_tab_search').click(function() {
        $('#btn_add').hide();
        $('#btn_search').show();
    })

    $("ul#ul_tabs li#li_tab_tree").click(function() {
        $("#btn_add").show();
        $("#btn_search").hide();
    })

    $('#add_father').click(function() {
        $('div#modal_add_father h4').empty()
        $('div#modal_add_father h4').append("Add a Father for " + currentUser.displayName)
    })

    $('#add_mother').click(function() {
        $('div#modal_add_mother h4').empty()
        $('div#modal_add_mother h4').append("Add a Mother for " + currentUser.displayName)
    })

    $('#add_spouse').click(function() {
        $('div#modal_add_spouse h4').empty()
        $('div#modal_add_spouse h4').append("Add a Spouse for " + currentUser.displayName)
    })

    $('#add_child').click(function() {
        $('div#modal_add_child h4').empty()
        $('div#modal_add_child h4').append("Add a Child for " + currentUser.displayName)
    })

    $('#father_pic').change(handleFatherPic);
    $('#mother_pic').change(handleMotherPic);
    $('#spouse_pic').change(handleSpousePic);
    $('#child_pic').change(handleChildPic);

    $('#save_father').click(function() {
        addFather();
        resetForm();
    })

    $('#save_mother').click(function() {
        addMother();
        resetForm();
    })

    $('#save_spouse').click(function() {
        addSpouse();
        resetForm();
    })

    $('#save_child').click(function() {
        addChild();
        resetForm();
    })

    $('#update_users').click(function() {
        updateUsers();
    })

    // userFamilyRef.child('-LAyiGdITnq2BBb_GwK4').once('value').then(snap => {
    //     console.log('SNAP', snap.val())
    // })

    // userFamilyRef.once('value').then(snap => {
    //     // console.log('SNAP', snap.val())
    //     snap.forEach(childSnap => {
    //         let val = childSnap.val()

    //         let mothers = val.mothers

    //         if (!(val.fathers === null || val.fathers === undefined)) {
    //             let fathers = Object.entries(val.fathers)


    //             console.log('FA', fathers)
    //         }

    //         // console.log('VAL', val.fathers)
    //     })
    // })

    userTreeRef.once('value').then(snap => {
        console.log('SNAP', snap.val())
            // snap.val().forEach(childSnap => {
            //     console.log('childSNap', childSnap.val())
            // })
    })
})