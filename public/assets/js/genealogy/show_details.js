function getNodeData(key) {
    usersRef.child(key).once("value").then(snap => {
        if(snap.exists()) {
            showNodeData(snap.val())
        }
    });
}

function showNodeData(data) {
    console.log(data.key)

    if(data.registered == true) {
        if(data.key != currentUser.uid) {
            document.getElementById("node_delete").disabled = true;
            document.getElementById("node_edit").disabled = true;
        }
    } else {
        document.getElementById("node_delete").disabled = false;
        document.getElementById("node_edit").disabled = false;
    }

    if(currentUserDetails.siblings) {
        if(data.relationship == "father" || data.relationship == "mother") {
            document.getElementById("node_delete").disabled = true;
        }
    } 

    $("#modal_show_details")
        .modal('show');
    
    if (!(data.photoURL === null || data.photoURL === undefined)) {
        $("#node_img")
            .attr("src", data.photoURL);
    } else {
        $("#node_img")
            .attr("src", "assets/img/default-avatar.png");
    }

    $("#node_name")
        .empty()
        .append(data.displayName);
    
    $('#node_birth_date')
        .empty()
        .append(data.birthDate);
    
    $('#node_living_status')
        .empty()
        .append(data.livingStatus)
        .css('textTransform', 'capitalize');

    if (!(data.email === null || data.email === undefined)) {
        $("#node_email")
            .empty()
            .append(data.email);
    } else {
        $("#node_email")
            .empty()
            .append('Not available');
    }

    if(data.registered == true) {
        $('#node_edit').click(function() {
            updateUsersModal(data);
        })
    } else {
        if(data.relationship == "father" || data.relationship == "mother") {
            console.log(data.relationship)
            $('#node_edit').click(function() {
                updateParentModal(data);
            })
        } else if(data.relationship == "husband" || data.relationship == "wife") {
            console.log(data.relationship)
            $('#node_edit').click(function() {
                updateSpouseModal(data);
            })
        } else if(data.relationship == "son" || data.relationship == "daughter") {
            console.log(data.relationship)
            $('#node_edit').click(function() {
                updateChildModal(data);
            })
        } else if(data.relationship == "brother" || data.relationship == "sister") {
            console.log(data.relationship)
            $('#node_edit').click(function() {
                updateSiblingModal(data);
            })
        }
    }

    $('#node_delete').click(function() {
        deleteNode(data);
    })
}

function showSuccessPhotoDelete() {
    swal({
        title: "Photo Deleted!",
        timer: 5000,
        showConfirmButton: false,
        type: "success"
    }).then(function() {},
    function(dismiss) {
        if (dismiss === "timer") {
            location.reload()
        }
    })
}

function showSuccessPhotoAdd() {
    swal({
        title: "Photo Updated!",
        timer: 5000,
        showConfirmButton: false,
        type: "success"
    }).then(function() {},
    function(dismiss) {
        if (dismiss === "timer") {
            location.reload()
        }
    })
}