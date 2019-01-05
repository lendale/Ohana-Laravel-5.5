function getNodeData(key) {
    usersRef
        .child(key)
        .once("value")
        .then(snapshot => {
            if(snapshot.exists()) {
                showNodeData(snapshot.val())
            }
            else potentialUsersTable(key);
        });
}

function potentialUsersTable(key) {
    userPotentialRef
        .child(key)
        .once("value")
        .then(snapshot => {
            if(snapshot.exists()) {
                showNodeData(snapshot.val())
            }
        });
}

function showNodeData(data) {
    $("#modal_show_details")
        .modal('show');

    $("#node_name")
        .empty()
        .append(data.displayName);
    $('#node_birth_date')
        .empty()
        .append(data.birthDate);
    $('#node_living_status')
        .empty()
        .append(data.livingStatus);

    if (data.uid === null || data.uid === undefined) {
        $("#node_key")
            .empty()
            .append(data.tempKeyInClan);
    } else {
        $("#node_key")
            .empty()
            .append(data.uid);
    }

    if (!(data.email === null || data.email === undefined)) {
        $("#node_email")
            .empty()
            .append(data.email);
    } else {
        $("#node_email")
            .empty()
            .append('Not available');
    }

    if (!(data.photoURL === null || data.photoURL === undefined)) {
        $("#node_img")
            .attr("src", data.photoURL);
    } else {
        $("#node_img")
            .attr("src", "assets/img/default-avatar.png");
    }

    $('#node_edit').click(function() {
        updateUsersModal(data);
    })

    // if(data.tempKeyInClan === null || data.tempKeyInClan === undefined) {
    //     $('#node_edit').click(function() {
    //         updateUsersModal(data);
    //     })
    // }
    // else if(data.relationship === "father" || data.relationship === "mother") {
    //     $('#node_edit').click(function() {
    //         updateParentsModal(data);
    //     })
    // }
}
