$('#submit_search').click(getSearchData);
$('#mutual').hide();
$('#mutual_btn').hide();
$('#connection').hide();
var usersRef = firebase.database().ref().child('users')
var immediate_family = firebase.database().ref().child('immediate_family')
var p1name;
var p2name;
var person1;
var person2;
var person1_key;
var person2_key;
var person1_familyId;
var person2_familyId;
var person1_imm = [];
var person2_imm = [];
var person1_name;
var person2_name;
var older;
var mutual = []
var person1_family = [];
var person2_family = [];

firebase.auth().onAuthStateChanged(handleAuthStateChanged);
    
function handleAuthStateChanged(user) {
    if (user) {
        currentUser = user;
    }
}
document.getElementById("person_1").onkeyup = function(space){
    var modal_title = ''
    var modal_body = ''
    var p1check = []
    if(space.keyCode == 32){
        var p1 =$("#person_1").val()
        var p1_name = p1.replace(/\s/g, '')
        console.log(p1_name)

        if (p1_name != ""){
            modal_title += 'Result for <b>'+p1_name+'</b><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span><hr>'
            $('#result_for').html(modal_title);

            usersRef.once('value').then(snap=>{
                snap.forEach(snap2 =>{
                    names_user = snap2.val().displayName.toLowerCase()
                    name_p1 = p1_name.toLowerCase()
                    if(names_user.includes(name_p1)==true){
                        if(p1check == 0){
                            p1check.push(name_p1)
                        }
                        $('#searchName').modal('show')
                        if(snap2.val().photoURL == undefined){
                            var photo = 'assets/img/default-avatar.png';
                        }else{
                            var photo = snap2.val().photoURL
                        }
                        if(snap2.val().email == undefined){
                            var email = 'no email exist'
                        }else{
                            var email = snap2.val().email
                        }
                        modal_body += '<div class="col-sm-2"><img id="search_img" src="' +photo+ '" alt="Circle Image" class="img-circle img-responsive"></div><div class="col-sm-7"><p id="search_txt"><b>' +snap2.val().displayName+ '</b><br>' +email+ '</p></div><div class="col-sm-3"><button class="btn btn-danger btn-sm" id="' +snap2.val().displayName+ '" onclick="getP1Name(this.id)">Add</button></div><div class="col-sm-12"><hr></div>';
                        $('#results').html(modal_body)
                    }  
                })
                if(p1check == 0){
                    swal({
                        title: "No Result for " + p1_name,
                        text : "Please search valid names",
                        type: "error",
                        showConfirmButton: true,
                        confirmButtonColor: '#ff5349',
                        confirmButtonText: 'Got It!'
                    })
                }
            })    
        }
        else{
            swal({
                title: "Please input valid string",
                timer: 3000,
                showConfirmButton: false,
                type: "info"
            }).then(function() {},
            function(dismiss) {
                if (dismiss === "timer") {
                    location.reload()
                }
            })
        }
    }
}
document.getElementById("person_2").onkeyup = function(space){
    var modal_title = ''
    var modal_body = ''
    var p2check = []
    if(space.keyCode == 32){
        var p2 =$("#person_2").val()
        var p2_name = p2.replace(/\s/g, '')

        if (p2_name != ""){
            modal_title += 'Result for <b>'+p2_name+'</b><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span><hr>'
            $('#result_for').html(modal_title)

            usersRef.once('value').then(snap=>{
                snap.forEach(snap2 =>{
                    names_user = snap2.val().displayName.toLowerCase()
                    name_p2 = p2_name.toLowerCase()
                    if(names_user.includes(name_p2)==true){
                        if(p2check == 0){
                            p2check.push(name_p2)
                        }
                        $('#searchName').modal('show')
                        if(snap2.val().photoURL == undefined){
                            var photo = 'assets/img/default-avatar.png';
                        }else{
                            var photo = snap2.val().photoURL
                        }
                        if(snap2.val().email == undefined){
                            var email = 'no email exist'
                        }else{
                            var email = snap2.val().email
                        }
                        modal_body += '<div class="col-sm-2"><img id="search_img" src="' +photo+ '" alt="Circle Image" class="img-circle img-responsive"></div><div class="col-sm-7"><p id="search_txt"><b>' +snap2.val().displayName+ '</b><br>' +email+ '</p></div><div class="col-sm-3"><button class="btn btn-danger btn-sm" id="' +snap2.val().displayName+ '" onclick="getP2Name(this.id)">Add</button></div><div class="col-sm-12"><hr></div>';
                        $('#results').html(modal_body)
                    }
                })
                if(p2check == 0){
                    swal({
                        title: "No Result for " + p2_name,
                        text : "Please search valid names",
                        type: "error",
                        showConfirmButton: true,
                        confirmButtonColor: '#ff5349',
                        confirmButtonText: 'Got It!'
                    })
                }
            })
        }else{
            swal({
                title: "Please input valid string",
                timer: 3000,
                showConfirmButton: false,
                type: "info"
            }).then(function() {},
            function(dismiss) {
                if (dismiss === "timer") {
                    location.reload()
                }
            })
        }
    }
}
function getP1Name(person1Name){
    person1_name = person1Name
    $('#person_1').val(person1_name)
    $('#searchName').modal('hide')
}
function getP2Name(person2Name){
    person2_name = person2Name
    $('#person_2').val(person2_name)
    $('#searchName').modal('hide')
}
function getSearchData(){
    $('#submit_search').hide();
    $('#connection').show();
    person1 = $("#person_1").val();
    person2 = $("#person_2").val();

    usersRef.once("value").then(snap => {
        snap.forEach(snap2 => {
            if(snap2.val().displayName.toLowerCase() == person1.toLowerCase()) {
                // console.log("search person1", person1 + true)
                person1_key = snap2.val().key
                person1_familyId = snap2.val().familyId
                person1_name = snap2.val().displayName

                usersRef.once("value").then(snap3 => {
                    snap3.forEach(snap4 => {
                        if(snap4.val().displayName.toLowerCase() == person2.toLowerCase()) {
                            // console.log("search person2", person2 + true)
                            person2_key = snap4.val().key
                            person2_familyId = snap4.val().familyId
                            person2_name = snap4.val().displayName

                            older = getAge(snap2.val().birthDate, snap4.val().birthDate)

                            immediate1st()
                            mutual_filter(person1_familyId, person2_familyId)
                        }
                    })
                })
            }
        })
    })
}
function getAge(date1, date2) {
    var oldie;
    if (date1 && date2) {
        var split1 = date1.split("/");
        var year1 = parseInt(split1[2]);

        var split2 = date2.split("/");
        var year2 = parseInt(split2[2]);
        
        if(year1 > year2) {
            oldie = person2_key;
        } else if(year2 > year1) {
            oldie = person1_key;
        }
    }
    return oldie;
}
function immediate1st() {
    // console.log("immediate1st")
    var html_common = '';
    var stopper = false;

    immediate_family.child(person1_familyId).once("value").then(snap => {
        if(snap.val().father == person2_key || snap.val().mother == person2_key) {
            html_common +='<h6>'+ person1 +' is the child of '+ person2 +'</h6>';
            $('#common_txt').html(html_common)
            stopper = true;
        }

        for(var key in snap.val().brother) {
            if(key == person2_key) {
                html_common +='<h6>'+ person1 +' is the sibling of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
                stopper = true;
            }
        }

        for(var key in snap.val().sister) {
            if(key == person2_key) {
                html_common +='<h6>'+ person1 +' is the sibling of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
                stopper = true;
            }
        }

        for(var key in snap.val().husband) {
            if(key == person2_key) {
                html_common +='<h6>'+ person1 +' is the spouse of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
                stopper = true;
            }
        }

        for(var key in snap.val().wife) {
            if(key == person2_key) {
                html_common +='<h6>'+ person1 +' is the spouse of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
                stopper = true;
            }
        }

        for(var key in snap.val().son) {
            if(key == person2_key) {
                html_common +='<h6>'+ person1 +' is the parent of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
                stopper = true;
            }
        }

        for(var key in snap.val().daughter) {
            if(key == person2_key) {
                html_common +='<h6>'+ person1 +' is the parent of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
                stopper = true;
            }
        }
        // console.log("im1st stopper", stopper)
        if(stopper == false) findCommon()
    })
}
function findCommon() {
    // console.log("findCommon")
    var stopper = false;

    immediate_family.child(person1_familyId).once("value").then(snap => {
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

    immediate_family.child(person2_familyId).once("value").then(snap2 => {
        person2_imm.push(snap2.val().user)
        if(snap2.val().father) person2_imm.push(snap2.val().father)
        if(snap2.val().mother) person2_imm.push(snap2.val().mother)
        for(var k in snap2.val().brother) person2_imm.push(k)
        for(var k in snap2.val().sister) person2_imm.push(k)
        for(var k in snap2.val().husband) person2_imm.push(k)
        for(var k in snap2.val().wife) person2_imm.push(k)
        for(var k in snap2.val().son) person2_imm.push(k)
        for(var k in snap2.val().daughter) person2_imm.push(k)
    
        person1_imm.filter(function(n) {
            if (person2_imm.includes(n) == true) {
                usersRef.child(n).once("value").then(snap3 => {
                    immediate2nd(n, snap3.val().displayName)
                })
                stopper = true;
            }
            // console.log("fc stopper", stopper)
            if(stopper == false) checkOlderPerson()
        })
    })
}
function immediate2nd(keys, name) {
    // console.log("immediate2nd")
    var html_common = '';

    immediate_family.child(person1_familyId).once("value").then(snap => {
        if(snap.val().father == keys || snap.val().mother == keys) {
            html_common +='<h6>'+ person1 +' is the child of '+ name +'</h6>';
            $('#common_txt').html(html_common)
        }
    
        for(var key in snap.val().brother) {
            if(key == keys) {
                html_common +='<h6>'+ person1 +' is the sibling of '+ name +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().sister) {
            if(key == keys) {
                html_common +='<h6>'+ person1 +' is the sibling of '+ name +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().husband) {
            if(key == keys) {
                html_common +='<h6>'+ person1 +' is the spouse of '+ name +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().wife) {
            if(key == keys) {
                html_common +='<h6>'+ person1 +' is the spouse of '+ name +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().son) {
            if(key == keys) {
                html_common +='<h6>'+ person1 +' is the parent of '+ name +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().daughter) {
            if(key == keys) {
                html_common +='<h6>'+ person1 +' is the parent of '+ name +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    })

    immediate_family.child(person2_familyId).once("value").then(snap => {
        if(snap.val().father == keys || snap.val().mother == keys) {
            html_common +='<h6>'+ name +' is the parent of '+ person2 +'</h6>';
            $('#common_txt').html(html_common)
        }
    
        for(var key in snap.val().brother) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the sibling of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().sister) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the sibling of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().husband) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the spouse of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().wife) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the spouse of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().son) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the child of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().daughter) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the child of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    })
}
function checkOlderPerson() {
    // console.log("checkOlderPerson")

    if(older == person1_key) {
        // console.log("older person1")
        immediateChild(person1_key, person2_key)
    } else if(older == person2_key) {
        // console.log("older person2")
        immediateChild(person2_key, person1_key)
    }
}
function immediateChild(key, key2) {
    // console.log("immediateChild")

    var html_common = '';
    var name;
    var father;
    var mother;

    usersRef.child(key2).once("value").then(snap => {
        father = snap.val().f
        mother = snap.val().m
        name = snap.val().displayName
    })

    usersRef.child(key).child("children").once("value").then(snap => {
        snap.forEach(snap2 => {
            if(snap2.val() == father) {
                usersRef.child(snap2.val()).once("value").then(snap3 => {
                    html_common +='<h6>'+ name +' is the child of '+ snap3.val().displayName +'</h6>';
                    $('#common_txt').html(html_common)

                    if(snap3.val().f == key) {
                        usersRef.child(snap3.val().f).once("value").then(snap4 => {
                            html_common +='<h6>'+ snap3.val().displayName +' is the child of '+ snap4.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)

                            if(snap4.val().f == person1_key || snap4.val().m == person1_key) {            
                                html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ person1_name +'</h6>';
                                $('#common_txt').html(html_common)
                            } else if(snap4.val().f == person2_key || snap4.val().m == person2_key) {            
                                html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ person2_name +'</h6>';
                                $('#common_txt').html(html_common)
                            }
                        })
                    } else if(snap3.val().m == key) {
                        usersRef.child(snap3.val().m).once("value").then(snap4 => {
                            html_common +='<h6>'+ snap3.val().displayName +' is the child of '+ snap4.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)

                            if(snap4.val().f == person1_key || snap4.val().m == person1_key) {
                                html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ person1_name +'</h6>';
                                $('#common_txt').html(html_common)
                            } else if(snap4.val().f == person2_key || snap4.val().m == person2_key) {
                                html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ person2_name +'</h6>';
                                $('#common_txt').html(html_common)
                            }
                        })
                    }
                })
            } else if(snap2.val() == mother) {
                usersRef.child(snap2.val()).once("value").then(snap3 => {
                    html_common +='<h6>'+ name +' is the child of '+ snap3.val().displayName +'</h6>';
                    $('#common_txt').html(html_common)

                    if(snap3.val().f == key) {
                        usersRef.child(snap3.val().f).once("value").then(snap4 => {
                            html_common +='<h6>'+ snap3.val().displayName +' is the child of '+ snap4.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)

                            if(snap4.val().f == person1_key || snap4.val().m == person1_key) {            
                                html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ person1_name +'</h6>';
                                $('#common_txt').html(html_common)
                            } else if(snap4.val().f == person2_key || snap4.val().m == person2_key) {            
                                html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ person2_name +'</h6>';
                                $('#common_txt').html(html_common)
                            }
                        })
                    } else if(snap3.val().m == key) {
                        usersRef.child(snap3.val().m).once("value").then(snap4 => {
                            html_common +='<h6>'+ snap3.val().displayName +' is the child of '+ snap4.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)

                            if(snap4.val().f == person1_key || snap4.val().m == person1_key) {
                                html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ person1_name +'</h6>';
                                $('#common_txt').html(html_common)
                            } else if(snap4.val().f == person2_key || snap4.val().m == person2_key) {
                                html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ person2_name +'</h6>';
                                $('#common_txt').html(html_common)
                            }
                        })
                    }
                })
            } else {
                immediateChild(snap2.val(), key2)
            }
        })
    })
}
function immediateSpouse() {
    // console.log("immediateSpouse")

}
async function mutual_filter(famId1, famId2){
    $('#mutual').show();
    $('#mutual_btn').show();

    let person1Array = await person1retrieveImm(famId1)
    let person2Array = await person2retrieveImm(famId2)
   getMutual(person1Array, person2Array)
    // console.log("1.) MUTUALLLL:", mutual.length)
    // console.log("1.) MUTUALLLL:", mutual)

    if(mutual.length == 0){
        // console.log(2)
        for(let person1 of person1Array){
            usersRef.child(person1).once('value').then(async function(imm2){
                person1Array = await person1retrieveImm(imm2.val().familyId)
                getMutual(person1Array, person2Array)
                // console.log("2.) MUTUALLLL:", mutual)
                // console.log("2.) MUTUALLLL:", mutual.length)
                if(mutual.length == 0){
                    // console.log(3)
                    for(let person2 of person2Array){
                        usersRef.child(person2).once('value').then(async function(imm3){
                            person2Array = await person2retrieveImm(imm3.val().familyId)
                            getMutual(person1Array, person2Array)
                            // console.log("3.) MUTUALLLL:", mutual)
                            // console.log("3.) MUTUALLLL:", mutual.length)
                            if(mutual.length == 0){
                                // console.log(4)
                                for(let person1_a of person1Array){
                                    usersRef.child(person1_a).once('value').then(async function(imm4){
                                        person1Array = await person1retrieveImm(imm4.val().familyId)
                                        getMutual(person1Array, person2Array)
                                        // console.log("4.) MUTUALLLL:", mutual)
                                        // console.log("4.) MUTUALLLL:", mutual.length) 
                                        // 3rd degree; sure ko
                                        if(mutual.length == 0){
                                            // console.log(5)
                                            for(let person2_a of person2Array){
                                                usersRef.child(person2_a).once('value').then(async function(imm5){
                                                    person2Array = await person2retrieveImm(imm5.val().familyId)
                                                    getMutual(person1Array, person2Array)
                                                    // console.log("5.) MUTUALLLL:", mutual)
                                                    // console.log("5.) MUTUALLLL:", mutual.length)
                                                    if(mutual.length == 0){
                                                        // console.log(6)
                                                        for(let person1_b of person1Array){
                                                            usersRef.child(person1_b).once('value').then(async function(imm6){
                                                                person1Array = await person1retrieveImm(imm6.val().familyId)
                                                                getMutual(person1Array, person2Array)
                                                                // console.log("6.) MUTUALLLL:", mutual)
                                                                // console.log("6.) MUTUALLLL:", mutual.length)
                                                                if(mutual.length == 0){
                                                                    // console.log(7)
                                                                    for(let person2_b of person2Array){
                                                                        usersRef.child(person2_b).once('value').then(async function(imm7){
                                                                            person2Array = await person2retrieveImm(imm7.val().familyId)
                                                                            getMutual(person1Array, person2Array)
                                                                            // console.log("7.) MUTUALLLL:", mutual)
                                                                            // console.log("7.) MUTUALLLL:", mutual.length)
                                                                        })
                                                                    }
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }
    }
}
function getMutual(person1, person2){
    person1.filter(function(p1){
        if(person2.includes(p1)==true){
           if(mutual == 0){
               mutual.push(p1)
                usersRef.child(p1).once('value').then(snapName=>{
                    mutual_txt = '<b>' +snapName.val().displayName +'</b><br>'
                    $('#mutual_names').html(mutual_txt)
                })
                console.log(p1)
            return mutual;
           }
        }
    })   
}
function person1retrieveImm(famId) {
    return new Promise(async function (resolve, reject) {
        await immediate_family.child(famId).once('value')
            .then(function(data){
                if(data.val().mother != undefined){
                    person1_family.push(data.val().mother)
                }
                if(data.val().father != undefined){
                    person1_family.push(data.val().father)
                }
                data.forEach(function(data2){
                    data2.forEach(function(data3){
                        person1_family.push(data3.val())
                    })
                })
                return resolve(person1_family)
        })
    })
}
function person2retrieveImm(famId){
    return new Promise(async function (resolve, reject) {
        await immediate_family.child(famId).once('value')
            .then(function(data){
                if(data.val().mother != undefined){
                    person2_family.push(data.val().mother)
                }
                if(data.val().father != undefined){
                    person2_family.push(data.val().father)
                }
                data.forEach(function(data2){
                    data2.forEach(function(data3){
                        person2_family.push(data3.val())
                    })
                })
                return resolve(person2_family)
        })
    })
}

