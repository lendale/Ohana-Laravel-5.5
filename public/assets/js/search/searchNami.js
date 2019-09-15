$('#submit_search').click(getSearchData);
$('#submit_search').click(function() {
    imm3_1_counter = 0
})
var usersRef= firebase.database().ref().child('users')
var immediate_family = firebase.database().ref().child('immediate_family')
var person1;
var person2;
var person1_key;
var person2_key;
var person1_familyId;
var person2_familyId;
var person1_imm = [];
var person2_imm = [];
var older;
var oldName;
var youngName;

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

                usersRef.once("value").then(snap3 => {
                    snap3.forEach(snap4 => {
                        if(snap4.val().displayName.toLowerCase() == person2.toLowerCase()) {
                            console.log("search person2", person2 + true)
                            person2_key = snap4.val().key
                            person2_familyId = snap4.val().familyId

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

function checkOlderPerson() {
    console.log("checkOlderPerson")

    if(older == person1_key) {
        console.log("older person1")
        oldName = person1
        youngName = person2
        imm3(person1_key, person2_key)
    } else if(older == person2_key) {
        console.log("older person2")
        oldName = person2
        youngName = person1
        imm3(person2_key, person1_key)
    }
}

// children
function imm3(key1, key2) {
    console.log("imm3")
    var html_common = '';
    var spouse2 = [];

    usersRef.child(key1).once("value").then(key1snap => {
        usersRef.child(key2).once("value").then(key2snap => {
            if(key2snap.val().vir != undefined) spouse2 = key2snap.val().vir
            else if(key2snap.val().ux != undefined) spouse2 = key2snap.val().ux
            else spouse2.push(0)

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
                                if(b == key2) {
                                    html_common +='<h6>2nd degree consanguinity</h6>';
                                    $('#common_txt').html(html_common)
    
                                    html_common +='<h6>'+ key1snap.val().displayName +' is the grandparent of '+ key2snap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                } else if(b == c) {
                                    html_common +='<h6>3rd degree affinity</h6>';
                                    $('#common_txt').html(html_common)
        
                                    html_common +='<h6>'+ key1snap.val().displayName +' is the grandparent-in-law of '+ key2snap.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                } else {
                                    usersRef.child(b).once("value").then(bsnap => {
                                        if(bsnap.val().children == undefined) imm4(key1, key2)
                                        for(var d in bsnap.val().children) {
                                            if(d == key2) {
                                                html_common +='<h6>3rd degree consanguinity</h6>';
                                                $('#common_txt').html(html_common)
                    
                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great grandparent of '+ key2snap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else if(d == c) {
                                                html_common +='<h6>4th degree affinity</h6>';
                                                $('#common_txt').html(html_common)
    
                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great grandparent-in-law of '+ key2snap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else {
                                                usersRef.child(d).once("value").then(dsnap => {
                                                    if(dsnap.val().children == undefined) imm4(key1, key2)
                                                    for(var e in dsnap.val().children) {
                                                        if(e == key2) {
                                                            html_common +='<h6>4th degree consanguinity</h6>';
                                                            $('#common_txt').html(html_common)
    
                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great2x grandparent of '+ key2snap.val().displayName +'</h6>';
                                                            $('#common_txt').html(html_common)
                                                        } else if(e == c) {
                                                            html_common +='<h6>5th degree affinity</h6>';
                                                            $('#common_txt').html(html_common)
    
                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great great2x grandparent-in-law of '+ key2snap.val().displayName +'</h6>';
                                                            $('#common_txt').html(html_common)
                                                        } else {
                                                            usersRef.child(e).once("value").then(esnap => {
                                                                if(esnap.val().children == undefined) imm4(key1, key2)
                                                                for(var f in esnap.val().children) {
                                                                    if(f == key2) {
                                                                        html_common +='<h6>5th degree consanguinity</h6>';
                                                                        $('#common_txt').html(html_common)
                
                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great3x grandparent of '+ key2snap.val().displayName +'</h6>';
                                                                        $('#common_txt').html(html_common)
                                                                    }else if(f == c) {
                                                                        html_common +='<h6>6th degree affinity</h6>';
                                                                        $('#common_txt').html(html_common)
                
                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great3x grandparent-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                        $('#common_txt').html(html_common)
                                                                    } else {
                                                                        usersRef.child(f).once("value").then(fsnap => {
                                                                            if(fsnap.val().children == undefined) imm4(key1, key2)
                                                                            for(var g in fsnap.val().children) {
                                                                                if(g == key2) {
                                                                                    html_common +='<h6>6th degree consanguinity</h6>';
                                                                                    $('#common_txt').html(html_common)
                            
                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the great4x grandparent of '+ key2snap.val().displayName +'</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                                } else if(g == c) {
                                                                                    html_common +='<h6>7th degree affinity</h6>';
                                                                                    $('#common_txt').html(html_common)
                            
                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the great4x grandparent-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                                } else {
                                                                                    usersRef.child(g).once("value").then(gsnap => {
                                                                                        if(gsnap.val().children == undefined) imm4(key1, key2)
                                                                                        for(var h in gsnap.val().children) {
                                                                                            if(h == key2) {
                                                                                                html_common +='<h6>7th degree consanguinity</h6>';
                                                                                                $('#common_txt').html(html_common)
                                        
                                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great5x grandparent of '+ key2snap.val().displayName +'</h6>';
                                                                                                $('#common_txt').html(html_common)
                                                                                            } else if(h == c) {
                                                                                                html_common +='<h6>8th degree affinity</h6>';
                                                                                                $('#common_txt').html(html_common)
                                        
                                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great5x grandparent-in-law of '+ key2snap.val().displayName +'</h6>';
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
                        })
                    }
                }
            }
        })
    })
}

// niece/nephew
function imm4(key1, key2) {
    console.log("imm4")
    var html_common = '';
    var spouse1 = [];
    var spouse2 = [];

    usersRef.child(key1).once("value").then(key1snap => {
        usersRef.child(key2).once("value").then(key2snap => {
            if(key1snap.val().vir != undefined) spouse1 = key1snap.val().vir
            else if(key1snap.val().ux != undefined) spouse1 = key1snap.val().ux
            else spouse1.push(0)

            if(key2snap.val().vir != undefined) spouse2 = key2snap.val().vir
            else if(key2snap.val().ux != undefined) spouse2 = key2snap.val().ux
            else spouse2.push(0)
            
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
                                if(b == key2) {
                                    html_common +='<h6>3rd degree consanguinity</h6>';
                                    $('#common_txt').html(html_common)
                
                                    if(key1snap.val().gender == "male") {
                                        html_common +='<h6>'+ key1snap.val().displayName +' is the uncle of '+ key2snap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else {
                                        html_common +='<h6>'+ key1snap.val().displayName +' is the aunt of '+ key2snap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                                    }
                                } else if(b == d) {
                                    html_common +='<h6>4th degree affinity</h6>';
                                    $('#common_txt').html(html_common)
                
                                    if(key1snap.val().gender == "male") {
                                        html_common +='<h6>'+ key1snap.val().displayName +' is the uncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else {
                                        html_common +='<h6>'+ key1snap.val().displayName +' is the aunt-in-law of '+ key2snap.val().displayName +'</h6>';
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
                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great2x granduncle of '+ key2snap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)
                                                                        } else {
                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great2x grandaunt of '+ key2snap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)
                                                                        }
                                                                    } else if(f == d) {
                                                                        html_common +='<h6> 7th degree affinity</h6>';
                                                                        $('#common_txt').html(html_common)
                                                            
                                                                        if(key1snap.val().gender == "male") {
                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great2x granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)
                                                                        } else {
                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great2x grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)
                                                                        }
                                                                    } else {
                                                                        usersRef.child(f).once("value").then(fsnap => {
                                                                            for(var g in fsnap.val().children) {
                                                                                if(g == key2) {
                                                                                    html_common +='<h6> 7th degree consanguinity</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                        
                                                                                    if(key1snap.val().gender == "male") {
                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great3x granduncle of '+ key2snap.val().displayName +'</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                                    } else {
                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great3x grandaunt of '+ key2snap.val().displayName +'</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                                    }
                                                                                } else if(g == d) {
                                                                                    html_common +='<h6> 8th degree affinity</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                        
                                                                                    if(key1snap.val().gender == "male") {
                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great3x granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                                    } else {
                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great3x grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                                    }
                                                                                } else {
                                                                                    usersRef.child(g).once("value").then(gsnap => {
                                                                                        for(var h in gsnap.val().children) {
                                                                                            if(h == key2) {
                                                                                                html_common +='<h6> 8th degree consanguinity</h6>';
                                                                                                $('#common_txt').html(html_common)
                                                                                    
                                                                                                if(key1snap.val().gender == "male") {
                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the great4x granduncle of '+ key2snap.val().displayName +'</h6>';
                                                                                                    $('#common_txt').html(html_common)
                                                                                                } else {
                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the great4x grandaunt of '+ key2snap.val().displayName +'</h6>';
                                                                                                    $('#common_txt').html(html_common)
                                                                                                }
                                                                                            } else if(h == d) {
                                                                                                html_common +='<h6> 9th degree affinity</h6>';
                                                                                                $('#common_txt').html(html_common)
                                                                                    
                                                                                                if(key1snap.val().gender == "male") {
                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the great4x granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                                    $('#common_txt').html(html_common)
                                                                                                } else {
                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the great4x grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
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
                        })
                    }
                }
            }
            
            for(var a in spouse1) {
                usersRef.child(a).once("value").then(asnap => {
                    if(asnap.val().siblings == undefined) imm5(key1, key2)
                    for(var b in asnap.val().siblings) {
                        for(var c in spouse2) {
                            if(b == c || b == key2) {
                                html_common +='<h6>3rd degree affinity</h6>';
                                $('#common_txt').html(html_common)
                    
                                html_common +='<h6>'+ key1snap.val().displayName +' is the sibling-in-law of '+ key2snap.val().displayName +'</h6>';
                                $('#common_txt').html(html_common)
                            } else {
                                usersRef.child(b).once("value").then(bsnap => {
                                    if(bsnap.val().children == undefined) imm5(key1, key2)
                                    for(var d in bsnap.val().children) {
                                        if(d == c || d == key2) {
                                            html_common +='<h6>4th degree affinity</h6>';
                                            $('#common_txt').html(html_common)
                        
                                            if(key1snap.val().gender == "male") {
                                                html_common +='<h6>'+ key1snap.val().displayName +' is the uncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else {
                                                html_common +='<h6>'+ key1snap.val().displayName +' is the aunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } 
                                        } else {
                                            usersRef.child(d).once("value").then(dsnap => {
                                                if(dsnap.val().children == undefined) imm5(key1, key2)
                                                for(var e in dsnap.val().children) {
                                                    if(e == c || e == key2) {
                                                        html_common +='<h6>5th degree affinity</h6>';
                                                        $('#common_txt').html(html_common)
                                    
                                                        if(key1snap.val().gender == "male") {
                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                            $('#common_txt').html(html_common)
                                                        } else {
                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                            $('#common_txt').html(html_common)
                                                        } 
                                                    } else {
                                                        usersRef.child(e).once("value").then(esnap => {
                                                            if(esnap.val().children == undefined) imm5(key1, key2)
                                                            for(var f in esnap.val().children) {
                                                                if(f == c || f == key2) {
                                                                    html_common +='<h6>6th degree affinity</h6>';
                                                                    $('#common_txt').html(html_common)
                                                
                                                                    if(key1snap.val().gender == "male") {
                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                        $('#common_txt').html(html_common)
                                                                    } else {
                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the great grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                        $('#common_txt').html(html_common)
                                                                    } 
                                                                } else {
                                                                    usersRef.child(f).once("value").then(fsnap => {
                                                                        if(fsnap.val().children == undefined) imm5(key1, key2)
                                                                        for(var g in fsnap.val().children) {
                                                                            if(g == c || g == key2) {
                                                                                html_common +='<h6>7th degree affinity</h6>';
                                                                                $('#common_txt').html(html_common)
                                                            
                                                                                if(key1snap.val().gender == "male") {
                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the great2x granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                                } else {
                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the great2x grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                                } 
                                                                            } else {
                                                                                usersRef.child(g).once("value").then(gsnap => {
                                                                                    if(gsnap.val().children == undefined) imm5(key1, key2)
                                                                                    for(var h in gsnap.val().children) {
                                                                                        if(h == c || h == key2) {
                                                                                            html_common +='<h6>8th degree affinity</h6>';
                                                                                            $('#common_txt').html(html_common)
                                                                        
                                                                                            if(key1snap.val().gender == "male") {
                                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great3x granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                                $('#common_txt').html(html_common)
                                                                                            } else {
                                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the great3x grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                                $('#common_txt').html(html_common)
                                                                                            } 
                                                                                        } else {
                                                                                            usersRef.child(h).once("value").then(hsnap => {
                                                                                                if(hsnap.val().children == undefined) imm5(key1, key2)
                                                                                                for(var i in hsnap.val().children) {
                                                                                                    if(i == c || i == key2) {
                                                                                                        html_common +='<h6>9th degree affinity</h6>';
                                                                                                        $('#common_txt').html(html_common)
                                                                                    
                                                                                                        if(key1snap.val().gender == "male") {
                                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great4x granduncle-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                                            $('#common_txt').html(html_common)
                                                                                                        } else {
                                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the great4x grandaunt-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                                            $('#common_txt').html(html_common)
                                                                                                        } 
                                                                                                    } else imm5(key1, key2)
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
                                })
                            }
                        }
                    }
                })
            }
        })
    })
}

// first cousin - aunt/uncle's children
function imm5(key1, key2) {
    console.log("imm5")
    var html_common = '';
    var spouse1 = [];
    var spouse2 = [];
    var parent1 = [];

    usersRef.child(key1).once("value").then(key1snap => {
        usersRef.child(key2).once("value").then(key2snap => {
            if(key1snap.val().vir != undefined) spouse1 = key1snap.val().vir
            else if(key1snap.val().ux != undefined) spouse1 = key1snap.val().ux
            else spouse1.push(0)

            if(key2snap.val().vir != undefined) spouse2 = key2snap.val().vir
            else if(key2snap.val().ux != undefined) spouse2 = key2snap.val().ux
            else spouse2.push(0)

            parent1[key1snap.val().f] = key1snap.val().f
            parent1[key1snap.val().m] = key1snap.val().m

            for(var a in parent1) {
                for(var b in spouse2) {
                    usersRef.child(a).once("value").then(asnap => {
                        for(var c in asnap.val().siblings) {
                            usersRef.child(c).once("value").then(csnap => {
                                for(var d in csnap.val().children) {
                                    if(d == key2) {
                                        html_common +='<h6>4th degree consanguinity</h6>';
                                        $('#common_txt').html(html_common)
                            
                                        html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin of '+ key2snap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else if(d == b) {
                                        html_common +='<h6>5th degree affinity</h6>';
                                        $('#common_txt').html(html_common)
                            
                                        html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law of '+ key2snap.val().displayName +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else {
                                        usersRef.child(d).once("value").then(dsnap => {
                                            for(var e in dsnap.val().children) {
                                                if(e == key2) {
                                                    html_common +='<h6>5th degree consanguinity</h6>';
                                                    $('#common_txt').html(html_common)
                                        
                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin once removed of '+ key2snap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                } else if(e == b) {
                                                    html_common +='<h6>6th degree affinity</h6>';
                                                    $('#common_txt').html(html_common)
                                        
                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law once removed of '+ key2snap.val().displayName +'</h6>';
                                                    $('#common_txt').html(html_common)
                                                } else {
                                                    usersRef.child(e).once("value").then(esnap => {
                                                        for(var f in esnap.val().children) {
                                                            if(f == key2) {
                                                                html_common +='<h6>6th degree consanguinity</h6>';
                                                                $('#common_txt').html(html_common)
                                                    
                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin twice removed of '+ key2snap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
                                                            } else if(f == b) {
                                                                html_common +='<h6>7th degree affinity</h6>';
                                                                $('#common_txt').html(html_common)
                                                    
                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law twice removed of '+ key2snap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
                                                            } else {
                                                                usersRef.child(f).once("value").then(fsnap => {
                                                                    for(var g in fsnap.val().children) {
                                                                        if(g == key2) {
                                                                            html_common +='<h6>7th degree consanguinity</h6>';
                                                                            $('#common_txt').html(html_common)
                                                                
                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin thrice removed of '+ key2snap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)
                                                                        } else if(g == b) {
                                                                            html_common +='<h6>8th degree affinity</h6>';
                                                                            $('#common_txt').html(html_common)
                                                                
                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law thrice removed of '+ key2snap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)
                                                                        } else {
                                                                            usersRef.child(g).once("value").then(gsnap => {
                                                                                for(var h in gsnap.val().children) {
                                                                                    if(h == key2) {
                                                                                        html_common +='<h6>8th degree consanguinity</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                            
                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin four times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                                    } else if(h == b) {
                                                                                        html_common +='<h6>9th degree affinity</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                            
                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law four times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                                    } else {
                                                                                        usersRef.child(h).once("value").then(hsnap => {
                                                                                            for(var i in hsnap.val().children) {
                                                                                                if(i == key2) {
                                                                                                    html_common +='<h6>9th degree consanguinity</h6>';
                                                                                                    $('#common_txt').html(html_common)
                                                                                        
                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin five times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                    $('#common_txt').html(html_common)
                                                                                                } else if(i == b) {
                                                                                                    html_common +='<h6>10th degree affinity</h6>';
                                                                                                    $('#common_txt').html(html_common)
                                                                                        
                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law five times removed of '+ key2snap.val().displayName +'</h6>';
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
                            })
                        }
                    })
                }
            }
            
            for(var a in spouse1) {
                usersRef.child(a).once("value").then(asnap => {
                    var parenta = [];
                    parenta[asnap.val().f] = asnap.val().f
                    parenta[asnap.val().m] = asnap.val().m
                    for(var b in parenta) {
                        for(var c in spouse2) {
                            usersRef.child(b).once("value").then(bsnap => {
                                if(!bsnap.val().siblings) imm6(key1, key2)
                                for(var d in bsnap.val().siblings) {
                                    usersRef.child(d).once("value").then(dsnap => {
                                        if(dsnap.val().children == undefined) imm6(key1, key2)
                                        for(var e in dsnap.val().children) {
                                            if(e == key2 || e == c) {
                                                html_common +='<h6>5th degree affinity</h6>';
                                                $('#common_txt').html(html_common)
                                    
                                                html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law of '+ key2snap.val().displayName +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else {
                                                usersRef.child(e).once("value").then(esnap => {
                                                    if(esnap.val().children == undefined) imm6(key1, key2)
                                                    for(var f in esnap.val().children) {
                                                        if(f == key2 || f == c) {
                                                            html_common +='<h6>6th degree affinity</h6>';
                                                            $('#common_txt').html(html_common)
                                                
                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law once removed of '+ key2snap.val().displayName +'</h6>';
                                                            $('#common_txt').html(html_common)
                                                        } else {
                                                            usersRef.child(f).once("value").then(fsnap => {
                                                                if(fsnap.val().children == undefined) imm6(key1, key2)
                                                                for(var g in fsnap.val().children) {
                                                                    if(g == key2 || g == c) {
                                                                        html_common +='<h6>7th degree affinity</h6>';
                                                                        $('#common_txt').html(html_common)
                                                            
                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law twice removed of '+ key2snap.val().displayName +'</h6>';
                                                                        $('#common_txt').html(html_common)
                                                                    } else {
                                                                        usersRef.child(g).once("value").then(gsnap => {
                                                                            if(gsnap.val().children == undefined) imm6(key1, key2)
                                                                            for(var h in gsnap.val().children) {
                                                                                if(h == key2 || h == c) {
                                                                                    html_common +='<h6>8th degree affinity</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                        
                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law thrice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                                } else {
                                                                                    usersRef.child(h).once("value").then(hsnap => {
                                                                                        if(hsnap.val().children == undefined) imm6(key1, key2)
                                                                                        for(var i in hsnap.val().children) {
                                                                                            if(i == key2 || i == c) {
                                                                                                html_common +='<h6>9th degree affinity</h6>';
                                                                                                $('#common_txt').html(html_common)
                                                                                    
                                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law four times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                $('#common_txt').html(html_common)
                                                                                            } else {
                                                                                                usersRef.child(i).once("value").then(isnap => {
                                                                                                    if(isnap.val().children == undefined) imm6(key1, key2)
                                                                                                    for(var j in isnap.val().children) {
                                                                                                        if(j == key2 || j == c) {
                                                                                                            html_common +='<h6>10th degree affinity</h6>';
                                                                                                            $('#common_txt').html(html_common)
                                                                                                
                                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the first cousin-in-law five times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                            $('#common_txt').html(html_common)
                                                                                                        } else imm6(key1, key2)
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
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    })
}

// second cousin - grand aunt/uncle children's children
function imm6(key1, key2) {
    console.log("imm6")
    var html_common = '';
    var spouse1 = [];
    var spouse2 = [];
    var parent1 = [];

    usersRef.child(key1).once("value").then(key1snap => {
        usersRef.child(key2).once("value").then(key2snap => {
            if(key1snap.val().vir != undefined) spouse1 = key1snap.val().vir
            else if(key1snap.val().ux != undefined) spouse1 = key1snap.val().ux
            else spouse1.push(0)

            if(key2snap.val().vir != undefined) spouse2 = key2snap.val().vir
            else if(key2snap.val().ux != undefined) spouse2 = key2snap.val().ux
            else spouse2.push(0)

            parent1[key1snap.val().f] = key1snap.val().f
            parent1[key1snap.val().m] = key1snap.val().m

            for(var a in parent1) {
                usersRef.child(a).once("value").then(asnap => {
                    var parenta = []
                    parenta[asnap.val().f] = asnap.val().f
                    parenta[asnap.val().m] = asnap.val().m
                    for(var b in parenta) {
                        for(var f in spouse2) {
                            usersRef.child(b).once("value").then(bsnap => {
                                for(var c in bsnap.val().siblings) {
                                    usersRef.child(c).once("value").then(csnap => {
                                        for(var d in csnap.val().children) {
                                            usersRef.child(d).once("value").then(dsnap => {
                                                for(var e in dsnap.val().children) {
                                                    if(e == key2) {
                                                        html_common +='<h6>6th degree consanguinity</h6>';
                                                        $('#common_txt').html(html_common)
                                            
                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin of '+ key2snap.val().displayName +'</h6>';
                                                        $('#common_txt').html(html_common)
                                                    } else if(e == f) {
                                                        html_common +='<h6>7th degree consanguinity</h6>';
                                                        $('#common_txt').html(html_common)
                                            
                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin-in-law of '+ key2snap.val().displayName +'</h6>';
                                                        $('#common_txt').html(html_common)
                                                    } else {
                                                        usersRef.child(e).once("value").then(esnap => {
                                                            for(var g in esnap.val().children) {
                                                                if(g == key2) {
                                                                    html_common +='<h6>7th degree consanguinity</h6>';
                                                                    $('#common_txt').html(html_common)
                                                        
                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin once removed of '+ key2snap.val().displayName +'</h6>';
                                                                    $('#common_txt').html(html_common)
                                                                } else if(g == f) {
                                                                    html_common +='<h6>8th degree consanguinity</h6>';
                                                                    $('#common_txt').html(html_common)
                                                        
                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin-in-law once removed of '+ key2snap.val().displayName +'</h6>';
                                                                    $('#common_txt').html(html_common)
                                                                } else {
                                                                    usersRef.child(g).once("value").then(gsnap => {
                                                                        for(var h in gsnap.val().children) {
                                                                            if(h == key2) {
                                                                                html_common +='<h6>8th degree consanguinity</h6>';
                                                                                $('#common_txt').html(html_common)
                                                                    
                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin twice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                $('#common_txt').html(html_common)
                                                                            } else if(h == f) {
                                                                                html_common +='<h6>9th degree consanguinity</h6>';
                                                                                $('#common_txt').html(html_common)
                                                                    
                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin-in-law twice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                $('#common_txt').html(html_common)
                                                                            } else {
                                                                                usersRef.child(h).once("value").then(hsnap => {
                                                                                    for(var i in hsnap.val().children) {
                                                                                        if(i == key2) {
                                                                                            html_common +='<h6>9th degree consanguinity</h6>';
                                                                                            $('#common_txt').html(html_common)
                                                                                
                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin thrice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                            $('#common_txt').html(html_common)
                                                                                        } else if(i == f) {
                                                                                            html_common +='<h6>10th degree consanguinity</h6>';
                                                                                            $('#common_txt').html(html_common)
                                                                                
                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin-in-law thrice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                            $('#common_txt').html(html_common)
                                                                                        } else {
                                                                                            usersRef.child(i).once("value").then(isnap => {
                                                                                                for(var j in isnap.val().children) {
                                                                                                    if(j == key2) {
                                                                                                        html_common +='<h6>10th degree consanguinity</h6>';
                                                                                                        $('#common_txt').html(html_common)
                                                                                            
                                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin four times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                        $('#common_txt').html(html_common)
                                                                                                    } else if(j == f) {
                                                                                                        html_common +='<h6>11th degree consanguinity</h6>';
                                                                                                        $('#common_txt').html(html_common)
                                                                                            
                                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin-in-law four times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                        $('#common_txt').html(html_common)
                                                                                                    } else {
                                                                                                        usersRef.child(j).once("value").then(jsnap => {
                                                                                                            for(var k in jsnap.val().children) {
                                                                                                                if(k == key2) {
                                                                                                                    html_common +='<h6>10th degree consanguinity</h6>';
                                                                                                                    $('#common_txt').html(html_common)
                                                                                                        
                                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin five times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                                    $('#common_txt').html(html_common)
                                                                                                                } else if(k == f) {
                                                                                                                    html_common +='<h6>11th degree consanguinity</h6>';
                                                                                                                    $('#common_txt').html(html_common)
                                                                                                        
                                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin-in-law five times removed of '+ key2snap.val().displayName +'</h6>';
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
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }

            for(var a in spouse1) {
                for(var b in spouse2) {
                    usersRef.child(a).once("value").then(asnap => {
                        var parenta = []
                        parenta[asnap.val().f] = asnap.val().f
                        parenta[asnap.val().m] = asnap.val().m
                        for(var c in parenta) {
                            usersRef.child(c).once("value").then(csnap => {
                                var parentc = []
                                parentc[csnap.val().f] = csnap.val().f
                                parentc[csnap.val().m] = csnap.val().m
                                for(var d in parentc) {
                                    usersRef.child(d).once("value").then(dsnap => {
                                        if(dsnap.val().siblings == undefined) imm7(key1, key2)
                                        for(var e in dsnap.val().siblings) {
                                            usersRef.child(e).once("value").then(esnap => {
                                                if(esnap.val().children == undefined) imm7(key1, key2)
                                                for(var f in esnap.val().children) {
                                                    usersRef.child(f).once("value").then(fsnap => {
                                                        if(fsnap.val().children == undefined) imm7(key1, key2)
                                                        for(var g in fsnap.val().children) {
                                                            if(g == b) {
                                                                html_common +='<h6>7th degree affinity</h6>';
                                                                $('#common_txt').html(html_common)
                                                    
                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                $('#common_txt').html(html_common)
                                                            } else {
                                                                usersRef.child(g).once("value").then(gsnap => {
                                                                    if(gsnap.val().children == undefined) imm7(key1, key2)
                                                                    for(var h in gsnap.val().children) {
                                                                        if(h == b) {
                                                                            html_common +='<h6>8th degree affinity</h6>';
                                                                            $('#common_txt').html(html_common)
                                                                
                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin-in-law once removed of '+ key2snap.val().displayName +'</h6>';
                                                                            $('#common_txt').html(html_common)
                                                                        } else {
                                                                            usersRef.child(h).once("value").then(hsnap => {
                                                                                if(hsnap.val().children == undefined) imm7(key1, key2)
                                                                                for(var i in hsnap.val().children) {
                                                                                    if(i == b) {
                                                                                        html_common +='<h6>9th degree affinity</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                            
                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin-in-law twice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                        $('#common_txt').html(html_common)
                                                                                    } else {
                                                                                        usersRef.child(i).once("value").then(isnap => {
                                                                                            if(isnap.val().children == undefined) imm7(key1, key2)
                                                                                            for(var j in isnap.val().children) {
                                                                                                if(j == b) {
                                                                                                    html_common +='<h6>10th degree affinity</h6>';
                                                                                                    $('#common_txt').html(html_common)
                                                                                        
                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin-in-law thrice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                    $('#common_txt').html(html_common)
                                                                                                } else {
                                                                                                    usersRef.child(j).once("value").then(jsnap => {
                                                                                                        if(jsnap.val().children == undefined) imm7(key1, key2)
                                                                                                        for(var k in isnap.val().children) {
                                                                                                            if(k == b) {
                                                                                                                html_common +='<h6>11th degree affinity</h6>';
                                                                                                                $('#common_txt').html(html_common)
                                                                                                    
                                                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin-in-law four times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                                $('#common_txt').html(html_common)
                                                                                                            } else {
                                                                                                                usersRef.child(k).once("value").then(ksnap => {
                                                                                                                    if(ksnap.val().children == undefined) imm7(key1, key2)
                                                                                                                    for(var l in isnap.val().children) {
                                                                                                                        if(l == b) {
                                                                                                                            html_common +='<h6>12th degree affinity</h6>';
                                                                                                                            $('#common_txt').html(html_common)
                                                                                                                
                                                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the second cousin-in-law five times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                                            $('#common_txt').html(html_common)
                                                                                                                        } else imm7(key1, key2)
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
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    })
}

// third cousin - great grand aunt/uncle's children
function imm7(key1, key2) {
    console.log("imm7")
    var html_common = '';
    var spouse1 = [];
    var spouse2 = [];
    var parent1 = [];

    usersRef.child(key1).once("value").then(key1snap => {
        usersRef.child(key2).once("value").then(key2snap => {
            if(key1snap.val().vir != undefined) spouse1 = key1snap.val().vir
            else if(key1snap.val().ux != undefined) spouse1 = key1snap.val().ux
            else spouse1.push(0)

            if(key2snap.val().vir != undefined) spouse2 = key2snap.val().vir
            else if(key2snap.val().ux != undefined) spouse2 = key2snap.val().ux
            else spouse2.push(0)

            parent1[key1snap.val().f] = key1snap.val().f
            parent1[key1snap.val().m] = key1snap.val().m

            for(var a in parent1) {
                for(var b in spouse2) {
                    usersRef.child(a).once("value").then(asnap => {
                        var parenta = []
                        parenta[asnap.val().f] = asnap.val().f
                        parenta[asnap.val().m] = asnap.val().m
                        for(var c in parenta) {
                            usersRef.child(c).once("value").then(csnap => {
                                var parentc = []
                                parentc[csnap.val().f] = csnap.val().f
                                parentc[csnap.val().m] = csnap.val().m
                                for(var d in parentc) {
                                    usersRef.child(d).once("value").then(dsnap => {                
                                        for(var e in dsnap.val().siblings) {
                                            usersRef.child(e).once("value").then(esnap => {                
                                                for(var f in esnap.val().children) {
                                                    usersRef.child(f).once("value").then(fsnap => {                
                                                        for(var g in fsnap.val().children) {
                                                            usersRef.child(g).once("value").then(gsnap => {                
                                                                for(var h in gsnap.val().children) {
                                                                    if(h == key2) {
                                                                        html_common +='<h6>8th degree consanguinity</h6>';
                                                                        $('#common_txt').html(html_common)
                                                            
                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin of '+ key2snap.val().displayName +'</h6>';
                                                                        $('#common_txt').html(html_common)
                                                                    } else if(h == b) {
                                                                        html_common +='<h6>9th degree consanguinity</h6>';
                                                                        $('#common_txt').html(html_common)
                                                            
                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                        $('#common_txt').html(html_common)
                                                                    } else {
                                                                        usersRef.child(h).once("value").then(hsnap => {                
                                                                            for(var i in hsnap.val().children) {
                                                                                if(i == key2) {
                                                                                    html_common +='<h6>9th degree consanguinity</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                        
                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin once removed of '+ key2snap.val().displayName +'</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                                } else if(i == b) {
                                                                                    html_common +='<h6>10th degree consanguinity</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                        
                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin-in-law once removed of '+ key2snap.val().displayName +'</h6>';
                                                                                    $('#common_txt').html(html_common)
                                                                                } else {
                                                                                    usersRef.child(i).once("value").then(isnap => {                
                                                                                        for(var j in isnap.val().children) {
                                                                                            if(j == key2) {
                                                                                                html_common +='<h6>10th degree consanguinity</h6>';
                                                                                                $('#common_txt').html(html_common)
                                                                                    
                                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin twice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                $('#common_txt').html(html_common)
                                                                                            } else if(j == b) {
                                                                                                html_common +='<h6>11th degree consanguinity</h6>';
                                                                                                $('#common_txt').html(html_common)
                                                                                    
                                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin-in-law twice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                $('#common_txt').html(html_common)
                                                                                            } else {
                                                                                                usersRef.child(j).once("value").then(jsnap => {                
                                                                                                    for(var k in jsnap.val().children) {
                                                                                                        if(k == key2) {
                                                                                                            html_common +='<h6>11th degree consanguinity</h6>';
                                                                                                            $('#common_txt').html(html_common)
                                                                                                
                                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin thrice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                            $('#common_txt').html(html_common)
                                                                                                        } else if(k == b) {
                                                                                                            html_common +='<h6>12th degree consanguinity</h6>';
                                                                                                            $('#common_txt').html(html_common)
                                                                                                
                                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin-in-law thrice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                            $('#common_txt').html(html_common)
                                                                                                        } else {
                                                                                                            usersRef.child(k).once("value").then(ksnap => {                
                                                                                                                for(var l in ksnap.val().children) {
                                                                                                                    if(l == key2) {
                                                                                                                        html_common +='<h6>12th degree consanguinity</h6>';
                                                                                                                        $('#common_txt').html(html_common)
                                                                                                            
                                                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin four times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                                        $('#common_txt').html(html_common)
                                                                                                                    } else if(l == b) {
                                                                                                                        html_common +='<h6>13th degree consanguinity</h6>';
                                                                                                                        $('#common_txt').html(html_common)
                                                                                                            
                                                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin-in-law four times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                                        $('#common_txt').html(html_common)
                                                                                                                    } else {
                                                                                                                        usersRef.child(l).once("value").then(lsnap => {                
                                                                                                                            for(var m in lsnap.val().children) {
                                                                                                                                if(m == key2) {
                                                                                                                                    html_common +='<h6>13th degree consanguinity</h6>';
                                                                                                                                    $('#common_txt').html(html_common)
                                                                                                                        
                                                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin five times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                    $('#common_txt').html(html_common)
                                                                                                                                } else if(m == b) {
                                                                                                                                    html_common +='<h6>14th degree consanguinity</h6>';
                                                                                                                                    $('#common_txt').html(html_common)
                                                                                                                        
                                                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin-in-law five times removed of '+ key2snap.val().displayName +'</h6>';
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
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }

            for(var z in spouse1) {
                usersRef.child(z).once("value").then(zsnap => {
                    var parent1 = []
                    parent1[zsnap.val().f] = zsnap.val().f
                    parent1[zsnap.val().m] = zsnap.val().m
                    for(var a in parent1) {
                        for(var b in spouse2) {
                            usersRef.child(a).once("value").then(asnap => {
                                var parenta = []
                                parenta[asnap.val().f] = asnap.val().f
                                parenta[asnap.val().m] = asnap.val().m
                                for(var c in parenta) {
                                    usersRef.child(c).once("value").then(csnap => {
                                        var parentc = []
                                        parentc[csnap.val().f] = csnap.val().f
                                        parentc[csnap.val().m] = csnap.val().m
                                        for(var d in parentc) {
                                            usersRef.child(d).once("value").then(dsnap => {
                                                for(var e in dsnap.val().siblings) {
                                                    usersRef.child(e).once("value").then(esnap => {
                                                        for(var f in esnap.val().children) {
                                                            usersRef.child(f).once("value").then(fsnap => {
                                                                for(var g in fsnap.val().children) {
                                                                    usersRef.child(g).once("value").then(gsnap => {
                                                                        for(var h in gsnap.val().children) {
                                                                            if(h == key2) {
                                                                                html_common +='<h6>8th degree consanguinity</h6>';
                                                                                $('#common_txt').html(html_common)
                                                                    
                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin of '+ key2snap.val().displayName +'</h6>';
                                                                                $('#common_txt').html(html_common)
                                                                            } else if(h == b) {
                                                                                html_common +='<h6>9th degree consanguinity</h6>';
                                                                                $('#common_txt').html(html_common)
                                                                    
                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin-in-law of '+ key2snap.val().displayName +'</h6>';
                                                                                $('#common_txt').html(html_common)
                                                                            } else {
                                                                                usersRef.child(h).once("value").then(hsnap => {                
                                                                                    for(var i in hsnap.val().children) {
                                                                                        if(i == key2) {
                                                                                            html_common +='<h6>9th degree consanguinity</h6>';
                                                                                            $('#common_txt').html(html_common)
                                                                                
                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin once removed of '+ key2snap.val().displayName +'</h6>';
                                                                                            $('#common_txt').html(html_common)
                                                                                        } else if(i == b) {
                                                                                            html_common +='<h6>10th degree consanguinity</h6>';
                                                                                            $('#common_txt').html(html_common)
                                                                                
                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin-in-law once removed of '+ key2snap.val().displayName +'</h6>';
                                                                                            $('#common_txt').html(html_common)
                                                                                        } else {
                                                                                            usersRef.child(i).once("value").then(isnap => {                
                                                                                                for(var j in isnap.val().children) {
                                                                                                    if(j == key2) {
                                                                                                        html_common +='<h6>10th degree consanguinity</h6>';
                                                                                                        $('#common_txt').html(html_common)
                                                                                            
                                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin twice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                        $('#common_txt').html(html_common)
                                                                                                    } else if(j == b) {
                                                                                                        html_common +='<h6>11th degree consanguinity</h6>';
                                                                                                        $('#common_txt').html(html_common)
                                                                                            
                                                                                                        html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin-in-law twice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                        $('#common_txt').html(html_common)
                                                                                                    } else {
                                                                                                        usersRef.child(j).once("value").then(jsnap => {                
                                                                                                            for(var k in jsnap.val().children) {
                                                                                                                if(k == key2) {
                                                                                                                    html_common +='<h6>11th degree consanguinity</h6>';
                                                                                                                    $('#common_txt').html(html_common)
                                                                                                        
                                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin thrice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                                    $('#common_txt').html(html_common)
                                                                                                                } else if(k == b) {
                                                                                                                    html_common +='<h6>12th degree consanguinity</h6>';
                                                                                                                    $('#common_txt').html(html_common)
                                                                                                        
                                                                                                                    html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin-in-law thrice removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                                    $('#common_txt').html(html_common)
                                                                                                                } else {
                                                                                                                    usersRef.child(k).once("value").then(ksnap => {                
                                                                                                                        for(var l in ksnap.val().children) {
                                                                                                                            if(l == key2) {
                                                                                                                                html_common +='<h6>12th degree consanguinity</h6>';
                                                                                                                                $('#common_txt').html(html_common)
                                                                                                                    
                                                                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin four times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                $('#common_txt').html(html_common)
                                                                                                                            } else if(l == b) {
                                                                                                                                html_common +='<h6>13th degree consanguinity</h6>';
                                                                                                                                $('#common_txt').html(html_common)
                                                                                                                    
                                                                                                                                html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin-in-law four times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                $('#common_txt').html(html_common)
                                                                                                                            } else {
                                                                                                                                usersRef.child(l).once("value").then(lsnap => {                
                                                                                                                                    for(var m in lsnap.val().children) {
                                                                                                                                        if(m == key2) {
                                                                                                                                            html_common +='<h6>13th degree consanguinity</h6>';
                                                                                                                                            $('#common_txt').html(html_common)
                                                                                                                                
                                                                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin five times removed of '+ key2snap.val().displayName +'</h6>';
                                                                                                                                            $('#common_txt').html(html_common)
                                                                                                                                        } else if(m == b) {
                                                                                                                                            html_common +='<h6>14th degree consanguinity</h6>';
                                                                                                                                            $('#common_txt').html(html_common)
                                                                                                                                
                                                                                                                                            html_common +='<h6>'+ key1snap.val().displayName +' is the third cousin-in-law five times removed of '+ key2snap.val().displayName +'</h6>';
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
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    })
}

var imm3_1_counter = 0
function imm3Loop(key1, key2) {
    console.log("imm3Loop")
    var html_common = ''
    var spouse2 = []

    usersRef.child(key1).once("value").then(key1snap => {
        usersRef.child(key2).once("value").then(key2snap => {
            if(key2snap.val().vir != undefined) spouse2 = key2snap.val().vir
            else if(key2snap.val().ux != undefined) spouse2 = key2snap.val().ux
            else spouse2.push(0)

            // if(key1snap.val().children == undefined) imm4(key1, key2)
            // else {
                imm3_1_counter += 1

                for(var a in key1snap.val().children) {
                    for(var b in spouse2) {
                        if(a == b) {
                            html_common +='<h6>Degree of affinity: ' + (imm3_1_counter+1)+'</h6>';
                            $('#common_txt').html(html_common)                            

                            if(imm3_1_counter == 1) {
                                html_common +='<h6>'+ oldName +' is the parent-in-law of '+ youngName +'</h6>';
                                $('#common_txt').html(html_common)
                            } else if(imm3_1_counter == 2) {
                                html_common +='<h6>'+ oldName +' is the grandparent-in-law of '+ youngName +'</h6>';
                                $('#common_txt').html(html_common)
                            } else if(imm3_1_counter > 2) {
                                html_common +='<h6>'+ oldName +' is the great'+ (imm3_1_counter-2) +' grandparent-in-law of '+ youngName +'</h6>';
                                $('#common_txt').html(html_common)
                            }
                        } else if(a == key2) {
                            html_common +='<h6>Degree of consanguinity: ' + (imm3_1_counter+1) +'</h6>';
                            $('#common_txt').html(html_common)                            

                            if(imm3_1_counter == 2) {
                                html_common +='<h6>'+ oldName +' is the grandparent of '+ youngName +'</h6>';
                                $('#common_txt').html(html_common)
                            } else if(imm3_1_counter > 2) {
                                html_common +='<h6>'+ oldName +' is the great'+ (imm3_1_counter-2) +' grandparent of '+ youngName +'</h6>';
                                $('#common_txt').html(html_common)
                            }
                        } else {
                            imm3Loop(a, key2)
                        }
                    }
                }
            // }
        })
    })
}
