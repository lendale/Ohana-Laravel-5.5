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


<body class="image-container set-full-height" style="background-image: url('assets/img/events 2.jpg'); background-repeat: no-repeat; background-attachment: fixed;">
     
    <main class="container">

        <div class="row">

            <div class="col-sm-8 col-sm-offset-2">

                <!-- Wizard container -->
                <div class="wizard-container">

                    <div class="card wizard-card" data-color="red" id="wizard_profile">
                        <form id="send-notification-form">
                            <!-- You can switch " data-color="purple" "  with one of the next bright colors: "green", "orange", "red", "blue" -->

                            <div class="wizard-header">
                                <h3 class="wizard-title">
                                    Creating Event
                                </h3>
                                <h5>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</h5>
                            </div>
                            <div class="wizard-navigation">
                                <ul>
                                    <li><a href="#basicDetails" data-toggle="tab">Basic Details</a></li>
                                    <!-- <li><a href="#family" data-toggle="tab">Family</a></li> -->
                                    <li><a href="#loc" data-toggle="tab">Location and Time</a></li>
                                </ul>
                            </div>

                            <div class="tab-content">
                                <div class="tab-pane" id="basicDetails">
                                    <div class="row">
                                        <h4 class="info-text">Let's start with the basic information</h4>
                                        <div class="col-sm-10  col-sm-offset-1">
                                            <br><br>
                                            <div class="picture-container">
                                                <div class="picture">
                                                    <img src="assets/img/image_placeholder.jpg" class="picture-src" id="wizard_picture_preview" title="" />
                                                    <input type="file" id="wizard_picture" required>
                                                </div>
                                                <h6>Choose Image <small>(required)</small></h6>
                                            </div>
                                        </div>


                                        <div class="col-sm-12">
                                            <div class="input-group">
                                                <span class="input-group-addon">
													<i class="material-icons">event</i>
												</span>
                                                <div id="group_first_name" class="form-group label-floating">
                                                    <label class="control-label">Event Title <small>(required)</small></label>
                                                    <input id="eventTitle" name="eventTitle" type="text" class="form-control">
                                                </div>
                                            </div>

                                            <div class="input-group">
                                                <span class="input-group-addon">
													<i class="material-icons" style="color: white;">event</i>
												</span>
                                                <div id="group_middle_name" class="form-group label-floating">
                                                    <label class="control-label">Summary <small>(Write a short event summary to get attendees excited.)</small></label>
                                                    <input id="desc" name="description" type="text" class="form-control">
                                                </div>
                                            </div>
                                          

                                            <div class="form-group label-floating">


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

                                                <div class="col-sm-10 col-sm-offset-1" required>
                                            <div class="col-sm-4">
                                                <div id="radio_group_male" class="choice" data-toggle="wizard-radio">
                                                    <input id="Immediate" type="radio" name="family" value="Immidiate">
                                                    <div class="icon">
                                                        <i class="material-icons">group</i>
                                                    </div>
                                                    <h6>Immediate Family</h6>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div id="radio_group_female" class="choice" data-toggle="wizard-radio">
                                                    <input id="Extended" type="radio" name="family" value="Extended">
                                                    <div class="icon">
                                                        <i class="material-icons">group_add</i>
                                                    </div>
                                                    <h6>Extended Family</h6>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div id="radio_group_female" class="choice" data-toggle="wizard-radio">
                                                    <input id="Clan" type="radio" name="family" value="Clan">
                                                    <div class="icon">
                                                        <i class="material-icons">group_add</i>
                                                    </div>
                                                    <h6>Clan</h6>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="loc">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <h5 class="info-text"> Help people in the area discover your event and let attendees know where to show up. </h5>
                                        </div>

                                        <div class="col-sm-10 col-sm-offset-1">
                                            <div class="form-group label-floating">
                                                
                                                    <i class="material-icons">location_on</i>
                                                
                                                <label for="Venue" class="control-label">Venue</label>
                                                <input id="venue" name="venue" type="text" class="form-control">
                                            </div>
                                        </div>

                                        <div class="col-sm-5 col-sm-offset-1">
                                            <div class="input-group">
                                                <span class="input-group-addon">
                                                    <i class="material-icons">calendar_today</i>
                                                </span>
                                                <input id="Date" name="Date" type="text" class="datepicker form-control" placeholder="Event Start (required)" autocomplete="off" required>
                                            </div>
                                        </div>
                                        
                                        <div class="col-sm-5">
                                            <div class="input-group">
                                                 <input id="time" type="text" placeholder="Time" class="datetimepicker form-control" autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-12 checkbox">
                                            <label>
                                                <input type="checkbox" id="check" >
                                               
                                            </label>
                                         <h5 class="info-text">Create an Album for this event </h5>
                                        
                                         </div>
                                    </div>
                                </div>
                            </div>

                            <div class="wizard-footer">
                                <div class="pull-right">
                                    <input id="next" type='button' class='btn btn-next btn-fill btn-danger btn-wd' name='next' value="next" />
                                    <!-- <button type="submit" class="btn btn-default btn-simple" onclick="addClick()" required>Post</button> -->
                                   <button type="submit" class="btn btn-finish btn-fill btn-danger" onclick="addClick()" required>Finish</button>
                                    <!-- <button type="submit" class="btn btn-finish btn-fill btn-danger" onclick="addClick()" required>Post</button> -->
                                </div>

                                <div class="pull-left">
                                    <input type='button' class='btn btn-previous btn-fill btn-default btn-wd' name='previous' value="previous" />
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
    
    <!-- <div class="modal fade" id="potential_data" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                </div> -->

                <div class="modal-footer"></div>
            </div>
        </div>
    </div>
</body>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.5.0/firebase-messaging.js"></script>
<script src="assets/js/init.js "></script>

<!--   Core JS Files   -->
<script src="assets/js/jquery-3.2.1.min.js " type="text/javascript "></script>
<script src="assets/js/material-kit/bootstrap.min.js " type="text/javascript "></script>
<script src="assets/js/material-kit/jquery.bootstrap.js "></script>

<!-- Sweet Alert 2 plugin -->
<script src="assets/js/material-kit/sweetalert2.js"></script>

<!--  Plugin for the Wizard -->
<script src="assets/js/material-kit/material-bootstrap-wizard.js "></script>

<!--  More information about jquery.validate here: http://jqueryvalidation.org/	 -->
<script src="assets/js/material-kit/jquery.validate.min.js "></script>
<!--    Plugin for Date Picker   -->
<script src="assets/js/material-kit/bootstrap-datepicker.js"></script>


<script src="assets/js/material-kit/material-kit.js" type="text/javascript"></script>
<script src="assets/js/material-kit/moment.min.js"></script>
<!-- Authentication -->
<script src="assets/js/auth.js"></script>
<script src="assets/js/events_clan.js"></script>

<script defer src="assets/js/messaging.js"></script>
</html>