/* ========================
      Variables
    ======================== */

const rootRef = firebase.database().ref();
const usersRef = rootRef.child('users');
const userFamilyRef = rootRef.child('user_family');
const userTreeRef = rootRef.child('user_tree_go');

// const userWivesRef = rootRef.child("user_wives");
// const userHusbandssRef = rootRef.child("user_husbands");
// const userMothersRef = rootRef.child("user_mothers");
// const userFathersRef = rootRef.child("user_fathers");
// const userDaughtersRef = rootRef.child("user_daughters");
// const userSonsRef = rootRef.child("user_sons");

var treeData = [];
var userClanId;
var currentUser;

/* ========================
      Event Listeners
    ======================== */

firebase.auth().onAuthStateChanged(handleAuthStateChanged);

function handleAuthStateChanged(user) {
    if (user) {
        currentUser = user
        console.log(user)
        getUserClanId(currentUser.uid);
    } else {}
}


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

/* ========================
      Functions
    ======================== */

function getUserClanId(uid) {
    usersRef
        .child(uid)
        .once("value")
        .then(function(snapshot) {
            userClanId = snapshot.val().clanId;
        })
        .then(function() {
            getTreeData(uid, userClanId);
        });
}

function getTreeData(uid, clanId) {
    userTreeRef
        .child(clanId)
        .once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var obj = childSnapshot.val();
                // keys.push(childSnapshot.key);
                treeData.push(obj);
            });
        })
        .then(function() {
            initGenogram(treeData, uid);
        });
}

function addFamilyMember() {
    var gender = $("#select_gender").val();
    var relationship = $("#select_relationship").val();
    var livingStatus = $("#select_living_status").val();
    var firstName = $("#first_name").val();
    var middleName = $("#middle_name").val();
    var lastName = $("#last_name").val();
    var birthDate = $('#birth_date').val();
    var birthPlace = $('#birth_place').val();

    var person = {
        gender: gender,
        relationship: relationship,
        livingStatus: livingStatus,
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        birthDate: birthDate,
        clanId: userClanId
    };

    if ($("#middle_name").length > 0) {
        person.middleName = middleName;
    }

    if ($("#birth_place").length > 0) {
        person.birthPlace = birthPlace;
    }

    if (relationship === "mother") {
        person.loc = "user_mothers";
        userMothersRef.child(currentUser.uid).push(person);
    } else if (relationship === "father") {
        person.loc = "user_fathers";
        userFathersRef.child(currentUser.uid).push(person);
    } else if (relationship === "wife") {
        person.loc = "user_wivess";
        userWivesRef.child(currentUser.uid).push(person);
    } else if (relationship === "husband") {
        person.loc = "user_husbands";
        userHusbandssRef.child(currentUser.uid).push(person);
    } else if (relationship === "daughter") {
        person.loc = "user_daughters";
        userDaughtersRef.child(currentUser.uid).push(person);
    } else if (relationship === "son") {
        person.loc = "user_sons";
        userSonsRef.child(currentUser.uid).push(person);
    }

    resetAddFamilyForm();
}

function addFather() {
    var gender = $("#father_gender").val();
    var livingStatus = $("#father_living_status").val();
    var firstName = $("#father_first_name").val();
    var middleName = $("#father_middle_name").val();
    var lastName = $("#father_last_name").val();
    var birthDate = $('#father_birth_date').val();
    var birthPlace = $('#father_birth_place').val();

    var person = {
        gender: gender,
        relationship: "father",
        livingStatus: livingStatus,
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        birthDate: birthDate,
        clanId: userClanId
    };

    if ($("#father_middle_name").length > 0) {
        person.middleName = middleName;
    }

    if ($("#father_birth_place").length > 0) {
        person.birthPlace = birthPlace;
    }

    userFamilyRef.child(currentUser.uid).child('fathers').push(person);
}

function addMother() {
    var gender = $("#mother_gender").val();
    var livingStatus = $("#mother_living_status").val();
    var firstName = $("#mother_first_name").val();
    var middleName = $("#mother_middle_name").val();
    var lastName = $("#mother_maiden_name").val();
    var birthDate = $('#mother_birth_date').val();
    var birthPlace = $('#mother_birth_place').val();

    var person = {
        gender: gender,
        relationship: "mother",
        livingStatus: livingStatus,
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        birthDate: birthDate,
        clanId: userClanId
    };

    if ($("#mother_middle_name").length > 0) {
        person.middleName = middleName;
    }

    if ($("#mother_birth_place").length > 0) {
        person.birthPlace = birthPlace;
    }

    userFamilyRef.child(currentUser.uid).child('mothers').push(person);
}

function addSpouse() {
    var gender = $("#spouse_gender").val();
    var livingStatus = $("#spouse_living_status").val();
    var firstName = $("#spouse_first_name").val();
    var middleName = $("#spouse_middle_name").val();
    var lastName = $("#spouse_last_name").val();
    var birthDate = $('#spouse_birth_date').val();
    var birthPlace = $('#spouse_birth_place').val();

    var person = {
        gender: gender,
        livingStatus: livingStatus,
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        birthDate: birthDate,
        clanId: userClanId
    };

    if ($("#spouse_middle_name").length > 0) {
        person.middleName = middleName;
    }

    if ($("#spouse_birth_place").length > 0) {
        person.birthPlace = birthPlace;
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
    var firstName = $("#child_first_name").val();
    var middleName = $("#child_middle_name").val();
    var lastName = $("#child_last_name").val();
    var birthDate = $('#child_birth_date').val();
    var birthPlace = $('#child_birth_place').val();

    var person = {
        gender: gender,
        livingStatus: livingStatus,
        firstName: firstName,
        lastName: lastName,
        displayName: firstName + " " + lastName,
        birthDate: birthDate,
        clanId: userClanId
    };

    if ($("#child_middle_name").length > 0) {
        person.middleName = middleName;
    }

    if ($("#child_birth_place").length > 0) {
        person.birthPlace = birthPlace;
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
    $('form').get(0).reset();
}

$(document).ready(function() {
    materialKit.initFormExtendedDatetimepickers();
})