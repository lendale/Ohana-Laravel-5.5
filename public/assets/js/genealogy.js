/* ========================
      Variables

      console.log()
    ======================== */

const FIREBASE_DATABASE = firebase.database();
const FIREBASE_STORAGE = firebase.storage();
const rootRef = firebase.database().ref();
const usersRef = rootRef.child('users');
const userFamilyRef = rootRef.child('user_family');
const userTreeRef = rootRef.child('user_tree_go');
const userPotentialRef = rootRef.child('potential_users');
const userExtendedRef = rootRef.child('user_extended');

var treeData = [];
var userClanId;
var userFamilyId;
var userExtendedId;
var currentUser;
var currentUserGender;
var potentialuser;

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
            userClanId = result.val().clanId;
            userFamilyId = result.val().familyId;
            userExtendedId = result.val().extendedId;
            return userClanId;
        })
        .then(userClanId => {
            getTreeData(uid, userClanId);
        });
}

function getTreeData(uid, clanId) {
    userTreeRef
        .child(clanId)
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

                treeData.push(obj);
            });

            return treeData;
        })
        .then(treeData => {
            initGenogram(treeData, uid);
        })
        .then(() => {
            getAvailableParents(uid, clanId);
        })
        .then(() => {
            getAvailableParentsNew(uid, clanId);
        })
        .then(() => {
            extendedFamily(treeData, uid, clanId, userExtendedId);
        });
}

function getAvailableParents(uid, clanId) {
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

    userTreeRef.child(clanId).child(uid).child('vir').once('value').then(snap => {
        if (!(snap.val() === undefined || snap.val() === null)) {
            fatherKeys = Object.keys(snap.val());
            fatherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                userTreeRef.child(clanId).child(childSnap.val()).once('value').then(snap2 => {
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

    userTreeRef.child(clanId).child(uid).child('ux').once('value').then(snap => {
        if (!(snap.val() === undefined || snap.val() === null)) {
            motherKeys = Object.keys(snap.val());
            motherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                userTreeRef.child(clanId).child(childSnap.val()).once('value').then(snap2 => {
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

function getAvailableParentsNew(uid, clanId) {
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

    userTreeRef.child(clanId).child(uid).child('vir').once('value').then(snap => {
        if (!(snap.val() === undefined || snap.val() === null)) {
            fatherKeys = Object.keys(snap.val());
            fatherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                userTreeRef.child(clanId).child(childSnap.val()).once('value').then(snap2 => {
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

    userTreeRef.child(clanId).child(uid).child('ux').once('value').then(snap => {
        if (!(snap.val() === undefined || snap.val() === null)) {
            motherKeys = Object.keys(snap.val());
            motherNames = Object.values(snap.val());

            snap.forEach(childSnap => {
                userTreeRef.child(clanId).child(childSnap.val()).once('value').then(snap2 => {
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
        timer: 10000,
        showConfirmButton: false,
        type: "success"
    })
}

function extendedFamily(treeData, uid, clanId, extendedId) {
    userTreeRef.child(clanId).child(uid).once('value').then(snap => {
        if(snap.val().f) {
            userTreeRef.child(clanId).child(snap.val().f).once('value').then(snap2 => {
                if(snap2.val().m) {
                    searchUser(snap2.val().m, uid, extendedId);
                    searchChildren(clanId, extendedId, uid, snap.val().f, snap2.val().m)
                }

                if(snap2.val().f) {
                    searchUser(snap2.val().f, uid, extendedId);
                    searchChildren(clanId, extendedId, uid, snap.val().f, snap2.val().f)
                }
            });
        }

        if(snap.val().m) {
            userTreeRef.child(clanId).child(snap.val().m).once('value').then(snap2 => {
                if(snap2.val().m) {
                    searchUser(snap2.val().m, uid, extendedId);
                    searchChildren(clanId, extendedId, uid, snap.val().m, snap2.val().m)
                }

                if(snap2.val().f) {
                    searchUser(snap2.val().f, uid, extendedId);
                    searchChildren(clanId, extendedId, uid, snap.val().m, snap2.val().f)
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
            else searchPotential(key, uid, extendedId);
        });
}

function searchPotential(key, uid, extendedId) {
    userPotentialRef.child(key).once("value")
        .then(snap => {
                userExtendedRef.child(extendedId).child(uid).child(key).set(snap.val());
        });
}

function searchChildren(clanId, extendedId, uid, childKey, parentKey) {
    userTreeRef.child(clanId).child(parentKey).child('children').once('value').then(snap => {
        snap.forEach(snap2 => {
            userTreeRef.child(clanId).child(snap2.val()).once('value').then(snap3 => {
                if(snap3.val().key != childKey) {
                    searchUser(snap3.val().key, uid, extendedId)

                    userTreeRef.child(clanId).child(snap3.val().key).child('children').once('value').then(snap4 => {
                        snap4.forEach(snap5 => {
                            userTreeRef.child(clanId).child(snap5.val()).once('value').then(snap6 => {
                                searchUser(snap6.val().key, uid, extendedId)
                            })
                        })
                    })
                }
            })
        })
    })
}