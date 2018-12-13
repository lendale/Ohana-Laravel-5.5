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
        })
        .then(() => {
            getAvailableParentsNew(uid, clanId);
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
    single.appendTo("#parents_container2");

    userTreeRef.child(clanId).child(uid).child('vir').once('value').then(snap => {
        if (!(snap.val() === undefined || snap.val() === null)) {
            fatherKeys = Object.keys(snap.val());
            fatherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                userTreeRef.child(clanId).child(childSnap.val()).once('value').then(snap2 => {
                    let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" name="availableParents" value="${snap2.val().key}">
                                    ${currentUser.displayName} and ${snap2.val().n}
                                </label>
                            </div>
                        `);
                    div.appendTo("#parents_container2");
                });
            });
        }
    })

    userTreeRef.child(clanId).child(uid).child('ux').once('value').then(snap => {
        if (!(snap.val() === undefined || snap.val() === null)) {
            motherKeys = Object.keys(snap.val());
            motherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                userTreeRef.child(clanId).child(childSnap.val()).once('value').then(snap2 => {
                    let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" name="availableParents" value="${snap2.val().key}">
                                    ${currentUser.displayName} and ${snap2.val().n}
                                </label>
                            </div>
                        `);
                    div.appendTo("#parents_container2");
                });
            });
        }
    })
}

function getAvailableParentsNew(uid, clanId) {
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

    userTreeRef.child(clanId).child(uid).child('vir').once('value').then(snap => {
        if (!(snap.val() === undefined || snap.val() === null)) {
            fatherKeys = Object.keys(snap.val());
            fatherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                userTreeRef.child(clanId).child(childSnap.val()).once('value').then(snap2 => {
                    let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" name="availableParents" value="${snap2.val().key}">
                                    ${currentUser.displayName} and ${snap2.val().n}
                                </label>
                            </div>
                        `);
                    div.appendTo("#parents_container");
                });
            });
        }
    })

    userTreeRef.child(clanId).child(uid).child('ux').once('value').then(snap => {
        if (!(snap.val() === undefined || snap.val() === null)) {
            motherKeys = Object.keys(snap.val());
            motherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                userTreeRef.child(clanId).child(childSnap.val()).once('value').then(snap2 => {
                    let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" name="availableParents" value="${snap2.val().key}">
                                    ${currentUser.displayName} and ${snap2.val().n}
                                </label>
                            </div>
                        `);
                    div.appendTo("#parents_container");
                });
            });
        }
    })
}

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

    if (gender === "male") {
        person.relationship = "father";
        userFamilyRef.child(currentUser.uid).child('fathers').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
    } else {
        person.relationship = "mother";
        userFamilyRef.child(currentUser.uid).child('mothers').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
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
        // return location.reload();
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
        person.livingStatus == null ||
        person.role == null ||
        person.birthDate == ""
    ) {
        $("#error_details")
            .modal('show');

        $("#error_details_node")
            .empty()
            .append('Required fields are empty. Website will refresh shortly.');
        // return location.reload();
    }
    
    if (gender === "male") {
        person.relationship = "brother";
        userFamilyRef.child(currentUser.uid).child('brothers').push(person);

        // if(userMotherKey !== undefined || userMotherKey !== null) {
        //     userFamilyRef.child(userMotherKey).child('sons').push(person);
        // }
        
        // if(userFatherKey !== undefined || userFatherKey !== null) {
        //     userFamilyRef.child(userFatherKey).child('sons').push(person);
        // }

        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
    }
    else if (gender === "female") {
        person.relationship = "sister";
        userFamilyRef.child(currentUser.uid).child('sisters').push(person);

        // if(userMotherKey !== undefined || userMotherKey !== null) {
        //     userFamilyRef.child(userMotherKey).child('daughters').push(person);
        // }
        
        // if(userFatherKey !== undefined || userFatherKey !== null) {
        //     userFamilyRef.child(userFatherKey).child('daughters').push(person);
        // }


        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
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

// function addSpouse(downloadURL) {
function addSpouse() {
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
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 8000);
    } else {
        person.relationship = "wife";
        userFamilyRef.child(currentUser.uid).child('wives').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 8000);
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
            .append('Required fields are empty. Website will refresh shortly.');
        return location.reload();
    }
    else if (gender === "male") {
        person.relationship = "son";
        userFamilyRef.child(currentUser.uid).child('sons').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
    } else {
        person.relationship = "daughter";
        userFamilyRef.child(currentUser.uid).child('daughters').push(person);
        showSuccess();
        setTimeout(function() {
            return location.reload();
        }, 5000);
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