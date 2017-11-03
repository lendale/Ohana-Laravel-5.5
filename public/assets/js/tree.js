const rootRef = firebase.database().ref();

var family = [];
var clan = [];
var keys = [];

function getFamilyData() {
    const userFamilyRef = rootRef.child("user_family_tree_go");

    userFamilyRef
        .child("1")
        .once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var obj = childSnapshot.val();
                // keys.push(childSnapshot.key);
                family.push(obj);
            });
        })
        .then(function() {
            initFamilyTree(family);
        });
    // console.log(family)
    // console.log(keys)
}

function getClanData() {
    const userClanRef = rootRef.child("user_clan_tree_go");

    userClanRef
        .child("1")
        .once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var obj = childSnapshot.val();
                clan.push(obj);
            });
        })
        .then(function() {
            initClanTree(clan);
        });
    // console.log(clan)
}

function addFamilyMember() {
    const userWivesRef = rootRef.child("user_wives");
    const userHusbandssRef = rootRef.child("user_husbands");
    const userMothersRef = rootRef.child('user_mothers');
    const userFathersRef = rootRef.child('user_fathers');
    const userDaughtersRef = rootRef.child('user_daughters');
    const userSonsRef = rootRef.child("user_sons");

    var uid = firebase.auth().currentUser.uid;
    var relationship = document.getElementById("select_relationship").value;
    var living = document.getElementById("living_status").value;
    var firstName = document.getElementById("first_name").value;
    var middleName = document.getElementById("middle_name").value;
    var lastName = document.getElementById("last_name").value;
    var person = {
        relationship: relationship,
        livingStatus: living,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName
    };

    if (relationship === "mother") {
        userMothersRef.child(uid).push(person);
    } else if (relationship === "father") {
        userFathersRef.child(uid).push(person);
    } else if (relationship === "wife") {
        userWivesRef.child(uid).push(person);
    } else if (relationship === "husband") {
        userHusbandssRef.child(uid).push(person);
    } else if (relationship === "daughter") {
        userDaughtersRef.child(uid).push(person);
    } else if (relationship === "son") {
        userSonsRef.child(uid).push(person);
    }
}