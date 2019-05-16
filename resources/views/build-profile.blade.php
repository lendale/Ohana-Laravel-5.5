<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ohana</title>
    <link rel="shortcut icon" href="assets/img/favicon.ico" />

    <!-- Fonts and icons -->
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">

    <!-- CSS Files -->
    <link href="assets/css/material-kit/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/material-kit/material-bootstrap-wizard.css">
</head>

<body class="image-container set-full-height" style="background-image: url('assets/img/wizard-profile.jpg'); background-repeat: no-repeat; background-attachment: fixed;">
    <main class="container">
        <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
                <!-- Wizard container -->
                <div class="wizard-container">
                    <div class="card wizard-card" data-color="green" id="wizard_profile">
                        <form action="" method="">
                            <!-- You can switch " data-color="purple" "  with one of the next bright colors: "green", "orange", "red", "blue" -->

                            <div class="wizard-header">
                                <h3 class="wizard-title">
                                    Build Your Profile
                                </h3>
                                <h5>This information will let us know more about you.</h5>
                            </div>
                            <div class="wizard-navigation">
                                <ul>
                                    <li><a href="#about" data-toggle="tab">About</a></li>
                                    <!-- <li><a href="#family" data-toggle="tab">Family</a></li> -->
                                    <li><a href="#address" data-toggle="tab">Address</a></li>
                                </ul>
                            </div>

                            <div class="tab-content">
                                <div class="tab-pane" id="about">
                                    <div class="row">
                                        <h4 class="info-text">Let's start with the basic information</h4>
                                        <div class="col-sm-4 col-sm-offset-1">
                                            <br><br>
                                            <div class="picture-container">
                                                <div class="picture">
                                                    <img src="assets/img/default-avatar.png" class="picture-src" id="wizard_picture_preview" title="" />
                                                    <input type="file" id="wizard_picture" accept="image/jpeg" required>
                                                    <!-- <input type="file" id="wizard_picture" required> -->
                                                </div>
                                                <h6>Choose Picture <small>(required)</small></h6>
                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <div class="input-group">
                                                <span class="input-group-addon">
													<i class="material-icons">face</i>
												</span>
                                                <div id="group_first_name" class="form-group label-floating">
                                                    <label class="control-label">First Name <small>(required)</small></label>
                                                    <input id="first_name" name="firstname" type="text" class="form-control">
                                                </div>
                                            </div>

                                            <div class="input-group">
                                                <span class="input-group-addon">
													<i class="material-icons" style="color: white;">face</i>
												</span>
                                                <div id="group_middle_name" class="form-group label-floating">
                                                    <label class="control-label">Middle Name</label>
                                                    <input id="middle_name" name="middlename" type="text" class="form-control">
                                                </div>
                                            </div>

                                            <div class="input-group">
                                                <span class="input-group-addon">
													<i class="material-icons">record_voice_over</i>
												</span>
                                                <div id="group_last_name" class="form-group label-floating">
                                                    <label class="control-label">Last Name <small>(required)</small></label>
                                                    <input id="last_name" name="lastname" type="text" class="form-control">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-5 col-sm-offset-1">
                                            <div class="input-group">
                                                <span class="input-group-addon">
													<i class="material-icons">cake</i>
                                                </span>
                                                <!-- <label class="control-label">Date of birth <small>(required)</small></label> -->
                                                <input id="birth_date" name="birthdate" type="text" class="datepicker form-control" placeholder="Date of birth (required)" required>
                                            </div>
                                        </div>

                                        <div class="col-sm-5">
                                            <div class="input-group">
                                                <span class="input-group-addon">
													<i class="material-icons">place</i>
												</span>
                                                <div id="group_birth_place" class="form-group label-floating">
                                                    <label class="control-label">Place of birth</label>
                                                    <input id="birth_place" name="birthplace" type="text" class="form-control">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-10 col-sm-offset-1">
                                            <div class="input-group">
                                                <span class="input-group-addon">
													<i class="material-icons">email</i>
												</span>
                                                <div id="group_email" class="form-group label-floating">
                                                    <label class="control-label">Email <small>(required)</small></label>
                                                    <input id="email" name="email" type="email" class="form-control">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-10 col-sm-offset-1" required>
                                            <div class="col-sm-6">
                                                <div id="radio_group_male" class="choice" data-toggle="wizard-radio">
                                                    <input id="radio_male" type="radio" name="gender" value="male">
                                                    <div class="icon">
                                                        <i class="fa fa-male"></i>
                                                    </div>
                                                    <h6>Male</h6>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div id="radio_group_female" class="choice" data-toggle="wizard-radio">
                                                    <input id="radio_female" type="radio" name="gender" value="female">
                                                    <div class="icon">
                                                        <i class="fa fa-female"></i>
                                                    </div>
                                                    <h6>Female</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="tab-pane" id="family">
                                    <h4 class="info-text"> What are you doing? (checkboxes) </h4>
                                    <div class="row">
                                        <div class="col-sm-10 col-sm-offset-1">

                                        </div>
                                    </div>
                                </div> -->
                                <div class="tab-pane" id="address">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h4 class="info-text"> Are you living in a nice area? </h4>
                                        </div>
                                        <div class="col-sm-7 col-sm-offset-1">
                                            <div class="form-group label-floating">
                                                <label for="streetAddress" class="control-label">House Number, Street Name</label>
                                                <input id="street_address" name="streetAddress" type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group label-floating">
                                                <label for="barangay" class="control-label">Barangay</label>
                                                <input id="barangay" name="barangay" type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-sm-5 col-sm-offset-1">
                                            <div class="form-group label-floating">
                                                <label for="city" class="control-label">City</label>
                                                <input id="city" name="city" type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="col-sm-5">
                                            <div class="form-group label-floating">
                                                <label for="postalCode" class="control-label">Postal Code</label>
                                                <input id="postal_code" name="postalCode" type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="wizard-footer">
                                <div class="pull-right">
                                    <input id="next" type='button' class='btn btn-next btn-fill btn-success btn-wd' name='next' value='Next' />
                                    <input id="finish" type='button' class='btn btn-finish btn-fill btn-success btn-wd' name='finish' value='Finish' />
                                </div>

                                <div class="pull-left" id='previous'>
                                    <input type='button' class='btn btn-previous btn-fill btn-default btn-wd' name='previous' value='Previous' />
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- wizard container -->
            </div>
        </div>
        <!-- end row -->
    </main>

    <footer class="footer">
        <div class="container text-center">
            <div class="copyright pull-center">
                &copy;
                <script>
                    document.write(new Date().getFullYear())
                </script>, O H A N A &nbsp;<i class="fa fa-heart heart"></i>
                <!-- made with <i class="fa fa-heart heart"></i> by Team Ohana -->
            </div>
        </div>
    </footer>
    
    <div class="modal fade" id="potential_data" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        <i class="material-icons">clear</i>
                    </button>
                    <h4 class="modal-title"></h4>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="assets/img/default-avatar.png" class="picture-src" id="potential_pic" title="" style="height: 150px; width: 150px" />
                        </div>

                        <div class="col-md-8">
                            <div class="input-group">
                                <span class="input-group-addon">
									<i class="material-icons">face</i>
								</span>
                                <div id="group_first_name" class="form-group label-floating">
                                    <label class="control-label">First Name <small>(required)</small></label>
                                    <input id="first_name" name="firstname" type="text" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer"></div>
            </div>
        </div>
    </div>
</body>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js "></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-auth.js "></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-database.js "></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-storage.js "></script>
<script src="assets/js/init.js "></script>

<!-- Core JS Files -->
<script src="assets/js/jquery-3.2.1.min.js " type="text/javascript "></script>
<script src="assets/js/material-kit/bootstrap.min.js " type="text/javascript "></script>
<script src="assets/js/material-kit/jquery.bootstrap.js "></script>

<!-- Sweet Alert 2 plugin -->
<script src="assets/js/material-kit/sweetalert2.js"></script>

<!-- Plugin for the Wizard -->
<script src="assets/js/material-kit/material-bootstrap-wizard.js "></script>

<!-- More information about jquery.validate here: http://jqueryvalidation.org/ -->
<script src="assets/js/material-kit/jquery.validate.min.js "></script>

<!-- Plugin for Date Picker -->
<script src="assets/js/material-kit/bootstrap-datepicker.js"></script>

<script src="assets/js/build-profile.js"></script>

</html>