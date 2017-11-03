<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Clan Album</title>

    <!-- <script src="https://www.gstatic.com/firebasejs/3.9.0/firebase.js"></script> -->
    <!-- <script src="js/app.js"></script> -->
    <script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-database.js"></script>
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
                <h4>Clan Album</h4>

                <div id="card-container" class="row">
                    <!-- Col: Card 1 -->
                    <div class="col s12 m6 l2">
                        <!-- Card 1 -->
                        <div class="card medium z-depth-5">
                            <div class="card-image">
                                <img class="materialboxed" src="assets/gif.gif" id="photoUrl">
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
    <script src="assets/js/clanalbum.js"></script>
    <!-- <script src="js/materialize.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.1/js/materialize.min.js"></script>

</body>

</html>