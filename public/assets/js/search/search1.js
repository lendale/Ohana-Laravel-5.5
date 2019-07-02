$('#submit_search').click(getSearchData);
var usersRef= firebase.database().ref().child('users')
var immediate_family = firebase.database().ref().child('immediate_family')
var person1;
var person2;
var person1_imm = [];
var person2_imm = [];
var person1_key;
var person2_key;
var person1_familyId;
var person2_familyId;

firebase.auth().onAuthStateChanged(handleAuthStateChanged);
    
function handleAuthStateChanged(user) {
    if (user) {
        currentUser = user;
    } else {}
}

function getSearchData(){
    person1 = $("#person_1").val();
    person2 = $("#person_2").val();

    var person1_imm_retrieved = [];
    var person2_imm_retrieved = [];

    console.log("person1", person1)
    console.log("person2", person2)

    usersRef.once("value").then(snap => {
        snap.forEach(snap2 => {
            if(snap2.val().displayName.toLowerCase() == person1.toLowerCase()) {
                console.log("search person1", true)
                person1_imm_retrieved = person1retrieveImm(snap2.val().familyId)
                person1_key = snap2.val().key
                person1_familyId = snap2.val().familyId

                usersRef.once("value").then(snap3 => {
                    snap3.forEach(snap4 => {
                        if(snap4.val().displayName.toLowerCase() == person2.toLowerCase()) {
                            console.log("search person2", true)
                            person2_imm_retrieved = person2retrieveImm(snap4.val().familyId)
                            person2_key = snap4.val().key
                            person2_familyId = snap4.val().familyId

                            immediate1st()
                        }
                    })
                })
            }
        })
    })
}

function immediate1st() {
    var html_common = '';
    console.log("person1_familyId", person1_familyId)
    console.log("person2_familyId", person2_familyId)
    immediate_family.child(person1_familyId).once("value").then(snap => {
        if(snap.val().father == person2_key) {
            html_common +='<h6>'+ person2 +' is the father of '+ person1 +'</h6>';
            $('#common_txt').html(html_common)
        } else if(snap.val().mother == person2_key) {
            html_common +='<h6>'+ person2 +' is the mother of '+ person1 +'</h6>';
            $('#common_txt').html(html_common)
        }

        for(var key in snap.val().brother) {
            if(key == person2_key) {
                html_common +='<h6>'+ person2 +' is the brother of '+ person1 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }

        for(var key in snap.val().sister) {
            if(key == person2_key) {
                html_common +='<h6>'+ person2 +' is the sister of '+ person1 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }

        for(var key in snap.val().husband) {
            if(key == person2_key) {
                html_common +='<h6>'+ person2 +' is the husband of '+ person1 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }

        for(var key in snap.val().wife) {
            if(key == person2_key) {
                html_common +='<h6>'+ person2 +' is the wife of '+ person1 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }

        for(var key in snap.val().son) {
            if(key == person2_key) {
                html_common +='<h6>'+ person2 +' is the son of '+ person1 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }

        for(var key in snap.val().daughter) {
            if(key == person2_key) {
                html_common +='<h6>'+ person2 +' is the daughter of '+ person1 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    })

    immediate_family.child(person2_familyId).once("value").then(snap => {
        if(snap.val().father == person1_key) {
            html_common +='<h6>'+ person1 +' is the father of '+ person2 +'</h6>';
            $('#common_txt').html(html_common)
        } else if(snap.val().mother == person1_key) {
            html_common +='<h6>'+ person1 +' is the mother of '+ person2 +'</h6>';
            $('#common_txt').html(html_common)
        }

        for(var key in snap.val().brother) {
            if(key == person1_key) {
                html_common +='<h6>'+ person1 +' is the brother of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }

        for(var key in snap.val().sister) {
            if(key == person1_key) {
                html_common +='<h6>'+ person1 +' is the sister of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }

        for(var key in snap.val().husband) {
            if(key == person1_key) {
                html_common +='<h6>'+ person1 +' is the husband of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }

        for(var key in snap.val().wife) {
            if(key == person1_key) {
                html_common +='<h6>'+ person1 +' is the wife of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }

        for(var key in snap.val().son) {
            if(key == person1_key) {
                html_common +='<h6>'+ person1 +' is the son of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }

        for(var key in snap.val().daughter) {
            if(key == person1_key) {
                html_common +='<h6>'+ person1 +' is the daughter of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    })
}

function person1retrieveImm(imm_id) {
    immediate_family.child(imm_id).once("value").then(snap => {
        person1_imm.push(snap.val().user)
        if(snap.val().father) person1_imm.push(snap.val().father)
        if(snap.val().mother) person1_imm.push(snap.val().mother)
        for(var k in snap.val().brother) person1_imm.push(k)
        for(var k in snap.val().sister) person1_imm.push(k)
        for(var k in snap.val().husband) person1_imm.push(k)
        for(var k in snap.val().wife) person1_imm.push(k)
        for(var k in snap.val().son) person1_imm.push(k)
        for(var k in snap.val().daughter) person1_imm.push(k)
    })
    return person1_imm;
}

function person2retrieveImm(imm_id) {
    immediate_family.child(imm_id).once("value").then(snap => {
        person2_imm.push(snap.val().user)
        if(snap.val().father) person2_imm.push(snap.val().father)
        if(snap.val().mother) person2_imm.push(snap.val().mother)
        for(var k in snap.val().brother) person2_imm.push(k)
        for(var k in snap.val().sister) person2_imm.push(k)
        for(var k in snap.val().husband) person2_imm.push(k)
        for(var k in snap.val().wife) person2_imm.push(k)
        for(var k in snap.val().son) person2_imm.push(k)
        for(var k in snap.val().daughter) person2_imm.push(k)
    })
    return person2_imm;
}

function displayExtId_P1(){
    var html = '';
    var html_name = '';

    person1_imm.forEach(function(extfam_id){
        usersRef.child(extfam_id).once('value').then(function(snap){
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
    var html_id = '';
    var html_name = '';

    person2_imm.forEach(function(extfam_id){
        usersRef.child(extfam_id).once('value').then(function(snap){
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

    person1_imm.filter(function(n){
        if (person2_imm.includes(n) == true){
            common_mem.push(n);

            usersRef.child(n).once('value').then(function(snap){
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
