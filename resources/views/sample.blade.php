<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Genealogy</title>
    <link rel="shortcut icon" href="assets/img/favicon.ico" />

    <!--     Fonts and icons     -->
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />

    <!-- CSS Files -->
    <link href="assets/css/material-kit/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/css/material-kit/material-kit.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.10.2/sweetalert2.min.css">
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
	        <div class="collapse navbar-collapse" id="navigation">
	            <ul class="nav navbar-nav navbar-right">
	                <li class="active">
	                    <a href="/genealogy">Genealogy</a>
	                </li>
	                <li>
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
	                        <li><a href="#">You have 5 new tasks</a></li> -->
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

	<main class="main section-full-screen section-white">
	    <!-- Add Existing -->
	    <div class="modal fade" id="modal_add_existing" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	        <div class="modal-dialog">
	            <div class="modal-content">
	                <div class="modal-header">
	                    <h4 class="modal-title"></h4>
	                </div>

	                <div class="modal-body">
	                    <!-- send and delete buttons -->
	                    <div class="row">
	                        <div class="col-md-6 col-sm-6">
	                            <input type="text" id="search_input" placeholder="Type Email or Name" onfocus="this.value=''" style="width:100%; padding: 20px 20px; font-size: 15px;">
	                        </div>
	                        <div class="col-md-3 col-sm-3">
	                            <button id="search_button" class="btn btn-danger btn-lg">
	                                <i class="fa fa-search"></i>
	                            </button>
	                        </div>
	                        <div class="col-md-3 col-sm-3">
	                            <button id="search_delete_button" class="btn btn-danger btn-lg">
	                                <i class="material-icons">delete_forever</i>
	                            </button>
	                        </div>
	                    </div>
	                    <!-- end send and delete buttons -->
	                    <br>
	                    <!-- display result here -->
	                    <div class="row" style="display: none;" id="search_found">
	                        <div class="col-md-6 col-sm-6">
	                            <label class="control-label">First Name</label>
	                            <input id="search_first_name" name="firstname" type="text" class="form-control first-name" readonly>
	                        </div>
	                        <div class="col-md-6 col-sm-6">
	                            <label class="control-label">Last Name</label>
	                            <input id="search_last_name" name="lastname" type="text" class="form-control last-name" readonly>
	                        </div>
	                    </div>
	                    <div class="row" style="display: none;" id="search_found2">
	                        <div class="col-md-6 col-sm-6">
	                            <label class="control-label">Email address</label>
	                            <input id="seach_email" name="email" type="text" class="form-control email" readonly>
	                        </div>
	                        <div class="col-md-6 col-sm-6">
	                            <label class="control-label">Birth Date</label>
	                            <input id="search_birth_date" name="birthdate" type="text" class="datepicker form-control birth-date" readonly>
	                        </div>
	                    </div>
	                    <div class="row" style="display: none;" id="search_found3">
	                        <div class="col-md-6 col-sm-6">
	                            <h5 class="modal-title">Is this the person you're looking for?</h5>
	                        </div>
	                        <div class="col-md-3 col-sm-3">
	                            <button id="search_disconfirm" class="btn btn-danger btn-block" data-toggle="modal">No</button>
	                        </div>
	                        <div class="col-md-3 col-sm-3">
	                            <button id="search_confirm" class="btn btn-danger btn-block" data-toggle="modal" data-dismiss="modal">Yes</button>
	                        </div>
	                    </div>
	                    <!-- no result found -->
	                    <div class="row" style="display: none;" id="search_no_result">
	                        <div class="col-md-12 col-sm-12">
	                            <input id="search_none_input" type="text" class="form-control" style="font-size: 15px;" readonly>
	                            Click on search bar to retype.
	                        </div>
	                    </div>
	                    <!-- end display result here -->
	                </div>
	            </div>
	        </div>
	    </div>
	</main>
</body>
</html>