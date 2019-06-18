$('#submit_search').click(getSearchData);
var usersRef= firebase.database().ref().child('users')
var extendedFamilyRef = firebase.database().ref().child('extended_family')
var person1_extMem = [];
var person2_extMem = [];
var person1;
var person2;

firebase.auth().onAuthStateChanged(handleAuthStateChanged);
    
function handleAuthStateChanged(user) {
    if (user) {
        currentUser = user;
    } else {}
}

function getSearchData(){
    person1 = $("#person_1").val();
    person2 = $("#person_2").val();
    var person1_extId
    var person2_extId

    console.log("PERSON 1:", person1)
    console.log("PERSON 2:", person2)


    if(person1 != "" && person2 != ""){
        usersRef.once("value").then(snap =>{
            snap.forEach(snap2=>{
                if(snap2.val().displayName.toLowerCase() == person1.toLowerCase()){
                    console.log("Person1 Extended ID:", snap2.val().extendedId)
                    person1_extId = snap2.val().extendedId
                    retrieveFirstPersonData(person1_extId)
                } 
                else if(snap2.val().displayName.toLowerCase() == person2.toLowerCase()){
                    console.log("Person2 Extended ID:", snap2.val().extendedId)
                    person2_extId = snap2.val().extendedId
                    retrieveSecondPersonData(person2_extId)
                }else{
                    console.log("one person does not exist")
                }
            })
        })
    }            
}
function retrieveFirstPersonData(person1_extId){
    console.log(person1_extId)
    extendedFamilyRef.child(person1_extId).once('value')
        .then(function(data_p1){
            // console.log(data_p1.val())
            data_p1.forEach(function(snap_p1){
                // console.log("SNAP P111111111:",snap_p1.val())
                person1_extMem.push(snap_p1.val())
                displayExtId_P1()
                similiar_extendedId()
            })
        })
}
function retrieveSecondPersonData(person2_extId){
    console.log(person2_extId)
    extendedFamilyRef.child(person2_extId).once('value')
        .then(function(data_p2){
            // console.log(data_p2.val())
            data_p2.forEach(function(snap_p2){
                // console.log("SNAP P222222222:",snap_p2.val())
                person2_extMem.push(snap_p2.val())
                displayExtId_P2()
                similiar_extendedId()
            })
        })
}
function displayExtId_P1(){
    console.log(person1)
    var html = '';
    var html_name = '';
    person1_extMem.forEach(function(extfam_id){
        usersRef.child(extfam_id).once('value')
            .then(function(snap){
                html += '<h6>'+snap.val().displayName+'</h6>';
                $('#person1_txt').html(html)
        })
        // html += '<h6>'+extfam_id+'</h6>';
        // $('#person1_txt').html(html)
    })

    html_name += '<h4><b>'+ person1 +'</b></h4>'
    $('#person1_txtname').html(html_name)
}
function displayExtId_P2(){
    console.log(person2)
    var html_id = '';
    var html_name = '';
    person2_extMem.forEach(function(extfam_id){
        usersRef.child(extfam_id).once('value')
            .then(function(snap){
                html_id += '<h6>'+snap.val().displayName+'</h6>';
                $('#person2_txt').html(html_id)
        })
        // html_id += '<h6>'+extfam_id+'</h6>';
        // $('#person2_txt').html(html_id)
    })
    html_name += '<h4><b>'+ person2 +'</b></h4>'    
    $('#person2_txtname').html(html_name)
}

function similiar_extendedId(){
    var html_common = '';
    var html_title = '';

    person1_extMem.filter(function(n){
        if (person2_extMem.includes(n) == true){
            console.log("The N:", n)
            usersRef.child(n).once('value')
            .then(function(snap){
                html_common +='<h6>'+ snap.val().displayName +'</h6>';
                $('#common_txt').html(html_common)
            })
            // html_common +='<h6>'+ n +'</h6>';
            // $('#common_txt').html(html_common)
        }
    })
    html_title +='<h4><b>Common Family</b></h4>';
    $('#common_txtname').html(html_title)
}