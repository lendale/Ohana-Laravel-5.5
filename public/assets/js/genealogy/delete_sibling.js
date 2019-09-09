function deleteSibling(data) {
    usersRef.child(data.key).child("relationship").remove();
    usersRef.child(data.key).child("siblings").child(currentUser.uid).remove();
    usersRef.child(currentUser.uid).child("siblings").child(data.key).remove();

    extFamilyRef.child(currentUserDetails.extendedId).child(data.key).remove();
    extFamilyRef.child(data.extendedId).child(currentUser.uid).remove();

    if(currentUserGender == "female") {
        userFamilyRef.child(data.key).child("sisters").child(currentUser.uid).remove();
        immFamilyRef.child(data.familyId).child("sister").child(currentUser.uid).remove();
    } else if(currentUserGender == "male") {
        userFamilyRef.child(data.key).child("brothers").child(currentUser.uid).remove();
        immFamilyRef.child(data.familyId).child("brother").child(currentUser.uid).remove();
    }

    if(data.gender == "male") {
        userFamilyRef.child(currentUser.uid).child("brothers").child(data.key).remove();
        immFamilyRef.child(currentUserDetails.familyId).child("brother").child(data.key).remove();
    } else if(data.gender == "female") {
        userFamilyRef.child(currentUser.uid).child("sisters").child(data.key).remove();
        immFamilyRef.child(currentUserDetails.familyId).child("sister").child(data.key).remove();       
    }

    usersRef.child(currentUser.uid).child("f").once("value").then(snap => {
        usersRef.child(snap.val()).once("value").then(snap2 => {
            usersRef.child(data.key).child("f").remove();
            usersRef.child(snap.val()).child("children").child(data.key).remove();
            
            userFamilyRef.child(data.key).child("fathers").child(snap.val()).remove();

            immFamilyRef.child(data.familyId).child("father").remove();

            extFamilyRef.child(data.extendedId).child(snap.val()).remove();
            extFamilyRef.child(snap2.val().extendedId).child(data.key).remove();

            if(data.gender == "male") {
                userFamilyRef.child(snap.val()).child("sons").child(data.key).remove();
                immFamilyRef.child((snap2.val()).familyId).child("son").child(data.key).remove();
            } else if(data.gender == "female") {
                userFamilyRef.child(snap.val()).child("daughters").child(data.key).remove();
                immFamilyRef.child((snap2.val()).familyId).child("daughter").child(data.key).remove();
            }
        })
    })

    usersRef.child(currentUser.uid).child("m").once("value").then(snap => {
        usersRef.child(snap.val()).once("value").then(snap2 => {
            usersRef.child(data.key).child("m").remove();
            usersRef.child(snap.val()).child("children").child(data.key).remove();
            
            userFamilyRef.child(data.key).child("mothers").child(snap.val()).remove();
    
            immFamilyRef.child(data.familyId).child("mother").remove();
    
            extFamilyRef.child(data.extendedId).child(snap.val()).remove();
            extFamilyRef.child(snap2.val().extendedId).child(data.key).remove();
    
            if(data.gender == "male") {
                userFamilyRef.child(snap.val()).child("sons").child(data.key).remove();
                immFamilyRef.child((snap2.val()).familyId).child("son").child(data.key).remove();
            } else if(data.gender == "female") {
                userFamilyRef.child(snap.val()).child("daughters").child(data.key).remove();
                immFamilyRef.child((snap2.val()).familyId).child("daughter").child(data.key).remove();
            }
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
                    immFamilyRef.child(data.familyId).child("brother").child(snap2.val()).remove();
                } else if(snap3.val().gender == "female") {
                    userFamilyRef.child(data.key).child("sisters").child(snap2.val()).remove();
                    immFamilyRef.child(data.familyId).child("sister").child(snap2.val()).remove();
                }

                if(data.gender == "male") {
                    userFamilyRef.child(snap2.val()).child("brothers").child(data.key).remove();
                    immFamilyRef.child((snap3.val()).familyId).child("brother").child(data.key).remove();
                } else if(data.gender == "female") {
                    userFamilyRef.child(snap2.val()).child("sisters").child(data.key).remove();
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

    showDeleteSuccess();
    setTimeout(function() {
        return location.reload();
    }, 3000);
}