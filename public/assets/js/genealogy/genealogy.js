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
    
    var clanData = [];
    var extendedData = [];
    var userClanId;
    var currentUser;
    var currentUserGender;
    var currentUserExtendedId;
    var currentUserFamilyId;
    var currentUserFather;
    var currentUserMother;
    
    /* ========================
          Event Listeners
        ======================== */
    
    firebase.auth().onAuthStateChanged(handleAuthStateChanged);
    
    function handleAuthStateChanged(user) {
        if (user) {
            currentUser = user;
            retrieveUserTree(user.uid);
            tester(user.uid)
            searchSibling()
            searchSpouse()
        } else {}
    }

    function tester(uid) {
        console.log(currentUser.displayName)
        
    }
    
    /* ========================
          Functions
        ======================== */
    
    function retrieveUserTree(uid) {
        usersRef.child(uid).once("value").then(snap => {
            let obj = snap.val();
            currentUserGender = snap.val().gender;
            currentUserExtendedId = snap.val().extendedId;
            currentUserFamilyId = snap.val().familyId;
            currentUserFather = snap.val().f;
            currentUserMother = snap.val().m;
            spouseGenderSetter();
            document.getElementById("add_sibling").disabled = true;
            document.getElementById("add_sibling2").disabled = true;
    
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
                retrieveSingleParentData(obj.f);
                usersRef.child(obj.f).child("relationship").set("father");
            } else if((obj.m != undefined || obj.m != null) &&
                (obj.f == undefined || obj.f == null)) {
                parentGenderSetter("male");
                retrieveSingleParentData(obj.m);
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
                        retrieveFamilyData(snap3.val());
                        usersRef.child(snap3.val()).child("relationship").set("husband");
                    })
                })
    
                document.getElementById("add_spouse").disabled = true;
                document.getElementById("add_spouse2").disabled = true;
            }
    
            if(obj.ux != undefined || obj.ux != null) {
                usersRef.child(uid).child('ux').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        retrieveFamilyData(snap3.val());
                        usersRef.child(snap3.val()).child("relationship").set("wife");
                    })
                })
    
                document.getElementById("add_spouse").disabled = true;
                document.getElementById("add_spouse2").disabled = true;
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
        .then(() => {
            extendedFamily(currentUser.uid);
        })
    }

    function retrieveFamilyData(uid) {
        usersRef.child(uid).once("value").then(snap => {
            let obj = snap.val();
    
            if((obj.m != undefined || obj.m != null) &&
                (obj.f != undefined || obj.f!= null)) {
                retrieveFamilyData(obj.m);
                retrieveFamilyData(obj.f);
            } else if((obj.f != undefined || obj.f != null) &&
                (obj.m == undefined || obj.m == null)) {
                retrieveFamilyData(obj.f);
            } else if((obj.m != undefined || obj.m != null) &&
                (obj.f == undefined || obj.f == null)) {
                retrieveFamilyData(obj.m);
            }
    
            if(obj.siblings != undefined || obj.siblings != null) {
                usersRef.child(uid).child('siblings').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        retrieveSiblingData(snap3.val());
                    })
                })
            }
    
            if (!(obj.ux === undefined || obj.ux === null)) {
                let arrUx = Object.values(obj.ux);
    
                obj.ux = arrUx;
            }
    
            if (!(obj.vir === undefined || obj.vir === null)) {
                let arrVir = Object.values(obj.vir);
    
                obj.vir = arrVir;
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
    
    function retrieveSingleParentData(uid) {
        usersRef.child(uid).once("value").then(snap => {
            let obj = snap.val();
    
            if((obj.m != undefined || obj.m != null) &&
                (obj.f != undefined || obj.f!= null)) {
                retrieveFamilyData(obj.m);
                retrieveFamilyData(obj.f);
            } else if((obj.f != undefined || obj.f != null) &&
                (obj.m == undefined || obj.m == null)) {
                retrieveFamilyData(obj.f);
            } else if((obj.m != undefined || obj.m != null) &&
                (obj.f == undefined || obj.f == null)) {
                retrieveFamilyData(obj.m);
            }
    
            if(obj.siblings != undefined || obj.siblings != null) {
                usersRef.child(uid).child('siblings').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        retrieveSiblingData(snap3.val());
                    })
                })
            }
    
            if(obj.ux != undefined || obj.ux != null) {
                usersRef.child(uid).child('ux').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        retrieveFamilyData(snap3.val());
                    })
                })
            }
    
            if(obj.vir != undefined || obj.vir != null) {
                usersRef.child(uid).child('vir').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        retrieveFamilyData(snap3.val());
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
                        retrieveSiblingData(snap3.val());
                    })
                })
            }
    
            if(obj.vir != undefined || obj.vir != null) {
                usersRef.child(uid).child('vir').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        retrieveFamilyData(snap3.val());
                    })
                })
            }
    
            if(obj.ux != undefined || obj.ux != null) {
                usersRef.child(uid).child('ux').once("value").then(snap2 => {
                    snap2.forEach(snap3 => {
                        retrieveFamilyData(snap3.val());
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
    
    function getAvailableParents(uid) {
        var motherKeys = [];
        var motherNames = [];
        var fatherKeys = [];
        var fatherNames = [];
    
        let single = $(`
            <git class="radio">
                <label>
                    <input type="radio" name="availableParents2" value="${currentUser.uid}">
                    ${currentUser.displayName}
                </label>
            </div>
        `);
        single.appendTo("#parents_container2");
    
        usersRef.child(uid).child('vir').once('value').then(snap => {
            if (!(snap.val() === undefined || snap.val() === null)) {
                fatherKeys = Object.keys(snap.val());
                fatherNames = Object.values(snap.val());
    
                snap.forEach(childSnap => {
                    usersRef.child(childSnap.val()).once('value').then(snap2 => {
                        let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" name="availableParents2" value="${snap2.val().key}">
                                    ${currentUser.displayName} and ${snap2.val().displayName}
                                </label>
                            </div>
                        `);
                        div.appendTo("#parents_container2");
                    });
                });
            }
        })
    
        usersRef.child(uid).child('ux').once('value').then(snap => {
            if (!(snap.val() === undefined || snap.val() === null)) {
                motherKeys = Object.keys(snap.val());
                motherNames = Object.values(snap.val());
    
                snap.forEach(childSnap => {
                    usersRef.child(childSnap.val()).once('value').then(snap2 => {
                        let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" name="availableParents2" value="${snap2.val().key}">
                                    ${currentUser.displayName} and ${snap2.val().displayName}
                                </label>
                            </div>
                        `);
                        div.appendTo("#parents_container2");
                    });
                });
            }
        })
    }
    
    function getAvailableParentsNew(uid) {
        var motherKeys = [];
        var motherNames = [];
        var fatherKeys = [];
        var fatherNames = [];
    
        let single = $(`
            <git class="radio">
                <label>
                    <input type="radio" name="availableParents" value="${currentUser.uid}">
                    ${currentUser.displayName}
                </label>
            </div>
        `);
        single.appendTo("#parents_container");
    
        usersRef.child(uid).child('vir').once('value').then(snap => {
            if (!(snap.val() === undefined || snap.val() === null)) {
                fatherKeys = Object.keys(snap.val());
                fatherNames = Object.values(snap.val());
    
                snap.forEach(childSnap => {
                    usersRef.child(childSnap.val()).once('value').then(snap2 => {
                        let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" name="availableParents" value="${snap2.val().key}">
                                    ${currentUser.displayName} and ${snap2.val().displayName}
                                </label>
                            </div>
                        `);
                        div.appendTo("#parents_container");
                    });
                });
            }
        })
    
        usersRef.child(uid).child('ux').once('value').then(snap => {
            if (!(snap.val() === undefined || snap.val() === null)) {
                motherKeys = Object.keys(snap.val());
                motherNames = Object.values(snap.val());
    
                snap.forEach(childSnap => {
                    usersRef.child(childSnap.val()).once('value').then(snap2 => {
                        let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" name="availableParents" value="${snap2.val().key}">
                                    ${currentUser.displayName} and ${snap2.val().displayName}
                                </label>
                            </div>
                        `);
                        div.appendTo("#parents_container");
                    });
                });
            }
        })
    }

    function getAvailableParentsUpdate(uid) {
        var motherKeys = [];
        var motherNames = [];
        var fatherKeys = [];
        var fatherNames = [];
    
        let single = $(`
            <git class="radio">
                <label>
                    <input type="radio" id="${currentUser.uid}" name="availableParents3" value="${currentUser.uid}">
                    ${currentUser.displayName}
                </label>
            </div>
        `);
        single.appendTo("#parents_container3");
    
        usersRef.child(uid).child('vir').once('value').then(snap => {
            if (!(snap.val() === undefined || snap.val() === null)) {
                fatherKeys = Object.keys(snap.val());
                fatherNames = Object.values(snap.val());
    
                snap.forEach(childSnap => {
                    usersRef.child(childSnap.val()).once('value').then(snap2 => {
                        let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" id="${snap2.val().key}" name="availableParents3" value="${snap2.val().key}">
                                    ${currentUser.displayName} and ${snap2.val().displayName}
                                </label>
                            </div>
                        `);
                        div.appendTo("#parents_container3");
                    });
                });
            }
        })
    
        usersRef.child(uid).child('ux').once('value').then(snap => {
            if (!(snap.val() === undefined || snap.val() === null)) {
                motherKeys = Object.keys(snap.val());
                motherNames = Object.values(snap.val());
    
                snap.forEach(childSnap => {
                    usersRef.child(childSnap.val()).once('value').then(snap2 => {
                        let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" id="${snap2.val().key}" name="availableParents3" value="${snap2.val().key}">
                                    ${currentUser.displayName} and ${snap2.val().displayName}
                                </label>
                            </div>
                        `);
                        div.appendTo("#parents_container3");
                    });
                });
            }
        })
    }
    
    function extendedFamily(uid) {
        searchChildren2(uid)
        usersRef.child(currentUser.uid).once('value').then(snap => {
            searchImmediate(uid)
            searchUser(uid)
            if(snap.val().f) {
                searchUser(snap.val().f);
                searchImmediate(snap.val().f);
                usersRef.child(snap.val().f).once('value').then(snap2 => {
                    if(snap2.val().m) {
                        searchUser(snap2.val().m);
                        searchChildren(uid, snap.val().f, snap2.val().m)
                    }
    
                    if(snap2.val().f) {
                        searchUser(snap2.val().f);
                        searchChildren(uid, snap.val().f, snap2.val().f)
                    }
                });
            }
    
            if(snap.val().m) {
                searchUser(snap.val().m);
                searchImmediate(snap.val().m);
                usersRef.child(snap.val().m).once('value').then(snap2 => {
                    if(snap2.val().m) {
                        searchUser(snap2.val().m);
                        searchChildren(uid, snap.val().m, snap2.val().m)
                    }
    
                    if(snap2.val().f) {
                        searchUser(snap2.val().f);
                        searchChildren(uid, snap.val().m, snap2.val().f)
                    }
                });
            }
        });
    }

    function searchImmediate(key){
        usersRef.child(key).once("value")
           .then(snap => {
               if (snap.exists()) {
                   immFamilyRef.child(currentUserFamilyId).child(key).set(key);
               }
           });
    }

   function searchSpouse() {
    
        usersRef.child(currentUser.uid).child('ux').once('child_added').then(snap => {
            if (snap.val()) {
                searchUser(snap.val());
                searchImmediate(snap.val())
                console.log('Female Spouse:', snap.val())
            } else {
                console.log("User has no Female Spouse")
            }
        })
        usersRef.child(currentUser.uid).child('vir').once('child_added').then(snap => {
            if (snap.val()) {
                searchUser(snap.val());
                searchImmediate(snap.val())
                console.log('Male Spouse:', snap.val())
            } else {
                console.log("User has no Male Spouse")
            }
        })
    }
    
    function searchUser(key) {
        usersRef.child(key).once("value").then(snap => {
            if(snap.exists()) {
                extFamilyRef.child(currentUserExtendedId).child(key).set(key);
            }
        });
    }

    function searchSibling(){
        usersRef.child(currentUser.uid).child('siblings').once("value")
        .then(snap => {
            snap.forEach(snap2 => {
                console.log('siblings:',snap2.val())
                searchImmediate(snap2.val())
            })
        })
    }
    
    function searchChildren(childKey, parentKey) {
        usersRef.child(parentKey).child('children').once('value').then(snap => {
            snap.forEach(snap2 => {
                usersRef.child(snap2.val()).once('value').then(snap3 => {
                    if(snap3.val().key != childKey) {
                        searchUser(snap3.val().key)
    
                        usersRef.child(snap3.val().key).child('children').once('value').then(snap4 => {
                            snap4.forEach(snap5 => {
                                usersRef.child(snap5.val()).once('value').then(snap6 => {
                                    searchUser(snap6.val().key)
                                })
                            })
                        })
                    }
                })
            })
        })
        // usersRef.child(parentKey).child('children').once('value').then(snap => {
        //     snap.forEach(snap2 => {
        //         usersRef.child(snap2.val()).once('value').then(snap3 => {
        //             if (snap3.val().key != childKey) {
        //                 searchUser(snap3.val().key)
        //                 console.log('search Child .3:', snap3.val().key)
        //                 usersRef.child(snap3.val().key).child('children').once('value').then(snap4 => {
        //                     snap4.forEach(snap5 => {
        //                         usersRef.child(snap5.val()).once('value').then(snap6 => {
        //                             searchUser(snap6.val().key)
        //                             console.log('search Child .4:', snap6.val().key)
        //                         })
        //                     })
        //                 })
        //             }
        //         })
        //     })
        // })
    }

    function searchChildren2(parentKey) {
        usersRef.child(parentKey).child('children').once('value').then(snap => {
            snap.forEach(snap2 => {
                searchUser(snap2.val());
                searchImmediate(snap2.val())
                console.log('Search Child 2.1:',snap2.val())
                usersRef.child(snap2.val()).child('children').once('value').then(snap3 => {
                    snap3.forEach(snap4 => {
                        searchUser(snap4.val());
                    })
                })
            })
        })
    }

    function showLoading() {
        swal({
            // imageUrl: "assets/img/grow-tree.gif",
            title: "Loading Photo...",
            // text: "Please wait",
            timer: 7000,
            showConfirmButton: false
            // type: "success"
        })
    }
    
    function showSuccess() {
        swal({
            // imageUrl: "assets/img/grow-tree.gif",
            title: "Successfully Added",
            // text: "Please wait",
            timer: 7000,
            showConfirmButton: false,
            type: "success"
        })
    }

    function showUpdate() {
        swal({
            // imageUrl: "assets/img/grow-tree.gif",
            title: "Successfully Updated",
            // text: "Please wait",
            timer: 4000,
            showConfirmButton: false,
            type: "success"
        })
    }

    function showDeleteSuccess() {
        swal({
            // imageUrl: "assets/img/grow-tree.gif",
            title: "Successfully Deleted",
            // text: "Please wait",
            timer: 4000,
            showConfirmButton: false,
            type: "success"
        })
    }
    
    function showPhotoError() {
        swal({
            title: "Photo size too large!",
            text: "Please choose another photo",
            timer: 3000,
            showConfirmButton: false,
            type: "error"
        })
    }
    
    function showPhotoLoading() {
        swal({
            imageUrl: "assets/img/icons/loader.gif",
            imageWidth: '90',
            imageHeight: '90',
            timer: 9000,
            showConfirmButton: false
        })
    }
    
    // if (!(obj.ux === undefined || obj.ux === null)) {
    //     let arrUx = Object.values(obj.ux);
    
    //     obj.ux = arrUx;
    // }
    
    // if (!(obj.vir === undefined || obj.vir === null)) {
    //     let arrVir = Object.values(obj.vir);
    
    //     obj.vir = arrVir;
    // }
