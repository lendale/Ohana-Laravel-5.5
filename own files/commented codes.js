// genealogy
// userFamilyRef.child('-LAyiGdITnq2BBb_GwK4').once('value').then(snap => {
//     console.log('SNAP', snap.val())
// })

// userFamilyRef.once('value').then(snap => {
//     // console.log('SNAP', snap.val())
//     snap.forEach(childSnap => {
//         let val = childSnap.val()

//         let mothers = val.mothers

//         if (!(val.fathers === null || val.fathers === undefined)) {
//             let fathers = Object.entries(val.fathers)


//             console.log('FA', fathers)
//         }

//         // console.log('VAL', val.fathers)
//     })
// })

// userFamilyRef.child(uid).child('spouse_keys').child('ux').once('value').then(snap => {

//     if (!(snap.val() === undefined || snap.val() === null)) {
//         motherKeys = Object.keys(snap.val());
//         motherNames = Object.values(snap.val());

//         snap.forEach(childSnap => {
//             let div = $(`
//                     <div class="radio">
//                         <label>
//                             <input type="radio" name="availableParents" value="${childSnap.key}">
//                             ${currentUser.displayName} and ${childSnap.val()}
//                         </label>
//                     </div>
//                 `);
//             div.appendTo("#parents_container");
//         });
//     } else {
//         return;
//     }
// });