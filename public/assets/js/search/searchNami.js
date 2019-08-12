// currently working update

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
        immediateChild1(person1_key, person2_key)
    } else if(older == person2_key) {
        console.log("older person2")
        immediateChild1(person2_key, person1_key)
    }
}

function immediateChild1(key, key2) {
    console.log("immediateChild1")
    // console.log("key", key)
    // console.log("key2", key2)

    var html_common = '';
    var name1;      var name2;
    var father1;    var father2;
    var mother1;    var mother2;
    var ux1;        var ux2;
    var vir1;       var vir2;

    usersRef.child(key2).once("value").then(snap => {
        father2 = snap.val().f
        mother2 = snap.val().m
        name2 = snap.val().displayName
    })

    // checks children 4 rows
    usersRef.child(key).child("children").once("value").then(snap => {
        snap.forEach(snap2 => {
            console.log("1 check")
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
            } else {
                immediateChild1(snap2.val(), key2)
            }
        })
    })

    usersRef.child(key).once("value").then(snap => {
        name1 = snap.val().displayName
        father1 = snap.val().f
        mother1 = snap.val().m
    })

    usersRef.child(key2).child("ux").once("value").then(snap => {
        snap.forEach(snap2 => {
            ux2 = snap2.val()
        })
    })

    usersRef.child(key2).child("vir").once("value").then(snap => {
        snap.forEach(snap2 => {
            vir2 = snap2.val()
        })
    })

    usersRef.child(key).child("ux").once("value").then(snap => {
        snap.forEach(snap2 => {
            ux1 = snap2.val()
        })
    })

    usersRef.child(key).child("vir").once("value").then(snap => {
        snap.forEach(snap2 => {
            vir1 = snap2.val()
        })
    })

    // checks key-children-spouse
    usersRef.child(key).child("children").once("value").then(snap => {
        snap.forEach(snap2 => {
            console.log("2 check")
            if(snap2.val() ==  ux2 || snap2.val() ==  vir2) {
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
                // immediateChild(snap2.val(), key2)
            }
        })
    })

    // checks key-sibling-child
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

    // checks key-spouse-sibling-child
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
}

function immediateChild3(key, key2) {
    console.log("immediateChild")
    console.log("key", key)
    console.log("key2", key2)

    var html_common = '';
    var name1;      var name2;
    var father1;    var father2;
    var mother1;    var mother2;
    var ux1;        var ux2;
    var vir1;       var vir2;

    usersRef.child(key).once("value").then(snap => {
        name1 = snap.val().displayName
        father1 = snap.val().f
        mother1 = snap.val().m
    })

    usersRef.child(key).child("ux").once("value").then(snap => {
        snap.forEach(snap2 => {
            ux1 = snap2.val()
        })
    })

    usersRef.child(key).child("vir").once("value").then(snap => {
        snap.forEach(snap2 => {
            vir1 = snap2.val()
        })
    })

    usersRef.child(key2).once("value").then(snap => {
        name2 = snap.val().displayName
        father2 = snap.val().f
        mother2 = snap.val().m
    })

    usersRef.child(key2).child("ux").once("value").then(snap => {
        snap.forEach(snap2 => {
            ux2 = snap2.val()
        })
    })

    usersRef.child(key2).child("vir").once("value").then(snap => {
        snap.forEach(snap2 => {
            vir2 = snap2.val()
        })
    })

    siblingChildCheck()
    childSpouseCheck()
    childCheck()
    // spouseSiblingCheck()

    // checks children 4 rows editor2 same
    function childCheck() {
        console.log("childCheck")
        usersRef.child(key).child("children").once("value").then(snap => {
            snap.forEach(snap2 => {
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
                                    parentLoop(snap4.val().f)

                                    function parentLoop(keey) {
                                        usersRef.child(keey).once("value").then(snap5 => {
                                            html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ snap5.val().displayName +'</h6>';
                                            $('#common_txt').html(html_common)
    
                                            if(snap5.val().f == person1_key || snap5.val().m == person1_key) {
                                                html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person1 +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else if(snap5.val().f == person2_key || snap5.val().m == person2_key) {
                                                html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person2 +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else {
                                                parentLoop(snap4.val().m)
                                            }
                                        })
                                    }
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
    
    // checks key-children-spouse editor2 not same
    function childSpouseCheck() {
        console.log("childSpouseCheck")
        usersRef.child(key).child("children").once("value").then(snap => {
            snap.forEach(snap2 => {
                if(snap2.val() ==  ux2 || snap2.val() ==  vir2) {
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
                            parentLoop2(father1)

                            function parentLoop2(keeey) {
                                usersRef.child(keeey).once("value").then(snap5 => {
                                    html_common +='<h6>'+ name1 +' is the child of '+ snap5.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
        
                                    if(snap5.val().f == person1_key || snap5.val().m == person1_key) {
                                        html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person1 +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else if(snap5.val().f == person2_key || snap5.val().m == person2_key) {
                                        html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person2 +'</h6>';
                                        $('#common_txt').html(html_common)
                                    } else {
                                        parentLoop2(mother1)
                                    }
                                }) 
                            }
                        }
                    })
                }
            })
        })
    }

    // checks key-sibling-child editor2 same
    function siblingChildCheck() {   
        console.log("siblingChildCheck")
        usersRef.child(key).child("siblings").once("value").then(snap => {
            snap.forEach(snap2 => {
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
    }

    // checks key-spouse-sibling
    function spouseSiblingCheck() {
        var spouse;
        if(vir1 == undefined) spouse = vir1;
        else if(ux1 == undefined) spouse = ux1;

        usersRef.child(spouse).child("siblings").once("value").then(snap => {

        })
    }
}

// shortened function
function immediateChild2(key, key2) {
    console.log("immediateChild")
    // console.log("key", key)
    // console.log("key2", key2)

    var html_common = '';
    var name1;      var name2;
    var father1;    var father2;
    var mother1;    var mother2;
    var ux1;        var ux2;
    var vir1;       var vir2;

    usersRef.child(key).once("value").then(snap => {
        name1 = snap.val().displayName
        father1 = snap.val().f
        mother1 = snap.val().m
    })

    usersRef.child(key).child("ux").once("value").then(snap => {
        snap.forEach(snap2 => {
            ux1 = snap2.val()
        })
    })

    usersRef.child(key).child("vir").once("value").then(snap => {
        snap.forEach(snap2 => {
            vir1 = snap2.val()
        })
    })

    usersRef.child(key2).once("value").then(snap => {
        name2 = snap.val().displayName
        father2 = snap.val().f
        mother2 = snap.val().m
    })

    usersRef.child(key2).child("ux").once("value").then(snap => {
        snap.forEach(snap2 => {
            ux2 = snap2.val()
        })
    })

    usersRef.child(key2).child("vir").once("value").then(snap => {
        snap.forEach(snap2 => {
            vir2 = snap2.val()
        })
    })

    siblingChildCheck()
    childSpouseCheck()
    childCheck()
    // spouseSiblingCheck()

    // checks children 4 rows
    function childCheck() {
        console.log("childCheck")
        usersRef.child(key).child("children").once("value").then(snap => {
            snap.forEach(snap2 => {
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
                                    parentLoop(snap4.val().f)

                                    function parentLoop(keey) {
                                        usersRef.child(keey).once("value").then(snap5 => {
                                            html_common +='<h6>'+ snap4.val().displayName +' is the child of '+ snap5.val().displayName +'</h6>';
                                            $('#common_txt').html(html_common)
    
                                            if(snap5.val().f == person1_key || snap5.val().m == person1_key) {
                                                html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person1 +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else if(snap5.val().f == person2_key || snap5.val().m == person2_key) {
                                                html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person2 +'</h6>';
                                                $('#common_txt').html(html_common)
                                            } else {
                                                parentLoop(snap4.val().m)
                                            }
                                        })
                                    }
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
    
    // checks key-children-spouse
    function childSpouseCheck() {
        console.log("childSpouseCheck")
        usersRef.child(key).child("children").once("value").then(snap => {
            snap.forEach(snap2 => {
                if(snap2.val() ==  ux2 || snap2.val() ==  vir2) {
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
                            usersRef.child(father1).once("value").then(snap5 => {
                                html_common +='<h6>'+ name1 +' is the child of '+ snap5.val().displayName +'</h6>';
                                $('#common_txt').html(html_common)
    
                                if(snap5.val().f == person1_key || snap5.val().m == person1_key) {
                                    html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person1 +'</h6>';
                                    $('#common_txt').html(html_common)
                                } else if(snap5.val().f == person2_key || snap5.val().m == person2_key) {
                                    html_common +='<h6>'+ snap5.val().displayName +' is the child of '+ person2 +'</h6>';
                                    $('#common_txt').html(html_common)
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
                }
            })
        })
    }

    // checks key-sibling-child
    function siblingChildCheck() {   
        console.log("siblingChildCheck")
        usersRef.child(key).child("siblings").once("value").then(snap => {
            snap.forEach(snap2 => {
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
    }

    // checks key-spouse-sibling
    function spouseSiblingCheck() {

    }
}