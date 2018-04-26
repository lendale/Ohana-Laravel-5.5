<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TEST - USER ALBUM</title>
    <link rel="shortcut icon" href="assets/img/favicon.ico" />

    <!--     Fonts and icons     -->
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />

    <!-- CSS Files -->
    <link href="assets/css/material-kit/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/css/material-kit/material-kit.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.10.2/sweetalert2.min.css">
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/album.css">
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
            <div class="collapse navbar-collapse" id="navigation">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="/timeline">Timeline</a>
                    </li>
                    <li>
                        <a href="/genealogy">Genealogy</a>
                    </li>
                    <li class="active">
                        <a href="/album_clan">Clan Album</a>
                    </li>
                    <li>
                        <a href="/events">Events</a>
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown">
                            <i class="material-icons">notifications</i>
                            <span class="notification"></span>
                            <p class="hidden-lg hidden-md">
                                Notifications
                                <b class="caret"></b>
                            </p>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- <li><a href="#">Mike John responded to your email</a></li>
                            <li><a href="#">You have 5 new tasks</a></li>
                            <li><a href="#">You're now friend with Andrew</a></li>
                            <li><a href="#">Another Notification</a></li>
                            <li><a href="#">Another One</a></li> -->
                        </ul>
                    </li>
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
                                <a href="" id="sign_out">Sign out</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
</nav>
<main class="main section-white section-full-screen">
    <section class="section container">
        
        <div class="row">
            <div class="col-md-1">
                        
                        <a type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="View Clan Album" href="/album_clan"><img src="assets/img/icons/icons8-gallery-48.png"><br>album</a>

                        <a type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="You're already on the page"  href="#"><img src="assets/img/icons/icons8-picture-48.png"><br>uploads</a>

                        <a type="button" class="btn btn-danger" data-toggle="modal" data-target="#uploadModal"><img src="assets/img/icons/icons8-add-camera-48.png"><br></a>
            </div>
        

            <div class="col-md-11">
                <!-- <div class="tab-content main-raised"> -->
                <div class="container">
                    
                    <!-- <div class="tab-pane active"> -->
                    <center>
                        <div id="card-container" class="row">
                            <div class="col-md-4">
                                <div class="card card-blog">
                                    <div class="card-image">
                                        <img src="assets/img/icons/gif.gif" id="photoUrl">
                                    </div>
                                    <div class="card-content"> 
                                    
                                        <p class="card-description" id="caption">
                                        <p>CAPTION</p>
                                        
                                        </p>
                                        <div class="footer">
                                        <i class="material-icons">schedule</i><br>
                                        <button class="btn btn-danger btn-round btn-sm" data-toggle="tooltip" data-placement="bottom" title="Delete Photo">delete</button>
                                        <button class="btn btn-danger btn-round btn-sm" data-toggle="tooltip" data-placement="bottom" title="Update Caption">update</button>
                                        </div>  
                                    </div>  
                                </div>
                            </div>
                        </div>
                    


                </div>
            </div>

        </div>
        <!-- ang naa sa babaw na div kay end sa class row -->
    </section>
</main>

<!-- UPLOAD PHOTO MODAL -->
<div class="modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			
            <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					<i class="material-icons">clear</i>
				</button>
				<h3 class="modal-title">It's a good day to share some photo 
                <img src="assets/img/icons/icons8-selfie-48.png">
                </h3>
			</div>

            <div class="modal-body">
				<div class="row">

                    <div class="col-md-5">
                        <div class="form-group label-floating form-danger">
                            <label class="control-label">Add Caption</label>
                            <input type="text" id="imgCaption" class="form-control">
                        </div>
                    </div>

                    <div class="col-md-7">
                        <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                            <div class="fileinput-new thumbnail img-raised">
                                <img src="assets/img/icons/gif.gif" alt="...">
                            </div>
                            <div class="fileinput-preview fileinput-exists thumbnail img-raised"></div>
                            <div>
                                <span class="btn btn-raised btn-round btn-danger btn-file">
                                <span class="fileinput-new">Select image</span>
                                <!-- <span class="fileinput-exists">Change</span> -->
                                <input type="file" name="..." id="fileButton" value="upload"/>
                                </span>
                                    <!-- <a href="#pablo" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput">
                                    <i class="fa fa-times"></i> Remove</a> -->
                            </div>
                        </div>
                    </div>

                    
                </div>
			</div>
		
            <!-- <div class="modal-footer">
				<button type="button" class="btn btn-default btn-simple" onclick="storeUserImage()">Save photo</button>
				<button type="button" class="btn btn-danger btn-simple" data-dismiss="modal">Close</button>
            </div> -->

		</div>
	</div>
</div>

<!-- UPDATE CAPTION MODAL -->
<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			
            <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					<i class="material-icons">clear</i>
				</button>
				<h3 class="modal-title">Changed your mind? We got it!
                <img src="assets/img/icons/icons8-thinking-male-48.png">
                </h3>
			</div>

            <div class="modal-body">
				<div class="row">
                    <div class="col-md-12">
                 
                        <div class="form-group label-floating form-danger">
                            <label class="control-label">Input New Caption</label>
                            <input type="text" id="picCap" class="form-control">
                        </div>
                    </div>
                </div>
			</div>
		
            <div class="modal-footer">
				<button type="button" class="btn btn-default btn-simple" onclick="saveNewCaption()">Save changes</button>
				<button type="button" class="btn btn-danger btn-simple" data-dismiss="modal">Close</button>
            </div>

		</div>
	</div>
</div>

</body>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js "></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-auth.js "></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-database.js "></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-storage.js"></script>
<script src="assets/js/init.js "></script>

<!--   Core JS Files   -->
<script src="assets/js/jquery-3.2.1.min.js" type="text/javascript"></script>
<script src="assets/js/material-kit/bootstrap.min.js" type="text/javascript"></script>
<script src="assets/js/material-kit/material.min.js" type="text/javascript"></script>

<!-- Authentication -->
<script src="assets/js/auth.js"></script>

<!--    Plugin for Date Time Picker and Full Calendar Plugin   -->
<script src="assets/js/material-kit/moment.min.js"></script>

<!-- Sweet Alert 2 plugin -->
<script src="assets/js/material-kit/sweetalert2.js"></script>

<!--	Plugin for the Sliders, full documentation here: http://refreshless.com/nouislider/   -->
<!-- <script src="assets/js/bootstrap/nouislider.min.js" type="text/javascript"></script> -->

<!--	Plugin for the Datepicker, full documentation here: https://github.com/Eonasdan/bootstrap-datetimepicker   -->
<script src="assets/js/material-kit/bootstrap-datetimepicker.js" type="text/javascript"></script>

<!--    Plugin for Date Picker   -->
<!-- <script src="assets/js/material-kit/bootstrap-datepicker.js"></script> -->

<!--	Plugin for Select, full documentation here: http://silviomoreto.github.io/bootstrap-select   -->
<script src="assets/js/material-kit/bootstrap-selectpicker.js" type="text/javascript"></script>

<!--	Plugin for Tags, full documentation here: http://xoxco.com/projects/code/tagsinput/   -->
<script src="assets/js/material-kit/bootstrap-tagsinput.js"></script>

<!--	Plugin for Fileupload, full documentation here: http://www.jasny.net/bootstrap/javascript/#fileinput   -->
<script src="assets/js/material-kit/jasny-bootstrap.min.js"></script>

<!--    Plugin for 3D images animation effect, full documentation here: https://github.com/drewwilson/atvImg    -->
<script src="assets/js/material-kit/atv-img-animation.js" type="text/javascript"></script>

<!--    Control Center for Material Kit: activating the ripples, parallax effects, scripts from the example pages etc    -->
<script src="assets/js/material-kit/material-kit.js" type="text/javascript"></script>

<!-- USER ALBUM JS -->
<script src="assets/js/album_user.js"></script>

</html>