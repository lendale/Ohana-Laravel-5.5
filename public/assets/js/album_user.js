var clanId;
var uid;
var extendedId;
var familyId;
var selectedAlbumData;
var albumKey;
var currentUser;
var albumData = [];
var photoData = [];

var usersRoot = firebase.database().ref().child('users');
var userAlbumRoot = firebase.database().ref().child('album_user')
var clanAlbumRoot = firebase.database().ref().child('album_clan')
var extAlbumRoot = firebase.database().ref().child('album_extend')
var immAlbumRoot = firebase.database().ref().child('album_immediate')


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        uid = currentUser.uid;
    
    // getUserClanId(currentUser.uid)
    // retrieveAlbumsFromUsers();
    
    console.log(currentUser.displayName)
    console.log(uid)
    console.log('You are logged in!')
    } else {
      console.log('No signed in user')
    }
});

// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    getUserClanId(currentUser.uid)
    retrieveAlbumsFromUsers()
});

$('#album_cover').change(handleAlbumInStr);
$('#album_photo').change(handlePhotoInStr)

function handleAlbumInStr(eventData){
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();

    albumKey = firebase.database().ref().child('album-cover').push().getKey();
    var strRef = 'ALBUM/' + '/' +albumKey + '/' + fileExtension;
    var albumStorageRef = firebase.storage().ref(strRef);

    console.log('FILE:', file)
    console.log('FILENAME:', fileName)
    console.log('FILE EXTENSION:', fileExtension)

    $('#create_album').on('click', function(){

        console.log('FILE TO STORAGE:', file)
        var task = albumStorageRef.put(file);
        console.log('file was stored in storage')
        task.on('state_changed',

            function complete(){
                uid = firebase.auth().uid;
                var albumCoverURL = task.snapshot.downloadURL;
                console.log(albumCoverURL)

                swal({
                    imageUrl: "assets/img/icons/loader.gif",
                    imageWidth: '90',
                    imageHeight: '90',
                    title: 'Processing Album Creation..',
                    timer: 9000,
                    showConfirmButton: false
                    // onClose: saveAlbumToDB
                  }).then(function() {},

                  function(dismiss) {
                      if (dismiss === "timer") {
                        storeAlbumInDb(albumCoverURL,albumKey,strRef);
                        console.log("kalusot sad sa function");
                        // window.location.href = "/genealogy";
                      }
                  });
            })
    })
}

function storeAlbumInDb(albumCoverURL, albumKey, strRef){
    console.log('LOCATION: STOREALBUMINDB', albumCoverURL)
    var album_data = new Object()
    var album_name = $('#album_name').val();
    var album_description = $('#album_description').val();
    var album_privacy = $("input[name='album_privacy']:checked").val();
    uid = firebase.auth().currentUser.uid;
    
    // getUploaderName(uid);  
    getTime()
    getDate()

    console.log(currentUser.displayName)

    album_data = {
        album_url: strRef,
        album_key: albumKey,
        album_cover: albumCoverURL,
        album_name: album_name,
        album_description: album_description,
        album_time: uploadTime,
        album_date: uploadDate,
        album_creator: currentUser.displayName,
        album_privacy: album_privacy
    }
    
    console.log('ALBUM_DATA:', album_data)

    var albumDataRef = firebase.database().ref().child('album_user').child(currentUser.uid).child(albumKey);
    var clanRef = firebase.database().ref('album_clan');
    var immRef = firebase.database().ref('album_immediate');
    var extRef = firebase.database().ref('album_extend');
    var userRef = firebase.database().ref('users').child(currentUser.uid);
    
    if(album_privacy == 'Clan'){
            getClanId(uid);
            function getClanId(uid) {
                userRef.once("value")
                    .then(function(snapshot) {
                        var clanId = snapshot.val().clanId;
                    })
                    .then(function() {
                        pushClanId(clanId);
                    });
            }
            function pushClanId(clanID) {
                clanRef.child(clanID).child(albumKey).set(album_data);
                console.log("SUD SA CLAN DB")
            }
    }
    if(album_privacy == 'Extended Family'){
        getExtId(uid);
        function getExtId(uid){
            userRef.once("value")
            .then(function(snapshot){
                var extendedId = snapshot.val().extendedId;
                console.log(extendedId)
                pushExtId(extendedId)
            })
        }
        function pushExtId(extendedId){
            extRef.child(extendedId).child(albumKey).set(album_data)
            console.log("SUD SA EXT DB")
        }
    }
    if (album_privacy == 'Immediate Family'){
        getImmId(uid)
        function getImmId(uid){
            userRef.once("value")
            .then(function(snapshot){
                var familyId = snapshot.val().familyId;
                pushImmId(familyId)
            })
        }
        function pushImmId(familyId){
            immRef.child(familyId).child(albumKey).set(album_data)
            console.log("SUD SA IMM DB")
        }
    }

    clanRef.child(clanId).child(albumKey).set(album_data);
    albumDataRef.set(album_data);

    showSuccess()

}

function getClanId(uid) {
    firebase.database().ref('users').child(currentUser.uid).once("value")
        .then(function(snapshot) {
            clanId = snapshot.val().clanId;
        })
}

function retrieveUserImage(){

        uid = firebase.auth().currentUser.uid;
        var photoURL = document.getElementById('photoURL');

        var albumRef = firebase.database().ref().child('album_user').child(uid);

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
                    
                    html += '<div class="col-md-4"><div class="card card-blog"><div class="card-image"><img src="' + value.photoURL + '" id="photoURL"></div><div class="card-content"><p class="card-description" id="'+key+'"><p>'+  value.caption +'</p><div class="footer"><i class="material-icons">schedule</i>&nbsp;'+ value.timestamp +'<br><button class="btn btn-danger btn-round btn-sm" id="'+key+'" onClick="deleteImage(this.id)">delete</button><button class="btn btn-danger btn-round btn-sm" data-toggle="modal" data-target="#updateModal" id="'+key+'" onClick="retrieveCaption(this.id)">update</button></div></div>';
                    
                    html += '</div></div>';
                    
                });
                $('#card-container').html(html);
                // console.log(albumData)
            })   
}

function getDate(){
    var currentdate = new Date();
    var month;

    if (currentdate.getMonth()+1 == 12){
        month = 'Dec';
    }
    if (currentdate.getMonth()+1 == 11){
        month = 'Nov';
    }
    if (currentdate.getMonth()+1 == 10){
        month = 'Oct';
    }
    if (currentdate.getMonth()+1 == 9){
        month = 'Sept';
    }
    if (currentdate.getMonth()+1 == 8){
        month = 'Aug';
    }
    if (currentdate.getMonth()+1 == 7){
        month = 'Jul';
    }
    if (currentdate.getMonth()+1 == 6){
        month = 'Jun';
    }
    if (currentdate.getMonth()+1 == 5){
        month = 'May';
    }
    if (currentdate.getMonth()+1 == 4){
        month = 'Apr';
    }
    if (currentdate.getMonth()+1 == 3){
        month = 'Mar';
    }
    if (currentdate.getMonth()+1 == 2){
        month = 'Feb';
    }
    if (currentdate.getMonth()+1 == 1){
        month = 'Jan';
    }
 
    uploadDate = month + " " +currentdate.getDate()  + "," + currentdate.getFullYear();

    console.log(uploadDate)
}

function getTime(){
    var currentdate = new Date();
    var meridiem;
    var hour;

    if (currentdate.getHours() > 12){
        meridiem = 'PM'
        hour = currentdate.getHours() - 12;
   }
   if(currentdate.getHours() < 11){
       meridiem = 'AM'
   }
   if(currentdate.getHours() == 12){
       meridiem = 'NOON'
   }

   uploadTime = hour + ":" + currentdate.getMinutes() + " " + meridiem;
   console.log(uploadTime)
}

function showSuccess() {
        swal({
            // imageUrl: "assets/img/grow-tree.gif",
            title: "Album Created Successfully",
            // text: "Please wait",
            timer: 5000,
            showConfirmButton: false,
            type: "success"
        }).then(function() {},

        function(dismiss) {
            if (dismiss === "timer") {
                location.reload()
            }
        })
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
            // console.log(clanId)
        })
}

function retrieveAlbumsFromUsers(){
    
    var albumDataRef = firebase.database().ref().child('album_user').child(currentUser.uid);

    albumDataRef.once('value')
        .then(function(data){
            data.forEach(function(childData){
                albumData.push(childData.val())
            })
        })
        .then(function(){
            var html = '';
            $.each(albumData, function(key,value){
                index=key;
                html+= '<div class="col-md-4"><div class="card card-blog"><div class="card-image"><img src="' + value.album_cover + '" id="cover" style="width:250px;height:220px;"><div class="card-title"><p id="name">'+ value.album_name+'</p></div></div><div class="card-content"><div class="card-description"><i><p id="description">'+value.album_description+'</p></i></div><div class="footer" align="left"><div id="creator">'+value.album_creator+'</div><br><div id="timestamp">'+value.album_date+'</div><br><div id="privacy"><strong>'+value.album_privacy+'</strong></div></div><div class="footer"><a type="button" id="'+key+'" onClick="retrieveAlbumPhotos(this.id)" href="#" data-toggle="tooltip" data-placement="bottom" title="View Photos" class="btn btn-info btn-just-icon btn-fill btn-round btn-sm"><i class="material-icons">photo_library</i></a><a type="button" href="" title="Edit Album Information" class="btn btn-success btn-just-icon btn-fill btn-round btn-wd btn-sm" data-toggle="modal" data-target="#updateModal" id="'+key+'" onClick="updateAlbum(this.id)"><i class="material-icons">edit</i></a><a type="button" href="#pablo" data-toggle="tooltip" data-placement="bottom" title="Delete Album" class="btn btn-danger btn-just-icon btn-fill btn-round btn-sm" id="'+key+'" onClick="deleteAlbum(this.id)"><i class="material-icons">delete_forever</i></a></div></div></div></div>';

            })
            $('#card-container').html(html);
        })
}

function getAlbumList(){
    var albumDataRef = firebase.database().ref().child('album_user').child(currentUser.uid);

    if(albumDataRef == null){
        alert('you do not have album to upload PLEASE CREATE AN ALBUM FIRST')
    }

    else{
        albumDataRef.once('value')
        .then(function(data){
        var html = '';
        html +='<select required><option disabled>Select Album Name To Upload Photo</option>'
        data.forEach(function(childData){
            albumData.push(childData.val())
            html+='<option id="photo_album" value='+ childData.val().album_key+'>'+ childData.val().album_name+'</option>'
        })
        
        html+='</select>'
        $('#all_album_list').html(html);
        $('')
    })   
    }

   
}

function handlePhotoInStr(eventData){
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    photoKey = firebase.database().ref().child('album-photos').push().getKey();
    var strRef = 'PHOTOS/' +photoKey + '/' + fileExtension;
    var photoStorageRef = firebase.storage().ref(strRef)

    console.log('FILE:', file)
    console.log('FILENAME:', fileName)
    console.log('FILE EXTENSION:', fileExtension)

    $('#upload_photo').on('click', function(){
        var task = photoStorageRef.put(file)
        console.log('file was stored!')

        task.on('state_changed',
            function complete(){
                uid = firebase.auth().uid
                var photoURL = task.snapshot.downloadURL
                console.log(photoURL)

                swal({
                    imageUrl: "assets/img/icons/loader.gif",
                    imageWidth: '90',
                    imageHeight: '90',
                    title: 'Uploading Photo',
                    text: "This might take a while..",
                    timer: 9000,
                    showConfirmButton: false
                }).then(function(){},
                    function(dismiss) {
                        if (dismiss === "timer") {
                        storePhotoInDb(photoURL,photoKey, strRef);
                        console.log("kalusot sad sa function");
                        // window.location.href = "/genealogy";
                        }
                    })
            })
    })
}

function storePhotoInDb(photoURL, photoKey, strRef){
    var photo_data = new Object()
    var photo_albumKey = $("option[id='photo_album']:selected").val();
    var photo_caption = $('#photo_caption').val();

    getDate()
    getTime()

    photo_data = {
        photo_link: strRef,
        photo_key: photoKey,
        photo_url: photoURL,
        photo_time: uploadTime,
        photo_date: uploadDate,
        photo_caption: photo_caption,
        photo_uploader: currentUser.displayName
    }

    console.log('PHOTO DATA:', photo_data)

    var photoDataRef = firebase.database().ref().child('album_user').child(currentUser.uid).child(photo_albumKey);

    var clanRef = firebase.database().ref('album_clan');
    var immRef = firebase.database().ref('album_immediate');
    var extRef = firebase.database().ref('album_extend');
    var userRef = firebase.database().ref('users').child(currentUser.uid);

    photoDataRef.once("value")
        .then(function(snapshot){
            var albumPrivacy = snapshot.val().album_privacy;
            console.log(albumPrivacy)

            if(albumPrivacy == 'Extended Family')
            {
                getExtId(uid);
                function getExtId(uid){
                    userRef.once("value")
                    .then(function(snapshot){
                        var extendedId = snapshot.val().extendedId;
                        console.log(extendedId)
                        pushExtId(extendedId)
                    })
                }
                function pushExtId(extendedId){
                    extRef.child(extendedId).child(photo_albumKey).child('album_photos').child(photoKey).update(photo_data);
                    console.log("SUD SA EXT DB")
                }
            }

            if(albumPrivacy == 'Immediate Family')
            {
                getImmId(uid)
                function getImmId(uid){
            
                    userRef.once("value")
                    .then(function(snapshot){
                        var familyId = snapshot.val().familyId;
                        pushImmId(familyId)
                    })
                }
                function pushImmId(familyId){
                    immRef.child(familyId).child(photo_albumKey).child('album_photos').child(photoKey).update(photo_data);
                    console.log("SUD SA IMM DB")
                }
            }

            clanRef.child(clanId).child(photo_albumKey).child('album_photos').child(photoKey).update(photo_data);
            photoDataRef.child('album_photos').child(photoKey).update(photo_data);

            showSuccessPhoto()
        })

}

function retrieveAlbumPhotos(clicked_key){
    selectedAlbumData =  albumData[clicked_key];
    console.log(selectedAlbumData.album_key)
    console.log(selectedAlbumData.album_name)

    var selectedPhotoRef = firebase.database().ref().child('album_user').child(currentUser.uid).child(selectedAlbumData.album_key).child('album_photos');

    var button = '<a type="button" onclick="location.reload()" class="btn btn-danger btn-sm" title="Back To Album">Back To Album</a>';

    $('#section').html(button);


    console.log(selectedPhotoRef)

    selectedPhotoRef.once('value')
    .then(function(data){
        data.forEach(function(childData){
            console.log(data)
            console.log(childData)
            photoData.push(childData.val())
        })
    })
    .then(function(){
        var sa = '';
        $.each(photoData, function(key,value){
                
                console.log(value.photo_caption)
                console.log(value.photo_key)
            
            sa+= '<div class="col-md-4"><div class="card card-blog"><div class="card-image"><img src="' + value.photo_url + '" id="photo" style="width:250px;height:220px;"></div><div class="card-content"><div class="card-description"><i><p id="caption">'+value.photo_caption+'</p></i></div><div class="footer" align="left"><div id="uploader"><strong>'+value.photo_uploader+'</strong></div><br><div id="time">'+value.photo_time+'</div></div><div class="footer"></div></div></div></div>';
        })
        $('#card-container').html(sa);
    })
    // <a type="button" href="#pablo" data-toggle="tooltip" data-placement="bottom" title="Update Caption" class="btn btn-danger btn-round btn-sm" data-target="" id="'+key+'" onClick="updateAlbum(this.id)">Update</a><a type="button" href="#pablo" data-toggle="tooltip" data-placement="bottom" title="Delete Photo" class="btn btn-danger btn-round btn-sm" id="'+key+'" onClick="deletePhoto(this.id)">Delete</a>
}

function showSuccessPhoto() {
    swal({
        // imageUrl: "assets/img/grow-tree.gif",
        title: "Photo Uploaded Successfully",
        // text: "Please wait",
        timer: 5000,
        showConfirmButton: false,
        type: "success"
    }).then(function() {},

    function(dismiss) {
        if (dismiss === "timer") {
            location.reload()
        }
    })
}

function deleteAlbum(clicked_key){

    var delete_selected = albumData[clicked_key];

    var userAlbumRef = firebase.database().ref().child('album_user').child(uid);
    var clanAlbumRef = firebase.database().ref().child('album_clan').child(clanId);

    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this album!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((isConfirm) => {
        if (isConfirm) {
            continueDelete()
        }
      })

    function continueDelete(){
        if(delete_selected.album_privacy == 'Extended Family'){
            getExtId(uid);
                function getExtId(uid) {
                var userRef = firebase.database().ref().child('users').child(uid);
                userRef.once("value")
                    .then(function(snapshot) {
                        extendedId = snapshot.val().extendedId;
                    }).then(function(){
                        var extAlbumRef = firebase.database().ref().child('album_extend').child(extendedId);
                        extAlbumRef.remove()
                    }).then(function(){
                        deleteInStr();
                    })
                }
        }

        if(delete_selected.album_privacy == 'Immediate Family'){
            getImmId(uid);
                function getImmId(uid) {
                var userRef = firebase.database().ref().child('users').child(uid);
                userRef.once("value")
                    .then(function(snapshot) {
                        familyId = snapshot.val().familyId;
                    }).then(function(){
                        var immAlbumRef = firebase.database().ref().child('album_immediate').child(familyId);
                        immAlbumRef.remove();
                    }).then(function(){
                        deleteInStr();
                    })
                }
        }

        function deleteInStr(){
            userAlbumRef.child(delete_selected.album_key).remove()
            .then(function(){
                clanAlbumRef.child(delete_selected.album_key).remove()
                .then(function(){
                    var albumStr = firebase.storage().ref(delete_selected.album_url)
                    albumStr.delete()
                }).then(function(){
                    swal(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                    location.reload()
                })
            })
        }
        
  
    }
}

function updateAlbum(clicked_key){

    var clicked_album = albumData[clicked_key];

    var namee = '';
    var descc = '';
    // var pri = '';

    namee+= '<label class="control-label"><strong>New Album Name</strong> (required)</label><input type="text" id="update_name" class="form-control" placeholder= "'+clicked_album.album_name+'" value="'+clicked_album.album_name+'" required>';

    $('#for-name').html(namee);

    descc += '<label class="control-label"><strong>Add New Album Description</strong>(required)</label><input type="text" class="form-control" id="update_description" rows="3" placeholder= "'+clicked_album.album_description+'" value="'+clicked_album.album_description+'" required>';

    $('#for-desc').html(descc);

    $('#update_album').on('click', function(){
        var name = $('#update_name').val();
        var desc = $('#update_description').val();
        var privacy = $("input[name='update_privacy']:checked").val();

        var update_data = {
            album_name: name,
            album_description: desc,
        }

        console.log('name:', name)
        console.log('desc:',desc)
        // console.log('pri:', privacy 

        if(clicked_album.album_privacy == 'Extended Family'){
                getExtId(uid);
                function getExtId(uid){
                    usersRoot.child(currentUser.uid).once("value")
                    .then(function(snapshot){
                        var extendedId = snapshot.val().extendedId;
                        console.log(extendedId)
                        pushExtId(extendedId)
                    })
                }
                function pushExtId(extendedId){
                    extAlbumRoot.child(extendedId).child(clicked_album.album_key).update(update_data)
                    console.log("SUD SA EXT DB")
                }
        }

        if (clicked_album.album_privacy == 'Immediate Family'){
            getImmId(uid)
            function getImmId(uid){
                userRef.once("value")
                .then(function(snapshot){
                    var familyId = snapshot.val().familyId;
                    pushImmId(familyId)
                })
            }
            function pushImmId(familyId){
                immAlbumRoot.child(familyId).child(clicked_album.album_key).update(update_data)
                console.log("SUD SA IMM DB")
            }
            
        }

        userAlbumRoot.child(uid).child(clicked_album.album_key).update(update_data);
        clanAlbumRoot.child(clanId).child(clicked_album.album_key).update(update_data)

        swal({
            title: "Album Updated!",
            // text: "Please wait",
            timer: 3000,
            showConfirmButton: false,
            type: "success"
        }).then(function() {},

        function(dismiss) {
            if (dismiss === "timer") {
                location.reload()
            }
        })
    
    })
    
   
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