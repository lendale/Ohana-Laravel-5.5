<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Search Merged</title>
    <link rel="shortcut icon" href="assets/img/favicon.ico" />

    <!-- Fonts and icons -->
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">

    <!-- CSS Files -->
    <link href="assets/css/material-kit/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/css/material-kit/material-kit.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.10.2/sweetalert2.min.css">
    <link rel="stylesheet" href="assets/css/main.css"> 
    <link rel="stylesheet" href="assets/css/search.css">
</head>

<body style="background-color:white;">
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                          </button>
                <a class="navbar-brand">O H A N A</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="navigation">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="/genealogy">Genealogy</a>
                    </li>
                    <li class="active">
                        <a href="/search">Search</a>
                    </li>
                    <li>
                        <a href="/album_merged">Album</a>
                    </li>
                    <li>
                        <a href="/events">Events</a>
                    </li>
                    <li id="notification_li">
                        <a href="#" id="notificationLink">
                            <!-- <span id="notification_count">5</span> -->
                            <i class="material-icons">notifications</i>
                            <!-- <div id="notificationContainer">
                                <div id="notificationTitle" >Notifications</div>
                                <div id="notificationsBody" class="notifications">ada</div>
                                <div id="notificationFooter"><a href="#">See All</a></div>
                            </div> -->
                        </a>
                    </li>
                    <li class="dropdown">
                        <a class="profile-photo dropdown-toggle" data-toggle="dropdown">
                            <div class="profile-photo-small">
                                <img id="nav_prof_pic" src="assets/img/default-avatar.png" alt="Circle Image" class="img-circle img-responsive" style="width: 100%; height: 100%;">
                            </div>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-header">
                                <span id="nav_display_name"></span>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="" id="sign_out">Sign out</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
    </nav>

    <main>
    <section class="section container">
        <!-- <div class=" container"> -->
            <div class="row">
                <div class="col-md-12">
                    <div class="tab-content main-raised" style="height:70.9vh; width:100%;">
                        <div class="row">
                            <h3 class="title text-center">Search Connection Between Two People</h3><br>

                            <div class="col-sm-5 col-sm-offset-1">
                                <div class="form-group form-danger label-floating">
                                    <label for="person1" class="control-label">Input Person 1 Name<small></small></label>
                                    <input id="person_1" name="person1" type="text" class="form-control">
                                </div>
                            </div>
                            
                            <div class="col-sm-5">
                                <div class="form-group form-danger label-floating">
                                    <label for="person2" class="control-label">Input Person 2 Name<small></small></label>
                                    <input id="person_2" name="person2" type="text" class="form-control">
                                </div>
                            </div>

                            <div class="col-sm-3 col-sm-offset-9">
                                <div class="form-group form-danger label-floating">
                                    <button type="submit" id="submit_search" class="btn btn-danger right"><i class="material-icons">search</i></button>
                                </div>
                            </div>

                            <div class="col-sm-5 col-sm-offset-1" id="connection">
                                <center><h4><b>CONNECTION</b></h4><br><br>
                                <div  class="person1_txt">
                                    <div id="common_txtname">
                                        <h4><b></b></h4>
                                    </div>
                                    <div id="common_txt">
                                        <h4></h4>
                                    </div>
                                </div></center>
                            </div>

                            <div class="col-sm-5" id="mutual">
                                <center><h4><b>MUTUAL / COMMON</b></h4><br><br>
                                    <div id="mutual_names">
                                        <!-- Sample<br>
                                        Sample<br> -->
                                    </div>
                                </center>
                            </div>

                            <div class="row">
                                <div class="col-sm-3 col-sm-offset-9" id="mutual_btn">
                                    <a href="javascript:location.reload(true)" class="btn btn-danger right">Search Again</a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            <!-- </div> -->
        </section>
       
        <!-- search result modal -->
        <div class="modal fade" id="searchName" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    
                        <h5 class="modal-title" id="result_for">Result for <b>Nina</b>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span><hr></h5>
                        
                    </div>
                    <div class="modal-body" id="results">
                        <div class="col-sm-2">
                            <img id="search_img" src="assets/img/default-avatar.png" alt="Circle Image" class="img-circle img-responsive">
                        </div>
                        <div class="col-sm-7">
                            <h5><a href="" id="search_txt"><b>Nina Dakay</b></a></h5>
                        </div>
                        <div class="col-sm-3">
                            <button class="btn btn-danger btn-sm">Add</button>
                        </div>
                        <div class="col-sm-12">
                            <hr>
                        </div>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>

    </main>  
</body>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js "></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-auth.js "></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-database.js "></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-storage.js "></script>
<script src="assets/js/init.js "></script>

<!--   Core JS Files   -->
<script src="assets/js/jquery-3.2.1.min.js" type="text/javascript"></script>
<script src="assets/js/material-kit/bootstrap.min.js" type="text/javascript"></script>
<script src="assets/js/material-kit/material.min.js" type="text/javascript"></script>
<script src="assets/js/material-kit/jquery.bootstrap.js "></script>


<!-- Authentication -->
<script src="assets/js/auth.js"></script>

<!--    Plugin for Date Time Picker and Full Calendar Plugin   -->
<script src="assets/js/material-kit/moment.min.js"></script>

<!-- Sweet Alert 2 plugin -->
<script src="assets/js/material-kit/sweetalert2.js"></script>

<!--    Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/   -->
<!-- <script src="assets/js/bootstrap/nouislider.min.js" type="text/javascript"></script> -->

<!--    Plugin for the Datepicker, full documentation here: https://github.com/Eonasdan/bootstrap-datetimepicker   -->
<script src="assets/js/material-kit/bootstrap-datetimepicker.js" type="text/javascript"></script>

<!--    Plugin for Date Picker   -->
<!-- <script src="assets/js/material-kit/bootstrap-datepicker.js"></script> -->

<!--    Plugin for Select, full documentation here: http://silviomoreto.github.io/bootstrap-select   -->
<script src="assets/js/material-kit/bootstrap-selectpicker.js" type="text/javascript"></script>

<!--    Plugin for Tags, full documentation here: http://xoxco.com/projects/code/tagsinput/   -->
<script src="assets/js/material-kit/bootstrap-tagsinput.js"></script>

<!--    Plugin for Fileupload, full documentation here: http://www.jasny.net/bootstrap/javascript/#fileinput   -->
<script src="assets/js/material-kit/jasny-bootstrap.min.js"></script>

<!--    Plugin for 3D images animation effect, full documentation here: https://github.com/drewwilson/atvImg    -->
<script src="assets/js/material-kit/atv-img-animation.js" type="text/javascript"></script>

<!--    Control Center for Material Kit: activating the ripples, parallax effects, scripts from the example pages etc    -->
<script src="assets/js/material-kit/material-kit.js" type="text/javascript"></script>

<!--    Plugin for Google Places API    -->
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDsnYLajLVHh7uvRdQCkbwnZepcCi1t0q4&libraries=places"></script>


<script src="assets/js/search/search_merged.js"></script>
</html>