var currentUser;
var uid;
var familyId;
var clanId;
var selectedData;
var immData = [];
var photoData = [];

var immRef = firebase.database().ref().child('album_immediate');
var userAlbumRoot = firebase.database().ref().child('album_user')
var clanAlbumRoot = firebase.database().ref().child('album_clan')
var extAlbumRoot = firebase.database().ref().child('album_extend')
var immAlbumRoot = firebase.database().ref().child('album_immediate')

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        currentUser = user;
        uid = currentUser.uid;
        console.log('Welcome to Immediate Album, ',currentUser.displayName)
    }
    else {
        console.log('No signed in user')
    }
});

$( document ).ready(function() {
    console.log( "ready!" );
    getUserImmId(currentUser.uid)
    getUserClanId(currentUser.uid)
    // retrieveAlbumsFromExtended()
});
$('#album_cover').change(handleImmAlbumInStr);
$('#album_photo').change(handleImmPhotoInStr);

function getUserImmId(uid)
{
    firebase
        .database()
        .ref()
        .child('users')
        .child(currentUser.uid)
        .once("value")
        .then(function(snapshot) {
            familyId = snapshot.val().familyId;
            retrieveAlbumsFromImmediate(familyId)
        })
}

function getUserClanId(uid)
{
    firebase
        .database()
        .ref()
        .child('users')
        .child(uid)
        .once("value")
        .then(function(snapshot) {
            clanId = snapshot.val().clanId;
            // retrieveAlbumsFromClan(clanId)
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

function getImmAlbumList(){
    var albumDataRef = firebase.database().ref().child('album_immediate').child(familyId);

    if(albumDataRef == null){
        alert('you do not have album to upload PLEASE CREATE AN ALBUM FIRST')
    }

    else{
        albumDataRef.once('value')
        .then(function(data){
        var html = '';
        html +='<select required><option disabled>Select Album Name To Upload Photo</option>'
        data.forEach(function(childData){
            immData.push(childData.val())
            html+='<option id="photo_album" value='+ childData.val().album_key+'>'+ childData.val().album_name+'</option>'
        })
        
        html+='</select>'
        $('#all_album_list').html(html);
        $('')
    })   
    } 
}

function retrieveAlbumsFromImmediate() {

    var immDataRef = firebase.database().ref().child('album_immediate').child(familyId);

    console.log(familyId)

    immDataRef.once('value')
        .then(function(data){
            data.forEach(function(childData){
                immData.push(childData.val())
            })
        })
        .then(function(){
            var html = '';
            $.each(immData, function(key,value){
                console.log(immData)
                index=key;
                html+= '<div class="col-md-4"><div class="card card-blog"><div class="card-image"><img src="' + value.album_cover + '" id="cover" style="width:250px;height:220px;"><div class="card-title"><p id="name">'+ value.album_name+'</p></div></div><div class="card-content"><div class="card-description"><i><p id="description">'+value.album_description+'</p></i></div><div class="footer" align="left"><div id="creator">'+value.album_creator+'</div><br><div id="timestamp">'+value.album_date+'</div><br><div id="privacy"><strong>'+value.album_privacy+'</strong></div><br></div><div class="footer"><a type="button" id="'+key+'" onClick="retrieveImmAlbumPhotos(this.id)" href="#" data-toggle="tooltip" data-placement="bottom" title="View Photos" class="btn btn-info btn-just-icon btn-fill btn-round btn-sm"><i class="material-icons">photo_library</i></a><a type="button" href="#pablo" data-toggle="modal" data-placement="bottom" title="Edit Album Information" class="btn btn-success btn-just-icon btn-fill btn-round btn-wd btn-sm" data-target="#updateModal" id="'+key+'" onClick="updateAlbum(this.id)"><i class="material-icons">edit</i></a><a type="button" href="#pablo" data-toggle="tooltip" data-placement="bottom" title="Delete Album" class="btn btn-danger btn-just-icon btn-fill btn-round btn-sm" id="'+key+'" onClick="deleteAlbum(this.id)"><i class="material-icons">delete_forever</i></a></div></div></div></div>';

            })
            $('#card-container').html(html);
        })
}

function retrieveImmAlbumPhotos(clicked_key){
    selectedData = immData[clicked_key];

    console.log(selectedData.album_key)
    console.log(selectedData.album_name)

    var selectedDataRef = firebase.database().ref().child('album_immediate').child(familyId).child(selectedData.album_key).child('album_photos');

    var button = '<a type="button" onclick="location.reload()" class="btn btn-danger btn-sm" title="Back To Album">Back To Album</a>';

    $('#section').html(button);

    selectedDataRef.once('value')
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
            
            sa+= '<div class="col-md-4"><div class="card card-blog"><div class="card-image"><img src="' + value.photo_url + '" id="photo" style="width:250px;height:220px;"></div><div class="card-content"><div class="card-description"><i><p id="caption">'+value.photo_caption+'</p></i></div><div class="footer" align="left"><div id="uploader"><strong>'+value.photo_uploader+'</strong></div><br><div id="time">'+value.photo_time+'</div><br><br></div><div class="footer"></div></div></div></div>';
        })
        $('#card-container').html(sa);
        // <a type="button" href="#pablo" data-toggle="tooltip" data-placement="bottom" title="Edit Photo Information" class="btn btn-success btn-just-icon btn-fill btn-round btn-wd btn-sm" data-target="" id="'+key+'" onClick="retrieveCaption(this.id)"><i class="material-icons">edit</i></a><a type="button" href="#pablo" data-toggle="tooltip" data-placement="bottom" title="Delete Photo" class="btn btn-danger btn-just-icon btn-fill btn-round btn-sm" id="'+key+'" onClick="deleteImage(this.id)"><i class="material-icons">delete_forever</i></a>
    })
}

function handleImmPhotoInStr(eventData){
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    photoKey = firebase.database().ref().child('album-photos').push().getKey();
    var photoStorageRef = firebase.storage().ref('PHOTOS/' + 'UID:'+currentUser.uid + '/' + 'Photo Key:'+photoKey + '/' + fileExtension)

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
                        storeImmPhotoInDb(photoURL,photoKey);
                        console.log("kalusot sad sa function");
                        // window.location.href = "/genealogy";
                        }
                    })
            })
    })
}

function storeImmPhotoInDb(photoURL, photoKey){
    var photo_data = new Object()
    var photo_albumKey = $("option[id='photo_album']:selected").val();
    var photo_caption = $('#photo_caption').val();

    getTime()
    getDate()

    photo_data = {
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
    var userRef = firebase.database().ref('users').child(currentUser.uid);

    photoDataRef.once("value")
        .then(function(snapshot){
            var albumPrivacy = snapshot.val().album_privacy;

            console.log(albumPrivacy)
            
            clanRef.child(clanId).child(photo_albumKey).child('album_photos').child(photoKey).update(photo_data);
            immRef.child(familyId).child(photo_albumKey).child('album_photos').child(photoKey).update(photo_data);       
            photoDataRef.child('album_photos').child(photoKey).update(photo_data);

            showSuccessPhoto()
            
        })

}

function handleImmAlbumInStr(eventData){
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    albumKey = firebase.database().ref().child('album-cover').push().getKey();
    var albumStorageRef = firebase.storage().ref('ALBUM/' +albumKey + '/' + fileExtension);

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
                    title: 'Processing Album Creation',
                    text: 'This might take a while...',
                    timer: 9000,
                    showConfirmButton: false
                    // onClose: saveAlbumToDB
                  }).then(function() {},

                  function(dismiss) {
                      if (dismiss === "timer") {
                        storeImmAlbumInDb(albumCoverURL,albumKey);
                        console.log("kalusot sad sa function");
                        // window.location.href = "/genealogy";
                      }
                  });
            })
    })
}

function storeImmAlbumInDb(albumCoverURL, albumKey){
    console.log('LOCATION: STOREALBUMINDB', albumCoverURL)
    var album_data = new Object()
    var album_name = $('#album_name').val();
    var album_description = $('#album_description').val();
    var album_privacy = $("input[name='album_privacy']:checked").val();
    uid = firebase.auth().currentUser.uid;
     
    getTime()
    getDate()

    album_data = {
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

    var albumDataRef = firebase.database().ref().child('album_user').child(uid).child(albumKey);
    var clanRef = firebase.database().ref('album_clan');
    var immRef = firebase.database().ref('album_immediate');

    immRef.child(familyId).child(albumKey).set(album_data)
    clanRef.child(clanId).child(albumKey).set(album_data);
    albumDataRef.set(album_data);

    showSuccessAlbum()
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

function showSuccessAlbum() {
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

function deleteAlbum(clicked_key){

    var delete_selected = immData[clicked_key];

    var userAlbumRef = firebase.database().ref().child('album_user').child(uid);
    var clanAlbumRef = firebase.database().ref().child('album_clan').child(clanId);
    var immAlbumRef = firebase.database().ref().child('album_immediate').child(familyId);

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
            deleteInStr()
        }
      })

        function deleteInStr(){

            userAlbumRef.child(delete_selected.album_key).remove()
            .then(function(){
                clanAlbumRef.child(delete_selected.album_key).remove()
                .then(function(){
                    immAlbumRef.child(delete_selected.album_key).remove()
                        .then(function(){
                            var albumStr = firebase.storage().ref(delete_selected.album_url)
                            albumStr.delete()
                        .then(function(){
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            location.reload()
                        })
                    })
                })
            })
        }
        
  
    
}

function updateAlbum(clicked_key){

    var clicked_album = immData[clicked_key];

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

        
        immAlbumRoot.child(familyId).child(clicked_album.album_key).update(update_data)
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