// currently working update

$('#submit_search').click(getSearchData);
var usersRef= firebase.database().ref().child('users')
var immediate_family = firebase.database().ref().child('immediate_family')
var person1;
var person2;
var person1_key;
var person2_key;
var person1_name;
var person2_name;
var person1_familyId;
var person2_familyId;
var person1_imm = [];
var person2_imm = [];
var older;

firebase.auth().onAuthStateChanged(handleAuthStateChanged);
    
function handleAuthStateChanged(user) {
    if (user) {
        currentUser = user;
    }
}

function getSearchData(){
    person1 = $("#person_1").val();
    person2 = $("#person_2").val();

    usersRef.once("value").then(snap => {
        snap.forEach(snap2 => {
            if(snap2.val().displayName.toLowerCase() == person1.toLowerCase()) {
                console.log("search person1", person1 + true)
                person1_key = snap2.val().key
                person1_familyId = snap2.val().familyId
                person1_name = snap2.val().displayName

                usersRef.once("value").then(snap3 => {
                    snap3.forEach(snap4 => {
                        if(snap4.val().displayName.toLowerCase() == person2.toLowerCase()) {
                            console.log("search person2", person2 + true)
                            person2_key = snap4.val().key
                            person2_familyId = snap4.val().familyId
                            person2_name = snap4.val().displayName

                            older = getAge(snap2.val().birthDate, snap4.val().birthDate)

                            immediate1st()
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
        } else if(year1 == year2) {
            oldie = person1_key;
        }
    }
    return oldie;
}

function immediate1st() {
    console.log("immediate1st")
    var html_common = '';
    var stopper = false;

    immediate_family.child(person1_familyId).once("value").then(snap => {
        if(snap.val().father == person2_key || snap.val().mother == person2_key) {
            html_common +='<h6>1st degree consanguinity</h6>';
            $('#common_txt').html(html_common)

            html_common +='<h6>'+ person1 +' is the child of '+ person2 +'</h6>';
            $('#common_txt').html(html_common)
            stopper = true;
        }

        for(var key in snap.val().brother) {
            if(key == person2_key) {
                html_common +='<h6>2nd degree consanguinity</h6>';
                $('#common_txt').html(html_common)

                html_common +='<h6>'+ person1 +' is the sibling of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
                stopper = true;
            }
        }

        for(var key in snap.val().sister) {
            if(key == person2_key) {
                html_common +='<h6>2nd degree consanguinity</h6>';
                $('#common_txt').html(html_common)

                html_common +='<h6>'+ person1 +' is the sibling of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
                stopper = true;
            }
        }

        for(var key in snap.val().husband) {
            if(key == person2_key) {
                html_common +='<h6>1st degree affinity</h6>';
                $('#common_txt').html(html_common)

                html_common +='<h6>'+ person1 +' is the spouse of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
                stopper = true;
            }
        }

        for(var key in snap.val().wife) {
            if(key == person2_key) {
                html_common +='<h6>1st degree affinity</h6>';
                $('#common_txt').html(html_common)

                html_common +='<h6>'+ person1 +' is the spouse of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
                stopper = true;
            }
        }

        for(var key in snap.val().son) {
            if(key == person2_key) {
                html_common +='<h6>1st degree consanguinity</h6>';
                $('#common_txt').html(html_common)

                html_common +='<h6>'+ person1 +' is the parent of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
                stopper = true;
            }
        }

        for(var key in snap.val().daughter) {
            if(key == person2_key) {
                html_common +='<h6>1st degree consanguinity</h6>';
                $('#common_txt').html(html_common)
                
                html_common +='<h6>'+ person1 +' is the parent of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
                stopper = true;
            }
        }
        if(stopper == false) checkOlderPerson()
    })
}

function findCommon() {
    console.log("findCommon")
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
                stopper = true;
                usersRef.child(n).once("value").then(snap3 => {
                    immediate2nd(n, snap3.val().displayName)
                })
            }
        })
        
        if(stopper == false) checkOlderPerson()
    })
}

function immediate2nd(keys, name) {
    console.log("immediate2nd")
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

// update function name here
function checkOlderPerson() {
    console.log("checkOlderPerson")

    if(older == person1_key) {
        console.log("older person1")
        imm3(person1_key, person2_key)
        // imm4(person1_key, person2_key)
    } else if(older == person2_key) {
        console.log("older person2")
        imm3(person2_key, person1_key)
        // imm4(person2_key, person1_key)
    }
}

function imm3(key1, key2) {
    console.log("imm3")
    var html_common = '';
    var spouse1;
    var spouse2;

    usersRef.child(key1).once("value").then(key1snap => {
        usersRef.child(key2).once("value").then(key2snap => {
            if(key1snap.val().vir != undefined) spouse1 = key1snap.val().vir
            else if(key1snap.val().ux != undefined) spouse1 = key1snap.val().ux

            if(key2snap.val().vir != undefined) spouse2 = key2snap.val().vir
            else if(key2snap.val().ux != undefined) spouse2 = key2snap.val().ux

            if(key1snap.val().children == undefined) imm4(key1, key2)
            for(var a in key1snap.val().children) {
                for(var c in spouse2) {
                    if(a == c) {
                        html_common +='<h6>2nd degree affinity</h6>';
                        $('#common_txt').html(html_common)
    
                        html_common +='<h6>'+ key1snap.val().displayName +' is the parent-in-law of '+ key2snap.val().displayName +'</h6>';
                        $('#common_txt').html(html_common)
                    } else {
                        usersRef.child(a).once("value").then(asnap => {
                            if(asnap.val().children == undefined) imm4(key1, key2)
                            for(var b in asnap.val().children) {
                                if(b == c) {
                                    html_common +='<h6>3rd degree affinity</h6>';
                                    $('#common_txt').html(html_common)
        
                                    html_common +='<h6>'+ key1snap.val().displayName +' is the grandparent-in-law of '+ key2snap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                } else if(b == key2) {
                                    html_common +='<h6>2nd degree consanguinity</h6>';
                                    $('#common_txt').html(html_common)
    
                                    html_common +='<h6>'+ key1snap.val().displayName +' is the grandparent of '+ key2snap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                } else {
                                    usersRef.child(b).once("value").then(bsnap => {
                                        if(bsnap.val().children == undefined) imm4(key1, key2)
                                        for(var d in bsnap.val().children) {
                                            if(d == c) {
                                                html_common +='<h6>4th degree affinity</h6>';
                                                $('#common_txt').html(html_common)
    
                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great grandparent-in-law of '+ key2snap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else if(d == key2) {
                                                html_common +='<h6>3rd degree consanguinity</h6>';
                                                $('#common_txt').html(html_common)
                    
                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great grandparent of '+ key2snap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else {
                                                usersRef.child(d).once("value").then(dsnap => {
                                                    if(dsnap.val().children == undefined) imm4(key1, key2)
                                                    for(var e in dsnap.val().children) {
                                                        if(e == c) {
                                                            html_common +='<h6>5th degree affinity</h6>';
                                                            $('#common_txt').html(html_common)
    
                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great great grandparent-in-law of '+ key2snap.val().displayName +'</h6>';
                                                            $('#common_txt').html(html_common)
                                                        } else if(e == key2) {
                                                            html_common +='<h6>4th degree consanguinity</h6>';
                                                            $('#common_txt').html(html_common)
    
                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great great grandparent of '+ key2snap.val().displayName +'</h6>';
                                                            $('#common_txt').html(html_common)
                                                        } else {
                                                            usersRef.child(e).once("value").then(esnap => {
                                                                if(esnap.val().children == undefined) imm4(key1, key2)
                                                                for(var f in esnap.val().children) {
                                                                    if(f == c) {
                                                                        html_common +='<h6>6th degree affinity</h6>';
                                                                        $('#common_txt').html(html_common)
                
                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great great great grandparent-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                        $('#common_txt').html(html_common)
                                                                    } else if(f == key2) {
                                                                        html_common +='<h6>5th degree consanguinity</h6>';
                                                                        $('#common_txt').html(html_common)
                
                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great great great grandparent of '+ key2snap.val().displayName +'</h6>';
                                                                        $('#common_txt').html(html_common)
                                                                    } else {
                                                                        usersRef.child(f).once("value").then(fsnap => {
                                                                            if(fsnap.val().children == undefined) imm4(key1, key2)
                                                                            for(var g in fsnap.val().children) {
                                                                                if(g == c) {
                                                                                    html_common +='<h6>7th degree affinity</h6>';
                                                                                    $('#common_txt').html(html_common)
                            
                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the great great great great grandparent-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                                } else if(g == key2) {
                                                                                    html_common +='<h6>6th degree consanguinity</h6>';
                                                                                    $('#common_txt').html(html_common)
                            
                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the great great great great grandparent of '+ key2snap.val().displayName +'</h6>';
                                                                                    $('#common_txt').html(html_common)
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
        })
    })
}

function imm4(key1, key2) {
    console.log("imm4")
    var html_common = '';
    var spouse1;
    var spouse2;

    usersRef.child(key1).once("value").then(key1snap => {
        usersRef.child(key2).once("value").then(key2snap => {
            if(key1snap.val().vir != undefined) spouse1 = key1snap.val().vir
            else if(key1snap.val().ux != undefined) spouse1 = key1snap.val().ux

            if(key2snap.val().vir != undefined) spouse2 = key2snap.val().vir
            else if(key2snap.val().ux != undefined) spouse2 = key2snap.val().ux

            for(var a in key1snap.val().siblings) {
                for(var d in spouse2) {
                    if(a == d) {
                        html_common +='<h6>3rd degree affinity</h6>';
                        $('#common_txt').html(html_common)
            
                        html_common +='<h6>'+ key1snap.val().displayName +' is the sibling-in-law of '+ key2snap.val().displayName +'</h6>';
                        $('#common_txt').html(html_common)
                    } else {
                        usersRef.child(a).once("value").then(asnap => {
                            for(var b in asnap.val().children) {
                                if(b == d) {
                                    html_common +='<h6>3rd degree affinity</h6>';
                                    $('#common_txt').html(html_common)
                
                                    if(key1snap.val().gender == "male") {
                                        html_common +='<h6>'+ key1snap.val().displayName +' is the uncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else {
                                        html_common +='<h6>'+ key1snap.val().displayName +' is the aunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                                    }
                                } else if(b == key2) {
                                    html_common +='<h6>3rd degree consanguinity</h6>';
                                    $('#common_txt').html(html_common)
                
                                    if(key1snap.val().gender == "male") {
                                        html_common +='<h6>'+ key1snap.val().displayName +' is the uncle of '+ key2snap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else {
                                        html_common +='<h6>'+ key1snap.val().displayName +' is the aunt of '+ key2snap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                                    }
                                } else {
                                    usersRef.child(b).once("value").then(bsnap => {
                                        for(var c in bsnap.val().children) {
                                            if(c == key2) {
                                                html_common +='<h6>4th degree consanguinity</h6>';
                                                $('#common_txt').html(html_common)
                
                                                if(key1snap.val().gender == "male") {
                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the granduncle of '+ key2snap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                } else {
                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the grandaunt of '+ key2snap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                }
                                            } else if(c == d) {
                                                html_common +='<h6> 5th degree affinity</h6>';
                                                $('#common_txt').html(html_common)
                
                                                if(key1snap.val().gender == "male") {
                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                } else {
                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                }
                                            } else {
                                                usersRef.child(c).once("value").then(csnap => {
                                                    for(var e in csnap.val().children) {
                                                        if(e == key2) {
                                                            html_common +='<h6> 5th degree consanguinity</h6>';
                                                            $('#common_txt').html(html_common)
                
                                                            if(key1snap.val().gender == "male") {
                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great granduncle of '+ key2snap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
                                                            } else {
                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great grandaunt of '+ key2snap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
                                                            }
                                                        } else if(e == d) {
                                                            html_common +='<h6> 6th degree affinity</h6>';
                                                            $('#common_txt').html(html_common)
                
                                                            if(key1snap.val().gender == "male") {
                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
                                                            } else {
                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
                                                            }
                                                        } else {
                                                            usersRef.child(e).once("value").then(esnap => {
                                                                for(var f in esnap.val().children) {
                                                                    if(f == key2) {
                                                                        html_common +='<h6> 6th degree consanguinity</h6>';
                                                                        $('#common_txt').html(html_common)
                                                            
                                                                        if(key1snap.val().gender == "male") {
                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great great granduncle of '+ key2snap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)
                                                                        } else {
                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great great grandaunt of '+ key2snap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)
                                                                        }
                                                                    } else if(f == d) {
                                                                        html_common +='<h6> 7th degree affinity</h6>';
                                                                        $('#common_txt').html(html_common)
                                                            
                                                                        if(key1snap.val().gender == "male") {
                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great great granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)
                                                                        } else {
                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great great grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)
                                                                        }
                                                                    } else {
                                                                        usersRef.child(f).once("value").then(fsnap => {
                                                                            for(var g in fsnap.val().children) {
                                                                                if(g == key2) {
                                                                                    html_common +='<h6> 7th degree consanguinity</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                        
                                                                                    if(key1snap.val().gender == "male") {
                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great great great granduncle of '+ key2snap.val().displayName +'</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                                    } else {
                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great great great grandaunt of '+ key2snap.val().displayName +'</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                                    }
                                                                                } else if(g == d) {
                                                                                    html_common +='<h6> 8th degree affinity</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                        
                                                                                    if(key1snap.val().gender == "male") {
                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great great great granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                                    } else {
                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great great great grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                                    }
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

            // for(var a in spouse1) {
            //     usersRef.child(a).once("value").then(asnap => {
            //         for(var b in asnap.val().siblings) {
            //             for(var c in spouse2) {
            //                 if(b == c) {

            //                 }
            //             }
            //         }
            //     })
            // }
        })
    })
}

var counter = 0;
function immediate3rd(key1, key2) {
    console.log("immediate3rd")
    var html_common = '';
    console.log("key1", key1)
    console.log("key2", key2)

    usersRef.child(key1).once("value").then(key1snap => {
        usersRef.child(key2).once("value").then(key2snap => {
            var spouse1;
            var spouse2;
            if(key2snap.val().vir != undefined) spouse2 = key2snap.val().vir
            else if(key2snap.val().ux != undefined) spouse2 = key2snap.val().ux

            if(key1snap.val().vir != undefined) spouse1 = key1snap.val().vir
            else if(key1snap.val().ux != undefined) spouse1 = key1snap.val().ux

            for(var a in key1snap.val().children) {
                usersRef.child(a).once("value").then(asnap => {
                    for(var b in asnap.val().children) {
                        for(var c in spouse2) {
                            if(b == key2snap.val().f || b == key2snap.val().m) {
                                usersRef.child(b).once("value").then(bsnap => {
                                    html_common +='<h6>'+ key2snap.val().displayName +' is the child of '+ bsnap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)

                                    html_common +='<h6>'+ bsnap.val().displayName +' is the child of '+ asnap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)

                                    html_common +='<h6>'+ asnap.val().displayName +' is the child of '+ key1snap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                })
                            } else if(b == c) {
                                usersRef.child(b).once("value").then(bsnap => {
                                    html_common +='<h6>'+ key2snap.val().displayName +' is the spouse of '+ bsnap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)

                                    html_common +='<h6>'+ bsnap.val().displayName +' is the child of '+ asnap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)

                                    html_common +='<h6>'+ asnap.val().displayName +' is the child of '+ key1snap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                })
                            } else {
                                usersRef.child(b).once("value").then(bsnap => {
                                    for(var d in bsnap.val().children) {
                                        if(c == d) {
                                            usersRef.child(c).once("value").then(csnap => {
                                                html_common +='<h6>'+ key2snap.val().displayName +' is the spouse of '+ csnap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)

                                                html_common +='<h6>'+ csnap.val().displayName +' is the child of '+ bsnap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)

                                                html_common +='<h6>'+ bsnap.val().displayName +' is the child of '+ asnap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)

                                                html_common +='<h6>'+ asnap.val().displayName +' is the child of '+ key1snap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
                                            })
                                        } else {
                                            for(var e in key1snap.val().siblings) {
                                                usersRef.child(e).once("value").then(esnap => {
                                                    for(var f in esnap.val().children) {
                                                        if(f == key2snap.val().f || f == key2snap.val().m) {
                                                            usersRef.child(f).once("value").then(fsnap => {
                                                                html_common +='<h6>'+ key2snap.val().displayName +' is the child of '+ fsnap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)

                                                                html_common +='<h6>'+ fsnap.val().displayName +' is the child of '+ esnap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)

                                                                html_common +='<h6>'+ esnap.val().displayName +' is the sibling of '+ key1snap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
                                                            })
                                                        } else if(f == c) {
                                                            usersRef.child(f).once("value").then(fsnap => {
                                                                html_common +='<h6>'+ key2snap.val().displayName +' is the spouse of '+ fsnap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)

                                                                html_common +='<h6>'+ fsnap.val().displayName +' is the child of '+ esnap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)

                                                                html_common +='<h6>'+ esnap.val().displayName +' is the sibling of '+ key1snap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
                                                            })
                                                        } else {
                                                            usersRef.child(f).once("value").then(fsnap => {
                                                                for(var g in fsnap.val().children) {
                                                                    if(c == g) {
                                                                        usersRef.child(g).once("value").then(gsnap => {
                                                                            html_common +='<h6>'+ key2snap.val().displayName +' is the spouse of '+ gsnap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)

                                                                            html_common +='<h6>'+ gsnap.val().displayName +' is the child of '+ fsnap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)

                                                                            html_common +='<h6>'+ fsnap.val().displayName +' is the child of '+ esnap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)

                                                                            html_common +='<h6>'+ esnap.val().displayName +' is the child of '+ key1snap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)
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
                                })
                            }
                        }
                    }

                    if(asnap.val().children == undefined) immediate4th(key1, key2)
                })
            }
        })
    })
}

function immediate4th(key1, key2) {
    console.log("immediate4th")
    var html_common = '';

    usersRef.child(key1).once("value").then(key1snap => {
        usersRef.child(key2).once("value").then(key2snap => {
            var spouse1;
            var spouse2;
            if(key2snap.val().vir != undefined) spouse2 = key2snap.val().vir
            else if(key2snap.val().ux != undefined) spouse2 = key2snap.val().ux

            if(key1snap.val().vir != undefined) spouse1 = key1snap.val().vir
            else if(key1snap.val().ux != undefined) spouse1 = key1snap.val().ux

            for(var h in spouse1) {
                usersRef.child(h).once("value").then(hsnap => {
                    for(var i in hsnap.val().siblings) {
                        usersRef.child(i).once("value").then(isnap => {
                            for(var j in isnap.val().children) {
                                if(j == key2) {
                                    html_common +='<h6>'+ key2snap.val().displayName +' is the child of '+ isnap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
            
                                    html_common +='<h6>'+ isnap.val().displayName +' is the sibling of '+ hsnap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
            
                                    html_common +='<h6>'+ hsnap.val().displayName +' is the spouse of '+ key1snap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                } else {
                                    var stopper = false;
                                    usersRef.child(key1snap.val().f).once("value").then(key1f => {
                                        for(var k in key1f.val().siblings) {
                                            if(k == key2snap.val().f || k == key2snap.val().m) {
                                                stopper = true;
                                                usersRef.child(k).once("value").then(ksnap => {
                                                    html_common +='<h6>'+ key2snap.val().displayName +' is the child of '+ ksnap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
            
                                                    html_common +='<h6>'+ ksnap.val().displayName +' is the sibling of '+ key1f.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
            
                                                    html_common +='<h6>'+ key1f.val().displayName +' is the parent of '+ key1snap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                })
                                            }
            
                                            if(stopper == false) {
                                                usersRef.child(key1snap.val().m).once("value").then(key1m => {
                                                    for(var k in key1m.val().siblings) {
                                                        if(k == key2snap.val().f || k == key2snap.val().m) {
                                                            usersRef.child(k).once("value").then(ksnap => {
                                                                html_common +='<h6>'+ key2snap.val().displayName +' is the child of '+ ksnap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
            
                                                                html_common +='<h6>'+ ksnap.val().displayName +' is the sibling of '+ key1m.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
            
                                                                html_common +='<h6>'+ key1m.val().displayName +' is the parent of '+ key1snap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
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
                })
            }
        })
    })
}

function sample() {
    // grandchild inlaw, greatgrandparents, greatgrandchild & inlaw, great2grandparents (green)
    usersRef.child(key).child("children").once("value").then(snap => {
        snap.forEach(snap2 => {
            console.log("1 check")
            console.log("vir2", vir2)
            console.log("snap2", snap2.val())

            // checks children 4 rows
            if(snap2.val() == father2 || snap2.val() == mother2) {
                usersRef.child(snap2.val()).once("value").then(snap3 => {
                    html_common +='<h6>'+ name2 +' is the child of '+ snap3.val().displayName +'</h6>';
                    $('#common_txt').html(html_common)
    
                    if(snap3.val().f == key || snap3.val().m == key) {
                        usersRef.child(key).once("value").then(snap4 => {
                            html_common +='<h6>'+ snap3.val().displayName +' is the child of '+ snap4.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
    
                            if(snap4.val().f == person1_key || snap4.val().m == person1_key) {
                                html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ person1 +'</h6>';
                                $('#common_txt').html(html_common)
                            } else if(snap4.val().f == person2_key || snap4.val().m == person2_key) {
                                html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ person2 +'</h6>';
                                $('#common_txt').html(html_common)
                            } else {
                                var stopper = false;
    
                                usersRef.child(snap4.val().f).once("value").then(snap5 => {
                                    html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ snap5.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
    
                                    if(snap5.val().f == person1_key || snap5.val().m == person1_key) {
                                        html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person1 +'</h6>';
                                        $('#common_txt').html(html_common)
                                        stopper = true;
                                    } else if(snap5.val().f == person2_key || snap5.val().m == person2_key) {
                                        html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person2 +'</h6>';
                                        $('#common_txt').html(html_common)
                                        stopper = true;
                                    }
    
                                    if(stopper == false) {
                                        usersRef.child(snap4.val().m).once("value").then(snap6 => {
                                            html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ snap6.val().displayName +'</h6>';
                                            $('#common_txt').html(html_common)
                                        
                                            if(snap6.val().f == person1_key || snap6.val().m == person1_key) {
                                                html_common +='<h6>'+ snap6.val().displayName +' is the child of '+ person1 +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else if(snap6.val().f == person2_key || snap6.val().m == person2_key) {
                                                html_common +='<h6>'+ snap6.val().displayName +' is the child of '+ person2 +'</h6>';
                                                $('#common_txt').html(html_common)
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
            // checks key-children-spouse
            else if(snap2.val() ==  ux2 || snap2.val() ==  vir2) {
                usersRef.child(snap2.val()).once("value").then(snap3 => {
                    html_common +='<h6>'+ name2 +' is the spouse of '+ snap3.val().displayName +'</h6>';
                    $('#common_txt').html(html_common)
    
                    html_common +='<h6>'+ snap3.val().displayName +' is the child of '+ name1 +'</h6>';
                    $('#common_txt').html(html_common)
    
                    if(father1 == person1_key || mother1 == person1_key) {
                        html_common +='<h6>'+ name1 +' is the child of '+ person1 +'</h6>';
                        $('#common_txt').html(html_common)
                    } else if(father1 == person2_key || mother1 == person2_key) {
                        html_common +='<h6>'+ name1 +' is the child of '+ person2 +'</h6>';
                        $('#common_txt').html(html_common)
                    } else {
                        var stopper = false;
    
                        usersRef.child(father1).once("value").then(snap4 => {
                            html_common +='<h6>'+ name1 +' is the child of '+ snap4.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
                        
                            if(snap4.val().f == person1_key || snap4.val().m == person1_key) {
                                html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ person1 +'</h6>';
                                $('#common_txt').html(html_common)
                                stopper = true;
                            } else if(snap4.val().f == person2_key || snap4.val().m == person2_key) {
                                html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ person2 +'</h6>';
                                $('#common_txt').html(html_common)
                                stopper = true;
                            }
                        
                            if(stopper == false) {
                                usersRef.child(mother1).once("value").then(snap5 => {
                                    html_common +='<h6>'+ name1 +' is the child of '+ snap5.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                
                                    if(snap5.val().f == person1_key || snap5.val().m == person1_key) {
                                        html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person1 +'</h6>';
                                        $('#common_txt').html(html_common)
                                        stopper = true;
                                    } else if(snap5.val().f == person2_key || snap5.val().m == person2_key) {
                                        html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person2 +'</h6>';
                                        $('#common_txt').html(html_common)
                                        stopper = true;
                                    }
                                })
                            }
                        })                        
                    }
                })
            } else {
                immediateChild1(snap2.val(), key2)
            }
        })
    })

    // niece/nephew inlaw, great aunt/uncle, great niece/nephew & inlaw (orange)
    usersRef.child(key).child("siblings").once("value").then(snap => {
        snap.forEach(snap2 => {
            console.log("3 check")
            childLoop(snap2.val())

            function childLoop(keey) {
                usersRef.child(keey).once("value").then(snap3 => {
                    for(var i in snap3.val().children) {
                        if(i == vir2 || i == ux2) {
                            usersRef.child(i).once("value").then(snap4 => {
                                html_common +='<h6>'+ name2 +' is the spouse of '+ snap4.val().displayName +'</h6>';
                                $('#common_txt').html(html_common)
            
                                html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ snap3.val().displayName +'</h6>';
                                $('#common_txt').html(html_common)

                                if(snap3.val().key == snap2.val()) {
                                    html_common +='<h6>'+ snap3.val().displayName +' is the sibling of '+ name1 +'</h6>';
                                    $('#common_txt').html(html_common)
                                } else if(snap3.val().f == snap2.val() || snap3.val().m == snap2.val()) {
                                    usersRef.child(snap2.val()).once("value").then(snap5 => {
                                        html_common +='<h6>'+ snap3.val().displayName +' is the child of '+ snap5.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)

                                        html_common +='<h6>'+ snap5.val().displayName +' is the sibling of '+ name1 +'</h6>';
                                        $('#common_txt').html(html_common)
                                    })
                                }
                            })
                        } else if(i == father2 || i == mother2) {
                            usersRef.child(i).once("value").then(snap4 => {
                                html_common +='<h6>'+ name2 +' is the child of '+ snap4.val().displayName +'</h6>';
                                $('#common_txt').html(html_common)
            
                                html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ snap3.val().displayName +'</h6>';
                                $('#common_txt').html(html_common)

                                html_common +='<h6>'+ snap3.val().displayName +' is the sibling of '+ name1 +'</h6>';
                                $('#common_txt').html(html_common)
                            })
                        }  else {
                            childLoop(i)
                        }
                    }
                })
            }
        })
    })

    // aunt/uncle inlaw, great aunt/uncle inlaw, first cousin & inlaw (blue)
    usersRef.child(key).once("value").then(snap => {
        console.log("4 check")
        var spouse;
        if(snap.val().vir != undefined) spouse = snap.val().vir
        else if(snap.val().ux != undefined) spouse = snap.val().ux
    
        for(var i in spouse) {
            usersRef.child(i).once("value").then(snap2 => {
                for(var j in snap2.val().siblings) {
                    if(j == father2 || j == mother2) {
                        usersRef.child(j).once("value").then(snap3 => {
                            html_common +='<h6>'+ name2 +' is the child of '+ snap3.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
    
                            html_common +='<h6>'+ snap3.val().displayName +' is the sibling of '+ snap2.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
    
                            html_common +='<h6>'+ snap2.val().displayName +' is the spouse of '+ name1 +'</h6>';
                            $('#common_txt').html(html_common)
                        })
                    } else {
                        console.log("eeeeeeee")

                        var stopper = false;
    
                        usersRef.child(father2).once("value").then(snap3 => {
                            console.log("snap3", snap3.val().f)
                            console.log("j", snap2.val().siblings)
                            console.log("i", i)

                            if(snap3.val().f == j || snap3.val().m == j) {
                                usersRef.child(j).once("value").then(snap4 => {
                                    html_common +='<h6>'+ name2 +' is the child of '+ snap3.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                        
                                    html_common +='<h6>'+ snap3.val().displayName +' is the child of '+ snap4.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                        
                                    html_common +='<h6>'+ snap4.val().displayName +' is the sibling of '+ snap2.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                        
                                    html_common +='<h6>'+ snap2.val().displayName +' is the spouse of '+ name1 +'</h6>';
                                    $('#common_txt').html(html_common)
                                })
                                stopper = true;
                            }
                        
                            if(stopper == false) {
                                usersRef.child(mother2).once("value").then(snap4 => {
                                    if(snap4.val().f == j || snap4.val().m == j) {
                                        usersRef.child(j).once("value").then(snap5 => {
                                            html_common +='<h6>'+ name2 +' is the child of '+ snap4.val().displayName +'</h6>';
                                            $('#common_txt').html(html_common)
                                        
                                            html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ snap5.val().displayName +'</h6>';
                                            $('#common_txt').html(html_common)
                                        
                                            html_common +='<h6>'+ snap5.val().displayName +' is the sibling of '+ snap2.val().displayName +'</h6>';
                                            $('#common_txt').html(html_common)
                                        
                                            html_common +='<h6>'+ snap2.val().displayName +' is the spouse of '+ name1 +'</h6>';
                                            $('#common_txt').html(html_common)
                                        })
                                    }
                                })
                            }
                        })                        
                    }
                }
            })
        }

        usersRef.child(snap.val().f).once("value").then(snap => {
            var stopper1 = false;
            for(var a in snap.val().siblings) {
                if(a == father2 || a == mother2) {
                    stopper1 = true;
                    html_common +='<h6>'+ name1 +' is the child of '+ snap.val().displayName +'</h6>';
                    $('#common_txt').html(html_common)
    
                    usersRef.child(a).once("value").then(snap2 => {
                        html_common +='<h6>'+ snap.val().displayName +' is the sibling of '+ snap2.val().displayName +'</h6>';
                        $('#common_txt').html(html_common)
    
                        html_common +='<h6>'+ snap2.val().displayName +' is the parent of '+ name2 +'</h6>';
                        $('#common_txt').html(html_common)
                    })
                } else {
                    usersRef.child(a).once("value").then(snap2 => {
                        for(var c in snap2.val().children) {
                            if(c == ux2 || c == vir2) {
                                html_common +='<h6>'+ name1 +' is the child of '+ snap.val().displayName +'</h6>';
                                $('#common_txt').html(html_common)

                                html_common +='<h6>'+ snap.val().displayName +' is the sibling of '+ snap2.val().displayName +'</h6>';
                                $('#common_txt').html(html_common)

                                usersRef.child(c).once("value").then(snap3 => {
                                    html_common +='<h6>'+ snap2.val().displayName +' is the parent of '+ snap3.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                
                                    html_common +='<h6>'+ snap3.val().displayName +' is the spouse of '+ name2 +'</h6>';
                                    $('#common_txt').html(html_common)
                                })
                            }
                        }
                    })
                }
    
                if(stopper1 == false) {
                    usersRef.child(snap.val().m).once("value").then(snap2 => {
                        for(var b in snap2.val().siblings) {
                            if(b == father2 || b == mother2) {
                                stopper1 = true;
                                html_common +='<h6>'+ name1 +' is the child of '+ snap2.val().displayName +'</h6>';
                                $('#common_txt').html(html_common)
                
                                usersRef.child(b).once("value").then(snap3 => {
                                    html_common +='<h6>'+ snap2.val().displayName +' is the sibling of '+ snap3.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                
                                    html_common +='<h6>'+ snap3.val().displayName +' is the parent of '+ name2 +'</h6>';
                                    $('#common_txt').html(html_common)
                                })
                            } else {
                                usersRef.child(b).once("value").then(snap2 => {
                                    for(var c in snap2.val().children) {
                                        if(c == ux2 || c == vir2) {
                                            html_common +='<h6>'+ name1 +' is the child of '+ snap.val().displayName +'</h6>';
                                            $('#common_txt').html(html_common)
            
                                            html_common +='<h6>'+ snap.val().displayName +' is the sibling of '+ snap2.val().displayName +'</h6>';
                                            $('#common_txt').html(html_common)
            
                                            usersRef.child(c).once("value").then(snap3 => {
                                                html_common +='<h6>'+ snap2.val().displayName +' is the parent of '+ snap3.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
                            
                                                html_common +='<h6>'+ snap3.val().displayName +' is the spouse of '+ name2 +'</h6>';
                                                $('#common_txt').html(html_common)
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
    })

    // green and orange
    usersRef.child(key).once("value").then(keysnap => {
        usersRef.child(key2).once("value").then(key2snap => {
            console.log("1 check")
            var spouse;
    
            if(key2snap.val().ux != undefined) spouse = key2snap.val().ux
            else if(key2snap.val().vir != undefined) spouse = key2snap.val().vir
            
            // grandchild inlaw, greatgrandparents, greatgrandchild & inlaw, great2grandparents (green)
            for(var a in keysnap.val().children) {
                if(a == key2snap.val().f || a == key2snap.val().m) {
                    usersRef.child(a).once("value").then(asnap => {
                        html_common +='<h6>'+ key2snap.val().displayName +' is the child of '+ asnap.val().displayName +'</h6>';
                        $('#common_txt').html(html_common)
    
                        if(asnap.val().f == key || asnap.val().m == key) {
                            html_common +='<h6>'+ asnap.val().displayName +' is the child of '+ keysnap.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
    
                            if(keysnap.val().f == person1_key || keysnap.val().m == person1_key) {
                                html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ person1 +'</h6>';
                                $('#common_txt').html(html_common)
                            } else if(keysnap.val().f == person2_key || keysnap.val().m == person2_key) {
                                html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ person2 +'</h6>';
                                $('#common_txt').html(html_common)
                            } else {
                                var stopper = false;
            
                                usersRef.child(keysnap.val().f).once("value").then(keyfsnap => {
                                    html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ keyfsnap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
            
                                    if(keyfsnap.val().f == person1_key || keyfsnap.val().m == person1_key) {
                                        html_common +='<h6>'+ keyfsnap.val().displayName +' is the child of '+ person1 +'</h6>';
                                        $('#common_txt').html(html_common)
                                        stopper = true;
                                    } else if(keyfsnap.val().f == person2_key || keyfsnap.val().m == person2_key) {
                                        html_common +='<h6>'+ keyfsnap.val().displayName +' is the child of '+ person2 +'</h6>';
                                        $('#common_txt').html(html_common)
                                        stopper = true;
                                    }
                                    
                                    if(stopper == false) {
                                        usersRef.child(keysnap.val().m).once("value").then(keymsnap => {
                                            html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ keymsnap.val().displayName +'</h6>';
                                            $('#common_txt').html(html_common)
                                        
                                            if(keymsnap.val().f == person1_key || keymsnap.val().m == person1_key) {
                                                html_common +='<h6>'+ keymsnap.val().displayName +' is the child of '+ person1 +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else if(keymsnap.val().f == person2_key || keymsnap.val().m == person2_key) {
                                                html_common +='<h6>'+ keymsnap.val().displayName +' is the child of '+ person2 +'</h6>';
                                                $('#common_txt').html(html_common)
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                } else {
                    for(var b in spouse) {
                        if(a == b) {
                            usersRef.child(a).once("value").then(asnap => {
                                html_common +='<h6>'+ key2snap.val().displayName +' is the spouse of '+ asnap.val().displayName +'</h6>';
                                $('#common_txt').html(html_common)
    
                                html_common +='<h6>'+ asnap.val().displayName +' is the child of '+ keysnap.val().displayName +'</h6>';
                                $('#common_txt').html(html_common)
    
                                if(keysnap.val().f == person1_key || keysnap.val().m == person1_key) {
                                    html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ person1 +'</h6>';
                                    $('#common_txt').html(html_common)
                                } else if(keysnap.val().f == person2_key || keysnap.val().m == person2_key) {
                                    html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ person2 +'</h6>';
                                    $('#common_txt').html(html_common)
                                } else {
                                    var stopper = false;
                
                                    usersRef.child(keysnap.val().f).once("value").then(keyfsnap => {
                                        html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ keyfsnap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                
                                        if(keyfsnap.val().f == person1_key || keyfsnap.val().m == person1_key) {
                                            html_common +='<h6>'+ keyfsnap.val().displayName +' is the child of '+ person1 +'</h6>';
                                            $('#common_txt').html(html_common)
                                            stopper = true;
                                        } else if(keyfsnap.val().f == person2_key || keyfsnap.val().m == person2_key) {
                                            html_common +='<h6>'+ keyfsnap.val().displayName +' is the child of '+ person2 +'</h6>';
                                            $('#common_txt').html(html_common)
                                            stopper = true;
                                        }
                                        
                                        if(stopper == false) {
                                            usersRef.child(keysnap.val().m).once("value").then(keymsnap => {
                                                html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ keymsnap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
                                            
                                                if(keymsnap.val().f == person1_key || keymsnap.val().m == person1_key) {
                                                    html_common +='<h6>'+ keymsnap.val().displayName +' is the child of '+ person1 +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                } else if(keymsnap.val().f == person2_key || keymsnap.val().m == person2_key) {
                                                    html_common +='<h6>'+ keymsnap.val().displayName +' is the child of '+ person2 +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        } else {
                            checker(a, key2)
                        }
                    }
                }
            }

            // niece/nephew inlaw, great aunt/uncle, great niece/nephew & inlaw (orange)
            for(var c in keysnap.val().siblings) {
                childLoop(c)
    
                function childLoop(keey) {
                    usersRef.child(keey).once("value").then(keeysnap => {
                        for(var d in keeysnap.val().children) {
                            for(var e in spouse) {
                                if(d == e) {
                                    usersRef.child(d).once("value").then(dsnap => {
                                        html_common +='<h6>'+ key2snap.val().displayName +' is the spouse of '+ dsnap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                    
                                        html_common +='<h6>'+ dsnap.val().displayName +' is the child of '+ keeysnap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
        
                                        if(keey == c) {
                                            html_common +='<h6>'+ keeysnap.val().displayName +' is the sibling of '+ keysnap.val().displayName +'</h6>';
                                            $('#common_txt').html(html_common)
                                        } else if(keeysnap.val().f == c || keeysnap.val().m == c) {
                                            usersRef.child(c).once("value").then(csnap => {
                                                html_common +='<h6>'+ keeysnap.val().displayName +' is the child of '+ csnap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
        
                                                html_common +='<h6>'+ csnap.val().displayName +' is the sibling of '+ keysnap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
                                            })
                                        }
                                    })
                                } else if(d == key2snap.val().f || d == key2snap.val().m) {
                                    usersRef.child(d).once("value").then(dsnap => {
                                        html_common +='<h6>'+ key2snap.val().displayName +' is the child of '+ dsnap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                    
                                        html_common +='<h6>'+ dsnap.val().displayName +' is the child of '+ keeysnap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
        
                                        html_common +='<h6>'+ keeysnap.val().displayName +' is the sibling of '+ keysnap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                                    })
                                } else {
                                    childLoop(d)
                                }
                            }
                        }
                    })
                }
            }
        })
    })
}

function checker(key, key2) {
    var html_common = '';

    usersRef.child(key).once("value").then(keysnap => {
        usersRef.child(key2).once("value").then(key2snap => {
            console.log("1 check")
            var spouse;
    
            if(key2snap.val().ux != undefined) spouse = key2snap.val().ux
            else if(key2snap.val().vir != undefined) spouse = key2snap.val().vir
            
            // grandchild inlaw, greatgrandparents, greatgrandchild & inlaw, great2grandparents (green)
            for(var a in keysnap.val().children) {
                parentLoop(a, key2)

                function parentLoop(kay, kay2) {
                    usersRef.child(kay).once("value").then(kaysnap => {
                        usersRef.child(kay2).once("value").then(kay2snap => {
                            if(kay == kay2snap.val().f || kay == kay2snap.val().m) {
                                html_common +='<h6>'+ kay2snap.val().displayName +' is the child of '+ kaysnap.val().displayName +'</h6>';
                                $('#common_txt').html(html_common)
        
                                if(kaysnap.val().f == key || kaysnap.val().m == key) {
                                    html_common +='<h6>'+ kaysnap.val().displayName +' is the child of '+ keysnap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
            
                                    if(keysnap.val().f == person1_key || keysnap.val().m == person1_key) {
                                        html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ person1 +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else if(keysnap.val().f == person2_key || keysnap.val().m == person2_key) {
                                        html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ person2 +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else {
                                        var stopper = false;
                    
                                        usersRef.child(keysnap.val().f).once("value").then(keyfsnap => {
                                            html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ keyfsnap.val().displayName +'</h6>';
                                            $('#common_txt').html(html_common)
                    
                                            if(keyfsnap.val().f == person1_key || keyfsnap.val().m == person1_key) {
                                                html_common +='<h6>'+ keyfsnap.val().displayName +' is the child of '+ person1 +'</h6>';
                                                $('#common_txt').html(html_common)
                                                stopper = true;
                                            } else if(keyfsnap.val().f == person2_key || keyfsnap.val().m == person2_key) {
                                                html_common +='<h6>'+ keyfsnap.val().displayName +' is the child of '+ person2 +'</h6>';
                                                $('#common_txt').html(html_common)
                                                stopper = true;
                                            }
                                            
                                            if(stopper == false) {
                                                usersRef.child(keysnap.val().m).once("value").then(keymsnap => {
                                                    html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ keymsnap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                
                                                    if(keymsnap.val().f == person1_key || keymsnap.val().m == person1_key) {
                                                        html_common +='<h6>'+ keymsnap.val().displayName +' is the child of '+ person1 +'</h6>';
                                                        $('#common_txt').html(html_common)
                                                    } else if(keymsnap.val().f == person2_key || keymsnap.val().m == person2_key) {
                                                        html_common +='<h6>'+ keymsnap.val().displayName +' is the child of '+ person2 +'</h6>';
                                                        $('#common_txt').html(html_common)
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            } else {
                                for(var b in spouse) {
                                    if(kay == b) {
                                            html_common +='<h6>'+ kay2snap.val().displayName +' is the spouse of '+ kaysnap.val().displayName +'</h6>';
                                            $('#common_txt').html(html_common)
                
                                            html_common +='<h6>'+ kaysnap.val().displayName +' is the child of '+ keysnap.val().displayName +'</h6>';
                                            $('#common_txt').html(html_common)
                
                                            if(keysnap.val().f == person1_key || keysnap.val().m == person1_key) {
                                                html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ person1 +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else if(keysnap.val().f == person2_key || keysnap.val().m == person2_key) {
                                                html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ person2 +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else {
                                                var stopper = false;
                            
                                                usersRef.child(keysnap.val().f).once("value").then(keyfsnap => {
                                                    html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ keyfsnap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                            
                                                    if(keyfsnap.val().f == person1_key || keyfsnap.val().m == person1_key) {
                                                        html_common +='<h6>'+ keyfsnap.val().displayName +' is the child of '+ person1 +'</h6>';
                                                        $('#common_txt').html(html_common)
                                                        stopper = true;
                                                    } else if(keyfsnap.val().f == person2_key || keyfsnap.val().m == person2_key) {
                                                        html_common +='<h6>'+ keyfsnap.val().displayName +' is the child of '+ person2 +'</h6>';
                                                        $('#common_txt').html(html_common)
                                                        stopper = true;
                                                    }
                                                    
                                                    if(stopper == false) {
                                                        usersRef.child(keysnap.val().m).once("value").then(keymsnap => {
                                                            html_common +='<h6>'+ keysnap.val().displayName +' is the child of '+ keymsnap.val().displayName +'</h6>';
                                                            $('#common_txt').html(html_common)
                                                        
                                                            if(keymsnap.val().f == person1_key || keymsnap.val().m == person1_key) {
                                                                html_common +='<h6>'+ keymsnap.val().displayName +' is the child of '+ person1 +'</h6>';
                                                                $('#common_txt').html(html_common)
                                                            } else if(keymsnap.val().f == person2_key || keymsnap.val().m == person2_key) {
                                                                html_common +='<h6>'+ keymsnap.val().displayName +' is the child of '+ person2 +'</h6>';
                                                                $('#common_txt').html(html_common)
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        
                                    } else {
                                        parentLoop(a, kay2)
                                    }
                                }
                            }
                        })
                    })
                }
            }

            // niece/nephew inlaw, great aunt/uncle, great niece/nephew & inlaw (orange)
            for(var c in keysnap.val().siblings) {
                childLoop(c)
    
                function childLoop(keey) {
                    usersRef.child(keey).once("value").then(keeysnap => {
                        for(var d in keeysnap.val().children) {
                            for(var e in spouse) {
                                if(d == e) {
                                    usersRef.child(d).once("value").then(dsnap => {
                                        html_common +='<h6>'+ key2snap.val().displayName +' is the spouse of '+ dsnap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                    
                                        html_common +='<h6>'+ dsnap.val().displayName +' is the child of '+ keeysnap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
        
                                        if(keey == c) {
                                            html_common +='<h6>'+ keeysnap.val().displayName +' is the sibling of '+ keysnap.val().displayName +'</h6>';
                                            $('#common_txt').html(html_common)
                                        } else if(keeysnap.val().f == c || keeysnap.val().m == c) {
                                            usersRef.child(c).once("value").then(csnap => {
                                                html_common +='<h6>'+ keeysnap.val().displayName +' is the child of '+ csnap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
        
                                                html_common +='<h6>'+ csnap.val().displayName +' is the sibling of '+ keysnap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
                                            })
                                        }
                                    })
                                } else if(d == key2snap.val().f || d == key2snap.val().m) {
                                    usersRef.child(d).once("value").then(dsnap => {
                                        html_common +='<h6>'+ key2snap.val().displayName +' is the child of '+ dsnap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                    
                                        html_common +='<h6>'+ dsnap.val().displayName +' is the child of '+ keeysnap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
        
                                        html_common +='<h6>'+ keeysnap.val().displayName +' is the sibling of '+ keysnap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                                    })
                                } else {
                                    childLoop(d)
                                }
                            }
                        }
                    })
                }
            }
        })
    })
}