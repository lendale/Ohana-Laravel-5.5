/* ========================
    Variables
    ======================== */

    const FIREBASE_DATABASE = firebase.database();
    const FIREBASE_STORAGE = firebase.storage();
    const rootRef = firebase.database().ref();
    const usersRef = rootRef.child('users');
    const userFamilyRef = rootRef.child('user_family');
    const extFamilyRef = rootRef.child('extended_family');
    const immFamilyRef = rootRef.child('immediate_family');

    var memberImmId = firebase.database().ref().child('imm-id').push().getKey();
    var memberExtId = firebase.database().ref().child('ext-id').push().getKey();

    var clanData = [];
    var extendedData = [];
    var userClanId;
    var currentUser;
    var currentUserDetails;
    var currentUserGender;
    var currentUserExtendedId;
    var currentUserFamilyId;
    
    /* ========================
        Event Listeners
        ======================== */
    
    firebase.auth().onAuthStateChanged(handleAuthStateChanged);
    
    function handleAuthStateChanged(user) {
        if (user) {
            currentUser = user;
            retrieveUserTree(user.uid);
            tester(user.uid)
            // searchSibling()
            // searchSpouse()
        }
    }

    function tester(uid) {
        usersRef.child(uid).once("value").then(snap => {
            console.log("data", snap.val().familyId)
        })
    }
    
    /* ========================
          Functions
        ======================== */
    
    function retrieveUserTree(uid) {
        usersRef.child(uid).once("value").then(snap => {
            let obj = snap.val();
            currentUserDetails = snap.val();
            currentUserGender = snap.val().gender;
            currentUserExtendedId = snap.val().extendedId;
            currentUserFamilyId = snap.val().familyId;
            spouseGenderSetter();
            document.getElementById("add_sibling").disabled = true;
            document.getElementById("add_sibling2").disabled = true;
            document.getElementById("add_child").disabled = true;
            document.getElementById("add_child2").disabled = true;
    
            if((obj.m != undefined || obj.m != null) &&
                (obj.f != undefined || obj.f!= null)) {
                document.getElementById("add_parent").disabled = true;
                document.getElementById("add_parent2").disabled = true;
                document.getElementById("add_sibling").disabled = false;
                document.getElementById("add_sibling2").disabled = false;
                retrieveFamilyData(obj.f);
                retrieveFamilyData(obj.m);
                usersRef.child(obj.f).child("relationship").set("father");
                usersRef.child(obj.m).child("relationship").set("mother");
            } else if((obj.f != undefined || obj.f != null) &&
                (obj.m == undefined || obj.m == null)) {
                parentGenderSetter("female");
                retrieveFamilyData(obj.f);
                usersRef.child(obj.f).child("relationship").set("father");
            } else if((obj.m != undefined || obj.m != null) &&
                (obj.f == undefined || obj.f == null)) {
                parentGenderSetter("male");
                retrieveFamilyData(obj.m);
                usersRef.child(obj.m).child("relationship").set("mother");
            }
    
            if(obj.siblings != undefined || obj.siblings != null) {
                usersRef.child(uid).child('siblings').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        retrieveSiblingData(snap3.val());
                        usersRef.child(snap3.val()).once("value").then(snap4 => {
                            if(snap4.val().gender == "female") {
                                usersRef.child(snap3.val()).child("relationship").set("sister");
                            } else if(snap4.val().gender == "male") {
                                usersRef.child(snap3.val()).child("relationship").set("brother");
                            }
                        });
                    })
                })
            }
    
            if(obj.children != undefined || obj.children != null) {
                usersRef.child(uid).child('children').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        retrieveSiblingData(snap3.val());
                        usersRef.child(snap3.val()).once("value").then(snap4 => {
                            if(snap4.val().gender == "female") {
                                usersRef.child(snap3.val()).child("relationship").set("daughter");
                            } else if(snap4.val().gender == "male") {
                                usersRef.child(snap3.val()).child("relationship").set("son");
                            }
                        });
                    })
                })
            }
    
            if(obj.vir != undefined || obj.vir != null) {
                usersRef.child(uid).child('vir').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        retrieveSpouseData(snap3.val());
                        usersRef.child(snap3.val()).child("relationship").set("husband");
                    })
                })
    
                document.getElementById("add_spouse").disabled = true;
                document.getElementById("add_spouse2").disabled = true;
                document.getElementById("add_child").disabled = false;
                document.getElementById("add_child2").disabled = false;
            }
    
            if(obj.ux != undefined || obj.ux != null) {
                usersRef.child(uid).child('ux').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        retrieveSpouseData(snap3.val());
                        usersRef.child(snap3.val()).child("relationship").set("wife");
                    })
                })
    
                document.getElementById("add_spouse").disabled = true;
                document.getElementById("add_spouse2").disabled = true;
                document.getElementById("add_child").disabled = false;
                document.getElementById("add_child2").disabled = false;
            }
    
            if (!(obj.ms === undefined || obj.ms === null)) {
                let arrMs = Object.values(obj.ms);
    
                obj.ms = arrMs;
            }
    
            clanData.push(obj);
    
            return clanData;
        })
        .then(clanData => {
            console.log('clanData', clanData)
            var genoDiv = document.getElementById("genogram");
            var genoDiv2 = go.Diagram.fromDiv(genoDiv);
    
            if(genoDiv2) {
                genoDiv2.div = null;
            }
    
            initGenogram(clanData, currentUser.uid);
        })
        .then(() => {
            getAvailableParents(currentUser.uid);
        })
        .then(() => {
            getAvailableParentsNew(currentUser.uid);
        })
        .then(() => {
            getAvailableParentsUpdate(currentUser.uid);
        })
    }

    function retrieveFamilyData(uid) {
        usersRef.child(uid).once("value").then(snap => {
            let obj = snap.val();
    
            if((obj.m != undefined || obj.m != null) &&
                (obj.f != undefined || obj.f!= null)) {
                usersRef.child(obj.f).child("relationship").set("consanguinity");
                usersRef.child(obj.m).child("relationship").set("consanguinity");
                retrieveFamilyData(obj.m);
                retrieveFamilyData(obj.f);
            } else if((obj.f != undefined || obj.f != null) &&
                (obj.m == undefined || obj.m == null)) {
                usersRef.child(obj.f).child("relationship").set("consanguinity");
                retrieveFamilyData(obj.f);
            } else if((obj.m != undefined || obj.m != null) &&
                (obj.f == undefined || obj.f == null)) {
                usersRef.child(obj.m).child("relationship").set("consanguinity");
                retrieveFamilyData(obj.m);
            }
    
            if(obj.siblings != undefined || obj.siblings != null) {
                usersRef.child(uid).child('siblings').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        usersRef.child(snap3.val()).child("relationship").set("consanguinity");
                        retrieveSiblingData(snap3.val());
                    })
                })
            }
    
            if (!(obj.ux === undefined || obj.ux === null)) {
                let arrUx = Object.values(obj.ux);
    
                obj.ux = arrUx;

                usersRef.child(uid).child('ux').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(currentUserDetails.m == snap3.val()) {
                            usersRef.child(snap3.val()).child("relationship").set("mother");
                        } else {
                            usersRef.child(snap3.val()).child("relationship").set("affinity");
                        }
                    })
                })
            }
    
            if (!(obj.vir === undefined || obj.vir === null)) {
                let arrVir = Object.values(obj.vir);
    
                obj.vir = arrVir;

                usersRef.child(uid).child('vir').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        if(currentUserDetails.f == snap3.val()) {
                            usersRef.child(snap3.val()).child("relationship").set("father");
                        } else {
                            usersRef.child(snap3.val()).child("relationship").set("affinity");
                        }
                    })
                })
            }
    
            if (!(obj.ms === undefined || obj.ms === null)) {
                let arrMs = Object.values(obj.ms);
    
                obj.ms = arrMs;
            }
    
            clanData.push(obj);
    
            return clanData;
        })
        .then(clanData => {
            var genoDiv = document.getElementById("genogram");
            var projectDiagram = go.Diagram.fromDiv(genoDiv);
            if(projectDiagram){
                  projectDiagram.div = null;
             }
            initGenogram(clanData, currentUser.uid);
        })
    }

    function retrieveSiblingData(uid) {
        usersRef.child(uid).once("value").then(snap => {
            let obj = snap.val()
    
            if(obj.children != undefined || obj.children != null) {
                usersRef.child(uid).child('children').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        usersRef.child(snap3.val()).child("relationship").set("consanguinity");
                        retrieveSiblingData(snap3.val());
                    })
                })
            }
    
            if(obj.vir != undefined || obj.vir != null) {
                usersRef.child(uid).child('vir').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        usersRef.child(snap3.val()).child("relationship").set("affinity");
                        retrieveSpouseData(snap3.val());
                    })
                })
            }
    
            if(obj.ux != undefined || obj.ux != null) {
                usersRef.child(uid).child('ux').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        usersRef.child(snap3.val()).child("relationship").set("affinity");
                        retrieveSpouseData(snap3.val());
                    })
                })
            }
    
            if (!(obj.ms === undefined || obj.ms === null)) {
                let arrMs = Object.values(obj.ms);
    
                obj.ms = arrMs;
            }
    
            clanData.push(obj);
    
            return clanData;
        })
        .then(clanData => {
            var genoDiv = document.getElementById("genogram");
            var projectDiagram = go.Diagram.fromDiv(genoDiv);
            if(projectDiagram){
                  projectDiagram.div = null;
             }
            initGenogram(clanData, currentUser.uid);
        })
    }

    function retrieveSpouseData(uid) {
        usersRef.child(uid).once("value").then(snap => {
            let obj = snap.val();
    
            if((obj.m != undefined || obj.m != null) &&
                (obj.f != undefined || obj.f!= null)) {
                usersRef.child(obj.f).child("relationship").set("affinity");
                usersRef.child(obj.m).child("relationship").set("affinity");
                retrieveSpouseData(obj.m);
                retrieveSpouseData(obj.f);
            } else if((obj.f != undefined || obj.f != null) &&
                (obj.m == undefined || obj.m == null)) {
                usersRef.child(obj.f).child("relationship").set("affinity");
                retrieveSpouseData(obj.f);
            } else if((obj.m != undefined || obj.m != null) &&
                (obj.f == undefined || obj.f == null)) {
                usersRef.child(obj.m).child("relationship").set("affinity");
                retrieveSpouseData(obj.m);
            }
    
            if(obj.siblings != undefined || obj.siblings != null) {
                usersRef.child(uid).child('siblings').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        usersRef.child(snap3.val()).child("relationship").set("affinity");
                        retrieveSiblingData(snap3.val());
                    })
                })
            }
    
            if (!(obj.ux === undefined || obj.ux === null)) {
                let arrUx = Object.values(obj.ux);
    
                obj.ux = arrUx;

                usersRef.child(uid).child('vir').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        usersRef.child(snap3.val()).child("relationship").set("affinity");
                    })
                })
            }
    
            if (!(obj.vir === undefined || obj.vir === null)) {
                let arrVir = Object.values(obj.vir);
    
                obj.vir = arrVir;

                usersRef.child(uid).child('vir').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        usersRef.child(snap3.val()).child("relationship").set("affinity");
                    })
                })
            }
    
            if (!(obj.ms === undefined || obj.ms === null)) {
                let arrMs = Object.values(obj.ms);
    
                obj.ms = arrMs;
            }
    
            clanData.push(obj);
    
            return clanData;
        })
        .then(clanData => {
            var genoDiv = document.getElementById("genogram");
            var projectDiagram = go.Diagram.fromDiv(genoDiv);
            if(projectDiagram){
                  projectDiagram.div = null;
             }
            initGenogram(clanData, currentUser.uid);
        })
    }
    
    function spouseGenderSetter() {
        if (currentUserGender === "female") {
            $('#existing_spouse_gender')
                .val("male").change();
            $('#spouse_gender')
                .val("male").change();
            
            document.getElementById("spouse_gender").options[2].disabled = true;
        } else {
            $('#existing_spouse_gender')
                .val("female").change();
            $('#spouse_gender')
                .val("female").change();
            
            document.getElementById("spouse_gender").options[1].disabled = true;
        }
    }
    
    function parentGenderSetter(gender) {
        $('#existing_parent_gender')
            .val(gender).change();
        $('#parent_gender')
            .val(gender).change();
        
        if(gender == "male") document.getElementById("parent_gender").options[2].disabled = true;
        else if(gender == "female") document.getElementById("parent_gender").options[1].disabled = true;
    }
    