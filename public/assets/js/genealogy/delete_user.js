function deleteUser(data) {
    if(data.f) {
        usersRef.child(data.f).once("value").then(snap => {
            extFamilyRef.child(snap.val().extendedId).child(currentUser.uid).remove();
            usersRef.child(data.f).child("children").child(currentUser.uid).remove();

            if(snap.val().registered == true) {
                if(currentUserGender == "female") {
                    userFamilyRef.child(data.f).child("daughters").child(currentUser.uid).remove();
                } else if(currentUserGender == "male") {
                    userFamilyRef.child(data.f).child("sons").child(currentUser.uid).remove();
                }
            }

            if(currentUserGender == "female") {
                immFamilyRef.child(snap.val().familyId).child("daughter").child(currentUser.uid).remove();
            } else if(currentUserGender == "male") {
                immFamilyRef.child(snap.val().familyId).child("son").child(currentUser.uid).remove();
            }
        })
    }

    if(data.m) {
        usersRef.child(data.m).once("value").then(snap => {
            extFamilyRef.child(snap.val().extendedId).child(currentUser.uid).remove();
            usersRef.child(data.m).child("children").child(currentUser.uid).remove();

            if(snap.val().registered == true) {
                if(currentUserGender == "female") {
                    userFamilyRef.child(data.m).child("daughters").child(currentUser.uid).remove();
                } else if(currentUserGender == "male") {
                    userFamilyRef.child(data.m).child("sons").child(currentUser.uid).remove();
                }
            }

            if(currentUserGender == "female") {
                immFamilyRef.child(snap.val().familyId).child("daughter").child(currentUser.uid).remove();
            } else if(currentUserGender == "male") {
                immFamilyRef.child(snap.val().familyId).child("son").child(currentUser.uid).remove();
            }
        })
    }    

    if(data.siblings) {
        usersRef.child(currentUser.uid).child("siblings").once("value").then(snap => {
            snap.forEach(snap2 => {
                usersRef.child(snap2.val()).once("value").then(snap3 => {
                    extFamilyRef.child(snap3.val().extendedId).child(currentUser.uid).remove();
                    usersRef.child(snap2.val()).child("siblings").child(currentUser.uid).remove();

                    if(snap3.val().registered == true) {
                        if(currentUserGender == "female") {
                            userFamilyRef.child(snap2.val()).child("sisters").child(currentUser.uid).remove();
                        } else if(currentUserGender == "male") {
                            userFamilyRef.child(snap2.val()).child("brothers").child(currentUser.uid).remove();
                        }
                    }

                    if(currentUserGender == "female") {
                        immFamilyRef.child(snap3.val().familyId).child("sister").child(currentUser.uid).remove();
                    } else if(currentUserGender == "male") {
                        immFamilyRef.child(snap3.val().familyId).child("brother").child(currentUser.uid).remove();
                    }
                })
            })
        })
    }

    if(data.children) {
        usersRef.child(currentUser.uid).child("children").once("value").then(snap => {
            snap.forEach(snap2 => {
                usersRef.child(snap2.val()).once("value").then(snap3 => {
                    extFamilyRef.child(snap3.val().extendedId).child(currentUser.uid).remove();
                    
                    if(snap3.val().registered == true) {
                        if(currentUserGender == "female") {
                            userFamilyRef.child(snap2.val()).child("mothers").child(currentUser.uid).remove();
                            usersRef.child(snap2.val()).child("m").remove();
                        } else if(currentUserGender == "male") {
                            userFamilyRef.child(snap2.val()).child("fathers").child(currentUser.uid).remove();
                            usersRef.child(snap2.val()).child("f").remove();
                        }
                    }

                    if(currentUserGender == "female") {
                        immFamilyRef.child(snap3.val().familyId).child("mother").child(currentUser.uid).remove();
                    } else if(currentUserGender == "male") {
                        immFamilyRef.child(snap3.val().familyId).child("father").child(currentUser.uid).remove();
                    }
                })
            })
        })
    }

    if(data.ux) {
        usersRef.child(currentUser.uid).child("ux").once("value").then(snap => {
            snap.forEach(snap2 => {
                usersRef.child(snap2.val()).once("value").then(snap3 => {
                    extFamilyRef.child(snap3.val().extendedId).child(currentUser.uid).remove();
                    usersRef.child(snap2.val()).child("ms").child(currentUser.uid).remove();
                    usersRef.child(snap2.val()).child("vir").child(currentUser.uid).remove();
                    immFamilyRef.child(snap3.val().familyId).child("husband").child(currentUser.uid).remove();

                    if(snap3.val().registered == true) {
                        userFamilyRef.child(snap2.val()).child("husbands").child(currentUser.uid).remove();
                    }
                })
            })
        })
    }

    if(data.vir) {
        usersRef.child(currentUser.uid).child("vir").once("value").then(snap => {
            snap.forEach(snap2 => {
                usersRef.child(snap2.val()).once("value").then(snap3 => {
                    extFamilyRef.child(snap3.val().extendedId).child(currentUser.uid).remove();
                    usersRef.child(snap2.val()).child("ms").child(currentUser.uid).remove();
                    usersRef.child(snap2.val()).child("ux").child(currentUser.uid).remove();
                    immFamilyRef.child(snap3.val().familyId).child("wife").child(currentUser.uid).remove();

                    if(snap3.val().registered == true) {
                        userFamilyRef.child(snap2.val()).child("wives").child(currentUser.uid).remove();
                    }
                })
            })
        })
    }

    extFamilyRef.child(data.extendedId).remove();
    immFamilyRef.child(data.familyId).remove();
    userFamilyRef.child(currentUser.uid).remove();
    usersRef.child(currentUser.uid).remove();

    signOut();
}