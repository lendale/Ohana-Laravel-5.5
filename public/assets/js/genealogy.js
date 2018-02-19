/* ========================
      Variables
    ======================== */

const rootRef = firebase.database().ref();
const usersRef = rootRef.child('users');
const userFamilyRef = rootRef.child('user_family');
const userTreeRef = rootRef.child('user_tree_go');

var treeData = [];
var userClanId;
var currentUser;
var currentUserGender;

/* ========================
      Event Listeners
    ======================== */

firebase.auth().onAuthStateChanged(handleAuthStateChanged);

function handleAuthStateChanged(user) {
    if (user) {
        currentUser = user
        getUserData(user.uid);
        console.log('USER', user)
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

            console.log("TREE", treeData);
            return treeData;
        })
        .then(treeData => {
            initGenogram(treeData, uid);
        })
        .then(() => {
            getAvailableParents(uid);
        });
}

function getAvailableParents(uid) {
    var motherKeys = [];
    var motherNames = [];
    var fatherKeys = [];
    var fatherNames = [];

    let single = $(`
            <div class="radio">
                <label>
                    <input type="radio" name="availableParents" value="${currentUser.uid}">
                    ${currentUser.displayName}
                </label>
            </div>
        `);
    single.appendTo("#parents_container");

    userFamilyRef.child(uid).child('spouse_keys').child('ux').once('value').then(snap => {

        if (!(snap.val() === undefined || snap.val() === null)) {
            motherKeys = Object.keys(snap.val());
            motherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                let div = $(`
                        <div class="radio">
                            <label>
                                <input type="radio" name="availableParents" value="${childSnap.key}">
                                ${currentUser.displayName} and ${childSnap.val()}
                            </label>
                        </div>
                    `);
                div.appendTo("#parents_container");
            });
        } else {
            return;
        }
    });

    userFamilyRef.child(uid).child('spouse_keys').child('vir').once('value').then(snap => {

        if (!(snap.val() === undefined || snap.val() === null)) {
            fatherKeys = Object.keys(snap.val());
            fatherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                let div = $(`
                        <div class="radio">
                            <label>
                                <input type="radio" name="availableParents" value="${childSnap.key}">
                                ${currentUser.displayName} and ${childSnap.val()}
                            </label>
                        </div>
                    `);
                div.appendTo("#parents_container");
            });
        } else {
            return;
        }
    });
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
        // relationship: "father",
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

function addFather() {
    var gender = $("#father_gender").val();
    var livingStatus = $("#father_living_status").val();
    var role = $("#father_role_in_tree").val();
    var firstName = $("#father_first_name").val();
    var middleName = $("#father_middle_name").val();
    var lastName = $("#father_last_name").val();
    var email = $("#father_email").val();
    var birthDate = $('#father_birth_date').val();
    var birthPlace = $('#father_birth_place').val();

    var person = {
        gender: gender,
        relationship: "father",
        livingStatus: livingStatus,
        role: role,
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        birthDate: birthDate,
        clanId: userClanId,
        merged: false
    };

    if (middleName.length > 0) {
        person.middleName = middleName;
    }

    if (birthPlace.length > 0) {
        person.birthPlace = birthPlace;
    }

    if (email.length > 0) {
        person.email = email;
    }

    userFamilyRef.child(currentUser.uid).child('fathers').push(person);
}

function addMother() {
    var gender = $("#mother_gender").val();
    var livingStatus = $("#mother_living_status").val();
    var role = $("#mother_role_in_tree").val();
    var firstName = $("#mother_first_name").val();
    var middleName = $("#mother_middle_name").val();
    var lastName = $("#mother_maiden_name").val();
    var email = $("#mother_email").val();
    var birthDate = $('#mother_birth_date').val();
    var birthPlace = $('#mother_birth_place').val();

    var person = {
        gender: gender,
        relationship: "mother",
        livingStatus: livingStatus,
        role: role,
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        birthDate: birthDate,
        clanId: userClanId,
        merged: false
    };

    if (middleName.length > 0) {
        person.middleName = middleName;
    }

    if (birthPlace.length > 0) {
        person.birthPlace = birthPlace;
    }

    if (email.length > 0) {
        person.email = email;
    }

    userFamilyRef.child(currentUser.uid).child('mothers').push(person);
}

function addSpouse() {
    var gender = $("#spouse_gender").val();
    var livingStatus = $("#spouse_living_status").val();
    var marital = $("#spouse_relationship").val();
    var role = $("#spouse_role_in_tree").val();
    var firstName = $("#spouse_first_name").val();
    var middleName = $("#spouse_middle_name").val();
    var lastName = $("#spouse_last_name").val();
    var email = $("#spouse_email").val();
    var birthDate = $('#spouse_birth_date').val();
    var birthPlace = $('#spouse_birth_place').val();

    var person = {
        gender: gender,
        livingStatus: livingStatus,
        maritalStatus: marital,
        role: role,
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        birthDate: birthDate,
        clanId: userClanId,
        merged: false
    };

    if (middleName.length > 0) {
        person.middleName = middleName;
    }

    if (birthPlace.length > 0) {
        person.birthPlace = birthPlace;
    }

    if (email.length > 0) {
        person.email = email;
    }

    if (gender === "male") {
        person.relationship = "husband";
        userFamilyRef.child(currentUser.uid).child('husbands').push(person);
    } else {
        person.relationship = "wife";
        userFamilyRef.child(currentUser.uid).child('wives').push(person);
    }
}

function addChild() {
    var gender = $("#child_gender").val();
    var livingStatus = $("#child_living_status").val();
    var role = $("#child_role_in_tree").val();
    var firstName = $("#child_first_name").val();
    var middleName = $("#child_middle_name").val();
    var lastName = $("#child_last_name").val();
    var email = $('#child_email').val();
    var birthDate = $('#child_birth_date').val();
    var birthPlace = $('#child_birth_place').val();
    var parentSpouseKey = $(`input[name='availableParents']:checked`).val();

    var person = {
        gender: gender,
        livingStatus: livingStatus,
        role: role,
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        birthDate: birthDate,
        clanId: userClanId,
        merged: false
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

    if (lastName.length > 0) {
        person.birthPlace = birthPlace;
    }

    if (email.length > 0) {
        person.email = email;
    }

    if (gender === "male") {
        person.relationship = "son";
        userFamilyRef.child(currentUser.uid).child('sons').push(person);
    } else {
        person.relationship = "daughter";
        userFamilyRef.child(currentUser.uid).child('daughters').push(person);
    }
}

function resetForm() {
    $('form#form_add_father').get(0).reset();
    $('form#form_add_mother').get(0).reset();
    $('form#form_add_spouse').get(0).reset();
    $('form#form_add_child').get(0).reset();
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
})