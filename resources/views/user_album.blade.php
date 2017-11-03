<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Album</title>

    <!-- <script src="https://www.gstatic.com/firebasejs/3.9.0/firebase.js"></script>
    <script src="js/app.js"></script> -->
    <script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js "></script>
    <script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-auth.js "></script>
    <script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-database.js "></script>
    <script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-storage.js"></script>
    <script src="assets/js/init.js "></script>

    <script type="text/javascript" src="assets/js/jquery-3.2.1.min.js"></script>
    <link rel="stylesheet" href="assets/css/clanalbum.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/css/materialize.min.css">


</head>

<body>
    <div id="container">
        <div class="row">
            <!-- Cards container -->
            <div class="col s12">
                <h4>My Album</h4>
                <!-- <h5>My Uploads</h5> -->
                <a class="fixed waves-effect waves-light btn modal-trigger" href="#modal1">Upload Photo</a>


                <div id="modal1" class="modal">
                    <div class="modal-content">

                        <h4>Upload Photo in Your Clan Album</h4>
                        <input type="text" id="imgCaption" placeholder="Write caption here.." required>
                        <br>

                        <progress value="0" max="100" id="uploader">0%</progress>
                        <input type="file" id="fileButton" value="upload" required>
                    </div>
                    <div class="modal-footer">
                        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
                    </div>
                </div>


                <div id="card-container" class="row">
                    <!-- Col: Card 1 -->
                    <div class="col s12 m6 l2">
                        <!-- Card 1 -->
                        <div class="card medium z-depth-5">
                            <div class="card-image">
                                <img src="assets/gif.gif" id="photoUrl">
                                <!-- <a class="btn" ><i class="material-icons">close</i></a> -->
                            </div>
                            <div class="card-content">
                                <p class="card-subtitle grey-text text-darken-2" id="caption">Caption Here...</p>
                            </div>
                        </div>
                        <!-- End of card -->
                    </div>
                    <!-- End of col -->

                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="assets/js/jquery-3.2.1.min.js"></script>
    <script src="assets/js/user_album.js"></script>
    <!-- <script src="js/materialize.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/js/materialize.min.js"></script>

</body>

<script type="text/javascript">
    $(document).ready(function() {
        $('.modal').modal();
    })
</script>

</html>