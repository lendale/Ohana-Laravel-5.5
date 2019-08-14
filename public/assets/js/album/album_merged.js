
var uid;
var selectedAlbumData;
var albumKey;
var currentUser;
var familyId;
var extendedId;
var eventData = [];
var albumData = [];
var photoData = [];

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        uid = currentUser.uid;
        check()
        retrieveUser()
        getUserData()
    } else {
      console.log('No signed in user')
    }
});
$('#album_cover').change(handleAlbumInStr);
album_photo.addEventListener('change', function(e){
    for (var i = 0; i < e.target.files.length; i++) {
        var imageFile = e.target.files[i];
        handlePhotoInStr(imageFile);
    }
})
function getUserData(uid){
    usersRoot.child(currentUser.uid).once("value")
        .then(function(snapshot) {
            extendedId = snapshot.val().extendedId;
            familyId = snapshot.val().familyId;
            retrieveExtended(extendedId)
            retrieveImmediate(familyId)
            retrievePublic()
        })
}
function check(){
    var u;
    var i;
    var e;
    var p;
    albumPrivacyRefUsers.child(uid).once("value")
        .then(function(snapshot) {
            // console.log(snapshot.val())
            u = snapshot.val()
                albumPrivacyRefImmediate.child(uid).once("value")
                    .then(function(snapshot) {
                    // console.log(snapshot.val())
                    i = snapshot.val()
                    albumPrivacyRefPublic.child(uid).once("value")
                        .then(function(snapshot) {
                            // console.log(snapshot.val())
                            p = snapshot.val()
                            albumPrivacyRefExtended.child(uid).once("value")
                                .then(function(snapshot) {
                                    // console.log(snapshot.val())
                                    e = snapshot.val()

                                    if(u == null && i == null && p == null && e == null ){
                                        swal({
                                            text: 'You have not uploaded nor created an album.',
                                            type: 'question',
                                            showCancelButton: true,
                                            showConfirmButton: true,
                                            confirmButtonColor: '#ff5349',
                                            cancelButtonColor: '#808080',
                                            confirmButtonText: 'Create Now'
                                        }).then((isConfirm) => {
                                            if (isConfirm) {
                                                $('#create_album').click();
                                            }
                                          })  
                                    }
                })
            })
        })
    })   
}
function handleAlbumInStr(eventData){
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();

    albumKey = firebase.database().ref().child('album-cover').push().getKey();
    var strRef = 'ALBUM/' +albumKey + fileExtension;
    var albumStorageRef = firebase.storage().ref(strRef);

    console.log('FILE:', file)

    if(file.size <= 100000){
    $('#create_album_btn').on('click', function(){
        var task = albumStorageRef.put(file);
        task.on('state_changed',
            function complete(){
                uid = firebase.auth().uid;
                var albumCoverURL = task.snapshot.downloadURL;
                swal({
                    imageUrl: "assets/img/icons/loader.gif",
                    imageWidth: '90',
                    imageHeight: '90',
                    title: 'Processing Album Creation..',
                    timer: 9000,
                    showConfirmButton: false
                  }).then(function() {},
                  function(dismiss) {
                      if (dismiss === "timer") {
                        storeAlbumInDb(albumCoverURL,albumKey,strRef);
                      }
                  });
            })
    })
    }else{
        showPhotoError()
    }
}
function storeAlbumInDb(albumCoverURL, albumKey, strRef){
    console.log('LOCATION: STOREALBUMINDB', albumCoverURL)
    var album_data = new Object()
    var album_name = $('#album_name').val();
    var album_description = $('#album_description').val();
    var photoStr = 'PHOTOS/' +albumKey + '/'
    uid = firebase.auth().currentUser.uid;
    
    getTime()
    getDate()

    console.log(currentUser.displayName)

    album_data = {
        album_url: strRef,
        photo_url: photoStr,
        album_key: albumKey,
        album_cover: albumCoverURL,
        album_name: album_name,
        album_description: album_description,
        album_time: uploadTime,
        album_date: uploadDate,
        album_creatorId: currentUser.uid,
        album_creator: currentUser.displayName,
        album_privacy: 'Only Me'
    }
    
    console.log('ALBUM_DATA:', album_data)

    albumPrivacyRefUsers.child(uid).child(albumKey).set(albumKey);
    albumRef.child(albumKey).child(albumKey).set(album_data);
    showSuccessAlbum()
}
function retrieveImmediate1(){
    immediateFamilyRef.child(familyId).once('value')
    .then(function(data){
        console.log(data.val())
        data.forEach(function(data2){
            console.log(data2.val())
        data2.forEach(function(childDataKeys){
            console.log(childDataKeys.val())
            albumPrivacyRefImmediate.child(childDataKeys.val()).once('value')
            .then(function(snap){
                // console.log(snap.val())
                snap.forEach(function(data2){
                    albumRef.child(data2.val()).child(data2.val()).once('value')
                    .then(function(data3){
                        albumData.push(data3.val())
                        // console.log('IMMEDIATE:',data3.val())
                        displayAlbumCard()
                    }) 
                       
                })
            })  
        }) 
        })
    })
}
function retrieveImmediate(){
    var family = [];
    immediateFamilyRef.child(familyId).once('value')
    .then(function(data){
        family.push(data.val().mother, data.val().father, data.val().user)
        data.forEach(function(data2){
            data2.forEach(function(data3){
                family.push(data3.val())
            })
        })
            family.forEach(function(fam_uid){
                albumPrivacyRefImmediate.child(fam_uid).once('value')
                .then(function(snap){
                    snap.forEach(function(data2){
                        albumRef.child(data2.val()).child(data2.val()).once('value')
                        .then(function(data3){
                            albumData.push(data3.val())
                            // console.log('IMMEDIATE:',data3.val())
                            displayAlbumCard()
                        }) 
                        
                    })
                })
            })
    })    
}
function retrieveExtended(){
    extendedFamilyRef.child(extendedId).once('value')
    .then(function(data){
        // console.log(data.val())
        data.forEach(function(childDataKeys){
            // console.log(childDataKeys.val())
            albumPrivacyRefExtended.child(childDataKeys.val()).once('value')
            .then(function(snap){
                // console.log(snap.val())
                snap.forEach(function(data2){
                    // console.log(data2.val())
                    albumRef.child(data2.val()).child(data2.val()).once('value')
                    .then(function(data){
                        albumData.push(data.val())
                        // console.log(data.val())
                        displayAlbumCard()
                    }) 
                })       
            })  
        })
    })
}
function retrieveUser(){
    albumPrivacyRefUsers.child(uid).once('value')
        .then(function(data){
            data.forEach(function(childKeys){
                albumRef.child(childKeys.val()).child(childKeys.val()).once('value')
                .then(function(data2){
                    albumData.push(data2.val())
                    displayAlbumCard()
                })
            })
        })                  
}
function retrievePublic(){
    albumPrivacyRefPublic.once('value')
        .then(function(data){
            data.forEach(function(childKey){
                childKey.forEach(function(snapKey){
                    albumRef.child(snapKey.val()).child(snapKey.val()).once('value')
                    .then(function(data2){
                        albumData.push(data2.val())
                        displayAlbumCard()
                    })
                })
            })
        })
}
function displayAlbumCard(){
        var html = '';
        $.each(albumData, function(key,value){
            index=key;
            html+= '<div class="col-md-3"><div class="card card-blog"><div class="card-image"><a href="'+value.album_cover+'"><img src="' + value.album_cover + '" id="cover" style="width:235px;height:200px;"></a><div class="card-title"><p id="name">'+ value.album_name+'</p></div></div><div class="card-content"><div class="card-description"><i><p id="description">'+value.album_description+'</p></i></div><div class="footer" align="left"><div id="creator">'+value.album_creator+'</div><br><div id="timestamp">'+value.album_date+'</div><br><div id="privacy"><strong>'+value.album_privacy+'</strong></div></div><div class="footer"><a type="button" id="'+key+'" onClick="retrieveAlbumPhotos(this.id)" href="#" data-toggle="tooltip" data-placement="bottom" title="View Photos" class="btn btn-info btn-just-icon btn-fill btn-round btn-sm"><i class="material-icons">photo_library</i></a><a type="button" href="" title="Update Album Privacy" class="btn btn-warning btn-just-icon btn-fill btn-round btn-wd btn-sm" data-toggle="modal" data-target="#updatePrivacy" id="'+key+'" onClick="verifyAccessUpdate(this.id)"><i class="material-icons">settings</i></a><a type="button" href="" title="Edit Album Information" class="btn btn-success btn-just-icon btn-fill btn-round btn-wd btn-sm" data-toggle="modal" data-target="" id="'+key+'" onClick="verifyAccessEdit(this.id)"><i class="material-icons">edit</i></a><a type="button" href="#pablo" data-toggle="tooltip" data-placement="bottom" title="Delete Album" class="btn btn-danger btn-just-icon btn-fill btn-round btn-sm" id="'+key+'" onClick="verifyAccessDelete(this.id)"><i class="material-icons">delete_forever</i></a></div></div></div></div>';
        })
        $('#card-container').html(html);
}
// function getAlbumName(albumkey){

//     console.log(selectedAlbumData.album_key)
//     var aKey = '<div class="col-sm-6" id= "photo_album" value="'+selectedAlbumData.album_key+'">'+selectedAlbumData.album_name+'</div>';
//     // $('#albumNameInModal').html(aKey)

//     verifyAccessUpload(albumkey)
// }
function handlePhotoInStr(imageFile){
    var fileName = imageFile.name;
    var strRef = 'PHOTOS/' + selectedAlbumData.album_key + '/' + fileName;
    var photoStorageRef = firebase.storage().ref(strRef)
    var photo_data = new Object()
    var photoDataRef =albumRef.child(selectedAlbumData.album_key).child(selectedAlbumData.album_key);
    var userRef = usersRoot.child(currentUser.uid);

    getDate()
    getTime()

    console.log('FILE:', imageFile)
    console.log('FILENAME:', fileName)

    $('#upload_photo').on('click', function(){
        var task = photoStorageRef.put(imageFile)
        console.log('file was stored!')

        task.on('state_changed',
            function complete(){
                uid = firebase.auth().uid
                var photoURL = task.snapshot.downloadURL
                console.log('PHOTO URL:',photoURL)

                photoKey = firebase.database().ref().child('album-photos').push().getKey()
                var photo_albumKey = $('#photo_album').val();
                var photo_caption = $('#photo_caption').val();

                photo_data = {
                    photo_link: strRef,
                    photo_key: photoKey,
                    photo_url: photoURL,
                    photo_time: uploadTime,
                    photo_date: uploadDate,
                    photo_caption: photo_caption,
                    photo_uploader: currentUser.displayName,
                    photo_uploaderId: currentUser.uid
                }

                if (photoURL != null){
                    console.log('PHOTO DATA:', photo_data)
                    photoDataRef.child('album_photos').child(photoKey).update(photo_data);
                    showPhotoLoading()
                    showSuccessPhoto()
                }else{
                    console.log('pass')
                } 
            })
    })

}
function retrieveAlbumPhotos1(clicked_key){
    selectedAlbumData =  albumData[clicked_key];
    console.log(selectedAlbumData.album_key)
    console.log(selectedAlbumData.album_name)

    var selectedPhotoRef =albumRef.child(selectedAlbumData.album_key).child(selectedAlbumData.album_key).child('album_photos');

    var button = '<a type="button" onclick="location.reload()" class="btn btn-danger btn-sm" title="Back To Album">Back To Album</a><a type="button" id="'+ selectedAlbumData.album_key +'" onclick="getAlbumName(this.id)" class="btn btn-danger btn-sm" data-toggle="modal" title="Upload Photo" data-target="#uploadModal">Upload Photo</a>';
    var aNameTxt = '<br><center><h4 class="title"><div id="albumNameTxt">'+selectedAlbumData.album_name+'</div><br><br><br></h4></center>';


    $('#album-title').html(aNameTxt);
    $('#section').html(button);

    // console.log(selectedPhotoRef)

    selectedPhotoRef.once('value')
    .then(function(data){
        data.forEach(function(childData){
            // console.log(data)
            // console.log(childData)
            photoData.push(childData.val())
        })
    })
    .then(function(){
        var cardDetails = '';
        $.each(photoData, function(key,value){
            
            cardDetails+= '<div class="col-md-3"><div class="card card-blog"><div class="card-image"><img src="' + value.photo_url + '" id="photo" style="width:width:235px;height:200px;"></div><div class="card-content"><div class="card-description"><i><p id="caption">'+value.photo_caption+'</p></i></div><div class="footer" align="left"><div id="uploader"><strong>'+value.photo_uploader+'</strong></div><br><div id="time">'+value.photo_time+'</div></div><div class="footer"><a type="button" href="" title="Update Album Privacy" class="btn btn-warning btn-just-icon btn-fill btn-round btn-wd btn-sm" data-toggle="modal" data-target="" id="'+key+'" onClick="verifyPhotoAccessUpdate(this.id)"><i class="material-icons">settings</i></a><a type="button" href="#pablo" data-toggle="tooltip" data-placement="bottom" title="Delete Album" class="btn btn-danger btn-just-icon btn-fill btn-round btn-sm" id="'+key+'" onClick="verifyPhotoAccessDelete(this.id)"><i class="material-icons">clear</i></a></div></div></div></div>';
        })
        $('#card-container').html(cardDetails);
    }) 
}
function deleteAlbum(clicked_key){
    var delete_selected = albumData[clicked_key];

    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this album!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff5349',
        cancelButtonColor: '#808080',
        confirmButtonText: 'Yes, delete it!'
      }).then((isConfirm) => {
        if (isConfirm) {
            deletePhotos()
        }
      })

    function continueDelete(){
        if(delete_selected.album_privacy == 'Extended'){      
            albumPrivacyRefExtended.child(uid).child(delete_selected.album_key).remove()
                .then(function(){
                    deleteInStr();
                })   
        }
        if(delete_selected.album_privacy == 'Immediate'){
           albumPrivacyRefImmediate.child(uid).child(delete_selected.album_key).remove()
                .then(function(){
                    deleteInStr();
                })  
        }
        if(delete_selected.album_privacy == 'Public'){
            albumPrivacyRefPublic.child(uid).child(delete_selected.album_key).remove()
                 .then(function(){
                     deleteInStr();
                 })  
        }
        if(delete_selected.album_privacy == 'Only Me'){
            albumPrivacyRefUsers.child(uid).child(delete_selected.album_key).remove()
                 .then(function(){
                     deleteInStr();
                 })  
        }

        function deleteInStr(){
            albumRef.child(delete_selected.album_key).remove()
                .then(function(){
                    firebase.storage().ref(delete_selected.album_url).delete()
                    // deletePhotos()
                }).then(function(){
                    showSuccessDelete()
                })
        }
    }
    function deletePhotos(){
        albumRef.child(delete_selected.album_key).child(delete_selected.album_key).child('album_photos').once('value')
        .then(function (snapPhotoKeys){
            console.log(snapPhotoKeys.val())
            snapPhotoKeys.forEach(function (snapData){
                console.log(snapData.val().photo_link)
                var photoLink = snapData.val().photo_link
                firebase.storage().ref(photoLink).delete()
                console.log('photos deleted in storage')
            })
        }).then(function(){
            continueDelete()
        })
    }
}
function updateAlbum(clicked_key){
    var clicked_album = albumData[clicked_key];
    var namee = '';
    var descc = '';

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

        albumRef.child(clicked_album.album_key).child(clicked_album.album_key).update(update_data);
        showSuccessUpdate() 
    })  
}
function updatePhoto(clicked_key){
    var clicked_photo = photoData[clicked_key];
    var capp = '';

    capp+= '<label class="control-label"><strong>Add New Photo Caption</strong>(required)</label><input type="text" id="update_photo_caption" class="form-control" placeholder="'+clicked_photo.photo_caption+'" value="'+ clicked_photo.photo_caption+'"required>';

    $('#for-cap').html(capp);

    $('#update_photo').on('click', function(){
        var cap = $('#update_photo_caption').val();

        var update_data = {
            photo_caption: cap
        }
        albumRef.child(selectedAlbumData.album_key).child(selectedAlbumData.album_key).child('album_photos').child(clicked_photo.photo_key).update(update_data);
        showSuccessUpdatePhoto() 
    }) 
}
function deletePhoto(clicked_key){
    var delete_selected = photoData[clicked_key];

    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this photo!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff5349',
        cancelButtonColor: '#808080',
        confirmButtonText: 'Yes, delete it!'
      }).then((isConfirm) => {
        if (isConfirm) {
            delPic()
        }
      })
      
    function delPic(){
        console.log(delete_selected.photo_link)
        firebase.storage().ref(delete_selected.photo_link).delete();
        albumRef.child(selectedAlbumData.album_key).child(selectedAlbumData.album_key).child('album_photos').child(delete_selected.photo_key).remove()
        showSuccessPhotoDelete()
    }
}
function updatePrivacy(clicked_key){
    var clicked_pri = albumData[clicked_key];
    console.log(clicked_pri)
    console.log(clicked_pri.album_key)
    console.log(clicked_pri.album_privacy)

    var currPri = '<p>Current Privacy : '+ clicked_pri.album_privacy+'</p>';
    $('#current_privacy').html(currPri)

    $('#update_privacy').on('click', function(){
        var selected_privacy = $("option[id='privacy']:selected").val();
        console.log(selected_privacy);

        var update_data_privacy = {
            album_privacy: selected_privacy
        }

        // delete in previous privacy table
        if(clicked_pri.album_privacy == 'Only Me'){
            albumPrivacyRefUsers.child(uid).child(clicked_pri.album_key).remove()
        }
        if(clicked_pri.album_privacy == 'Immediate'){
            albumPrivacyRefImmediate.child(uid).child(clicked_pri.album_key).remove()
        }
        if(clicked_pri.album_privacy == 'Extended'){
            albumPrivacyRefExtended.child(uid).child(clicked_pri.album_key).remove()
        }
        if(clicked_pri.album_privacy == 'Public'){
            albumPrivacyRefPublic.child(uid).child(clicked_pri.album_key).remove()
        }

        // update on new privacy table
        if(selected_privacy == 'Immediate'){
            albumPrivacyRefImmediate.child(uid).child(clicked_pri.album_key).set(clicked_pri.album_key);
        }
        if(selected_privacy == 'Extended'){
            albumPrivacyRefExtended.child(uid).child(clicked_pri.album_key).set(clicked_pri.album_key);
        }
        if(selected_privacy == 'Public'){
            albumPrivacyRefPublic.child(uid).child(clicked_pri.album_key).set(clicked_pri.album_key);
        }
        albumRef.child(clicked_pri.album_key).child(clicked_pri.album_key).update(update_data_privacy)
        showSuccessPrivacyUpdate()
    }) 
}
function verifyAccessUpdate(clicked_key){
    var selected_alb = albumData[clicked_key]
    console.log(selected_alb.album_creatorId)
    if(currentUser.uid == selected_alb.album_creatorId){
        console.log('User is authorized!')
        updatePrivacy(clicked_key)
    }else{
        showErrorAccess()
    }
}
function verifyAccessEdit(clicked_key){
    var selected_alb = albumData[clicked_key]

    if(currentUser.uid == selected_alb.album_creatorId){
        console.log('User is authorized to edit!')
        $('#updateModal').modal('show');
        updateAlbum(clicked_key)
    }else{
        showErrorAccess()
    }
}
function verifyAccessDelete(clicked_key){
    var selected_alb = albumData[clicked_key]
    console.log(selected_alb.album_name)
    if(currentUser.uid == selected_alb.album_creatorId){
        console.log('User is authorized to delete!')
        deleteAlbum(clicked_key)
    }else{
        showErrorAccess()
    }
}
function verifyAccessUpload(albumkey){
    console.log(selectedAlbumData.album_name)
    console.log('HEY',albumkey)

    if(selectedAlbumData.album_privacy == 'Public'){
        if(selectedAlbumData.album_creatorId !== currentUser.uid){
            showAccessErrorUpload()
        }
    }

    eventResponseRef.child(albumkey).once('value')
    .then(function(snap){
        console.log(snap.val())
        snap.forEach(function(data){
            console.log(data.val())

            if(selectedAlbumData.album_creatorId == currentUser.uid){
                console.log('maka upload raka beasshhh')
            }else if(currentUser.uid == data.val()){
                    console.log('yas maka add kag photo!!')
            }else{
                showAccessErrorUpload()
            }
        })
    })
}
function verifyPhotoAccessUpdate(clicked_key){
    var selected_photo = photoData[clicked_key]
    console.log(selected_photo)
    if(currentUser.uid == selected_photo.photo_uploaderId){
        console.log('User is authorized to edit!')
        $('#updatePhoto').modal('show');
        updatePhoto(clicked_key)
    }else{
        showErrorAccess()
    }
}
function verifyPhotoAccessDelete(clicked_key){
    var selected_photo = photoData[clicked_key]
    console.log(selected_photo)
    if(currentUser.uid == selected_photo.photo_uploaderId){
        console.log('User is authorized to delete!')
        deletePhoto(clicked_key)
    }else{
        showErrorAccess()
    }
}
function retrieveAlbumPhotos(clicked_key){
    selectedAlbumData =  albumData[clicked_key];
    console.log(selectedAlbumData.album_key)
    console.log(selectedAlbumData.album_name)

    var selectedPhotoRef =albumRef.child(selectedAlbumData.album_key).child(selectedAlbumData.album_key).child('album_photos');
    var aNameTxt = '<br><br><div id="albumNameTxt" class="animated bounceInLeft"><p class="title" id="albNmTxt">'+selectedAlbumData.album_name+'</p><a type="button" onclick="location.reload()" class="btn btn-white" title="Back To Album"><i class="material-icons">arrow_back_ios</i>Back To Albums</a>&nbsp;&nbsp;<a type="button" id="'+ selectedAlbumData.album_key +'" onclick="verifyAccessUpload(this.id)" class="btn btn-danger" data-toggle="modal" title="Upload Photo" data-target="#uploadModal">Upload Photo</a></div>';

    $('#album-title').html(aNameTxt);
    $('#section').hide();

    selectedPhotoRef.once('value')
    .then(function(data){
        data.forEach(function(childData){
            photoData.push(childData.val())
        })
    })
    .then(function(){
        var cardDetails = '';
        $.each(photoData, function(key,value){
            
            cardDetails+= '<div class="col-md-3"><div class="card"><a href="'+value.photo_url+'" data-lightbox="gallery" data-title="'+value.photo_caption+'" style="position:relative"><img class="card-img-top" src="'+value.photo_url+'" id="photo" style="width:270px; height:270px;"><a type="button" style="position:absolute;right:20px;top:3px;" title="Update Photo Caption" data-toggle="modal" data-target="" id="'+key+'" onClick="verifyPhotoAccessUpdate(this.id)"><img src="assets/img/icons/pen_white.png" style="width:20px;height:20px;"></a><a type="button" style="position:absolute;right:0;top:3px;" href="#pablo" data-toggle="tooltip" data-placement="bottom" title="Delete Photo" id="'+key+'" onClick="verifyPhotoAccessDelete(this.id)"><img src="assets/img/icons/x_white.png" style="width:20px;height:20px;"></a></a></div></div>';
        })
        $('#card-container').html(cardDetails);

    }) 
}