     const messaging = firebase.messaging();
     const sendNotificationForm = document.getElementById('send-notification-form');
     // const request = require('request');
     sendNotificationForm.addEventListener('submit', sendNotification);

     function tokenRefresh() {

         const currUser = firebase.auth().currentUser.uid;
         const gen_id = firebase.database().ref().child('users').child(currUser).child('clanId');
         gen_id.once('value').then(function(snapshot) {

             var key = snapshot.val();
             console.log(key)


             return messaging.getToken()
                 .then(function(token) {


                     var firebaseRef = firebase.database().ref('/tokens');
                     firebaseRef
                         .child(key)
                         .push({
                             token: token,
                             uid: currUser

                         });
                 })
         })


         // firebase.auth().currentUser.getIdToken(true)
         //     .then(function(idToken) {



         //             request.post(
         //                 'https://us-central1-fir-authuiscreencast-59aa5.cloudfunctions.net/idToken', { json: { key: idToken } },
         //                 function(error, response, body) {
         //                     if (!error && response.statusCode == 200) {
         //                         console.log(body)
         //                     }
         //                 }
         //             );

         //           })
     }


     function sendNotification(e) {
         e.preventDefault();

         const notificationMessage = document.getElementById('notification-message').value;

         var firebaseRef = firebase.database().ref('/notifications');

         firebaseRef.push({
                 user: firebase.auth().currentUser.displayName,
                 message: notificationMessage,
                 avatar: firebase.auth().currentUser.photoURL
             }).then(() => {
                 document.getElementById('notification-message').value = "";
             })
             .catch(() => {
                 console.log("error sending notifications")
             });


     }

     var userId;

     firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
             userId = user.uid;
             messaging.requestPermission()
                 .then(function() {
                     console.log('Permision Granted');
                     return messaging.getToken();
                 })
                 .then(() => tokenRefresh())
                 .catch(function(err) {
                     console.log(err);
                 });
         } else {

             console.log('no user logged in');

         }
     });