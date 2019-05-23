function deleteNode(data) {
    $("#delete_modal")
        .modal("show");

    $("#delete_title")
        .empty()
        .append('Delete ' + data.displayName + "?");
    
    $("#delete_body")
        .empty()
        .append("Are you sure you want to delete " + data.displayName + " as your " + data.relationship + "?");
    
    $('#delete_yes').click(function() {
        immFamilyRef.child(currentUserFamilyId).child(data.key).remove();
        extFamilyRef.child(currentUserExtendedId).child(data.key).remove();

        if(data.relationship == "father") {
            usersRef.child(data.key).child("children").child(currentUser.uid).remove();
            // usersRef.child(data.key).child("relationship").remove();
            // usersRef.child(data.key).child("ms").remove();
            // usersRef.child(data.key).child("ux").remove();
            usersRef.child(currentUser.uid).child("f").remove();

            usersRef.child(currentUser.uid).child("siblings").once("value").then(snap => {
                snap.forEach(snap2 => {
                    usersRef.child(snap2.val()).once("value").then(snap3 => {
                        usersRef.child(snap3.val().key).child("f").remove();
                    })
                })
            })

            usersRef.child(currentUser.uid).child("m").once("value").then(snap => {
                console.log(snap.val())
                usersRef.child(snap.val()).once("value").then(snap2 => {
                    usersRef.child(snap2.val().key).child("ms").remove();
                    usersRef.child(snap2.val().key).child("vir").remove();
                })
            })

            userFamilyRef.child(currentUser.uid).child("fathers").child(data.key).remove();
            if(currentUserGender == "female") userFamilyRef.child(data.key).child("daughters").child(currentUser.uid).remove();
            else userFamilyRef.child(data.key).child("sons").child(currentUser.uid).remove();
        } else if(data.relationship == "mother") {
            usersRef.child(data.key).child("children").remove();
            usersRef.child(data.key).child("relationship").remove();
            usersRef.child(data.key).child("ms").remove();
            usersRef.child(data.key).child("vir").remove();
            usersRef.child(currentUser.uid).child("f").remove();

            usersRef.child(currentUser.uid).child("siblings").once("value").then(snap => {
                snap.forEach(snap2 => {
                    usersRef.child(snap2.val()).once("value").then(snap3 => {
                        usersRef.child(snap3.val().key).child("m").remove();
                    })
                })
            })

            usersRef.child(currentUser.uid).child("f").once("value").then(snap => {
                console.log(snap.val())
                usersRef.child(snap.val()).once("value").then(snap2 => {
                    usersRef.child(snap2.val().key).child("ms").remove();
                    usersRef.child(snap2.val().key).child("ux").remove();
                })
            })

            userFamilyRef.child(currentUser.uid).child("mothers").child(data.key).remove();
            if(currentUserGender == "female") userFamilyRef.child(data.key).child("daughters").child(currentUser.uid).remove();
            else userFamilyRef.child(data.key).child("sons").child(currentUser.uid).remove();
        }

        if(data.relationship == "brother") {
            usersRef.child(data.key).once("value").then(snap => {
                usersRef.child(snap.val().f).child("children").child(data.key).remove();
                usersRef.child(snap.val().m).child("children").child(data.key).remove();
                usersRef.child(data.key).child("m").remove();
                usersRef.child(data.key).child("f").remove();
                usersRef.child(data.key).child("relationship").remove();
            })

            usersRef.child(data.key).child("siblings").once("value").then(snap => {
                snap.forEach(snap2 => {
                    usersRef.child(snap2.val()).child("siblings").child(data.key).remove();
                    usersRef.child(data.key).child("siblings").child(snap2.val()).remove();
                })
            })

            userFamilyRef.child(currentUser.uid).child("brothers").child(data.key).remove();
            if(currentUserGender == "female") userFamilyRef.child(data.key).child("sisters").child(currentUser.uid).remove();
            else userFamilyRef.child(data.key).child("brothers").child(currentUser.uid).remove();
        } else if(data.relationship == "sister") {
            usersRef.child(data.key).once("value").then(snap => {
                usersRef.child(snap.val().f).child("children").child(data.key).remove();
                usersRef.child(snap.val().m).child("children").child(data.key).remove();
                usersRef.child(data.key).child("m").remove();
                usersRef.child(data.key).child("f").remove();
                usersRef.child(data.key).child("relationship").remove();
            })

            usersRef.child(data.key).child("siblings").once("value").then(snap => {
                snap.forEach(snap2 => {
                    usersRef.child(snap2.val()).child("siblings").child(data.key).remove();
                    usersRef.child(data.key).child("siblings").child(snap2.val()).remove();
                })
            })

            userFamilyRef.child(currentUser.uid).child("sisters").child(data.key).remove();
            if(currentUserGender == "female") userFamilyRef.child(data.key).child("sisters").child(currentUser.uid).remove();
            else userFamilyRef.child(data.key).child("brothers").child(currentUser.uid).remove();
        }

        if(data.relationship == "husband") {
            usersRef.child(data.key).child("ms").remove();
            usersRef.child(data.key).child("ux").remove();
            usersRef.child(data.key).child("relationship").remove();
            usersRef.child(data.key).child("maritalStatus").remove();

            usersRef.child(currentUser.uid).child("ms").remove();
            usersRef.child(currentUser.uid).child("vir").remove();

            userFamilyRef.child(currentUser.uid).child("husbands").child(data.key).remove();
            userFamilyRef.child(data.key).child("wives").child(currentUser.uid).remove();

            usersRef.child(currentUser.uid).child("children").once("value").then(snap => {
                snap.forEach(snap2 => {
                    usersRef.child(snap2.val()).once("value").then(snap3 => {
                        if(currentUserGender == "female") {
                            if(snap3.val().m == currentUser.uid && snap3.val().f == data.key) {
                                usersRef.child(snap3.val().key).child("m").remove();
                                usersRef.child(snap3.val().key).child("f").remove();
                                usersRef.child(currentUser.uid).child("children").child(snap3.val().key).remove();
                                usersRef.child(data.key).child("children").child(snap3.val().key).remove();
                            }
                        } else {
                            if(snap3.val().f == currentUser.uid && snap3.val().m == data.key) {
                                usersRef.child(snap3.val().key).child("m").remove();
                                usersRef.child(snap3.val().key).child("f").remove();
                                usersRef.child(currentUser.uid).child("children").child(snap3.val().key).remove();
                                usersRef.child(data.key).child("children").child(snap3.val().key).remove();
                            }
                        }
                    })
                })
            })
        } else if(data.relationship == "wife") {
            usersRef.child(data.key).child("ms").remove();
            usersRef.child(data.key).child("vir").remove();
            usersRef.child(data.key).child("relationship").remove();
            usersRef.child(data.key).child("maritalStatus").remove();

            usersRef.child(currentUser.uid).child("ms").remove();
            usersRef.child(currentUser.uid).child("ux").remove();

            userFamilyRef.child(currentUser.uid).child("wives").child(data.key).remove();
            userFamilyRef.child(data.key).child("husbands").child(currentUser.uid).remove();

            usersRef.child(currentUser.uid).child("children").once("value").then(snap => {
                snap.forEach(snap2 => {
                    usersRef.child(snap2.val()).once("value").then(snap3 => {
                        if(currentUserGender == "female") {
                            if(snap3.val().m == currentUser.uid && snap3.val().f == data.key) {
                                usersRef.child(snap3.val().key).child("m").remove();
                                usersRef.child(snap3.val().key).child("f").remove();
                                usersRef.child(currentUser.uid).child("children").child(snap3.val().key).remove();
                                usersRef.child(data.key).child("children").child(snap3.val().key).remove();
                            }
                        } else {
                            if(snap3.val().f == currentUser.uid && snap3.val().m == data.key) {
                                usersRef.child(snap3.val().key).child("m").remove();
                                usersRef.child(snap3.val().key).child("f").remove();
                                usersRef.child(currentUser.uid).child("children").child(snap3.val().key).remove();
                                usersRef.child(data.key).child("children").child(snap3.val().key).remove();
                            }
                        }
                    })
                })
            })
        }

        if(data.relationship == "son") {
            usersRef.child(currentUser.uid).child("children").child(data.key).remove();
            usersRef.child(data.key).child("parenthood").remove();
            usersRef.child(data.key).child("relationship").remove();
            userFamilyRef.child(currentUser.uid).child("sons").child(data.key).remove();

            if(currentUserGender == "female") {
                usersRef.child(data.key).child("m").remove();
                userFamilyRef.child(data.key).child("mothers").child(currentUser.uid).remove();
                usersRef.child(data.key).child("f").once("value").then(snap => {
                    usersRef.child(snap.val()).child("children").child(data.key).remove();
                    usersRef.child(data.key).child("f").remove();
                })
            } else {
                usersRef.child(data.key).child("f").remove();
                userFamilyRef.child(data.key).child("fathers").child(currentUser.uid).remove();
                usersRef.child(data.key).child("m").once("value").then(snap => {
                    usersRef.child(snap.val()).child("children").child(data.key).remove();
                    usersRef.child(data.key).child("m").remove();
                })
            }
        } else if(data.relationship == "daughter") {
            usersRef.child(currentUser.uid).child("children").child(data.key).remove();
            usersRef.child(data.key).child("parenthood").remove();
            usersRef.child(data.key).child("relationship").remove();
            userFamilyRef.child(currentUser.uid).child("daughters").child(data.key).remove();

            if(currentUserGender == "female") {
                usersRef.child(data.key).child("m").remove();
                userFamilyRef.child(data.key).child("mothers").child(currentUser.uid).remove();
                usersRef.child(data.key).child("f").once("value").then(snap => {
                    usersRef.child(snap.val()).child("children").child(data.key).remove();
                    usersRef.child(data.key).child("f").remove();
                })
            } else {
                usersRef.child(data.key).child("f").remove();
                userFamilyRef.child(data.key).child("fathers").child(currentUser.uid).remove();
                usersRef.child(data.key).child("m").once("value").then(snap => {
                    usersRef.child(snap.val()).child("children").child(data.key).remove();
                    usersRef.child(data.key).child("m").remove();
                })
            }
        }

        showDeleteSuccess();
        setTimeout(function() {
            return location.reload();
        }, 3000);
    })
}