function getNodeData(key) {
    usersRef.child(key).once("value").then(snap => {
        if(snap.exists()) {
            showNodeData(snap.val())
        }
    });
}

function showNodeData(data) {
    console.log(data.key)

    var template = null
    $('#modal_show_details').on('show.bs.modal', function (event) {
        if (template == null) {
            template = $(this).html()
        } else {
            $(this).html(template)
        }
    })

    if(data.key != currentUser.uid && data.registered == true) {
        document.getElementById("node_edit").disabled = true;
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

    if(data.key == currentUser.uid) {
        $('#node_edit').click(function() {
            document.getElementById("node_edit").addEventListener("click", updateUsersModal(data));
        })

        $('#node_delete').click(function() {
            document.getElementById("node_edit").addEventListener("click", deleteUser(data));
        })
    } 
    
    if(data.relationship == "father" || data.relationship == "mother") {
        $('#node_edit').click(function() {
            document.getElementById("node_edit").addEventListener("click", updateParentModal(data));
        })

        $('#node_delete').click(function() {
            document.getElementById("node_edit").addEventListener("click", deleteParent(data));
        })
    }

    if(data.relationship == "brother" || data.relationship == "sister") {
        $('#node_edit').click(function() {
            document.getElementById("node_edit").addEventListener("click", updateSiblingModal(data));
        })

        $('#node_delete').click(function() {
            document.getElementById("node_edit").addEventListener("click", deleteSibling(data));
        })
    }
    
    if(data.relationship == "husband" || data.relationship == "wife") {
        $('#node_edit').click(function() {
            document.getElementById("node_edit").addEventListener("click", updateSpouseModal(data));
        })

        $('#node_delete').click(function() {
            document.getElementById("node_edit").addEventListener("click", deleteSpouse(data));
        })
    }

    if(data.relationship == "son" || data.relationship == "daughter") {
        $('#node_edit').click(function() {
            document.getElementById("node_edit").addEventListener("click", updateChildModal(data));
        })

        $('#node_delete').click(function() {
            document.getElementById("node_edit").addEventListener("click", deleteChild(data));
        })
    }
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