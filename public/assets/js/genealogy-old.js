/* ========================
      Variables
    ======================== */

const FIREBASE_DATABASE = firebase.database();
const FIREBASE_STORAGE = firebase.storage();
const rootRef = firebase.database().ref();
const usersRef = rootRef.child('users');
const userFamilyRef = rootRef.child('user_family');

var clanData = [];
var extendedData = [];
var userClanId;
var currentUser;
var currentUserGender;

/* ========================
      Event Listeners
    ======================== */

firebase.auth().onAuthStateChanged(handleAuthStateChanged);

function handleAuthStateChanged(user) {
    if (user) {
        currentUser = user
        retrieveUserData(user.uid);
    } else {}
}

/* ========================
      Functions
    ======================== */

function retrieveUserData(uid) {
    usersRef.child(uid).once("value").then(snap => {
        let obj = snap.val();
        currentUserGender = snap.val().gender;
        spouseGenderDisabler();

        document.getElementById("add_sibling").disabled = true;
        document.getElementById("add_sibling2").disabled = true;

        if((obj.m != undefined || obj.m != null) &&
            (obj.f != undefined || obj.f!= null)) {
            document.getElementById("add_parent").disabled = true;
            document.getElementById("add_sibling").disabled = false;
            document.getElementById("add_parent2").disabled = true;
            document.getElementById("add_sibling2").disabled = false;
            retrieveFamilyData(obj.f);
            retrieveFamilyData(obj.m);
        } else if((obj.f != undefined || obj.f != null) &&
            (obj.m == undefined || obj.m == null)) {
            document.getElementById("add_sibling").disabled = false;
            document.getElementById("add_sibling2").disabled = false;
            retrieveFamilyData(obj.f);
        } else if((obj.m != undefined || obj.m != null) &&
            (obj.f == undefined || obj.f == null)) {
            document.getElementById("add_sibling").disabled = false;
            document.getElementById("add_sibling2").disabled = false;
            retrieveFamilyData(obj.m);
        }

        if(obj.siblings != undefined || obj.siblings != null) {
            usersRef.child(uid).child('siblings').once("value").then(snap2 => {
                snap2.forEach(snap3 => {
                    retrieveSiblingData(snap3.val());
                })
            })
        }

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

            document.getElementById("add_spouse").disabled = true;
            document.getElementById("add_spouse2").disabled = true;
        }

        if(obj.ux != undefined || obj.ux != null) {
            usersRef.child(uid).child('ux').once("value").then(snap2 => {
                snap2.forEach(snap3 => {
                    retrieveFamilyData(snap3.val());
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
        extendedFamily();
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

function retrieveSiblingData(uid) {
    usersRef.child(uid).once("value").then(snap => {
        let obj = snap.val()

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

function spouseGenderDisabler() {
    if (currentUserGender === "female") {
        $('#existing_spouse_gender')
            .val("male").change();
        $('#spouse_gender')
            .val("male").change();
    } else {
        $('#existing_spouse_gender')
            .val("female").change();
        $('#spouse_gender')
            .val("female").change();
    }
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
        timer: 12000,
        showConfirmButton: false,
        type: "success"
    })
}

function extendedFamily() {
    console.log('sud')

    console.log('uid', currentUser.uid)
    usersRef.child(currentUser.uid).once('value').then(snap => {
        if(snap.val().f) {
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
        console.log('extended', extendedData)
    });
}

function searchUser(key) {
    usersRef.child(key).once("value")
        .then(snap => {
            if(snap.exists()) {
                extendedData.push(snap.val().key)
            }
        });
}

function searchChildren(uid, childKey, parentKey) {
    usersRef.child(parentKey).child('children').once('value').then(snap => {
        snap.forEach(snap2 => {
            usersRef.child(snap2.val()).once('value').then(snap3 => {
                if(snap3.val().key != childKey) {
                    searchUser(snap3.val().key)
                    searchChildren2(uid, snap3.val().key)
                }
            })
        })
    })
}

function searchChildren2(uid, parentKey) {
    usersRef.child(parentKey).child('children').once('value').then(snap => {
        snap.forEach(snap2 => {
            usersRef.child(snap2.val()).once('value').then(snap3 => {
                searchUser(snap3.val().key)
            })
        })
    })
}

function showPhotoError(){
    swal({
        title: "Photo size too large!",
        text: "Please choose another photo",
        timer: 7000,
        showConfirmButton: false,
        type: "error"
    })
}

function showPhotoLoading(){
    swal({
        imageUrl: "assets/img/icons/loader.gif",
        imageWidth: '90',
        imageHeight: '90',
        timer: 9000,
        showConfirmButton: false
    })
}