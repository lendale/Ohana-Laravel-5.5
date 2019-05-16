function searchBar() {
    var input = $("#search_input").val();

    if(input !== "") {
        usersRef.once("value").then(snap => {
            snap.forEach(snap2 => {
                if((snap2.val().displayName.toLowerCase() == input.toLowerCase()) ||
                    (snap2.val().email == input)) {
                    console.log('exist')
                    console.log(snap2.val.photoURL)
                    $("#search_no_result").hide();
                    $("#search_found").show();
                    $("#search_found2").show();
                    $("#search_found3").show();

                    $("#search_pic_view")
                        .empty()
                        .attr("value", snap2.val().photoURL);
                    $("#search_display_name")
                        .empty()
                        .attr("value", snap2.val().displayName);
                    $("#seach_email")
                        .empty()
                        .attr("value", snap2.val().email);

                    $('#search_confirm').click(function() {
                        searchedResultModal(snap2.val());
                    })
                }
            })
        })
    }
    else {
        $("#search_no_result").show();
        $("#search_none_input")
            .empty()
            .attr("value", 'Nothing is inputted.');
        $("#search_no_result").hide();
    }
}

function searchedResultModal(data) {
    $("#modal_add_existing_member")
        .modal('show');

    $('#add_parent2').click(function() {
        if(data.ms) {
            $("#delete_modal")
                .modal("show");

            $("#delete_title")
                .empty();
            
            $("#delete_body")
                .empty()
                .append("This person has existing spouse. Add as second parent?");
                        
            $('#delete_yes').click(function() {
                if(data.gender == "male") {
                    usersRef.child(data.key).child("ux").once("value").then(snap => {
                        snap.forEach(snap2 => {
                            usersRef.child(currentUser.uid).child("m").set(snap2.val());
                            usersRef.child(snap2.val()).child("children").child(currentUser.uid).set(currentUser.uid);
                        })
                    })
                } else {
                    usersRef.child(data.key).child("vir").once("value").then(snap => {
                        snap.forEach(snap2 => {
                            usersRef.child(currentUser.uid).child("f").set(snap2.val());
                            usersRef.child(snap2.val()).child("children").child(currentUser.uid).set(currentUser.uid);
                        })
                    })
                }

                usersRef.child(data.key).child("children").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            if(snap2.val() != currentUser.uid) {
                                if(data.gender == "male") {
                                    if(snap3.val().f != currentUserFather) {
                                        usersRef.child(currentUser.uid).child("siblings").child(snap2.val()).set(snap2.val());
                                        usersRef.child(snap2.val()).child("siblings").child(currentUser.uid).set(currentUser.uid);
                                    }
                                } else {
                                    if(snap3.val().m != currentUserMother) {
                                        usersRef.child(currentUser.uid).child("siblings").child(snap2.val()).set(snap2.val());
                                        usersRef.child(snap2.val()).child("siblings").child(currentUser.uid).set(currentUser.uid);
                                    }
                                }
                            }
                        })
                    })
                })

                displayExistingParent(data);
            })

            $('#delete_no').click(function() {
                displayExistingParent(data);
            })
        }
    })

    $('#add_sibling2').click(function() {
        displayExistingSibling(data);
    })

    $('#add_spouse2').click(function() {
        displayExistingSpouse(data);
    })

    $('#add_child2').click(function() {
        displayExistingChild(data);
    })
}
