function deleteSpouse(data) {
    var userChild = [];
    var spouseChild = [];
    var commonChild = [];

    usersRef.child(currentUser.uid).once("value").then(user => {
        usersRef.child(data.key).once("value").then(data1 => {
            for(var a in user.val().children) userChild.push(a)
            for(var b in data1.val().children) spouseChild.push(b)

            userChild.filter(function(n) {
                if (spouseChild.includes(n) == true) {
                    commonChild.push(n)
                }
                console.log("commonChild", commonChild)
            })
            
            if(commonChild.length == 0) {
                usersRef.child(data.key).child("maritalStatus").remove();
                usersRef.child(data.key).child("relationship").remove();
                usersRef.child(data.key).child("ms").child(currentUser.uid).remove();
                usersRef.child(data.key).child("vir").child(currentUser.uid).remove();
                usersRef.child(data.key).child("ux").child(currentUser.uid).remove();
                usersRef.child(currentUser.uid).child("ms").child(data.key).remove();
                usersRef.child(currentUser.uid).child("vir").child(data.key).remove();
                usersRef.child(currentUser.uid).child("ux").child(data.key).remove();
        
                extFamilyRef.child(data.extendedId).child(currentUser.uid).remove();
                extFamilyRef.child(currentUserDetails.extendedId).child(data.key).remove();
        
                usersRef.child(currentUser.uid).child("children").once("value").then(snap => {
                    snap.forEach(snap2 => {
                        usersRef.child(snap2.val()).once("value").then(snap3 => {
                            extFamilyRef.child(data.extendedId).child(snap2.val()).remove();
                            extFamilyRef.child(snap3.val().extendedId).child(data.key).remove();
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
        
                if(data.relationship == "husband") {
                    userFamilyRef.child(data.key).child("wives").child(currentUser.uid).remove();
                    userFamilyRef.child(currentUser.uid).child("husbands").child(data.key).remove();
                
                    immFamilyRef.child(data.familyId).child("wife").child(currentUser.uid).remove();
                    immFamilyRef.child(currentUserDetails.familyId).child("husband").child(data.key).remove();
                } else if(data.relationship == "wife") {
                    userFamilyRef.child(data.key).child("husbands").child(currentUser.uid).remove();
                    userFamilyRef.child(currentUser.uid).child("wives").child(data.key).remove();
                
                    immFamilyRef.child(data.familyId).child("husband").child(currentUser.uid).remove();
                    immFamilyRef.child(currentUserDetails.familyId).child("wife").child(data.key).remove();
                }
        
                showDeleteSuccess();
                setTimeout(function() {
                    return location.reload();
                }, 3000);
            } else {
                $("#error_details")
                    .modal('show');
        
                $("#error_details_node")
                    .empty()
                    .append('You cannot delete any spouse if you have common children.');
        
                setTimeout(function() {
                    $("#error_details").modal('hide');
                }, 3000);
            }
        })
    })
}