function deleteNode(data) {
    if(data.key == currentUser.uid) {
        $("#delete_modal")
            .modal("show");

        $("#delete_title")
            .empty()
            .append('Delete ' + data.displayName + "?");
    
        $("#delete_body")
            .empty()
            .append("If yes, your account will be deleted. Continue?");
    
        $('#delete_yes').click(function() {
            // deleteParent(data);
        })
    } else {
        $("#delete_modal")
            .modal("show");

        $("#delete_title")
            .empty()
            .append('Delete ' + data.displayName + "?");
        
        $("#delete_body")
            .empty()
            .append("Are you sure you want to delete " + data.displayName + " as your " + data.relationship + "?");

            $('#delete_yes').click(function() {
            if(data.relationship == "brother") {
                usersRef.child(data.key).child("relationship").remove();
                usersRef.child(data.key).child("siblings").child(currentUser.uid).remove();
                usersRef.child(currentUser.uid).child("siblings").child(data.key).remove();

                extFamilyRef.child(currentUserDetails.extendedId).child(data.key).remove();
                extFamilyRef.child(data.extendedId).child(currentUser.uid).remove();
            
                if(currentUserGender == "female") {
                    userFamilyRef.child(data.key).child("sisters").child(currentUser.uid).remove();
                    userFamilyRef.child(currentUser.uid).child("brothers").child(data.key).remove();
            
                    immFamilyRef.child(data.familyId).child("sister").child(currentUser.uid).remove();
                    immFamilyRef.child(currentUserDetails.familyId).child("brother").child(data.key).remove();
                } else if(currentUserGender == "male") {
                    userFamilyRef.child(data.key).child("brothers").child(currentUser.uid).remove();
                    userFamilyRef.child(currentUser.uid).child("brothers").child(data.key).remove();
            
                    immFamilyRef.child(data.familyId).child("brother").child(currentUser.uid).remove();
                    immFamilyRef.child(currentUserDetails.familyId).child("brother").child(data.key).remove();
                }
            
                usersRef.child(currentUser.uid).child("f").once("value").then(snap => {
                    usersRef.child(snap.val()).once("value").then(snap2 => {
                        usersRef.child(data.key).child("f").remove();
                        usersRef.child(snap.val()).child("children").child(data.key).remove();
                        
                        userFamilyRef.child(data.key).child("fathers").child(snap.val()).remove();
                        userFamilyRef.child(snap.val()).child("sons").child(data.key).remove();
            
                        immFamilyRef.child(data.familyId).child("father").remove();
                        immFamilyRef.child((snap2.val()).familyId).child("son").child(data.key).remove();
            
                        extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                        extFamilyRef.child(snap2.val().extendedId).child(data.key).remove();
                    })
                })
            
                usersRef.child(currentUser.uid).child("m").once("value").then(snap => {
                    usersRef.child(snap.val()).once("value").then(snap2 => {
                        usersRef.child(data.key).child("m").remove();
                        usersRef.child(snap.val()).child("children").child(data.key).remove();
                        
                        userFamilyRef.child(data.key).child("mothers").child(snap.val()).remove();
                        userFamilyRef.child(snap.val()).child("sons").child(data.key).remove();
            
                        immFamilyRef.child(data.familyId).child("mother").remove();
                        immFamilyRef.child((snap2.val()).familyId).child("son").child(data.key).remove();
            
                        extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                        extFamilyRef.child(snap2.val().extendedId).child(data.key).remove();
                    })
                })
            
                usersRef.child(currentUser.uid).child("siblings").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            usersRef.child(data.key).child("siblings").child(snap2.val()).remove();
                            usersRef.child(snap2.val()).child("siblings").child(data.key).remove();
            
                            extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                            extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                            
                            if(snap3.val().gender == "male") {
                                userFamilyRef.child(data.key).child("brothers").child(snap2.val()).remove();
                                userFamilyRef.child(snap2.val()).child("brothers").child(data.key).remove();
            
                                immFamilyRef.child(data.familyId).child("brother").child(snap2.val()).remove();
                                immFamilyRef.child((snap3.val()).familyId).child("brother").child(data.key).remove();
                            } else if(snap3.val().gender == "female") {
                                userFamilyRef.child(data.key).child("sisters").child(snap2.val()).remove();
                                userFamilyRef.child(snap2.val()).child("brothers").child(data.key).remove();
            
                                immFamilyRef.child(data.familyId).child("sister").child(snap2.val()).remove();
                                immFamilyRef.child((snap3.val()).familyId).child("brother").child(data.key).remove();
                            }
                        })
                    })
                })
            
                usersRef.child(currentUser.uid).child("vir").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                            extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                        })
                    })
                })
            
                usersRef.child(currentUser.uid).child("ux").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                            extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                        })
                    })
                })
            
                usersRef.child(currentUser.uid).child("children").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                            extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                        })
                    })
                })
            } else if(data.relationship == "sister") {
                usersRef.child(data.key).child("relationship").remove();
                usersRef.child(data.key).child("siblings").child(currentUser.uid).remove();
                usersRef.child(currentUser.uid).child("siblings").child(data.key).remove();

                extFamilyRef.child(currentUserDetails.extendedId).child(data.key).remove();
                extFamilyRef.child(data.extendedId).child(currentUser.uid).remove();
            
                if(currentUserGender == "female") {
                    userFamilyRef.child(data.key).child("sisters").child(currentUser.uid).remove();
                    userFamilyRef.child(currentUser.uid).child("sisters").child(data.key).remove();
            
                    immFamilyRef.child(data.familyId).child("sister").child(currentUser.uid).remove();
                    immFamilyRef.child(currentUserDetails.familyId).child("sister").child(data.key).remove();
                } else if(currentUserGender == "male") {
                    userFamilyRef.child(data.key).child("brothers").child(currentUser.uid).remove();
                    userFamilyRef.child(currentUser.uid).child("sisters").child(data.key).remove();
            
                    immFamilyRef.child(data.familyId).child("brother").child(currentUser.uid).remove();
                    immFamilyRef.child(currentUserDetails.familyId).child("sister").child(data.key).remove();
                }
            
                usersRef.child(currentUser.uid).child("f").once("value").then(snap => {
                    usersRef.child(snap.val()).once("value").then(snap2 => {
                        usersRef.child(data.key).child("f").remove();
                        usersRef.child(snap.val()).child("children").child(data.key).remove();
                        
                        userFamilyRef.child(data.key).child("fathers").child(snap.val()).remove();
                        userFamilyRef.child(snap.val()).child("daughters").child(data.key).remove();
            
                        immFamilyRef.child(data.familyId).child("father").remove();
                        immFamilyRef.child((snap2.val()).familyId).child("daughter").child(data.key).remove();
            
                        extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                        extFamilyRef.child(snap2.val().extendedId).child(data.key).remove();
                    })
                })
            
                usersRef.child(currentUser.uid).child("m").once("value").then(snap => {
                    usersRef.child(snap.val()).once("value").then(snap2 => {
                        usersRef.child(data.key).child("m").remove();
                        usersRef.child(snap.val()).child("children").child(data.key).remove();
                        
                        userFamilyRef.child(data.key).child("mothers").child(snap.val()).remove();
                        userFamilyRef.child(snap.val()).child("daughters").child(data.key).remove();
            
                        immFamilyRef.child(data.familyId).child("mother").remove();
                        immFamilyRef.child((snap2.val()).familyId).child("daughter").child(data.key).remove();
            
                        extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                        extFamilyRef.child(snap2.val().extendedId).child(data.key).remove();
                    })
                })
            
                usersRef.child(currentUser.uid).child("siblings").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            usersRef.child(data.key).child("siblings").child(snap2.val()).remove();
                            usersRef.child(snap2.val()).child("siblings").child(data.key).remove();
            
                            extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                            extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                            
                            if(snap3.val().gender == "male") {
                                userFamilyRef.child(data.key).child("brothers").child(snap2.val()).remove();
                                userFamilyRef.child(snap2.val()).child("sisters").child(data.key).remove();
            
                                immFamilyRef.child(data.familyId).child("brother").child(snap2.val()).remove();
                                immFamilyRef.child((snap3.val()).familyId).child("sister").child(data.key).remove();
                            } else if(snap3.val().gender == "female") {
                                userFamilyRef.child(data.key).child("sisters").child(snap2.val()).remove();
                                userFamilyRef.child(snap2.val()).child("sisters").child(data.key).remove();
            
                                immFamilyRef.child(data.familyId).child("sister").child(snap2.val()).remove();
                                immFamilyRef.child((snap3.val()).familyId).child("sister").child(data.key).remove();
                            }
                        })
                    })
                })
            
                usersRef.child(currentUser.uid).child("vir").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                            extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                        })
                    })
                })
            
                usersRef.child(currentUser.uid).child("ux").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                            extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                        })
                    })
                })
            
                usersRef.child(currentUser.uid).child("children").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                            extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                        })
                    })
                })
            }

            if(data.relationship == "husband") {
                usersRef.child(data.key).child("maritalStatus").remove();
                usersRef.child(data.key).child("relationship").remove();
                usersRef.child(data.key).child("ux").child(currentUser.uid).remove();
                usersRef.child(data.key).child("ms").child(currentUser.uid).remove();
                
                usersRef.child(currentUser.uid).child("vir").child(data.key).remove();
                usersRef.child(currentUser.uid).child("ms").child(data.key).remove();
            
                userFamilyRef.child(data.key).child("wives").child(currentUser.uid).remove();
                userFamilyRef.child(currentUser.uid).child("husbands").child(data.key).remove();
            
                immFamilyRef.child(data.familyId).child("wife").child(currentUser.uid).remove();
                immFamilyRef.child(currentUserDetails.familyId).child("husband").child(data.key).remove();

                extFamilyRef.child(currentUserDetails.extendedId).child(data.key).remove();
                extFamilyRef.child(data.extendedId).child(currentUser.uid).remove();
            
                usersRef.child(currentUser.uid).child("children").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            if(snap3.val().m == currentUser.uid && snap3.val().f == data.key) {
                                usersRef.child(data.key).child("children").child(snap2.val()).remove();
                                usersRef.child(snap2.val()).child("f").remove();
            
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                                
                                if(snap3.val().gender == "male") {
                                    userFamilyRef.child(data.key).child("sons").child(snap2.val()).remove();
                                    userFamilyRef.child(snap2.val()).child("fathers").child(data.key).remove();
            
                                    immFamilyRef.child(data.familyId).child("son").child(snap2.val()).remove();
                                    immFamilyRef.child((snap3.val()).familyId).child("father").remove();
                                } else if(snap3.val().gender == "female") {
                                    userFamilyRef.child(data.key).child("daughters").child(snap2.val()).remove();
                                    userFamilyRef.child(snap2.val()).child("fathers").child(data.key).remove();
            
                                    immFamilyRef.child(data.familyId).child("daughter").child(snap2.val()).remove();
                                    immFamilyRef.child((snap3.val()).familyId).child("father").remove();
                                }
                            } else {
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                            }
                        })
                    })
                })
            
                usersRef.child(currentUser.uid).child("f").once("value").then(snap => {
                    usersRef.child(snap.val()).once("value").then(snap2 => {
                        extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                        extFamilyRef.child(snap2.val().extendedId).child(data.key).remove(); 
                    })
                })
            
                usersRef.child(currentUser.uid).child("m").once("value").then(snap => {
                    usersRef.child(snap.val()).once("value").then(snap2 => {
                        extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                        extFamilyRef.child(snap2.val().extendedId).child(data.key).remove(); 
                    })
                })
            
                usersRef.child(currentUser.uid).child("siblings").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                            extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                        })
                    })
                })
            } else if(data.relationship == "wife") {
                usersRef.child(data.key).child("maritalStatus").remove();
                usersRef.child(data.key).child("relationship").remove();
                usersRef.child(data.key).child("vir").child(currentUser.uid).remove();
                usersRef.child(data.key).child("ms").child(currentUser.uid).remove();
                
                usersRef.child(currentUser.uid).child("ux").child(data.key).remove();
                usersRef.child(currentUser.uid).child("ms").child(data.key).remove();
            
                userFamilyRef.child(data.key).child("husbands").child(currentUser.uid).remove();
                userFamilyRef.child(currentUser.uid).child("wives").child(data.key).remove();
            
                immFamilyRef.child(data.familyId).child("husband").child(currentUser.uid).remove();
                immFamilyRef.child(currentUserDetails.familyId).child("wife").child(data.key).remove();

                extFamilyRef.child(currentUserDetails.extendedId).child(data.key).remove();
                extFamilyRef.child(data.extendedId).child(currentUser.uid).remove();
            
                usersRef.child(currentUser.uid).child("children").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            if(snap3.val().f == currentUser.uid && snap3.val().m == data.key) {
                                usersRef.child(data.key).child("children").child(snap2.val()).remove();
                                usersRef.child(snap2.val()).child("m").remove();
            
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                                
                                if(snap3.val().gender == "male") {
                                    userFamilyRef.child(data.key).child("sons").child(snap2.val()).remove();
                                    userFamilyRef.child(snap2.val()).child("mothers").child(data.key).remove();
            
                                    immFamilyRef.child(data.familyId).child("son").child(snap2.val()).remove();
                                    immFamilyRef.child((snap3.val()).familyId).child("mother").remove();
                                } else if(snap3.val().gender == "female") {
                                    userFamilyRef.child(data.key).child("daughters").child(snap2.val()).remove();
                                    userFamilyRef.child(snap2.val()).child("mothers").child(data.key).remove();
            
                                    immFamilyRef.child(data.familyId).child("daughter").child(snap2.val()).remove();
                                    immFamilyRef.child((snap3.val()).familyId).child("mother").remove();
                                }
                            } else {
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                            }
                        })
                    })
                })
            
                usersRef.child(currentUser.uid).child("f").once("value").then(snap => {
                    usersRef.child(snap.val()).once("value").then(snap2 => {
                        extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                        extFamilyRef.child(snap2.val().extendedId).child(data.key).remove(); 
                    })
                })
            
                usersRef.child(currentUser.uid).child("m").once("value").then(snap => {
                    usersRef.child(snap.val()).once("value").then(snap2 => {
                        extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                        extFamilyRef.child(snap2.val().extendedId).child(data.key).remove(); 
                    })
                })
            
                usersRef.child(currentUser.uid).child("siblings").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                            extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                        })
                    })
                })
            }

            if(data.relationship == "son") {
                usersRef.child(data.key).child("parenthood").remove();
                usersRef.child(data.key).child("relationship").remove();
            
                if(data.m) {
                    usersRef.child(data.m).child("children").child(data.key).remove();

                    userFamilyRef.child(data.key).child("mothers").child(data.m).remove();
                    userFamilyRef.child(data.m).child("sons").child(data.key).remove();
            
                    usersRef.child(data.m).once("value").then(snap => {
                        immFamilyRef.child(data.familyId).child("mother").remove();
                        immFamilyRef.child(snap.val().familyId).child("son").child(data.key).remove();
            
                        extFamilyRef.child(data.extendedId).child(data.m).remove();
                        extFamilyRef.child(snap.val().extendedId).child(data.key).remove();
                    })
            
                    usersRef.child(data.m).child("f").once("value").then(snap => {
                        usersRef.child(snap.val()).once("value").then(snap2 => {
                            extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                            extFamilyRef.child(snap2.val().extendedId).child(data.key).remove(); 
                        })
                    })
                
                    usersRef.child(data.m).child("m").once("value").then(snap => {
                        usersRef.child(snap.val()).once("value").then(snap2 => {
                            extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                            extFamilyRef.child(snap2.val().extendedId).child(data.key).remove(); 
                        })
                    })
                
                    usersRef.child(data.m).child("siblings").once("value").then(snap => {
                        snap.forEach(snap2 => {
                            usersRef.child(snap2.val()).once("value").then(snap3 => {
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                            })
                        })
                    })
            
                    usersRef.child(data.m).child("children").once("value").then(snap => {
                        snap.forEach(snap2 => {
                            usersRef.child(snap2.val()).once("value").then(snap3 => {
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                            })
                        })
                    })
            
                    usersRef.child(data.m).child("vir").once("value").then(snap => {
                        snap.forEach(snap2 => {
                            usersRef.child(snap2.val()).once("value").then(snap3 => {
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                            })
                        })
                    })
                }
                
                if(data.f) {
                    usersRef.child(data.f).child("children").child(data.key).remove();

                    userFamilyRef.child(data.key).child("fathers").child(data.f).remove();
                    userFamilyRef.child(data.f).child("sons").child(data.key).remove();
            
                    usersRef.child(data.f).once("value").then(snap => {
                        immFamilyRef.child(data.familyId).child("father").remove();
                        immFamilyRef.child(snap.val().familyId).child("son").child(data.key).remove();
            
                        extFamilyRef.child(data.extendedId).child(data.f).remove();
                        extFamilyRef.child(snap.val().extendedId).child(data.key).remove();
                    })
            
                    usersRef.child(data.f).child("f").once("value").then(snap => {
                        usersRef.child(snap.val()).once("value").then(snap2 => {
                            extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                            extFamilyRef.child(snap2.val().extendedId).child(data.key).remove(); 
                        })
                    })
                
                    usersRef.child(data.f).child("m").once("value").then(snap => {
                        usersRef.child(snap.val()).once("value").then(snap2 => {
                            extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                            extFamilyRef.child(snap2.val().extendedId).child(data.key).remove(); 
                        })
                    })
                
                    usersRef.child(data.f).child("siblings").once("value").then(snap => {
                        snap.forEach(snap2 => {
                            usersRef.child(snap2.val()).once("value").then(snap3 => {
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                            })
                        })
                    })
            
                    usersRef.child(data.f).child("children").once("value").then(snap => {
                        snap.forEach(snap2 => {
                            usersRef.child(snap2.val()).once("value").then(snap3 => {
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                            })
                        })
                    })
            
                    usersRef.child(data.m).child("ux").once("value").then(snap => {
                        snap.forEach(snap2 => {
                            usersRef.child(snap2.val()).once("value").then(snap3 => {
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                            })
                        })
                    })
                }
            
                usersRef.child(data.key).child("m").remove();
                usersRef.child(data.key).child("f").remove();
            
                usersRef.child(data.key).child("siblings").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            if(snap3.val().gender == "male") {
                                immFamilyRef.child(data.familyId).child("brother").child(snap2.val()).remove();
                                immFamilyRef.child(snap3.val().familyId).child("brother").child(data.key).remove();
                            } else if(snap3.val().gender == "female") {
                                immFamilyRef.child(data.familyId).child("sister").child(snap2.val()).remove();
                                immFamilyRef.child(snap3.val().familyId).child("brother").child(data.key).remove();
                            }
                            usersRef.child(data.key).child("siblings").child(snap2.val()).remove();
                            usersRef.child(snap2.val()).child("siblings").child(data.key).remove();
                            
                            extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                            extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                        })
                    })
                })
            } else if(data.relationship == "daughter") {
                usersRef.child(data.key).child("parenthood").remove();
                usersRef.child(data.key).child("relationship").remove();
            
                if(data.m) {
                    usersRef.child(data.m).child("children").child(data.key).remove();

                    userFamilyRef.child(data.key).child("mothers").child(data.m).remove();
                    userFamilyRef.child(data.m).child("daughters").child(data.key).remove();
            
                    usersRef.child(data.m).once("value").then(snap => {
                        immFamilyRef.child(data.familyId).child("mother").remove();
                        immFamilyRef.child(snap.val().familyId).child("daughter").child(data.key).remove();
            
                        extFamilyRef.child(data.extendedId).child(data.m).remove();
                        extFamilyRef.child(snap.val().extendedId).child(data.key).remove();
                    })
            
                    usersRef.child(data.m).child("f").once("value").then(snap => {
                        usersRef.child(snap.val()).once("value").then(snap2 => {
                            extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                            extFamilyRef.child(snap2.val().extendedId).child(data.key).remove(); 
                        })
                    })
                
                    usersRef.child(data.m).child("m").once("value").then(snap => {
                        usersRef.child(snap.val()).once("value").then(snap2 => {
                            extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                            extFamilyRef.child(snap2.val().extendedId).child(data.key).remove(); 
                        })
                    })
                
                    usersRef.child(data.m).child("siblings").once("value").then(snap => {
                        snap.forEach(snap2 => {
                            usersRef.child(snap2.val()).once("value").then(snap3 => {
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                            })
                        })
                    })
            
                    usersRef.child(data.m).child("children").once("value").then(snap => {
                        snap.forEach(snap2 => {
                            usersRef.child(snap2.val()).once("value").then(snap3 => {
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                            })
                        })
                    })
            
                    usersRef.child(data.m).child("vir").once("value").then(snap => {
                        snap.forEach(snap2 => {
                            usersRef.child(snap2.val()).once("value").then(snap3 => {
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                            })
                        })
                    })
                }
                
                if(data.f) {
                    usersRef.child(data.f).child("children").child(data.key).remove();

                    userFamilyRef.child(data.key).child("fathers").child(data.f).remove();
                    userFamilyRef.child(data.f).child("daughters").child(data.key).remove();
            
                    usersRef.child(data.f).once("value").then(snap => {
                        immFamilyRef.child(data.familyId).child("father").remove();
                        immFamilyRef.child(snap.val().familyId).child("daughter").child(data.key).remove();
            
                        extFamilyRef.child(data.extendedId).child(data.f).remove();
                        extFamilyRef.child(snap.val().extendedId).child(data.key).remove();
                    })
            
                    usersRef.child(data.f).child("f").once("value").then(snap => {
                        usersRef.child(snap.val()).once("value").then(snap2 => {
                            extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                            extFamilyRef.child(snap2.val().extendedId).child(data.key).remove(); 
                        })
                    })
                
                    usersRef.child(data.f).child("m").once("value").then(snap => {
                        usersRef.child(snap.val()).once("value").then(snap2 => {
                            extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                            extFamilyRef.child(snap2.val().extendedId).child(data.key).remove(); 
                        })
                    })
                
                    usersRef.child(data.f).child("siblings").once("value").then(snap => {
                        snap.forEach(snap2 => {
                            usersRef.child(snap2.val()).once("value").then(snap3 => {
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                            })
                        })
                    })
            
                    usersRef.child(data.f).child("children").once("value").then(snap => {
                        snap.forEach(snap2 => {
                            usersRef.child(snap2.val()).once("value").then(snap3 => {
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                            })
                        })
                    })
            
                    usersRef.child(data.m).child("ux").once("value").then(snap => {
                        snap.forEach(snap2 => {
                            usersRef.child(snap2.val()).once("value").then(snap3 => {
                                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                            })
                        })
                    })
                }
            
                usersRef.child(data.key).child("m").remove();
                usersRef.child(data.key).child("f").remove();
            
                usersRef.child(data.key).child("siblings").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            if(snap3.val().gender == "male") {
                                immFamilyRef.child(data.familyId).child("brother").child(snap2.val()).remove();
                                immFamilyRef.child(snap3.val().familyId).child("sister").child(data.key).remove();
                            } else if(snap3.val().gender == "female") {
                                immFamilyRef.child(data.familyId).child("sister").child(snap2.val()).remove();
                                immFamilyRef.child(snap3.val().familyId).child("sister").child(data.key).remove();
                            }
                            usersRef.child(data.key).child("siblings").child(snap2.val()).remove();
                            usersRef.child(snap2.val()).child("siblings").child(data.key).remove();
                            
                            extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                            extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
                        })
                    })
                })
            }

            showDeleteSuccess();
            setTimeout(function() {
                return location.reload();
            }, 3000);
        })
    }
}