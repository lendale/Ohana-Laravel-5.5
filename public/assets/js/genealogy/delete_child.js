function deleteChild(data) {
    usersRef.child(data.key).child("relationship").remove();
    usersRef.child(data.key).child("parenthood").remove();

    // mother
    usersRef.child(data.m).child("children").child(data.key).remove();

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
    
    userFamilyRef.child(data.key).child("mothers").child(data.m).remove();

    if(data.gender == "male") {
        userFamilyRef.child(data.m).child("sons").child(data.key).remove();

        usersRef.child(data.m).once("value").then(snap => {
            immFamilyRef.child(data.familyId).child("mother").remove();
            immFamilyRef.child(snap.val().familyId).child("son").child(data.key).remove();

            extFamilyRef.child(data.extendedId).child(data.m).remove();
            extFamilyRef.child(snap.val().extendedId).child(data.key).remove();
        })

        usersRef.child(data.f).once("value").then(snap => {
            immFamilyRef.child(data.familyId).child("father").remove();
            immFamilyRef.child(snap.val().familyId).child("son").child(data.key).remove();

            extFamilyRef.child(data.extendedId).child(data.f).remove();
            extFamilyRef.child(snap.val().extendedId).child(data.key).remove();
        })
    } else if(data.gender == "female") {
        userFamilyRef.child(data.m).child("daughters").child(data.key).remove();

        usersRef.child(data.m).once("value").then(snap => {
            immFamilyRef.child(data.familyId).child("mother").remove();
            immFamilyRef.child(snap.val().familyId).child("daughter").child(data.key).remove();

            extFamilyRef.child(data.extendedId).child(data.m).remove();
            extFamilyRef.child(snap.val().extendedId).child(data.key).remove();
        })

        usersRef.child(data.f).once("value").then(snap => {
            immFamilyRef.child(data.familyId).child("father").remove();
            immFamilyRef.child(snap.val().familyId).child("daughter").child(data.key).remove();

            extFamilyRef.child(data.extendedId).child(data.f).remove();
            extFamilyRef.child(snap.val().extendedId).child(data.key).remove();
        })
    }

    // father
    usersRef.child(data.f).child("children").child(data.key).remove();

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

    usersRef.child(data.f).child("ux").once("value").then(snap => {
        snap.forEach(snap2 => {
            usersRef.child(snap2.val()).once("value").then(snap3 => {
                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
            })
        })
    })

    userFamilyRef.child(data.key).child("fathers").child(data.f).remove();

    usersRef.child(data.key).child("m").remove();
    usersRef.child(data.key).child("f").remove();

    usersRef.child(data.key).child("siblings").once("value").then(snap => {
        snap.forEach(snap2 => {
            usersRef.child(snap2.val()).once("value").then(snap3 => {
                if(snap3.val().gender == "male") {
                    immFamilyRef.child(data.familyId).child("brother").child(snap2.val()).remove();
                    userFamilyRef.child(data.key).child("brothers").child(snap2.val()).remove();
                } else if(snap3.val().gender == "female") {
                    immFamilyRef.child(data.familyId).child("sister").child(snap2.val()).remove();
                    userFamilyRef.child(data.key).child("sisters").child(snap2.val()).remove();
                }

                if(data.gender == "male") {
                    immFamilyRef.child(snap3.val().familyId).child("brother").child(data.key).remove();
                    userFamilyRef.child(snap2.val()).child("brothers").child(data.key).remove();
                } else if(data.gender == "female") {
                    immFamilyRef.child(snap3.val().familyId).child("sister").child(data.key).remove();
                    userFamilyRef.child(snap2.val()).child("sisters").child(data.key).remove();
                }

                usersRef.child(data.key).child("siblings").child(snap2.val()).remove();
                usersRef.child(snap2.val()).child("siblings").child(data.key).remove();
                
                extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                extFamilyRef.child(snap3.val().extendedId).child(data.key).remove(); 
            })

            usersRef.child(snap2.val()).child("ux").once("value").then(snap3 => {
                snap3.forEach(snap4 => {
                    usersRef.child(snap4.val()).once("value").then(snap5 => {
                        extFamilyRef.child(data.extendedId).child(snap4.val()).remove();
                        extFamilyRef.child(snap5.val().extendedId).child(data.key).remove(); 
                    })
                })
            })
            
            usersRef.child(snap2.val()).child("vir").once("value").then(snap3 => {
                snap3.forEach(snap4 => {
                    usersRef.child(snap4.val()).once("value").then(snap5 => {
                        extFamilyRef.child(data.extendedId).child(snap4.val()).remove();
                        extFamilyRef.child(snap5.val().extendedId).child(data.key).remove(); 
                    })
                })
            })

            usersRef.child(snap2.val()).child("children").once("value").then(snap3 => {
                snap3.forEach(snap4 => {
                    usersRef.child(snap4.val()).once("value").then(snap5 => {
                        extFamilyRef.child(data.extendedId).child(snap4.val()).remove();
                        extFamilyRef.child(snap5.val().extendedId).child(data.key).remove(); 
                    })
                })
            })
        })
    })

    showDeleteSuccess();
    setTimeout(function() {
        return location.reload();
    }, 3000);
}