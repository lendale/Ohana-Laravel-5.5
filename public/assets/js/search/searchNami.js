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
var person1_name;
var person2_name;

firebase.auth().onAuthStateChanged(handleAuthStateChanged);
    
function handleAuthStateChanged(user) {
    if (user) {
        currentUser = user;
    } else {}
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

function immediate1st() {
    console.log("immediate1st")

    var html_common = '';

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

    commonCompare()
}

function commonCompare() {
    console.log("commonCompare")

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

    commonCompare2()
}

function immediate2nd(keys, name) {
    console.log("immediate2nd")
    var html_common = '';

    immediate_family.child(person1_familyId).once("value").then(snap => {
        if(snap.val().father == keys) {
            html_common +='<h6>'+ name +' is the father of '+ person1 +'</h6>';
            $('#common_txt').html(html_common)
        } else if(snap.val().mother == keys) {
            html_common +='<h6>'+ name +' is the mother of '+ person1 +'</h6>';
            $('#common_txt').html(html_common)
        }
    
        for(var key in snap.val().brother) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the brother of '+ person1 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().sister) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the sister of '+ person1 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().husband) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the husband of '+ person1 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().wife) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the wife of '+ person1 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().son) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the son of '+ person1 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().daughter) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the daughter of '+ person1 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    })

    immediate_family.child(person2_familyId).once("value").then(snap => {
        if(snap.val().father == keys) {
            html_common +='<h6>'+ name +' is the father of '+ person2 +'</h6>';
            $('#common_txt').html(html_common)
        } else if(snap.val().mother == keys) {
            html_common +='<h6>'+ name +' is the mother of '+ person2 +'</h6>';
            $('#common_txt').html(html_common)
        }
    
        for(var key in snap.val().brother) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the brother of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().sister) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the sister of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().husband) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the husband of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().wife) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the wife of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().son) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the son of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    
        for(var key in snap.val().daughter) {
            if(key == keys) {
                html_common +='<h6>'+ name +' is the daughter of '+ person2 +'</h6>';
                $('#common_txt').html(html_common)
            }
        }
    })
}

function commonCompare2() {
    console.log("commonCompare2")

    if(older = person1_key) {
        console.log("trueeee")
        console.log("person1_key", person1_key)
        console.log("person2_key", person2_key)

        familychecker(person1_key, person2_key)
    }
}

function familychecker(key, key2) {
    console.log("familychecker")

    var html_common = '';
    var father;
    var mother;
    var name;

    usersRef.child(key2).once("value").then(snap => {
        father = snap.val().f
        mother = snap.val().m
        name = snap.val().displayName
    })

    usersRef.child(key).child("children").once("value").then(snap => {
        snap.forEach(snap2 => {
            if(snap2.val() == father) {
                console.log("true")
                
                usersRef.child(snap2.val()).once("value").then(snap3 => {
                    console.log("snap2", snap2.val())
                    html_common +='<h6>'+ snap3.val().displayName +' is the father of '+ name +'</h6>';
                    $('#common_txt').html(html_common)

                    usersRef.child(snap3.val().f).once("value").then(snap4 => {
                        html_common +='<h6>'+ snap4.val().displayName +' is the father of '+ snap3.val().displayName +'</h6>';
                        $('#common_txt').html(html_common)

                        usersRef.child(snap4.val().f).once("value").then(snap5 => {
                            html_common +='<h6>'+ snap5.val().displayName +' is the father of '+ snap4.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
                        })

                        usersRef.child(snap4.val().m).once("value").then(snap5 => {
                            html_common +='<h6>'+ snap5.val().displayName +' is the mother of '+ snap4.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
                        })
                    })

                    usersRef.child(snap3.val().m).once("value").then(snap4 => {
                        html_common +='<h6>'+ snap4.val().displayName +' is the mother of '+ snap3.val().displayName +'</h6>';
                        $('#common_txt').html(html_common)

                        usersRef.child(snap4.val().f).once("value").then(snap5 => {
                            html_common +='<h6>'+ snap5.val().displayName +' is the father of '+ snap4.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
                        })

                        usersRef.child(snap4.val().m).once("value").then(snap5 => {
                            html_common +='<h6>'+ snap5.val().displayName +' is the mother of '+ snap4.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
                        })
                    })
                })
            } else if(snap2.val() == mother) {
                console.log("true")
                
                usersRef.child(snap2.val()).once("value").then(snap3 => {
                    console.log("snap2", snap2.val())
                    html_common +='<h6>'+ snap3.val().displayName +' is the mother of '+ name +'</h6>';
                    $('#common_txt').html(html_common)

                    usersRef.child(snap3.val().f).once("value").then(snap4 => {
                        html_common +='<h6>'+ snap4.val().displayName +' is the father of '+ snap3.val().displayName +'</h6>';
                        $('#common_txt').html(html_common)

                        usersRef.child(snap4.val().f).once("value").then(snap5 => {
                            html_common +='<h6>'+ snap5.val().displayName +' is the father of '+ snap4.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
                        })

                        usersRef.child(snap4.val().m).once("value").then(snap5 => {
                            html_common +='<h6>'+ snap5.val().displayName +' is the mother of '+ snap4.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
                        })
                    })

                    usersRef.child(snap3.val().m).once("value").then(snap4 => {
                        html_common +='<h6>'+ snap4.val().displayName +' is the mother of '+ snap3.val().displayName +'</h6>';
                        $('#common_txt').html(html_common)

                        usersRef.child(snap4.val().f).once("value").then(snap5 => {
                            html_common +='<h6>'+ snap5.val().displayName +' is the father of '+ snap4.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
                        })

                        usersRef.child(snap4.val().m).once("value").then(snap5 => {
                            html_common +='<h6>'+ snap5.val().displayName +' is the mother of '+ snap4.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
                        })
                    })
                })
            } else {
                console.log("false")
                familychecker(snap2.val(), key2)
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
        }
    }
    return oldie;
}
