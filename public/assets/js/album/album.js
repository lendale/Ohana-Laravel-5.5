
var usersRoot = firebase.database().ref().child('users');
var albumRef =  firebase.database().ref().child('album')
var albumPrivacyRef = firebase.database().ref().child('album_privacy')
var albumPrivacyRefUsers = albumPrivacyRef.child('users')
var albumPrivacyRefImmediate = albumPrivacyRef.child('immediate')
var albumPrivacyRefExtended = albumPrivacyRef.child('extended') 
var albumPrivacyRefPublic = albumPrivacyRef.child('public')
var extendedFamilyRef = firebase.database().ref().child('extended_family')
var immediateFamilyRef = firebase.database().ref().child('immediate_family')
var eventResponseRef = firebase.database().ref().child('event_response')

var uid;
var familyId;
var extendedId;
var currentUser;
var immediateFam;

firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        currentUser = user;
        uid = currentUser.uid;
    }else{
        console.log('No signed in User!')
    }
})

// lightGallery(document.getElementById('lightgallery')) 

function getDate(){
    var currentdate = new Date();
    var month;

    if (currentdate.getMonth()+1 == 12){
        month = 'Dec';
    }
    if (currentdate.getMonth()+1 == 11){
        month = 'Nov';
    }
    if (currentdate.getMonth()+1 == 10){
        month = 'Oct';
    }
    if (currentdate.getMonth()+1 == 9){
        month = 'Sept';
    }
    if (currentdate.getMonth()+1 == 8){
        month = 'Aug';
    }
    if (currentdate.getMonth()+1 == 7){
        month = 'Jul';
    }
    if (currentdate.getMonth()+1 == 6){
        month = 'Jun';
    }
    if (currentdate.getMonth()+1 == 5){
        month = 'May';
    }
    if (currentdate.getMonth()+1 == 4){
        month = 'Apr';
    }
    if (currentdate.getMonth()+1 == 3){
        month = 'Mar';
    }
    if (currentdate.getMonth()+1 == 2){
        month = 'Feb';
    }
    if (currentdate.getMonth()+1 == 1){
        month = 'Jan';
    }
 
    uploadDate = month + " " +currentdate.getDate()  + "," + currentdate.getFullYear();
    // console.log(uploadDate)
}
function getTime(){
    var currentdate = new Date();
    var meridiem;
    var hour;

    if (currentdate.getHours() > 12){
        meridiem = 'PM'
        hour = currentdate.getHours() - 12;
   }
   if(currentdate.getHours() < 11){
       meridiem = 'AM'
   }
   if(currentdate.getHours() == 12){
       meridiem = 'NOON'
   }

   uploadTime = hour + ":" + currentdate.getMinutes() + " " + meridiem;
}
function showSuccessPhoto() {
    swal({
        // imageUrl: "assets/img/grow-tree.gif",
        title: "Photo/s Uploaded Successfully",
        // text: "Please wait",
        timer: 5000,
        showConfirmButton: false,
        type: "success"
    }).then(function() {},

    function(dismiss) {
        if (dismiss === "timer") {
            location.reload()
        }
    })
}
function showPhotoError(){
    swal({
        title: "Photo size too large!",
        text: "Please choose another photo",
        timer: 7000,
        showConfirmButton: false,
        type: "error"
    })
}
function showPhotoLoading(){
    swal({
        imageUrl: "assets/img/icons/loader.gif",
        imageWidth: '90',
        imageHeight: '90',
        timer: 9000,
        showConfirmButton: false
    })
}
function showSuccessAlbum() {
    swal({
        title: "Album Created Successfully",
        timer: 5000,
        showConfirmButton: false,
        type: "success"
    }).then(function() {},
    function(dismiss) {
        if (dismiss === "timer") {
            location.reload()
        }
    })
}
function showSuccessDelete() {
    swal({
        title: "Album Deleted!",
        timer: 5000,
        showConfirmButton: false,
        type: "success"
    }).then(function() {},
    function(dismiss) {
        if (dismiss === "timer") {
            location.reload()
        }
    })
}
function showSuccessUpdate() {
    swal({
        title: "Album Updated!",
        timer: 5000,
        showConfirmButton: false,
        type: "success"
    }).then(function() {},
    function(dismiss) {
        if (dismiss === "timer") {
            location.reload()
        }
    })
}
function showSuccessPrivacyUpdate() {
    swal({
        title: "Album Privacy Updated!",
        timer: 5000,
        showConfirmButton: false,
        type: "success"
    }).then(function() {},
    function(dismiss) {
        if (dismiss === "timer") {
            location.reload()
        }
    })
}
function showErrorAccess(){
    swal({
        // title: "",
        text: "You are not authorized to edit, update or delete this album.",
        timer: 7000,
        showConfirmButton: false,
        type: "error"
    }).then(function() {},
    function(dismiss) {
        if (dismiss === "timer") {
            location.reload()
        }
    })
}
function showAccessErrorUpload(){
    swal({
        text: "You are not authorized to upload photos.",
        timer: 7000,
        showConfirmButton: false,
        type: "error"
    }).then(function() {},
    function(dismiss) {
        if (dismiss === "timer") {
            location.reload()
        }
    })
}