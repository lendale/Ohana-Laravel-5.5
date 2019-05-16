<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Events</title>
    <link rel="shortcut icon" href="assets/img/favicon.ico" />

    <!--     Fonts and icons     -->
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />

    <!-- CSS Files -->
    <link href="assets/css/material-kit/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/css/material-kit/material-kit.css" rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/main.css">
</head>

<body>
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
            <div class="collapse navbar-collapse" id="navigation-example-2">
                <ul class="nav navbar-nav navbar-right">
                    
                    <li>
                        <a href="/genealogy">Genealogy</a>
                    </li>
                    <li>
                        <a href="/album_merged">Album</a>
                    </li>
                    <li>
                         <!-- Events Dropdown -->
                         <a href="#" class="dropdown-toggle" data-toggle="dropdown">Events</a>
                            <ul class="dropdown-menu">
                                <li><a href="/eventsImmediate">Immediate Events</a></li>
                                <li><a href="/eventsExtended" disabled>Extended Events</a></li>
                            </ul>
                    </li>
                                        <li id="notification_li">
                                            <a href="#" id="notificationLink">
                                                 <span id="notification_count">5</span>
                                            <i class="material-icons">notifications</i>

                                            

                                                <div id="notificationContainer">
                                                <div id="notificationTitle" >Notifications</div>
                                                
                                                <div id="notificationsBody" class="notifications">ada</div>
                                                <div id="notificationFooter"><a href="#">See All</a></div>
                                                </div>


                    </a>
                                         </li>
                 <!--    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="material-icons">notifications</i>
                            <span class="notification"></span>
                            <p class="hidden-lg hidden-md">
                                Notifications
                                <b class="caret"></b>
                            </p>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Mike John responded to your email</a></li>
                            <li><a href="#">You have 5 new tasks</a></li>
                            <li><a href="#">You're now friend with Andrew</a></li>
                            <li><a href="#">Another Notification</a></li>
                            <li><a href="#">Another One</a></li>
                        </ul>
                    </li> -->
                    <li class="dropdown">
                        <a class="profile-photo dropdown-toggle" data-toggle="dropdown">
                            <div class="profile-photo-small">
                                <img id="nav_prof_pic" src="assets/img/default-avatar.png" alt="Circle Image" class="img-circle img-responsive">
                            </div>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-header">
                                <span id="nav_display_name"></span>
                            </li>
                            <li>
                                <a href="/me">Me</a>
                            </li>
                            <li>
                                <a href="">Settings</a>
                            </li>
                            <li>
                                <a href="">Help</a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a id="sign_out">Sign out</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
    </nav>

        <main>
            <div class="container section">
              <div id="card-container" class="row">
            
            </div>
    </div>
            
            <a class="btn btn-danger btn-defualt" href="/createEvent">+Create Event</a>


    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        <i class="material-icons">clear</i>
                    </button>
                     <form id="send-notification-form">
                    <h3 class="modal-title">Events</h3> 
                </div>
                <div class="modal-body">
                    <div class="row">
                        <h3>Basic Details</h3>
                        <i style="font-size:10px"> Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</i>

                    <select id="eventSlct" class="selectpicker" data-style="btn btn-danger btn-defualt" title=" Choose Event" data-size="7" required>
                      <option disabled> Choose Event</option>
                      <option value="Obituary">Obituary</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Baptism">Baptism</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <div class="input-group">
                        <input id="Date" name="Date" type="text" class="datepicker form-control" placeholder="Date" required>
                    </div>
                </div>
                    <div class="input-group">
                        <input id="time" type="text" placeholder="Time" class="timepicker form-control" >
                    </div>
                    <div class="col-md-4">
                    <div class="input-group">
                        <input type="text" id="notification-message" placeholder="Title" class="form-control" />
                    </div>
                </div>
                    <div class="input-field col-md-8">
                       <textarea class="form-control" id="desc" placeholder="Description" rows="5"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-default btn-simple" onclick="addClick()" required>Post</button>
                    <button type="button" class="btn btn-danger btn-simple" data-dismiss="modal">Close</button>
                </form>
            </div>
            
            </div>
        </div>
    </div>

<!--     small alert modal -->


        </main>
</body>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-messaging.js"></script>
<script src="assets/js/init.js "></script>

 <!--  Core JS Files   -->
<script src="assets/js/jquery-3.2.1.min.js" type="text/javascript"></script>
<script src="assets/js/material-kit/bootstrap.min.js" type="text/javascript"></script>
<script src="assets/js/material-kit/material.min.js" type="text/javascript"></script>

<!-- Authentication
<script src="assets/js/auth.js"></script>

<!--    Plugin for Date Time Picker and Full Calendar Plugin   -->
<script src="assets/js/material-kit/moment.min.js"></script>

<!--	Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/   -->
<!-- <script src="assets/js/bootstrap/nouislider.min.js" type="text/javascript"></script> -->

<!--	Plugin for the Datepicker, full documentation here: https://github.com/Eonasdan/bootstrap-datetimepicker   -->
<!-- <script src="assets/js/bootstrap/bootstrap-datetimepicker.js" type="text/javascript"></script> -->

<!--	Plugin for Select, full documentation here: http://silviomoreto.github.io/bootstrap-select   -->
<!-- <script src="assets/js/bootstrap/bootstrap-selectpicker.js" type="text/javascript"></script> -->

<!--	Plugin for Tags, full documentation here: http://xoxco.com/projects/code/tagsinput/   -->
<script src="assets/js/material-kit/bootstrap-tagsinput.js"></script>

<!-- Sweet Alert 2 plugin -->
<script src="assets/js/material-kit/sweetalert2.js"></script>

<!--  Full Calendar Plugin    -->
<script src="assets/js/material-kit/fullcalendar.min.js"></script>

<!--	Plugin for Fileupload, full documentation here: http://www.jasny.net/bootstrap/javascript/#fileinput   -->
<!-- <script src="assets/js/bootstrap/jasny-bootstrap.min.js"></script> -->

<!--    Plugin for 3D images animation effect, full documentation here: https://github.com/drewwilson/atvImg    -->
<script src="assets/js/material-kit/atv-img-animation.js" type="text/javascript"></script>

<!--    Plugin for Select, full documentation here: http://silviomoreto.github.io/bootstrap-select   -->
<script src="assets/js/material-kit/bootstrap-selectpicker.js" type="text/javascript"></script>

<!--    Control C<script src="assets/js/events.js"></script>enter for Material Kit: activating the ripples, parallax effects, scripts from the example pages etc    -->
<script src="assets/js/material-kit/material-kit.js" type="text/javascript"></script>


<script src="assets/js/events_extended.js"></script>
<script src="assets/js/genealogy.js"></script>


<script defer src="assets/js/messaging.js"></script>
<script src="assets/js/material-kit/bootstrap-datetimepicker.js" type="text/javascript"></script>


</html>