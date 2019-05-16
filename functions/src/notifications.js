const functions = require('firebase-functions');
const admin = require('firebase-admin');
const index = require('../index')


exports.sendNotifications = function(event) {

    var currUser = event.params.uid;



    if (event.data.previous.val()) {
        return;
    }

    if (!event.data.exists()) {
        return;
    }
    // Setup notification
    const NOTIFICATION_SNAPSHOT = event.data;

    const payload = message();

    function message(a) {
        const message = NOTIFICATION_SNAPSHOT.val().message;


        if (message == 'Obituary') {

            var msg = {
                notification: {
                    title: `Ohana`,
                    body: `${NOTIFICATION_SNAPSHOT.val().message} invitation`,
                    icon: NOTIFICATION_SNAPSHOT.val().avatar,
                    // click_action: `https://${functions.config().firebase.authDomain}/events`
                    click_action: `localhost:8000/events`
                }
            }


        } else if (message == 'Wedding') {
            var msg = {
                notification: {
                    title: `Ohana`,
                    body: `You have been invited to a ${NOTIFICATION_SNAPSHOT.val().message} from ${NOTIFICATION_SNAPSHOT.val().user}`,
                    icon: NOTIFICATION_SNAPSHOT.val().avatar,
                    // click_action: `https://${functions.config().firebase.authDomain}/events`
                    click_action: `localhost:8000/events`
                }
            }

        } else if (message == 'Baptism') {
            var msg = {
                notification: {
                    title: `Ohana`,
                    body: `You have been invited to a ${NOTIFICATION_SNAPSHOT.val().message} from ${NOTIFICATION_SNAPSHOT.val().user}`,
                    icon: NOTIFICATION_SNAPSHOT.val().avatar,
                    // click_action: `https://${functions.config().firebase.authDomain}/events`
                    click_action: `localhost:8000/events`
                }
            }

        } else {
            var msg = {
                notification: {
                    title: `Ohana`,
                    body: `Reminder: You've got an Event comming up today.`,
                    icon: NOTIFICATION_SNAPSHOT.val().avatar,
                    // click_action: `https://${functions.config().firebase.authDomain}/events`
                    click_action: `localhost:8000/events`
                }
            }

        }
        const msgPayload = msg;


        return msgPayload;



    }


    const gen_id = admin.database().ref().child('users').child(currUser).child('clanId');
    gen_id.once('value').then(function(snapshot) {

        key = snapshot.val();

        return admin.database().ref('tokens').child(key).once('value').then((data) => {

            if (!data.val()) return;

            const snapshot = data.val();
            const tokens = [];
            const tokensWithKey = [];


            const userToken = admin.database().ref('tokens').child(key).child(currUser).child('token');
            userToken.once('value').then((data) => {

                const currToken = data.val();

                for (let key in snapshot) {

                    if (snapshot[key].token != currToken) {
                        tokens.push(snapshot[key].token);
                        tokensWithKey.push({
                            token: snapshot[key].token,
                            key: key
                        });
                    } else {

                        console.log('Wai labot ang user');
                    }
                }

                return admin.messaging().sendToDevice(tokens, payload)
                    // .then((response) => cleanInvalidTokens(tokensWithKey, response.results))
                    .then(() => admin.database().ref('/notifications').child(currUser).child(NOTIFICATION_SNAPSHOT.key).remove())
                    .catch(function(err) {
                        return eRKey.remove()
                        console.log('naay error')
                    });


            });
        });
    });
}