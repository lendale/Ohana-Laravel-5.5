/* ========================
      Variables

      console.log()
    ======================== */

const FIREBASE_DATABASE = firebase.database();
const FIREBASE_STORAGE = firebase.storage();
const rootRef = firebase.database().ref();
const usersRef = rootRef.child('users');
const userFamilyRef = rootRef.child('user_family');
const userImmediateRef = rootRef.child('user_immediate_family');
const userExtendedRef = rootRef.child('user_extended');

var familyData = [];
var userFamilyId;
var userExtendedId;
var currentUser;
var currentUserGender;

/* ========================
      Event Listeners
    ======================== */

firebase.auth().onAuthStateChanged(handleAuthStateChanged);

function handleAuthStateChanged(user) {
    if (user) {
        currentUser = user
        getUserData(user.uid);
    } else {}
}

/* ========================
      Functions
    ======================== */

function getUserData(uid) {
    usersRef
        .child(uid)
        .once("value")
        .then(result => {
            currentUserGender = result.val().gender;
            userFamilyId = result.val().familyId;
            userExtendedId = result.val().extendedId;
            return userFamilyId;
        })
        .then(userFamilyId => {
            getFamilyData(uid, userFamilyId);
        });
}

function getFamilyData(uid, familyId) {
    userImmediateRef
        .child(familyId)
        .once("value")
        .then(snapshot => {
            snapshot.forEach(childSnapshot => {
                let obj = childSnapshot.val();
                let virs = [];
                let uxs = [];

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

                familyData.push(obj);
            });

            return familyData;
        })
        .then(familyData => {
            initGenogram(familyData, uid);
        })
        .then(() => {
            getAvailableParents(uid, familyId);
        })
        .then(() => {
            getAvailableParentsNew(uid, familyId);
        })
        .then(() => {
            extendedFamily(familyData, uid, familyId, userExtendedId);
        });
}

function getAvailableParents(uid, familyId) {
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

    userImmediateRef.child(familyId).child(uid).child('vir').once('value').then(snap => {
        if (!(snap.val() === undefined || snap.val() === null)) {
            fatherKeys = Object.keys(snap.val());
            fatherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                userImmediateRef.child(familyId).child(childSnap.val()).once('value').then(snap2 => {
                    let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" name="availableParents2" value="${snap2.val().key}">
                                    ${currentUser.displayName} and ${snap2.val().n}
                                </label>
                            </div>
                        `);
                    div.appendTo("#parents_container2");
                });
            });
        }
    })

    userImmediateRef.child(familyId).child(uid).child('ux').once('value').then(snap => {
        if (!(snap.val() === undefined || snap.val() === null)) {
            motherKeys = Object.keys(snap.val());
            motherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                userImmediateRef.child(familyId).child(childSnap.val()).once('value').then(snap2 => {
                    let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" name="availableParents2" value="${snap2.val().key}">
                                    ${currentUser.displayName} and ${snap2.val().n}
                                </label>
                            </div>
                        `);
                    div.appendTo("#parents_container2");
                });
            });
        }
    })
}

function getAvailableParentsNew(uid, familyId) {
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

    userImmediateRef.child(familyId).child(uid).child('vir').once('value').then(snap => {
        if (!(snap.val() === undefined || snap.val() === null)) {
            fatherKeys = Object.keys(snap.val());
            fatherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                userImmediateRef.child(familyId).child(childSnap.val()).once('value').then(snap2 => {
                    let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" name="availableParents" value="${snap2.val().key}">
                                    ${currentUser.displayName} and ${snap2.val().n}
                                </label>
                            </div>
                        `);
                    div.appendTo("#parents_container");
                });
            });
        }
    })

    userImmediateRef.child(familyId).child(uid).child('ux').once('value').then(snap => {
        if (!(snap.val() === undefined || snap.val() === null)) {
            motherKeys = Object.keys(snap.val());
            motherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                userImmediateRef.child(familyId).child(childSnap.val()).once('value').then(snap2 => {
                    let div = $(`
                            <div class="radio">
                                <label>
                                    <input type="radio" name="availableParents" value="${snap2.val().key}">
                                    ${currentUser.displayName} and ${snap2.val().n}
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
        imageUrl: "assets/img/grow-tree.gif",
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

function extendedFamily(familyData, uid, familyId, extendedId) {
    userImmediateRef.child(familyId).child(uid).once('value').then(snap => {
        if(snap.val().f) {
            userImmediateRef.child(familyId).child(snap.val().f).once('value').then(snap2 => {
                if(snap2.val().m) {
                    searchUser(snap2.val().m, uid, extendedId);
                    searchChildren(familyId, extendedId, uid, snap.val().f, snap2.val().m)
                }

                if(snap2.val().f) {
                    searchUser(snap2.val().f, uid, extendedId);
                    searchChildren(familyId, extendedId, uid, snap.val().f, snap2.val().f)
                }
            });
        }

        if(snap.val().m) {
            userImmediateRef.child(familyId).child(snap.val().m).once('value').then(snap2 => {
                if(snap2.val().m) {
                    searchUser(snap2.val().m, uid, extendedId);
                    searchChildren(familyId, extendedId, uid, snap.val().m, snap2.val().m)
                }

                if(snap2.val().f) {
                    searchUser(snap2.val().f, uid, extendedId);
                    searchChildren(familyId, extendedId, uid, snap.val().m, snap2.val().f)
                }
            });
        }
    });
}

function searchUser(key, uid, extendedId) {
    usersRef.child(key).once("value")
        .then(snap => {
            if(snap.exists()) {
                userExtendedRef.child(extendedId).child(uid).child(key).set(snap.val());
            }
        });
}

function searchChildren(familyId, extendedId, uid, childKey, parentKey) {
    userImmediateRef.child(familyId).child(parentKey).child('children').once('value').then(snap => {
        snap.forEach(snap2 => {
            userImmediateRef.child(familyId).child(snap2.val()).once('value').then(snap3 => {
                if(snap3.val().key != childKey) {
                    searchUser(snap3.val().key, uid, extendedId)

                    userImmediateRef.child(familyId).child(snap3.val().key).child('children').once('value').then(snap4 => {
                        snap4.forEach(snap5 => {
                            userImmediateRef.child(familyId).child(snap5.val()).once('value').then(snap6 => {
                                searchUser(snap6.val().key, uid, extendedId)
                            })
                        })
                    })
                }
            })
        })
    })
}