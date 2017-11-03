
// var firstName=firebase.database().ref().child('users').child(uid).child('firstName');

// firstName.on('value', snap=> console.log(snap.val()));



// PUSH DATA FOR USER'S FAMILY
function pushFamilyData() {


            if(document.getElementById('male').selected){
                gender=document.getElementById('male').value;
            } else if(document.getElementById('female').selected){
                gender=document.getElementById('female').value;
            }
    
            var firebaseRef = firebase.database().ref();

            var family=family.value;
            var firebaseRef = firebase.database().ref();
            var firstName=firstName.value;
            var middleName=middleName.value;
            var lastName=lastName.value;
            var birthDate=birthDate.value;
            var birthPlace=birthPlace.value;
            // var gender=gender.value;
            var livingStatus=livingStatus.value;
            var maritalStatus=maritalStatus.value;

            var person= {
                First_Name: firstName,
                Middle_Name: middleName,
                Last_Name: lastName,
                Birth_Date: birthDate,
                Birth_Place: birthPlace,
                Gender: gender,
                Living_Status: livingStatus,
                Marital_Status: maritalStatus
            };

            if(family.val()==='father'){
                firebase
                .database()
                .ref()
                .child("user_fathers")
                .child(uid)
                .push(person);
            } else if (family.val()==='mother'){
                firebase
                .database()
                .ref()
                .child("user_mothers")
                .child(uid)
                .push(person);
            } else if(family.val()==='spouse'){
                firebase
                .database()
                .ref()
                .child("user_spouses")
                .child(uid)
                .push(person);
            } else if (family.val()==='child'){
                firebase
                .database()
                .ref()
                .child("user_children")
                .child(uid)
                .push(person);
            }

        }

// // PUSH DATA FOR USER ONLY

function pushUserData(uid){
var firstName=document.getElementById('fname');
var middleName=document.getElementById('mname');
var lastName=document.getElementById('lname');
var birthDate=document.getElementById('bdate');
var birthPlace=document.getElementById('bplace');
var livingStatus=document.getElementById('lstatus');
var maritalStatus=document.getElementById('mstatus');
var gender = document.querySelector('input[name = "group1"]:checked');
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

var displayName;

    var uid = firebase.auth().currentUser.uid;
   
    var firebaseRef = firebase.database().ref().child('users');
    var firstName=firstName.value;
    var middleName=middleName.value;
    var lastName=lastName.value;
    var birthDate=birthDate.value;
    var birthPlace=birthPlace.value;
    var gender=gender.value;
    var livingStatus=livingStatus.options[livingStatus.selectedIndex].value;
    var maritalStatus=maritalStatus.options[maritalStatus.selectedIndex].value;


    var user= {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        birthDate: birthDate,
        birthPlace: birthPlace,
        displayName: firstName + ' ' + middleName + ' ' + lastName,
        gender: gender,
        livingStatus: livingStatus,
        maritalStatus: maritalStatus
    };

    var uid = '3fepG2oyf1d80vipej5YCHxenu53';

    

    var updates ={};
    updates['/users/'+ uid] = user;
    console.log(updates);
    return firebase.database().ref().update(updates);

    alert('User Updated Successfully!');
    reload_page();

}

function update_user(uid){
        var firstName=document.getElementById('fname');
        
        
            var uid = firebase.auth().currentUser.uid;
           
            var firebaseRef = firebase.database().ref().child('users');
            var firstName=firstName.value;
           
    

    var ref = firebase.database().ref();
    var userRef = ref.child('users');
    userRef.on('child_changed', snap=>{
        // process multi-path update 
        updateProfile({
            rootRef: ref,
            uid: snap.key,
            firstName: snap.val().firstName
        })
        
    });
}

function update(){
    var firstName=document.getElementById('fname'); 
    var middleName=document.getElementById('mname');
    var lastName=document.getElementById('lname');
    var birthDate=document.getElementById('bdate');
    var birthPlace=document.getElementById('bplace');
    var livingStatus=document.getElementById('lstatus');
    var maritalStatus=document.getElementById('mstatus');
    var gender = document.querySelector('input[name = "group1"]:checked');

    var firstName=firstName.value;
    var middleName=middleName.value;
    var lastName=lastName.value;
    var birthDate=birthDate.value;
    var birthPlace=birthPlace.value;
    var gender=gender.value;
    var maritalStatus=maritalStatus.value;

    var uid = firebase.auth().currentUser.uid;

    var firebaseRef =firebase.database().ref('users').child(uid);
    firebaseRef.update({
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        gender: gender,
        birthDate: birthDate,
        birthPlace: birthPlace,
        maritalStatus: maritalStatus
    });
    alert("Successfully Updated Profile!");
    console.log("Success!");
    location.reload();
    
}