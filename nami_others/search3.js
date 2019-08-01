// search3.js

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

                            commonCompare3()
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

function commonCompare3() {
    console.log("commonCompare3")

    if(older == person1_key) {
        console.log("older person1")
        relationshipConnect(person1_key, person2_key)
    } else if(older == person2_key) {
        console.log("older person2")
        relationshipConnect(person2_key, person1_key)
    }
}

function relationshipConnect(key, key2) {
    var html_common = '';
    var parent1;
    var sibling1;
    var spouse1;
    var child1;
    var parent2;
    var sibling2;
    var spouse2;
    var child2;
    var childStopper = false;
    var siblingStopper = false;
    var virStopper = false;
    var uxStopper = false;

    usersRef.child(key).once("value").then(persoon1 => {
        usersRef.child(key2).once("value").then(persoon2 => {
            console.log("person1", persoon1.val().displayName)
            console.log("person2", persoon2.val().displayName)

            if(persoon1.val().gender == "female") {
                parent1 = "mother";
                sibling1 = "sister";
                spouse1 = "wife";
                child1 = "daughter";
            } else if(persoon1.val().gender == "male") {
                parent1 = "father";
                sibling1 = "brother";
                spouse1 = "husband";
                child1 = "son";
            }

            if(persoon2.val().gender == "female") {
                parent2 = "mother";
                sibling2 = "sister";
                spouse2 = "wife";
                child2 = "daughter";
            } else if(persoon2.val().gender == "male") {
                parent2 = "father";
                sibling2 = "brother";
                spouse2 = "husband";
                child2 = "son";
            }

            for(var i in persoon1.val().children) {
                if(i == key2) {
                    html_common +='<h6>'+ persoon2.val().displayName +' is the '+ child2 +' of '+ persoon1.val().displayName +'</h6>';
                    $('#common_txt').html(html_common)
                    childStopper = true;
                    console.log("exist child")

                    if(persoon1.val().f == person1_key || persoon1.val().m == person1_key) {
                        html_common +='<h6>'+ persoon1.val().displayName +' is the '+ child1 +' of '+ person1_name +'</h6>';
                        $('#common_txt').html(html_common)
                        console.log("exist parent1")
                    } else if(persoon1.val().f == person2_key || persoon1.val().m == person2_key) {
                        html_common +='<h6>'+ persoon1.val().displayName +' is the '+ child1 +' of '+ person2_name +'</h6>';
                        $('#common_txt').html(html_common)
                        console.log("exist parent2")
                    }

                    for(var k in persoon1.val().siblings) {
                        if(k == person1_key) {
                            html_common +='<h6>'+ persoon1.val().displayName +' is the '+ sibling1 +' of '+ person1_name +'</h6>';
                            $('#common_txt').html(html_common)
                            console.log("exist sibling1")
                        } else if(k == person2_key) {
                            html_common +='<h6>'+ persoon1.val().displayName +' is the '+ sibling1 +' of '+ person2_name +'</h6>';
                            $('#common_txt').html(html_common)
                            console.log("exist sibling2")
                        }
                    }
                }
                console.log("done child")
            }
            
            if(childStopper == false) {
                for(var i in persoon1.val().siblings) {
                    if(i == key2) {
                        html_common +='<h6>'+ persoon1.val().displayName +' is the '+ sibling1 +' of '+ persoon2.val().displayName +'</h6>';
                        $('#common_txt').html(html_common)
                        siblingStopper = true;
                        console.log("exist sibling")
                    }
                    console.log("done sibling")
                }

                if(siblingStopper == false) {
                    for(var i in persoon1.val().vir) {
                        if(i == key2) {
                            html_common +='<h6>'+ persoon1.val().displayName +' is the '+ spouse1 +' of '+ persoon2.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
                            virStopper = true;
                            console.log("exist vir")

                            if(persoon1.val().f == person1_key || persoon1.val().m == person1_key) {
                                html_common +='<h6>'+ persoon1.val().displayName +' is the '+ child1 +' of '+ person1_name +'</h6>';
                                $('#common_txt').html(html_common)
                                console.log("exist parent1")
                            } else if(persoon1.val().f == person2_key || persoon1.val().m == person2_key) {
                                html_common +='<h6>'+ persoon1.val().displayName +' is the '+ child1 +' of '+ person2_name +'</h6>';
                                $('#common_txt').html(html_common)
                                console.log("exist parent2")
                            } else {
                                console.log("persoon1 f", persoon1.val().f)

                                usersRef.child(persoon1.val().f).once("value").then(snap => {
                                    if(snap.val().f == person1_key || snap.val().m == person1_key) {
                                        html_common +='<h6>'+ snap.val().displayName +' is the '+ child1 +' of '+ person1_name +'</h6>';
                                        $('#common_txt').html(html_common)
                                        console.log("exist parent31")
                                    } else if(snap.val().f == person2_key || snap.val().m == person2_key) {
                                        html_common +='<h6>'+ snap.val().displayName +' is the '+ child1 +' of '+ person2_name +'</h6>';
                                        $('#common_txt').html(html_common)
                                        console.log("exist parent32")
                                    }
                                })
                            }
                        }
                        console.log("done vir")
                    }

                    if(virStopper == false) {
                        for(var i in persoon1.val().ux) {
                            if(i == key2) {
                                html_common +='<h6>'+ persoon1.val().displayName +' is the '+ spouse1 +' of '+ persoon2.val().displayName +'</h6>';
                                $('#common_txt').html(html_common)
                                uxStopper = true;
                                console.log("exist ux")

                                if(persoon1.val().f == person1_key || persoon1.val().m == person1_key) {
                                    html_common +='<h6>'+ persoon1.val().displayName +' is the '+ child1 +' of '+ person1_name +'</h6>';
                                    $('#common_txt').html(html_common)
                                    console.log("exist parent1")
                                } else if(persoon1.val().f == person2_key || persoon1.val().m == person2_key) {
                                    html_common +='<h6>'+ persoon1.val().displayName +' is the '+ child1 +' of '+ person2_name +'</h6>';
                                    $('#common_txt').html(html_common)
                                    console.log("exist parent2")
                                }

                                for(var k in persoon1.val().siblings) {
                                    if(k == person1_key) {
                                        html_common +='<h6>'+ persoon1.val().displayName +' is the '+ sibling1 +' of '+ person1_name +'</h6>';
                                        $('#common_txt').html(html_common)
                                        console.log("exist sibling1")
                                    } else if(k == person2_key) {
                                        html_common +='<h6>'+ persoon1.val().displayName +' is the '+ sibling1 +' of '+ person2_name +'</h6>';
                                        $('#common_txt').html(html_common)
                                        console.log("exist sibling2")
                                    }
                                }
                            }
                            console.log("done ux")
                        }
                        console.log("uxStopper", uxStopper)

                        if(uxStopper == false) {
                            console.log("looooop")

                            for(var i in persoon1.val().children) {
                                relationshipConnect(i, key2)
                            }

                            for(var i in persoon1.val().siblings) {
                                relationshipConnect(i, key2)
                            }
                        } else if(uxStopper == true) {
                            console.log("ux manaaaaa")
                        }
                    } else  {
                        console.log("vir manaaaaa")
                    }
                } else  {
                    console.log("sibling manaaaaa")
                }
            } else  {
                console.log("child manaaaaa")
            }
        })
    })
}

function familychecker(key, key2) {
    console.log("familychecker")

    var html_common = '';
    var father;
    var mother;

    usersRef.child(key2).once("value").then(snap => {
        father = snap.val().f
        mother = snap.val().m
    })

    usersRef.child(key).child("children").once("value").then(snap => {
        snap.forEach(snap2 => {
            if(snap2.val() == key2) {
                html_common +='<h6>'+ person2 +' is the child of '+ person1 +'</h6>';
                $('#common_txt').html(html_common)
            } 
            else if(snap2.val() == father) {
                console.log("snap2 == younger father")
                console.log(snap2.val())
                console.log(father)

                
                usersRef.child(snap2.val()).once("value").then(snap3 => {
                    html_common +='<h6>'+ snap3.val().displayName +' is the father of '+ name +'</h6>';
                    $('#common_txt').html(html_common)

                    if(snap3.val().f == key) {
                        console.log("snap3 == older")
                        console.log(snap3.val().f)
                        console.log(key)

                        usersRef.child(snap3.val().f).once("value").then(snap4 => {
                            html_common +='<h6>'+ snap4.val().displayName +' is the father of '+ snap3.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)

                            if(snap4.val().f != key) {
                                console.log("snap4 != older")
                                console.log(snap4.val().f)
                                console.log(key)

                                usersRef.child(snap4.val().f).once("value").then(snap5 => {
                                    html_common +='<h6>'+ snap5.val().displayName +' is the father of '+ snap4.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                })
                            } else if(snap4.val().m != key) {
                                usersRef.child(snap4.val().m).once("value").then(snap5 => {
                                    html_common +='<h6>'+ snap5.val().displayName +' is the mother of '+ snap4.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                })
                            }
                        })
                    } else if(snap3.val().m == key) {
                        usersRef.child(snap3.val().m).once("value").then(snap4 => {
                            html_common +='<h6>'+ snap4.val().displayName +' is the mother of '+ snap3.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
    
                            if(snap4.val().f != key) {
                                usersRef.child(snap4.val().f).once("value").then(snap5 => {
                                    html_common +='<h6>'+ snap5.val().displayName +' is the father of '+ snap4.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                })
                            } else if(snap4.val().m != key) {
                                usersRef.child(snap4.val().m).once("value").then(snap5 => {
                                    html_common +='<h6>'+ snap5.val().displayName +' is the mother of '+ snap4.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                })
                            }
                        })
                    }
                })
            } else if(snap2.val() == mother) {
                console.log("true")
                
                usersRef.child(snap2.val()).once("value").then(snap3 => {
                    console.log("snap2", snap2.val())
                    html_common +='<h6>'+ snap3.val().displayName +' is the mother of '+ name +'</h6>';
                    $('#common_txt').html(html_common)

                    if(snap3.val().f != key) {
                        usersRef.child(snap3.val().f).once("value").then(snap4 => {
                            html_common +='<h6>'+ snap4.val().displayName +' is the father of '+ snap3.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)

                            if(snap4.val().f != key) {
                                usersRef.child(snap4.val().f).once("value").then(snap5 => {
                                    html_common +='<h6>'+ snap5.val().displayName +' is the father of '+ snap4.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                })
                            } else if(snap4.val().m != key) {
                                usersRef.child(snap4.val().m).once("value").then(snap5 => {
                                    html_common +='<h6>'+ snap5.val().displayName +' is the mother of '+ snap4.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                })
                            }
                        })
                    } else if(snap3.val().m != key) {
                        usersRef.child(snap3.val().m).once("value").then(snap4 => {
                            html_common +='<h6>'+ snap4.val().displayName +' is the mother of '+ snap3.val().displayName +'</h6>';
                            $('#common_txt').html(html_common)
    
                            if(snap4.val().f != key) {
                                usersRef.child(snap4.val().f).once("value").then(snap5 => {
                                    html_common +='<h6>'+ snap5.val().displayName +' is the father of '+ snap4.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                })
                            } else if(snap4.val().m != key) {
                                usersRef.child(snap4.val().m).once("value").then(snap5 => {
                                    html_common +='<h6>'+ snap5.val().displayName +' is the mother of '+ snap4.val().displayName +'</h6>';
                                    $('#common_txt').html(html_common)
                                })
                            }
                        })
                    }
                })
            } else {
                console.log("false")
                familychecker(snap2.val(), key2)
            }
        })
    })
}