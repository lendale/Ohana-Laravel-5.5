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