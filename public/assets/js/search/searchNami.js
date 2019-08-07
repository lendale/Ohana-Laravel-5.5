// search2.js

$('#submit_search').click(getSearchData);
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
var person1_name;
var person2_name;
var older;

firebase.auth().onAuthStateChanged(handleAuthStateChanged);
    
function handleAuthStateChanged(user) {
    if (user) {
        currentUser = user;
    } else {}
}

function getSearchData(){
    person1 = $("#person_1").val();
    person2 = $("#person_2").val();

    console.log("person1", person1)
    console.log("person2", person2)

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
        if(stopper == false) findCommon()
    })
}

function findCommon() {
    console.log("findCommon")

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
            }
        })
    })

    checkOlderPerson()
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
        immediateChild(person1_key, person2_key)
    } else if(older == person2_key) {
        console.log("older person2")
        immediateChild(person2_key, person1_key)
    }

    // checkOlderPerson2()
}

function immediateChild(key, key2) {
    console.log("immediateChild")

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
                            } else {
                                usersRef.child(snap4.val().f).once("value").then(snap5 => {
                                    html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ snap5.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)

                                    if(snap5.val().f == person1_key || snap5.val().m == person1_key) {            
                                        html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person1_name +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else if(snap5.val().f == person2_key || snap5.val().m == person2_key) {            
                                        html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person2_name +'</h6>';
                                        $('#common_txt').html(html_common)
                                    }
                                })
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
                            } else {
                                usersRef.child(snap4.val().f).once("value").then(snap5 => {
                                    html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ snap5.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)

                                    if(snap5.val().f == person1_key || snap5.val().m == person1_key) {            
                                        html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person1_name +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else if(snap5.val().f == person2_key || snap5.val().m == person2_key) {            
                                        html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person2_name +'</h6>';
                                        $('#common_txt').html(html_common)
                                    }
                                })
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
                            } else {
                                usersRef.child(snap4.val().f).once("value").then(snap5 => {
                                    html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ snap5.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)

                                    if(snap5.val().f == person1_key || snap5.val().m == person1_key) {            
                                        html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person1_name +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else if(snap5.val().f == person2_key || snap5.val().m == person2_key) {            
                                        html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person2_name +'</h6>';
                                        $('#common_txt').html(html_common)
                                    }
                                })
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
                            } else {
                                usersRef.child(snap4.val().f).once("value").then(snap5 => {
                                    html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ snap5.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)

                                    if(snap5.val().f == person1_key || snap5.val().m == person1_key) {            
                                        html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person1_name +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else if(snap5.val().f == person2_key || snap5.val().m == person2_key) {            
                                        html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person2_name +'</h6>';
                                        $('#common_txt').html(html_common)
                                    }
                                })
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

function checkOlderPerson2() {
    console.log("checkOlderPerson2")

    if(older == person1_key) {
        console.log("older person1")
        findCommon2(person1_key, person2_key, person1_familyId, person2_familyId)
    } else if(older == person2_key) {
        console.log("older person2")
        findCommon2(person2_key, person1_key, person2_familyId, person1_familyId)
    }
}

function findCommon2(key1, key2, familyId1, familyId2) {
    console.log("immediateSpouse")
    var key1_imm = [];
    var key2_imm = [];
    
    immediate_family.child(familyId1).once("value").then(snap => {
        key1_imm.push(snap.val().user)
        if(snap.val().father) key1_imm.push(snap.val().father)
        if(snap.val().mother) key1_imm.push(snap.val().mother)
        for(var k in snap.val().brother) key1_imm.push(k)
        for(var k in snap.val().sister) key1_imm.push(k)
        for(var k in snap.val().husband) key1_imm.push(k)
        for(var k in snap.val().wife) key1_imm.push(k)
        for(var k in snap.val().son) key1_imm.push(k)
        for(var k in snap.val().daughter) key1_imm.push(k)

        immediate_family.child(familyId2).once("value").then(snap2 => {
            key2_imm.push(snap2.val().user)
            if(snap2.val().father) key2_imm.push(snap2.val().father)
            if(snap2.val().mother) key2_imm.push(snap2.val().mother)
            for(var k in snap2.val().brother) key2_imm.push(k)
            for(var k in snap2.val().sister) key2_imm.push(k)
            for(var k in snap2.val().husband) key2_imm.push(k)
            for(var k in snap2.val().wife) key2_imm.push(k)
            for(var k in snap2.val().son) key2_imm.push(k)
            for(var k in snap2.val().daughter) key2_imm.push(k)

            console.log("key1_imm", key1_imm)
            console.log("key2_imm", key2_imm)
            console.log("key1", key1)
            console.log("key2", key2)

            key1_imm.filter(function(n) {
                if (key2_imm.includes(n) == true) {
                    console.log("has common")

                    usersRef.child(n).once("value").then(snap3 => {
                        // console.log("n",snap3.val().displayName)
                        // immediate2nd(n, snap3.val().displayName)
                    })
                } else {
                    console.log("no common")

                    usersRef.child(key1).child("children").once("value").then(snap3 => {
                        snap3.forEach(snap4 => {
                            usersRef.child(snap4.val()).once("value").then(snap5 => {
                                findCommon2(snap4.val(), key2, snap5.val().familyId, familyId2)
                            })
                        })
                    })
                }
            })
        })
    })
}