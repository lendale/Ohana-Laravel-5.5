<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Immediate Albums</title>
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
<body class="image-container set-full-height" >
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
                    <li>
                         <!-- Album Dropdown -->
                         <a href="#" class="dropdown-toggle" data-toggle="dropdown">Album</a>
                            <ul class="dropdown-menu">
                                <li><a href="/album_user">My Albums</a></li>
                                <li><a href="/album_clan">Clan Album</a></li>
                                <li><a href="/album_extended" disabled>Extended Album</a></li>
                                <li><a href="/album_immediate" disabled>Immediate Album</a></li>
                            </ul>
                    </li>
                    <li>
                         <!-- Album Dropdown -->
                         <a href="#" class="dropdown-toggle" data-toggle="dropdown">Events</a>
                            <ul class="dropdown-menu">
                                <li><a href="/events">Clan Events</a></li>
                                <li><a href="/eventsImmediate">Immediate Events</a></li>
                                <li><a href="/eventsExtended" disabled>Extended Events</a></li>
                            </ul>
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
<main>
    <section class="select container">
        <div class="row">
            <div id="section">
            <a type="button" onclick="getImmAlbumList()" class="btn btn-danger btn-sm" data-toggle="modal" title="Upload Photo" data-target="#uploadModal">Upload Photo</a>

            <a type="button" class="btn btn-danger btn-sm" data-toggle="modal" title="Create Album" data-target="#createAlbumCoverModal">Create Immediate Album<br></a>
            </div>
            <div class="col-md-12">
                <div class="container">
                    <center>
                    <div id="card-container" class="row">
                        <div class="col-md-4">
                            <div class="card card-blog">
                                <div class="card-image">
                                    <img src="assets/img/filipino/album cover 1.jpg" id="cover">
                                        <div class="card-title">                          
                                            <p id="name">Album Name</p>
                                        </div>
                                </div>
                                
                                <div class="card-content">
                                    <div class="card-description">
                                        <i><p id="description">Album Description</p></i>
                                    </div>
                                    <div class="footer" align="left">
                                        
                                        <!-- <i class="material-icons">face</i> -->
                                        <div id="creator">Album Creator</div>
                                        <br>
                                        <!-- <br><i class="material-icons">query_builder</i> -->
                                        <div id="timestamp">Time</div>
                                        <br>
                                        <!-- <br><i class="material-icons">settings</i> -->
                                        <div id="privacy">Ohana</div>
                                        <br>
                                    </div>
                                    <div class="footer">
                                        <a type="button" href="#pablo" data-toggle="tooltip" data-placement="bottom" title="View Photos" class="btn btn-sm btn-info btn-just-icon btn-fill btn-round"><i class="material-icons">photo_library</i>
                                        </a>
                                        <a type="button" href="#pablo" data-toggle="tooltip" data-placement="bottom" title="Edit Album Information" class="btn btn-sm btn-success btn-just-icon btn-fill btn-round btn-wd"><i class="material-icons">edit</i>
                                        </a>
                                        <a type="button" href="#pablo" data-toggle="tooltip" data-placement="bottom" title="Delete Album" class="btn btn-danger btn-just-icon btn-fill btn-round"><i class="material-icons">delete_forever</i>
                                        </a>
                                    </div>
                                </div>  
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
</main>

<!-- UPLOAD PHOTO NEW MODAL -->
<div class="modal fade bd-example-modal-lg" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			
            <div class="modal-header">One for All, All for One! 
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					<i class="material-icons">clear</i>
				</button>
				<center><h2 class="modal-title">Upload Photo
                <img src="assets/img/icons/album.png"  style="width:60px;height:60px;">
                </h2></center>
			</div>

            <div class="modal-body">
				<div class="row">
                    <div class="col-md-6">
                        <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                            <div class="fileinput-new thumbnail img-raised">
                                <img src="assets/img/icons/cover.png" alt="..." >
                            </div>
                            <div class="fileinput-preview fileinput-exists thumbnail img-raised"></div>
                            <div>
                                <span class="btn btn-raised btn-round btn-danger btn-file btn-sm">
                                <span class="fileinput-new">Select Image</span>
                                <span class="fileinput-exists">Change</span>
                                <input type="file" name="..." id="album_photo"/>
                                </span>
                                <a href="#pablo" class="btn btn-danger btn-round btn-sm fileinput-exists" data-dismiss="fileinput">Remove</a>    
                            </div>    
                        </div>
                    </div>
                
                    <strong><p><h4>Select Album:</h4></p></strong>
                    <div class="col-sm-6" id="all_album_list">
                        <select class="selectpicker select-danger" data-style="select-with-transition" title="Single Select" required>
                            <option id="photo_album">Album List</option>
                        </select>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group label-floating form-danger">
                            <label class="control-label"><strong>Add Photo Caption</strong>(required)</label>
                            <textarea class="form-control" id="photo_caption" rows="3" required></textarea>
                        </div>
                    </div>

                    <center><a type="button" class="btn btn-danger btn-fab btn-round" name="upload_photo" id="upload_photo"><i class="material-icons">done_outline</i></a></center>
			    </div>
		    </div>
	    </div>
    </div>
</div>

<!-- UPDATE ALBUM MODAL -->
<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
		<div class="modal-content">
			
            <div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					<i class="material-icons">clear</i>
				</button>
				<center><h3 class="modal-title">Update Album
                <img src="assets/img/icons/album.png"  style="width:40px;height:40px;">
                </h3></center>
			</div>

            <div class="modal-body">
				<div class="row">
                
                    <div class="col-sm-12">
                        <div class="form-group form-danger" id="for-name">
                            <label class="control-label"><strong>New Album Name</strong> (required)</label>
                            <input type="text" id="update_name" class="form-control" required>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group form-danger" id="for-desc">
                            <label class="control-label"><strong>Add New Album Description</strong>(required)</label>
                            <textarea class="form-control" id="update_description" rows="3" required></textarea>
                        </div>
                    </div>
    
                    
                    <!-- <div class="col-md-12"><h5>Edit Album Privacy:</h5></div> -->
                    
                        <!-- <div class="col-md-4">
                            <div class="form-check form-check-radio form-check-inline">
                                <label class="form-check-label" id="for-privacy-imm">
                                    <input class="form-check-input" type="radio" name="update_privacy" id="update_privacy" value="Immediate Family" required> Immediate Family
                                    <span class="circle">
                                        <span class="check"></span>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-check form-check-radio form-check-inline">
                                <label class="form-check-label" id="for-privacy-ext">
                                    <input class="form-check-input" type="radio" name="update_privacy" id="update_privacy" value="Extended Family">Extended Family
                                    <span class="circle">
                                        <span class="check"></span>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-check form-check-radio form-check-inline">
                                <label class="form-check-label" id="for-privacy-clan">
                                    <input class="form-check-input" type="radio" name="update_privacy" id="update_privacy" value="Clan"> Clan
                                    <span class="circle">
                                        <span class="check"></span>
                                    </span>
                                </label>
                            </div>
                        </div> -->

                    <center><a type="button" class="btn btn-danger btn-fab btn-round" name="create_album" id="update_album"><i class="material-icons">done_outline</i></a></center>
			    </div>
		    </div>
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

<!-- CREATE ALBUM MODAL -->
<div class="modal fade bd-example-modal-lg" id="createAlbumCoverModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			
            <div class="modal-header">One for All, All for One! 
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					<i class="material-icons">clear</i>
				</button>
				<center><h2 class="modal-title">Create Album
                <img src="assets/img/icons/album.png"  style="width:60px;height:60px;">
                </h2></center>
			</div>

            <div class="modal-body">
				<div class="row">
                    <div class="col-md-6">
                        <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                            <div class="fileinput-new thumbnail img-raised">
                                <img src="assets/img/icons/cover.png" alt="..." >
                            </div>
                            <div class="fileinput-preview fileinput-exists thumbnail img-raised"></div>
                            <div>
                                <span class="btn btn-raised btn-round btn-danger btn-file btn-sm">
                                <span class="fileinput-new">Select Album Cover</span>
                                <span class="fileinput-exists">Change</span>
                                <input type="file" name="..." id="album_cover"/>
                                </span>
                                <a href="#pablo" class="btn btn-danger btn-round btn-sm fileinput-exists" data-dismiss="fileinput">Remove</a>    
                            </div>    
                        </div>
                    </div>
                
                    <div class="col-sm-6">
                        <div class="form-group label-floating form-danger">
                            <label class="control-label"><strong>Album Name</strong> (required)</label>
                            <input type="text" id="album_name" class="form-control" required>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group label-floating form-danger">
                            <label class="control-label"><strong>Add Album Description</strong>(required)</label>
                            <textarea class="form-control" id="album_description" rows="3" required></textarea>
                        </div>
                    </div>
    
                    <h4>Share Album With:</h4>

                        <!-- <div class="form-group"> -->
                            <div class="form-check form-check-radio form-check-inline">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="radio" name="album_privacy" id="album_privacy" value="Immediate Family" checked="checked" required > Immediate Family
                                    <span class="circle">
                                        <span class="check"></span>
                                    </span>
                                </label>
                            </div>

                            <div class="form-check form-check-radio form-check-inline">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="radio" name="album_privacy" id="album_privacy" value="Extended Family" disabled>Extended Family
                                    <span class="circle">
                                        <span class="check"></span>
                                    </span>
                                </label>
                            </div>

                            <div class="form-check form-check-radio form-check-inline">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="radio" name="album_privacy" id="album_privacy" value="Clan" disabled> Clan
                                    <span class="circle">
                                        <span class="check"></span>
                                    </span>
                                </label>
                            </div>
                        <!-- </div> -->
                

                    <center><a type="button" class="btn btn-danger btn-fab btn-round" name="create_album" id="create_album"><i class="material-icons">done_outline</i></a></center>
			    </div>
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

<script src="assets/js/material-kit/material-kit.min.js" type="text/javascript"></script>

<!-- USER ALBUM JS -->
<script src="assets/js/album_immediate.js"></script>

</html>