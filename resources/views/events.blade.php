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
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
    

    <!-- CSS Files -->
    <link href="assets/css/material-kit/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/css/material-kit/material-kit.css" rel="stylesheet" />
    <link href="assets/css/notification.css" rel="stylesheet" />
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
                        <a href="/events">Events</a>
                    </li>
                                        <!-- <li id="notification_li">
                                            <a href="#" id="notificationLink">
                                                 <span id="notification_count">5</span>
                                            <i class="material-icons">notifications</i>

                                                <div id="notificationContainer">
                                                <div id="notificationTitle" >Notifications</div>
                                                <div id="notificationsBody" class="notifications">
                                                    

        

                                                </div>
                                                <div id="notificationFooter"><a href="#">See All</a></div>
                                                </div>


                    </a>
                                         </li> -->
                                       

      <a  href="#" id="notifications-dropdown" data-toggle="dropdown">
        <i id="notificationLink" class="material-icons">notifications</i>
        <!-- <span id="notification_count">3</span> -->
      </a>

      <!-- NOTIFICATIONS -->
      <div class="dropdown-menu notification-dropdown-menu" aria-labelledby="notifications-dropdown" style="overflow-y: scroll; max-height:500%; ">
        <h6 class="dropdown-header" >Notifications</h6>

         <a class="dropdown-item dropdown-notification" id="notif-container">
      
    </a>

        <!-- AUCUNE NOTIFICATION -->
        <a id="notificationAucune" class="dropdown-item dropdown-notification" href="#">
          <p class="notification-solo text-center"></p>
        </a>

        <!-- TOUTES -->
        <a class="dropdown-item dropdown-notification-all" href="#">
        </a>

      </div>
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

    <h3 align="center"> Events </h3>
    <section class="select container ">
        <div class="row">
     
            <a type="button" class="btn btn-danger btn-sm" href="/createEvent">Create event<br></a>
            <!-- <a type="button" id="uploadBtn" onclick="getAlbumList()" class="btn btn-danger btn-sm" data-toggle="modal" title="Upload Photo" data-target="#uploadModal">Upload Photo</a> -->
        </div>
      </div>
  </section>

<div id="card-container"></div>

<!-- Response modal -->
<!-- <div class="modal fade" id="responseModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="material-icons">clear</i>
                </button>
                <h3  class="modal-title" style='font-weight: bold;'>Response</h3>
            </div>
            <div class="modal-body" id='resp'>
                <p>Far far away...
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger btn-simple" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div> -->

<!-- Modal -->
<div class="modal fade" id="responseModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>

                </button>
                 <h4 class="modal-title" id="myModalLabel">Modal title</h4>

            </div>
            <div class="modal-body">
                <div role="tabpanel">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active"><a href="#going" aria-controls="uploadTab" role="tab" data-toggle="tab" id="goingCounter">Going</a>

                        </li>
                        <li role="presentation"><a href="#maybe" aria-controls="browseTab" role="tab" data-toggle="tab" id="maybeCounter">Maybe</a>

                        </li>
                        <li role="presentation"><a href="#notGoing" aria-controls="browseTab" role="tab" data-toggle="tab" id="notGoingCounter">Not Going</a>

                        </li>
                    </ul>
                    <!-- Tab panes -->
                    <div class="tab-content">
                      <br>
                        <div role="tabpanel" class="tab-pane active" id="going">Empty</div>
                        <div role="tabpanel" class="tab-pane" id="maybe">Empty</div>
                        <div role="tabpanel" class="tab-pane" id="notGoing">Empty</div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- classic modal -->
<!-- <button class="btn btn-primary btn-round" data-toggle="modal" data-target="#myModal">
    Classic modal
</button> -->

<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content " >
            <form id="send-notification-form">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="material-icons">clear</i>
                </button>
                <h4 class="modal-title">Update</h4>
            </div>
            <div id="eventKeyy"><input id="eventKey" name="eventKey" type="text" class="form-control" style="display:none;">
    </div>
            <!-- <div class="fileinput fileinput-new text-center col-sm-10 col-sm-offset-1" data-provides="fileinput">
   <div class="fileinput-new thumbnail img-raised">
    <img src="assets/img/image_placeholder.jpg" alt="...">
    <input type="file" id="wizard_picture" required>
   </div>
   <div class="fileinput-preview fileinput-exists thumbnail img-raised"></div>
   <div>
    <span class="btn btn-raised btn-round btn-default btn-file">
       <span class="fileinput-new">Select image</span>
       <span class="fileinput-exists">Change</span>
       <input type="file" name="..." />
    </span>
        <a href="#pablo" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput">
        <i class="fa fa-times"></i> Remove</a>
   </div>
</div> -->
<div class="col-sm-12">
    
     <div class="input-group">
       <span class="input-group-addon">
            <i class="material-icons">event</i>
               </span>
                <div id="title" class="form-group label-floating" >
                <label class="control-label">Event Title <small>(required)</small></label>
                  <input id="eventTitle" name="eventTitle" type="text" class="form-control">
         </div>
           </div>
       </div>
       <div class="input-group">
        <span class="input-group-addon">
          <i class="material-icons" style="color: white;">event</i>
         </span>
          <div id="descc" class="form-group label-floating">
           <label class="control-label">Summary <small>(Write a short event summary to get attendees excited.)
           </small></label>
         <input id="desc" name="description" type="text" class="form-control">
          </div>
            </div>
            <div  id="event" class="form-group label-floating col-sm-12 col-sm-offset-1">
            <label class="control-label">Type of events</label>
               <select id="eventSlct" class="form-control" required >
                <option value=""></option>
                <option value="Birthday"> Birthday </option>
                 <option value="Obituary">Obituary</option>
                <option value="Wedding">Wedding</option>
                <option value="Baptism">Baptism</option>
                <option value="...">...</option>
               </select>
              <span class="material-input"></span></div>
              <div id="venue1" class="col-sm-10 col-sm-offset-1">
                <div class="form-group label-floating">
                   <i class="material-icons">location_on</i>
                     <label for="Venue" class="control-label">Venue</label>
                     <input id="venue" name="venue" type="text" class="form-control">
                </div>
              </div>
              <div id="date"class="col-sm-5 col-sm-offset-1">
                <div class="input-group">
                  <span class="input-group-addon">
                       <i class="material-icons">calendar_today</i>
                   </span>
                    <input id="Date" name="Date" type="text" class="datepicker form-control" placeholder="Event Start (required)" autocomplete="off" required>
                       </div>
                       </div>
                       <div id="timee" class="col-sm-5">
                                            <div class="input-group">
                                                 <input id="time" type="text" placeholder="Time" class="datetimepicker form-control" autocomplete="off">
                                            </div>
                                        </div>  
            <div class="modal-footer">
                <button type="submit" class="btn btn-default btn-simple" onclick="updateClick()">update</button>
                <button type="button" class="btn btn-danger btn-simple" data-dismiss="modal">Close</button>
            </div>
        </form>
        </div>
    </div>
</div>



        </main>
</body>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-messaging.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-storage.js"></script>
<script src="assets/js/init.js "></script>

 <!--  Core JS Files   -->

<script src='https://code.jquery.com/jquery-3.4.1.min.js'></script>
<script src="assets/js/material-kit/bootstrap.min.js" type="text/javascript"></script>
<script src="assets/js/material-kit/material.min.js" type="text/javascript"></script>
<script src="assets/js/material-kit/jquery.bootstrap.js "></script>

<script src="assets/js/auth.js"></script>

    <!-- Plugin for Date Time Picker and Full Calendar Plugin   --> 
<script src="assets/js/material-kit/moment.min.js"></script>

<!--	Plugin for Tags, full documentation here: http://xoxco.com/projects/code/tagsinput/   -->
<script src="assets/js/material-kit/bootstrap-tagsinput.js"></script>

<!-- Sweet Alert 2 plugin -->
<script src="assets/js/material-kit/sweetalert2.js"></script>


<!--  More information about jquery.validate here: http://jqueryvalidation.org/  -->
<script src="assets/js/material-kit/jquery.validate.min.js "></script>
<!--    Plugin for Date Picker   -->
<script src="assets/js/material-kit/bootstrap-datepicker.js"></script>

<script src="assets/js/material-kit/material-kit.js" type="text/javascript"></script>

<script src="assets/js/events.js"></script>
<!-- <script src="assets/js/genealogy.js"></script> -->




<script defer src="assets/js/messaging.js"></script>
<script defer src="assets/js/autocompletePlaces.js"></script>
<script defer src="assets/js/notificationsPopOut.js"></script>
<script src="assets/js/material-kit/bootstrap-datetimepicker.js" type="text/javascript"></script>

<!-- <script defer src="assets/js/carousel.js"></script>
<script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>
<script src='https://npmcdn.com/flickity@2.0/dist/flickity.pkgd.min.js'></script> -->


</html>