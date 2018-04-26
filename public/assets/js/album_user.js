var clanId;
var displayName;
var uid;
var uploadtime;
var selectedData;
var albumData = [];


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      retrieveUserImage();
      storeUserImage();
      getUploaderName(uid);
      getUploadTime();
    } else {
      console.log('No signed in user')
    }
});

function retrieveUserImage(){

        uid = firebase.auth().currentUser.uid;
        var photoUrl = document.getElementById('photoUrl');

        var albumRef = firebase.database().ref().child('user_album').child(uid);

        getUserClanId(uid);
        
        albumRef.once('value')
            .then(function(data) {
            
                data.forEach(function(childData) {
                    albumData.push(childData.val())
                    })
            })
            .then(function() {
                var html = '';
                $.each(albumData, function(key, value) {
                    index = key;
                    
                    html += '<div class="col-md-4"><div class="card card-blog"><div class="card-image"><img src="' + value.photoUrl + '" id="photoUrl"></div><div class="card-content"><h5 class="card-subtitle mb-2 text-muted" id="'+key+'"><p>'+  value.caption +'</p></h5><p class="card-description"><i class="material-icons">schedule</i>&nbsp;'+ value.timestamp +'</p><div class="footer"><button class="btn btn-danger btn-round btn-sm" id="'+key+'" onClick="deleteImage(this.id)">delete</button><button class="btn btn-danger btn-round btn-sm" data-toggle="modal" data-target="#updateModal" id="'+key+'" onClick="retrieveCaption(this.id)">update</button></div></div>';
                    
                    html += '</div></div>';
                    
                });
                $('#card-container').html(html);
                // console.log(albumData)
            })   
    }


    function storeUserImage(){
        //Get Element
    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('fileButton');

    //Listen for file selection
    fileButton.addEventListener('change', function(e) {

        //Get File
        var file = e.target.files[0];
        var fileExtension = getFileExtension(file.name);

        var clanPicKey = firebase.database().ref().child('clan_album').push().getKey();

        var testStoreRef = 'album-test/' + clanId + '/' + uid + clanPicKey + '.' + fileExtension;

        var keyRef = clanPicKey;

        //Create a storage ref
        var storageRef = firebase.storage().ref('album-test/' + clanId + '/' + uid + clanPicKey + '.' + fileExtension);
        console.log(file)

        //Upload File
        var task = storageRef.put(file);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader.value = percentage;
                console.log('Upload is ' + percentage + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            function error(err) {
                window.alert('ERROR');
            },

            function complete() {
                uid = firebase.auth().currentUser.uid;
                var caption = document.getElementById('imgCaption');
                var caption = caption.value;

                var uploader = document.getElementById('uploader');
                var downloadURL = task.snapshot.downloadURL;
                var a;

                getUploaderName(uid);
                getUploadTime();

                console.log(displayName)
                console.log(uploadtime)
                var uploadData = {
                    extension: fileExtension,
                    photoUrl: downloadURL,
                    caption: caption,
                    uploader: displayName,
                    timestamp: uploadtime,
                    testStorageRef: testStoreRef,
                    picId: keyRef
                };

                var photoRef = firebase.database().ref('user_album').child(uid);
                var albumRef = firebase.database().ref('users').child(uid);
                var clanRef = firebase.database().ref('clan_album');
                getClanId(uid);

                function getClanId(uid) {
                    albumRef
                        .once("value")
                        .then(function(snapshot) {
                            a = snapshot.val().clanId;
                        })
                        .then(function() {
                            getClanAlbumData(a);
                        });
                }

                function getClanAlbumData(clanID) {
                    var clanAlbumRef = clanRef.child(clanID);
                    clanAlbumRef.child(clanPicKey).set(uploadData);
                }

                photoRef.child(clanPicKey).set(uploadData);

                console.log(uid);
                console.log(uploadData.testStorageRef);
                window.alert('Successfully Uploaded Photo')
                location.reload();
            }
        );
    })
    }

    function getFileExtension(filename) {
        return filename.split('.').pop();
    }
    
    function getUploaderName(uid){
        firebase
            .database()
            .ref()
            .child('users')
            .child(uid)
            .once("value")
            .then(function(snapshot) {
                 displayName = snapshot.val().displayName;
            })
    }

    function getUploadTime(){
        var currentdate = new Date(); 
        var day;
        if (currentdate.getDay() == 0){
            day = 'Sunday'
        }
        if (currentdate.getDay() == 1){
            day = 'Monday'
        }
        if (currentdate.getDay() == 2){
            day = 'Tuesday'
        }
        if (currentdate.getDay() == 3){
            day = 'Wednesday'
        }
        if (currentdate.getDay() == 4){
            day = 'Thursday'
        }
        if (currentdate.getDay() == 5){
            day = 'Friday'
        }
        if (currentdate.getDay() == 6){
            day = 'Saturday'
        }
        uploadtime = day + ', '
                        + (currentdate.getMonth()+1) + "/"
                        + currentdate.getDate()  + "/" 
                        + currentdate.getFullYear() + " @ "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();
        // console.log(uploadtime)
    }
    

    function getUserClanId(uid) {
        firebase
            .database()
            .ref()
            .child('users')
            .child(uid)
            .once("value")
            .then(function(snapshot) {
                clanId = snapshot.val().clanId;
            })
    }

    
    function deleteImage(clicked_key){

        var x = albumData[clicked_key];

        var user_picRef = firebase.database().ref().child('user_album').child(uid);
        var clan_picRef = firebase.database().ref().child('clan_album').child(clanId);


    if(confirm("Are you sure you want to delete this photo?")) {


            user_picRef.on("child_added", function(child){
            
                if(child.key == x.picId){
                   
                    //delete sa user_album
                    var u_dataDel = user_picRef.child(x.picId);
                    u_dataDel.remove()
                    .then(function() {
                        
                    // delete sa clan_album
                    var c_dataDel = clan_picRef.child(x.picId);
                    c_dataDel.remove()
                    .then(function(){
                                         
                    // delete sa storage
                    var testDel = firebase.storage().ref(x.testStorageRef);
                    testDel.delete()
                    .then(function(){
                    alert('Image Deleted!')
                    location.reload()
                    
                    })
                    })
                    }).catch(function(error) {
                        console.log('error');
                      });
                 }
                })

        } else {
            location.reload();
        }   
    }

    function retrieveCaption(clicked_key){

        selectedData =  albumData[clicked_key];
        if(confirm("Are you sure you want to update the caption?")) {
            saveNewCaption();
        }else{
            location.reload();
        }
        
    }

    function saveNewCaption(){
        
        var cap = document.getElementById('picCap').value;

        var user_capRef = firebase.database().ref().child('user_album').child(uid);
        var clan_capRef = firebase.database().ref().child('clan_album').child(clanId);

        user_capRef.orderByChild("caption").on("child_added", function(childData) {

            if(childData.key == selectedData.picId){
            
            var updatedCap = { caption: cap }

            // update in user_album
            var u_capUpd = user_capRef.child(selectedData.picId)
            u_capUpd.update(updatedCap)
            .then(function(){
                
            // update in clan_album
            var c_capUpd = clan_capRef.child(selectedData.picId)
            c_capUpd.update(updatedCap)
            
            })
            .catch(function(error) {
                console.log('error');
              });
                
            }
          });
    
    }