function deleteParent(data) {
    extFamilyRef.child(data.extendedId).child(currentUser.uid).remove();
    extFamilyRef.child(currentUserDetails.extendedId).child(data.key).remove();

    if(data.relationship == "father") {
        usersRef.child(data.key).child("relationship").remove();
        usersRef.child(data.key).child("children").child(currentUser.uid).remove();
        usersRef.child(currentUser.uid).child("f").remove();

        if(currentUserGender == "female") {
            userFamilyRef.child(data.key).child("daughters").child(currentUser.uid).remove();
            userFamilyRef.child(currentUser.uid).child("fathers").child(data.key).remove();

            immFamilyRef.child(data.familyId).child("daughter").child(currentUser.uid).remove();
            immFamilyRef.child(currentUserDetails.familyId).child("father").remove();
        } else if(currentUserGender == "male") {
            userFamilyRef.child(data.key).child("sons").child(currentUser.uid).remove();
            userFamilyRef.child(currentUser.uid).child("fathers").child(data.key).remove();

            immFamilyRef.child(data.familyId).child("son").child(currentUser.uid).remove();
            immFamilyRef.child(currentUserDetails.familyId).child("father").remove();
        }
    
        usersRef.child(currentUser.uid).child("siblings").once("value").then(snap => {
            snap.forEach(snap2 => {
                usersRef.child(snap2.val()).once("value").then(snap3 => {
                    usersRef.child(data.key).child("children").child(snap2.val()).remove();
                    usersRef.child(snap2.val()).child("f").remove();
    
                    if(snap3.val().gender == "male") {
                        userFamilyRef.child(data.key).child("sons").child(snap2.val()).remove();
                        userFamilyRef.child(snap2.val()).child("fathers").child(data.key).remove();
                        
                        immFamilyRef.child(data.familyId).child("son").child(snap2.val()).remove();
                        immFamilyRef.child(snap3.val().familyId).child("father").remove();
    
                        extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                        extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                    } else if(snap3.val().gender == "female") {
                        userFamilyRef.child(data.key).child("daughters").child(snap2.val()).remove();
                        userFamilyRef.child(snap2.val()).child("fathers").child(data.key).remove();
                        
                        immFamilyRef.child(data.familyId).child("daughter").child(snap2.val()).remove();
                        immFamilyRef.child(snap3.val().familyId).child("father").remove();
    
                        extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                        extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                    }
                })
            })
        })
        
        usersRef.child(currentUser.uid).child("m").once("value").then(snap => {
            usersRef.child(snap.val()).once("value").then(snap2 => {
                usersRef.child(snap.val()).child("ms").child(data.key).remove();
                usersRef.child(snap.val()).child("vir").child(data.key).remove();
    
                usersRef.child(data.key).child("ms").child(snap.val()).remove();
                usersRef.child(data.key).child("ux").child(snap.val()).remove();
    
                userFamilyRef.child(data.key).child("wives").child(snap.val()).remove();
                userFamilyRef.child(snap.val()).child("husbands").child(data.key).remove();
    
                immFamilyRef.child(data.familyId).child("wife").child(snap.val()).remove();
                immFamilyRef.child(snap2.val().familyId).child("husband").child(data.key).remove();
    
                extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                extFamilyRef.child(snap2.val().extendedId).child(data.key).remove();
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
    } else if(data.relationship == "mother") {
        usersRef.child(data.key).child("relationship").remove();
        usersRef.child(data.key).child("children").child(currentUser.uid).remove();
        usersRef.child(currentUser.uid).child("m").remove();

        if(currentUserGender == "female") {
            userFamilyRef.child(data.key).child("daughters").child(currentUser.uid).remove();
            userFamilyRef.child(currentUser.uid).child("fathers").child(data.key).remove();

            immFamilyRef.child(data.familyId).child("daughter").child(currentUser.uid).remove();
            immFamilyRef.child(currentUserDetails.familyId).child("father").remove();
        } else if(currentUserGender == "male") {
            userFamilyRef.child(data.key).child("sons").child(currentUser.uid).remove();
            userFamilyRef.child(currentUser.uid).child("fathers").child(data.key).remove();

            immFamilyRef.child(data.familyId).child("son").child(currentUser.uid).remove();
            immFamilyRef.child(currentUserDetails.familyId).child("father").remove();
        }
    
        usersRef.child(currentUser.uid).child("siblings").once("value").then(snap => {
            snap.forEach(snap2 => {
                usersRef.child(snap2.val()).once("value").then(snap3 => {
                    usersRef.child(data.key).child("children").child(snap2.val()).remove();
                    usersRef.child(snap2.val()).child("m").remove();
    
                    if(snap3.val().gender == "male") {
                        userFamilyRef.child(data.key).child("sons").child(snap2.val()).remove();
                        userFamilyRef.child(snap2.val()).child("mothers").child(data.key).remove();
                        
                        immFamilyRef.child(data.familyId).child("son").child(snap2.val()).remove();
                        immFamilyRef.child(snap3.val().familyId).child("mother").remove();
    
                        extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                        extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                    } else if(snap3.val().gender == "female") {
                        userFamilyRef.child(data.key).child("daughters").child(snap2.val()).remove();
                        userFamilyRef.child(snap2.val()).child("mothers").child(data.key).remove();
                        
                        immFamilyRef.child(data.familyId).child("daughter").child(snap2.val()).remove();
                        immFamilyRef.child(snap3.val().familyId).child("mother").remove();
    
                        extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                        extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
                    }
                })
            })
        })
        
        usersRef.child(currentUser.uid).child("f").once("value").then(snap => {
            usersRef.child(snap.val()).once("value").then(snap2 => {
                usersRef.child(snap.val()).child("ms").child(data.key).remove();
                usersRef.child(snap.val()).child("ux").child(data.key).remove();
    
                usersRef.child(data.key).child("ms").child(snap.val()).remove();
                usersRef.child(data.key).child("vir").child(snap.val()).remove();
    
                userFamilyRef.child(data.key).child("husbands").child(snap.val()).remove();
                userFamilyRef.child(snap.val()).child("wives").child(data.key).remove();
    
                immFamilyRef.child(data.familyId).child("husband").child(snap.val()).remove();
                immFamilyRef.child(snap2.val().familyId).child("wife").child(data.key).remove();
    
                extFamilyRef.child(data.extendedId).child(snap.val()).remove();
                extFamilyRef.child(snap2.val().extendedId).child(data.key).remove();
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

    showDeleteSuccess();
    setTimeout(function() {
        return location.reload();
    }, 3000);
}