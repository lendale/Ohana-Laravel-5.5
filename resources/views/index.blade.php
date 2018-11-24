<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ohana</title>
    <link rel="shortcut icon" href="assets/img/favicon.ico" />

    <!-- Fonts and icons -->
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />

    <!-- CSS Files -->
    <link href="assets/css/material-kit/bootstrap.min.css" rel="stylesheet" />
    <link href="assets/css/material-kit/material-kit.css" rel="stylesheet" />
</head>

<body class="landing-page" data-spy="scroll">
    <nav class="navbar navbar-inverse navbar-transparent navbar-fixed-top navbar-color-on-scroll" color-on-scroll=" ">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#index_nav">
                	<span class="sr-only">Toggle navigation</span>
    		        <span class="icon-bar"></span>
    		        <span class="icon-bar"></span>
    		        <span class="icon-bar"></span>
            	</button>
                <a class="navbar-brand" href="">O H A N A</a>
            </div>

            <div class="collapse navbar-collapse" id="index_nav">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="#features">Features</a>
                    </li>
                    <li>
                        <a href="#about_us">About Us</a>
                    </li>
                    <li>
                        <div class="dropdown">
                            <a href="" class="btn dropdown-toggle btn-round btn-danger" data-toggle="dropdown"> Get Started
    	                        <b class="caret"></b>
	                        </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="" data-toggle="modal" data-target="#modal_register">
                                        <i class="material-icons">person_add</i> Register
                                    </a>
                                </li>
                                <li>
                                    <a href="" data-toggle="modal" data-target="#modal_login">
                                        <i class="material-icons">fingerprint</i> Login
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <header id="index_carousel" data-parallax="true" class="carousel slide" data-ride="carousel">
        <div class="carousel slide" data-ride="carousel">
            <!-- Indicators -->
            <!-- <ol class="carousel-indicators">
                <li data-target="#index_carousel" data-slide-to="0" class="active"></li>
                <li data-target="#index_carousel" data-slide-to="1"></li>
                <li data-target="#index_carousel" data-slide-to="2"></li>
            </ol> -->

            <!-- Wrapper for slides -->
            <div class="carousel-inner">
                <div class="item active">
                    <div class="page-header header-filter" style="background-image: url('assets/img/index/dg1.jpg');">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6 text-left">
                                    <h1 id="head_carousel_title_1" class="title"></h1>
                                    <h4 id="head_carousel_sub_1"></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <div class="page-header header-filter" style="background-image: url('assets/img/index/dg2.jpg');">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-8 col-md-offset-2 text-center">
                                    <h1 id="head_carousel_title_2" class="title"></h1>
                                    <h4 id="head_carousel_sub_2"></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item">
                    <div class="page-header header-filter" style="background-image: url('assets/img/index/dg3.jpg');">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-7 col-md-offset-5 text-right">
                                    <h1 id="head_carousel_title_3" class="title"></h1>
                                    <h4 id="head_carousel_sub_3"></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- End Wrapper for slides -->
        </div>
    </header>

    <main class="main main-raised">
        <section id="features" class="section section-content container">
            <div class="text-center">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <h2 id="ohana_title" class="title"></h2>
                        <h5 id="ohana_desc" class="description"></h5>
                    </div>
                </div>

                <div class="features">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="info">
                                <div class="icon icon-info">
                                    <i class="fa fa-sitemap" aria-hidden="true"></i>
                                </div>
                                <h4 id="feat_title_1" class="info-title"></h4>
                                <p id="feat_sub_1"></p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="info">
                                <div class="icon icon-danger">
                                    <i class="material-icons">notifications_active</i>
                                </div>
                                <h4 id="feat_title_2" class="info-title"></h4>
                                <p id="feat_sub_2"></p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="info">
                                <div class="icon icon-warning">
                                    <i class="material-icons">photo_library</i>
                                </div>
                                <h4 id="feat_title_3" class="info-title"></h4>
                                <p id="feat_sub_3"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="about_us" class="section section-content container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2 text-center">
                    <h2 id="team_title" class="title"></h2>
                    <h5 id="team_desc" class="description"></h5>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="card card-profile card-plain">
                        <div class="col-md-5">
                            <div class="card-image">
                                <a>
                                    <img id="team_mem_pic_1" class="img">
                                </a>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="card-content">
                                <h4 id="team_mem_name_1" class="card-title"></h4>
                                <h6 id="team_mem_pos_1" class="category text-muted"></h6>
                                <p id="team_mem_sub_1" class="card-description"></p>
                                <div class="footer">
                                    <a id="team_mem_twit_1" class="btn btn-just-icon btn-simple btn-twitter"><i class="fa fa-twitter"></i></a>
                                    <a id="team_mem_fb_1" class="btn btn-just-icon btn-simple btn-facebook"><i class="fa fa-facebook-square"></i></a>
                                    <a id="team_mem_gplus_1" class="btn btn-just-icon btn-simple btn-google"><i class="fa fa-google"></i></a>
                                    <a id="team_mem_insta_1" class="btn btn-just-icon btn-simple btn-instagram"><i class="fa fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card card-profile card-plain">
                        <div class="col-md-5">
                            <div class="card-image">
                                <a>
                                    <img id="team_mem_pic_2" class="img">
                                </a>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="card-content">
                                <h4 id="team_mem_name_2" class="card-title"></h4>
                                <h6 id="team_mem_pos_2" class="category text-muted"></h6>
                                <p id="team_mem_sub_2" class="card-description"></p>
                                <div class="footer">
                                    <a id="team_mem_twit_2" class="btn btn-just-icon btn-simple btn-twitter"><i class="fa fa-twitter"></i></a>
                                    <a id="team_mem_fb_2" class="btn btn-just-icon btn-simple btn-facebook"><i class="fa fa-facebook-square"></i></a>
                                    <a id="team_mem_gplus_2" class="btn btn-just-icon btn-simple btn-google"><i class="fa fa-google"></i></a>
                                    <a id="team_mem_insta_2" class="btn btn-just-icon btn-simple btn-instagram"><i class="fa fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card card-profile card-plain">
                        <div class="col-md-5">
                            <div class="card-image">
                                <a>
                                    <img id="team_mem_pic_3" class="img">
                                </a>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="card-content">
                                <h4 id="team_mem_name_3" class="card-title"></h4>
                                <h6 id="team_mem_pos_3" class="category text-muted"></h6>
                                <p id="team_mem_sub_3" class="card-description"></p>
                                <div class="footer">
                                    <a id="team_mem_twit_3" class="btn btn-just-icon btn-simple btn-twitter"><i class="fa fa-twitter"></i></a>
                                    <a id="team_mem_fb_3" class="btn btn-just-icon btn-simple btn-facebook"><i class="fa fa-facebook-square"></i></a>
                                    <a id="team_mem_gplus_3" class="btn btn-just-icon btn-simple btn-google"><i class="fa fa-google"></i></a>
                                    <a id="team_mem_insta_3" class="btn btn-just-icon btn-simple btn-instagram"><i class="fa fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card card-profile card-plain">
                        <div class="col-md-5">
                            <div class="card-image">
                                <a>
                                    <img id="team_mem_pic_4" class="img">
                                </a>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="card-content">
                                <h4 id="team_mem_name_4" class="card-title"></h4>
                                <h6 id="team_mem_pos_4" class="category text-muted"></h6>
                                <p id="team_mem_sub_4" class="card-description"></p>
                                <div class="footer">
                                    <a id="team_mem_twit_4" class="btn btn-just-icon btn-simple btn-twitter"><i class="fa fa-twitter"></i></a>
                                    <a id="team_mem_fb_4" class="btn btn-just-icon btn-simple btn-facebook"><i class="fa fa-facebook-square"></i></a>
                                    <a id="team_mem_gplus_4" class="btn btn-just-icon btn-simple btn-google"><i class="fa fa-google"></i></a>
                                    <a id="team_mem_insta_4" class="btn btn-just-icon btn-simple btn-instagram"><i class="fa fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- <div class="section">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-md-3">
                        <img src="assets/h_1.jpg" alt="" />
                    </div>
                    <div class="col-md-3">
                        <img src="assets/h_2.jpg" alt="" />
                    </div>
                    <div class="col-md-3">
                        <img src="assets/h_3.jpg" alt="" />
                    </div>
                    <div class="col-md-3">
                        <img src="assets/h_4.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div> -->
    </main>

    <footer class="footer">
        <div class="container">
            <div class="copyright pull-center">
                &copy;
                <script>
                    document.write(new Date().getFullYear())
                </script>, O H A N A &nbsp;<i class="fa fa-heart heart"></i>
                <!-- made with <i class="fa fa-heart heart"></i> by Team Ohana -->
            </div>
        </div>
    </footer>

    <!-- Login Modal -->
    <div class="modal fade" id="modal_login" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-login">
            <div class="modal-content">
                <div class="card card-signup card-plain">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="material-icons">clear</i></button>

                        <div class="header header-primary text-center header-danger">
                            <h4 class="card-title">Log in</h4>
                            <div class="social-line">
                                <a class="btn btn-just-icon btn-simple auth_with_fb">
                                    <i class="fa fa-facebook-square"></i>
                                </a>
                                <a class="btn btn-just-icon btn-simple auth_with_twitter">
                                    <i class="fa fa-twitter"></i>
                                </a>
                                <a class="btn btn-just-icon btn-simple auth_with_google">
                                    <i class="fa fa-google-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body">
                        <form class="form" method="" action="">
                            <p class="description text-center">Or Be Classical</p>
                            <div class="card-content">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">email</i>
                                    </span>
                                    <input id="login_email" type="email" class="form-control" placeholder="Email...">
                                </div>

                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">lock_outline</i>
                                    </span>
                                    <input id="login_password" type="password" placeholder="Password..." class="form-control" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer text-center">
                        <a id="btn_signin" class="btn btn-danger btn-simple btn-wd btn-lg">Log In</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--  End Login Modal -->

    <!-- Signup Modal -->
    <div class="modal fade" id="modal_register" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-signup">
            <div class="modal-content">
                <div class="card card-signup card-plain">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="material-icons">clear</i></button>
                        <h2 class="modal-title card-title text-center" id="myModalLabel">Register</h2>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-5 col-md-offset-1">
                                <div class="info info-horizontal">
                                    <div class="icon icon-info">
                                        <i class="fa fa-sitemap"></i>
                                    </div>
                                    <div class="description">
                                        <h4 id="feat_title_1-1" class="info-title"></h4>
                                        <p id="feat_sub_1-1" class="description"></p>
                                    </div>
                                </div>

                                <div class="info info-horizontal">
                                    <div class="icon icon-danger">
                                        <i class="material-icons">code</i>
                                    </div>
                                    <div class="description">
                                        <h4 id="feat_title_2-1" class="info-title"></h4>
                                        <p id="feat_sub_2-1" class="description"></p>
                                    </div>
                                </div>

                                <div class="info info-horizontal">
                                    <div class="icon icon-warning">
                                        <i class="material-icons">group</i>
                                    </div>
                                    <div class="description">
                                        <h4 id="feat_title_3-1" class="info-title"></h4>
                                        <p id="feat_sub_3-1" class="description"></p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-5">
                                <div class="social text-center">
                                    <a class="btn btn-just-icon btn-round btn-facebook auth_with_fb">
                                        <i class="fa fa-facebook"></i>
                                    </a>
                                    <a class="btn btn-just-icon btn-round btn-twitter auth_with_twitter">
                                        <i class="fa fa-twitter"></i>
                                    </a>
                                    <a class="btn btn-just-icon btn-round btn-google auth_with_google">
                                        <i class="fa fa-google"></i>
                                    </a>
                                    <h4> or be classical </h4>
                                </div>

                                <form class="form" data-toggle="validator" method="" action="">
                                    <div class="card-content">
                                        <!-- <div class="input-group">
                                            <span class="input-group-addon">
											<i class="material-icons">face</i>
										</span>
                                            <input id="reg_first_name" type="text" class="form-control" placeholder="First Name *" required>
                                        </div>

                                        <div class="input-group">
                                            <span class="input-group-addon">
											<i class="material-icons">face</i>
										</span>
                                            <input id="reg_last_name" type="text" class="form-control" placeholder="Last Name *" required>
                                        </div> -->

                                        <div class="input-group">
                                            <span class="input-group-addon">
											    <i class="material-icons">email</i>
                                            </span>
                                            <div class="form-group label-floating">
                                                <label for="reg_email" class="control-label">Email Address <small>(required)</small></label>
                                                <input id="reg_email" name="reg_email" type="email" class="form-control" required>
                                            </div>
                                        </div>

                                        <div class="input-group">
                                            <span class="input-group-addon">
											    <i class="material-icons">lock_outline</i>
                                            </span>
                                            <div class="form-group label-floating">
                                                <label for="reg_password" class="control-label">Password <small>(required)</small></label>
                                                <input id="reg_password" name="reg_password" type="password" class="form-control" required/>
                                            </div>
                                        </div>

                                        <!-- <div class="category form-category">
                                            <star>*</star> Required fields
                                        </div> -->

                                        <div class="checkbox">
                                            <label>
											<input type="checkbox" name="optionsCheckboxes">
											I agree to the <a href="#something" class="text-info">terms and conditions</a>.
										</label>
                                        </div>
                                    </div>
                                    <div class="modal-footer text-center">
                                        <a id="btn_register" class="btn btn-danger btn-round">Get Started</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--  End Signup Modal -->

    <!-- Error Modal -->
    <div class="modal fade" id="error_details" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="card card-profile card-hidden">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <h4 id="error_details_node" class="text-left"></h4>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Error Modal -->
</body>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js "></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-auth.js "></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-database.js "></script>
<script src="assets/js/init.js "></script>

<!--   Core JS Files   -->
<script src="assets/js/jquery-3.2.1.min.js" type="text/javascript"></script>
<script src="assets/js/material-kit/bootstrap.min.js" type="text/javascript"></script>
<script src="assets/js/material-kit/material.min.js" type="text/javascript"></script>

<!-- Authentication -->
<script src="assets/js/index.js"></script>

<script src="assets/js/index-text.js"></script>

<!--	Plugin for Tags, full documentation here: http://xoxco.com/projects/code/tagsinput/   -->
<script src="assets/js/material-kit/bootstrap-tagsinput.js"></script>

<!--    Plugin for 3D images animation effect, full documentation here: https://github.com/drewwilson/atvImg    -->
<script src="assets/js/material-kit/atv-img-animation.js" type="text/javascript"></script>

<!--    Control Center for Material Kit: activating the ripples, parallax effects, scripts from the example pages etc    -->
<script src="assets/js/material-kit/material-kit.js" type="text/javascript"></script>

</html>