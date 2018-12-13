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
        <section class="section container">
            <div class="row">
                <div class="col-md-1">
                    <ul id="ul_tabs" class="nav nav-pills nav-pills-icons nav-pills-danger nav-stacked" role="tab_list">
                        <li id="li_tab_tree" class="active">
                            <a href="#tab_tree" role="tab" data-toggle="tab">
                                <i class="fa fa-sitemap"></i> Tree
                            </a>
                        </li>
                        <li id="li_tab_search">
                            <a href="#tab_search" role="tab" data-toggle="tab">
                                <i class="fa fa-search"></i> Search
                            </a>
                        </li>
                    </ul>
                    <br><br>
                    <div>
                        <button id="btn_add" class="btn btn-danger btn-lg" data-toggle="modal" data-target="#modal_add_choice">
                            <i class="fa fa-user-plus"></i>
                        </button>
                        <button id="btn_search" class="btn btn-danger btn-lg" style="display: none;">
                            <i class="material-icons">send</i>
                        </button>
                    </div>
                </div>

                <div class="col-md-11">
                    <div class="tab-content main-raised">
                        <div class="tab-pane active" id="tab_tree">
                            <div id="genogram" style="height:73vh; width:100%;"></div>
                        </div>

                        <div class="tab-pane section" id="tab_search">
                            <div class="row">
                                <h3 class="title text-center">Search Relationship Between Two People</h3><br>

                                <div class="col-sm-5 col-sm-offset-1">
                                    <div class="form-group label-floating">
                                        <label for="person1" class="control-label">Person 1 <small>(full name)</small></label>
                                        <input id="person_1" name="person1" type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="col-sm-5">
                                    <div class="form-group label-floating">
                                        <label for="person2" class="control-label">Person 2 <small>(full name)</small></label>
                                        <input id="person_2" name="person2" type="text" class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {{--  <a class="btn btn-danger btn-round" href="" data-toggle="modal" data-target="#modal_add_family_member">
            Open modal
        </a>  --}}
    </main>

    <!-- Add Existing or New Member -->
    <div class="modal fade" id="modal_add_choice" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Family Member</h4>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <button id="button_add_existing" class="btn btn-danger btn-block" data-toggle="modal">Add Existing Member</button>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <button id="button_add_new" class="btn btn-danger btn-block" data-toggle="modal">Add New Member</button>
                        </div>
                    </div>
                    <!-- add new rows -->
                    <div class="row" id="div_add_new" style="display: none;">
                        <br>
                        <div class="col-md-6 col-sm-6">
                            <button id="add_parent" class="btn btn-danger btn-block" data-toggle="modal" data-dismiss="modal" data-target="#modal_add_parent">Parent</button>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <button id="add_sibling" class="btn btn-danger btn-block" data-toggle="modal" data-dismiss="modal" data-target="#modal_add_sibling">Sibling</button>
                        </div>
                    </div>

                    <div class="row" id="div_add_new2" style="display: none;">
                        <div class="col-md-6 col-sm-6">
                            <button id="add_spouse" class="btn btn-danger btn-block" data-toggle="modal" data-dismiss="modal" data-target="#modal_add_spouse">Spouse</button>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <button id="add_child" class="btn btn-danger btn-block" data-toggle="modal" data-dismiss="modal" data-target="#modal_add_child">Child</button>
                        </div>
                    </div>

                    <!-- add existing rows -->
                    <!-- send and delete buttons -->
                    <div class="row" id="div_add_existing" style="display: none;">
                        <br>
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
                </div>
            </div>
        </div>
    </div>

    <!-- Add Existing Member Modal -->
    <div class="modal fade" id="modal_add_existing_member" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        <i class="material-icons">clear</i>
                    </button>
                    <h4 class="modal-title">Who would you like to add?</h4>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <button id="add_parent2" class="btn btn-danger btn-block" data-toggle="modal" data-dismiss="modal">Parent</button>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <button id="add_sibling2" class="btn btn-danger btn-block" data-toggle="modal" data-dismiss="modal">Sibling</button>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <button id="add_spouse2" class="btn btn-danger btn-block" data-toggle="modal" data-dismiss="modal">Spouse</button>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <button id="add_child2" class="btn btn-danger btn-block" data-toggle="modal" data-dismiss="modal">Child</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Existing Parent Modal -->
    <div class="modal fade" id="modal_add_existing_parent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            <i class="material-icons">clear</i>
                        </button>
                        <h4 class="modal-title"></h4>
                    </div>

                    <div class="modal-body">
                        <form id="form_add_existing_parent" class="form" action="">
                                <!-- Input name start -->
                                <div class="row">
                                    <div class="col-md-4 text-center">
                                        <br>
                                        <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                                            <div class="fileinput-new thumbnail img-circle img-raised">
                                                <img class="fam-mem-pic" src="assets/img/placeholder.jpg" alt="...">
                                            </div>
                                            <div class="fileinput-preview fileinput-exists thumbnail img-circle img-raised"></div>
                                            <div>
                                                <span class="btn btn-raised btn-round btn-default btn-file">
                                                <span class="fileinput-new">Add Photo</span>
                                                <span class="fileinput-exists">Change</span>
                                                <input type="file" id="existing_parent_pic" name="..." value="upload"/></span>
                                                <br>
                                                <a href="" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i>Remove</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-8 row">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">face</i>
                                            </span>
                                            <div id="group_existing_parent_first_name" class="form-group label-floating">
                                                <input id="existing_parent_first_name" name="firstname" type="text" class="form-control first-name" placeholder="First Name (required)" required>
                                            </div>
                                        </div>

                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons" style="color: white;">face</i>
                                            </span>
                                            <div id="group_existing_parent_middle_name" class="form-group label-floating">
                                                <input id="existing_parent_middle_name" name="middlename" type="text" class="form-control middle-name" placeholder="Middle Name">
                                            </div>
                                        </div>

                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">record_voice_over</i>
                                            </span>
                                            <div id="group_existing_parent_last_name" class="form-group label-floating">
                                                <input id="existing_parent_last_name" name="lastname" type="text" class="form-control last-name" placeholder="Last Name (required)" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Input name end -->

                                <!-- Dropdowns start -->
                                <div class="row">
                                    <div class="col-md-4">
                                        <select id="existing_parent_gender" class="selectpicker select-gender" data-style="btn btn-danger btn-round" title="Gender Select" data-size="7" required>
                                            <option disabled selected>Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>

                                    <div class="col-md-4">
                                        <select id="existing_parent_living_status" class="selectpicker select-status" data-style="btn btn-danger btn-round" title="Living Status Select" data-size="7" required>
                                            <option disabled>Status</option>
                                            <option value="Living" selected>Living</option>
                                            <option value="Deceased">Deceased</option>
                                        </select>
                                    </div>

                                    <div class="col-md-4">
                                        <select id="existing_parent_role_in_tree" class="selectpicker select-role" data-style="btn btn-danger btn-round" title="Role Select" data-size="7" required>
                                            <option disabled selected>Role in Tree</option>
                                            <option value="guest">Guest</option>
                                            <option value="contributor">Contributor</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- Dropdowns end -->

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                    <i class="material-icons">email</i>
                                                </span>
                                            <div id="group_existing_parent_email" class="form-group label-floating">
                                                <input id="existing_parent_email" name="email" type="text" class="form-control email" placeholder="Email (required for Contributor)">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Birth row start -->
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">cake</i>
                                            </span>
                                            <input id="existing_parent_birth_date" name="birthdate" type="text" class="datepicker form-control birth-date" placeholder="Date of birth (required)" required>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">place</i>
                                            </span>
                                            <div id="group_existing_parent_birth_place" class="form-group label-floating">
                                                <input id="existing_parent_birth_place" name="birthplace" type="text" class="form-control birth-place" placeholder="Place of Birth (required)">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Birth row end -->
                            </form>
                    </div>

                    <div class="modal-footer">
                        <button id="save_existing_parent" type="button" class="btn btn-success add" data-dismiss="modal">Save</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

    <!-- Add Existing Sibling Modal -->
    <div class="modal fade" id="modal_add_existing_sibling" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            <i class="material-icons">clear</i>
                        </button>
                        <h4 class="modal-title"></h4>
                    </div>

                    <div class="modal-body">
                        <form id="form_add_existing_sibling" class="form" action="">
                                <!-- Input name start -->
                                <div class="row">
                                    <div class="col-md-4 text-center">
                                        <br>
                                        <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                                            <div class="fileinput-new thumbnail img-circle img-raised">
                                                <img class="fam-mem-pic" src="assets/img/placeholder.jpg" alt="...">
                                            </div>
                                            <div class="fileinput-preview fileinput-exists thumbnail img-circle img-raised"></div>
                                            <div>
                                                <span class="btn btn-raised btn-round btn-default btn-file">
                                                <span class="fileinput-new">Add Photo</span>
                                                <span class="fileinput-exists">Change</span>
                                                <input type="file" id="existing_sibling_pic" name="..." value="upload"/></span>
                                                <br>
                                                <a href="" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i>Remove</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-8 row">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">face</i>
                                            </span>
                                            <div id="group_existing_sibling_first_name" class="form-group label-floating">
                                                <input id="existing_sibling_first_name" name="firstname" type="text" class="form-control first-name" placeholder="First Name (required)" required>
                                            </div>
                                        </div>

                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons" style="color: white;">face</i>
                                            </span>
                                            <div id="group_existing_sibling_middle_name" class="form-group label-floating">
                                                <input id="existing_sibling_middle_name" name="middlename" type="text" class="form-control middle-name" placeholder="Middle Name">
                                            </div>
                                        </div>

                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">record_voice_over</i>
                                            </span>
                                            <div id="group_existing_sibling_last_name" class="form-group label-floating">
                                                <input id="existing_sibling_last_name" name="lastname" type="text" class="form-control last-name" placeholder="Last Name (required)" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Input name end -->

                                <!-- Dropdowns start -->
                                <div class="row">
                                    <div class="col-md-4">
                                        <select id="existing_sibling_gender" class="selectpicker select-gender" data-style="btn btn-danger btn-round" title="Gender Select" data-size="7" required>
                                            <option disabled selected>Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>

                                    <div class="col-md-4">
                                        <select id="existing_sibling_living_status" class="selectpicker select-status" data-style="btn btn-danger btn-round" title="Living Status Select" data-size="7" required>
                                            <option disabled>Status</option>
                                            <option value="Living" selected>Living</option>
                                            <option value="Deceased">Deceased</option>
                                        </select>
                                    </div>

                                    <div class="col-md-4">
                                        <select id="existing_sibling_role_in_tree" class="selectpicker select-role" data-style="btn btn-danger btn-round" title="Role Select" data-size="7" required>
                                            <option disabled selected>Role in Tree</option>
                                            <option value="guest">Guest</option>
                                            <option value="contributor">Contributor</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- Dropdowns end -->

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                    <i class="material-icons">email</i>
                                                </span>
                                            <div id="group_existing_sibling_email" class="form-group label-floating">
                                                <input id="existing_sibling_email" name="email" type="text" class="form-control email" placeholder="Email (required for Contributor)">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Birth row start -->
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">cake</i>
                                            </span>
                                            <input id="existing_sibling_birth_date" name="birthdate" type="text" class="datepicker form-control birth-date" placeholder="Date of birth (required)" required>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">place</i>
                                            </span>
                                            <div id="group_existing_sibling_birth_place" class="form-group label-floating">
                                                <input id="existing_sibling_birth_place" name="birthplace" type="text" class="form-control birth-place" placeholder="Place of Birth">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Birth row end -->
                            </form>
                    </div>

                    <div class="modal-footer">
                        <button id="save_existing_sibling" type="button" class="btn btn-success add" data-dismiss="modal">Save</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

    <!-- Add Exiting Spouse Modal -->
    <div class="modal fade" id="modal_add_existing_spouse" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        <i class="material-icons">clear</i>
                    </button>
                    <h4 class="modal-title"></h4>
                </div>

                <div class="modal-body">
                    <form id="form_add_existing_spouse" class="form" action="">
                            <!-- Input name start -->
                            <div class="row">
                                <div class="col-md-4 text-center">
                                    <br>
                                    <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                                        <div class="fileinput-new thumbnail img-circle img-raised">
                                            <img class="fam-mem-pic" src="assets/img/placeholder.jpg" alt="...">
                                        </div>
                                        <div class="fileinput-preview fileinput-exists thumbnail img-circle img-raised"></div>
                                        <div>
                                            <span class="btn btn-raised btn-round btn-default btn-file">
                                            <span class="fileinput-new">Add Photo</span>
                                            <span class="fileinput-exists">Change</span>
                                            <input type="file" id="existing_spouse_pic" value="upload" name="..." /></span>
                                            <br>
                                            <a href="" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i>Remove</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-8 row">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">face</i>
                                        </span>
                                        <div id="group_existing_spouse_first_name" class="form-group label-floating">
                                            <input id="existing_spouse_first_name" name="firstname" type="text" class="form-control first-name" placeholder="First Name (required)" required>
                                        </div>
                                    </div>

                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons" style="color: white;">face</i>
                                        </span>
                                        <div id="group_existing_spouse_middle_name" class="form-group label-floating">
                                            <input id="existing_spouse_middle_name" name="middlename" type="text" class="form-control middle-name" placeholder="Middle Name">
                                        </div>
                                    </div>

                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">record_voice_over</i>
                                        </span>
                                        <div id="group_existing_spouse_last_name" class="form-group label-floating">
                                            <input id="existing_spouse_last_name" name="lastname" type="text" class="form-control last-name" placeholder="Last Name (required)" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Input name end -->

                            <!-- Dropdowns start -->
                            <div class="row">
                                <div class="col-md-6">
                                    <select id="existing_spouse_gender" class="selectpicker select-gender" data-style="btn btn-danger btn-round" title="Gender Select" data-size="7" required>
                                        <option disabled selected>Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div class="col-md-6">
                                    <select id="existing_spouse_living_status" class="selectpicker select-status" data-style="btn btn-danger btn-round" title="Living Status Select" data-size="7" required>
                                        <option disabled>Status</option>
                                        <option value="Living" selected>Living</option>
                                        <option value="Deceased">Deceased</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <select required id="existing_spouse_relationship" class="selectpicker select-relationship" data-style="btn btn-danger btn-round" title="Relationship Status Select" data-size="7" required>
                                        <option disabled selected>Relationship</option>
                                        <option value="married">Married</option>
                                        <option value="separated">Separated</option>
                                    </select>
                                </div>

                                <div class="col-md-6">
                                    <select id="existing_spouse_role_in_tree" class="selectpicker select-role" data-style="btn btn-danger btn-round" title="Role Select" data-size="7" required>
                                        <option disabled selected>Role in Tree</option>
                                        <option value="guest">Guest</option>
                                        <option value="contributor">Contributor</option>
                                    </select>
                                </div>
                            </div>
                            <!-- Dropdowns end -->

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                                <i class="material-icons">email</i>
                                            </span>
                                        <div id="group_existing_spouse_email" class="form-group label-floating">
                                            <input id="existing_spouse_email" name="email" type="text" class="form-control email" placeholder="Email (required for Contributor)">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Birth row start -->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">cake</i>
                                        </span>
                                        <input id="existing_spouse_birth_date" name="birthdate" type="text" class="datepicker form-control birth-date" placeholder="Date of birth (required)">
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">place</i>
                                        </span>
                                        <div id="group_existing_spouse_birth_place" class="form-group label-floating">
                                            <input id="existing_spouse_birth_place" name="birthplace" type="text" class="form-control birth-date" placeholder="Place of Birth">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Birth row end -->
                        </form>
                </div>

                <div class="modal-footer">
                    <button id="save_existing_spouse" type="button" class="btn btn-success add" data-dismiss="modal">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Existing Child Modal -->
    <div class="modal fade" id="modal_add_existing_child" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        <i class="material-icons">clear</i>
                    </button>
                    <h4 class="modal-title"></h4>
                </div>

                <div class="modal-body">
                    <form id="form_add_existing_child" class="form" action="">
                        <!-- Input name start -->
                        <div class="row">
                            <div class="col-md-4 text-center">
                                <br>
                                <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail img-circle img-raised">
                                        <img class="fam-mem-pic" src="assets/img/placeholder.jpg" alt="...">
                                    </div>
                                    <div class="fileinput-preview fileinput-exists thumbnail img-circle img-raised"></div>
                                    <div>
                                        <span class="btn btn-raised btn-round btn-default btn-file">
                                            <span class="fileinput-new">Add Photo</span>
                                            <span class="fileinput-exists">Change</span>
                                            <input type="file" id="existing_child_pic" value="upload" name="..." />
                                        </span>
                                        <br>
                                        <a href="" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i>Remove</a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-8 row">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">face</i>
                                    </span>
                                    <div id="group_existing_child_first_name" class="form-group label-floating">
                                        <input id="existing_child_first_name" name="firstname" type="text" class="form-control first-name" placeholder="First Name (required)" required>
                                    </div>
                                </div>

                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons" style="color: white;">face</i>
                                    </span>
                                    <div id="group_existing_child_middle_name" class="form-group label-floating">
                                        <input id="existing_child_middle_name" name="middlename" type="text" class="form-control middle-name" placeholder="Middle Name">
                                    </div>
                                </div>

                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">record_voice_over</i>
                                    </span>
                                    <div id="group_existing_child_last_name" class="form-group label-floating">
                                        <input id="existing_child_last_name" name="lastname" type="text" class="form-control last-name" placeholder="Last Name (required)" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Input name end -->

                        <!-- Dropdowns start -->
                        <div class="row">
                            <div class="col-md-6">
                                <select id="existing_child_gender" class="selectpicker select-gender" data-style="btn btn-danger btn-round" title="Gender Select" data-size="7" required>
                                    <option disabled selected>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div class="col-md-6">
                                <select id="existing_child_living_status" class="selectpicker select-status" data-style="btn btn-danger btn-round" title="Living Status Select" data-size="7" required>
                                    <option disabled>Status</option>
                                    <option value="Living" selected>Living</option>
                                    <option value="Deceased">Deceased</option>
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <select id="existing_child_parenthood" class="selectpicker select-parenthood" data-style="btn btn-danger btn-round" title="Parenthood Select" data-size="7" required>
                                    <option disabled selected>Parenthood</option>
                                    <option value="guest">Biological</option>
                                    <option value="contributor">Adopted</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <select id="existing_child_role_in_tree" class="selectpicker select-role" data-style="btn btn-danger btn-round" title="Living Status Select" data-size="7" required>
                                    <option disabled selected>Role in Tree</option>
                                    <option value="guest">Guest</option>
                                    <option value="contributor">Contributor</option>
                                </select>
                            </div>
                        </div>
                        <!-- Dropdowns end -->

                        <div class="row">
                            <div class="col-md-12">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">email</i>
                                    </span>
                                    <div id="group_existing_child_email" class="form-group label-floating">
                                        <input id="existing_child_email" name="email" type="text" class="form-control email" placeholder="Email (required for Contributor)">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Birth row start -->
                        <div class="row">
                            <div class="col-md-6">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">cake</i>
                                    </span>
                                    <input id="existing_child_birth_date" name="birthdate" type="text" class="datepicker form-control birth-date" placeholder="Date of birth (required)" required>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">place</i>
                                    </span>
                                    <div id="group_existing_child_birth_place" class="form-group label-floating">
                                        <input id="existing_child_birth_place" name="birthplace" type="text" class="form-control birth-place" placeholder="Place of Birth">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Birth row end -->
                        <br>
                        <p class="col-md-12"><b>Parents</b></p>
                        <div class="row">
                            <div id="parents_container2" class="col-md-12" style="height: 100px; overflow: auto;"></div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button id="save_existing_child" type="button" class="btn btn-success add" data-dismiss="modal">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Parent Modal -->
    <div class="modal fade" id="modal_add_parent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        <i class="material-icons">clear</i>
                    </button>
                    <h4 class="modal-title"></h4>
                </div>

                <div class="modal-body">
                    <form id="form_add_parent" class="form" action="">
                            <!-- Input name start -->
                            <div class="row">
                                <div class="col-md-4 text-center">
                                    <br>
                                    <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                                        <div class="fileinput-new thumbnail img-circle img-raised">
                                            <img class="fam-mem-pic" src="assets/img/placeholder.jpg" alt="...">
                                        </div>
                                        <div class="fileinput-preview fileinput-exists thumbnail img-circle img-raised"></div>
                                        <div>
                                            <span class="btn btn-raised btn-round btn-default btn-file">
                                            <span class="fileinput-new">Add Photo</span>
                                            <span class="fileinput-exists">Change</span>
                                            <input type="file" id="parent_pic" name="..." value="upload"/></span>
                                            <br>
                                            <a href="" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i>Remove</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-8 row">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">face</i>
                                        </span>
                                        <div id="group_parent_first_name" class="form-group label-floating">
                                            <label class="control-label">First Name <small>(required)</small></label>
                                            <input id="parent_first_name" name="firstname" type="text" class="form-control first-name" required>
                                        </div>
                                    </div>

                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons" style="color: white;">face</i>
                                        </span>
                                        <div id="group_parent_middle_name" class="form-group label-floating">
                                            <label class="control-label">Middle Name</label>
                                            <input id="parent_middle_name" name="middlename" type="text" class="form-control middle-name">
                                        </div>
                                    </div>

                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">record_voice_over</i>
                                        </span>
                                        <div id="group_parent_last_name" class="form-group label-floating">
                                            <label class="control-label">Last Name <small>(male)</small>/Maiden Name <small>(female) (required)</small></label>
                                            <input id="parent_last_name" name="lastname" type="text" class="form-control last-name" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Input name end -->

                            <!-- Dropdowns start -->
                            <div class="row">
                                <div class="col-md-4">
                                    <select id="parent_gender" class="selectpicker select-gender" data-style="btn btn-danger btn-round" title="Gender Select" data-size="7" required>
                                        <option disabled selected>Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div class="col-md-4">
                                    <select id="parent_living_status" class="selectpicker select-status" data-style="btn btn-danger btn-round" title="Living Status Select" data-size="7" required>
                                        <option disabled>Status</option>
                                        <option value="Living" selected>Living</option>
                                        <option value="Deceased">Deceased</option>
                                    </select>
                                </div>

                                <div class="col-md-4">
                                    <select id="parent_role_in_tree" class="selectpicker select-role" data-style="btn btn-danger btn-round" title="Role Select" data-size="7" required>
                                        <option disabled selected>Role in Tree</option>
                                        <option value="guest">Guest</option>
                                        <option value="contributor">Contributor</option>
                                    </select>
                                </div>
                            </div>
                            <!-- Dropdowns end -->

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                                <i class="material-icons">email</i>
                                            </span>
                                        <div id="group_parent_email" class="form-group label-floating">
                                            <label class="control-label">Email address <small>(required for Contributor Role)</small></label>
                                            <input id="parent_email" name="email" type="text" class="form-control email">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Birth row start -->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">cake</i>
                                        </span>
                                        <input id="parent_birth_date" name="birthdate" type="text" class="datepicker form-control birth-date" placeholder="Date of birth (required)" required>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">place</i>
                                        </span>
                                        <div id="group_parent_birth_place" class="form-group label-floating">
                                            <label class="control-label">Place of birth</label>
                                            <input id="parent_birth_place" name="birthplace" type="text" class="form-control birth-place">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Birth row end -->
                        </form>
                </div>

                <div class="modal-footer">
                    <button id="save_parent" type="button" class="btn btn-success add" data-dismiss="modal">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Sibling Modal -->
    <div class="modal fade" id="modal_add_sibling" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        <i class="material-icons">clear</i>
                    </button>
                    <h4 class="modal-title"></h4>
                </div>

                <div class="modal-body">
                    <form id="form_add_sibling" class="form" action="">
                            <!-- Input name start -->
                            <div class="row">
                                <div class="col-md-4 text-center">
                                    <br>
                                    <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                                        <div class="fileinput-new thumbnail img-circle img-raised">
                                            <img class="fam-mem-pic" src="assets/img/placeholder.jpg" alt="...">
                                        </div>
                                        <div class="fileinput-preview fileinput-exists thumbnail img-circle img-raised"></div>
                                        <div>
                                            <span class="btn btn-raised btn-round btn-default btn-file">
                                            <span class="fileinput-new">Add Photo</span>
                                            <span class="fileinput-exists">Change</span>
                                            <input type="file" id="sibling_pic" name="..." value="upload"/></span>
                                            <br>
                                            <a href="" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i>Remove</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-8 row">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">face</i>
                                        </span>
                                        <div id="group_sibling_first_name" class="form-group label-floating">
                                            <label class="control-label">First Name <small>(required)</small></label>
                                            <input id="sibling_first_name" name="firstname" type="text" class="form-control first-name" required>
                                        </div>
                                    </div>

                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons" style="color: white;">face</i>
                                        </span>
                                        <div id="group_sibling_middle_name" class="form-group label-floating">
                                            <label class="control-label">Middle Name</label>
                                            <input id="sibling_middle_name" name="middlename" type="text" class="form-control middle-name">
                                        </div>
                                    </div>

                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">record_voice_over</i>
                                        </span>
                                        <div id="group_sibling_last_name" class="form-group label-floating">
                                            <label class="control-label">Last Name <small>(required)</small></label>
                                            <input id="sibling_last_name" name="maidenname" type="text" class="form-control last-name" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Input name end -->

                            <!-- Dropdowns start -->
                            <div class="row">
                                <div class="col-md-4">
                                    <select id="sibling_gender" class="selectpicker select-gender" data-style="btn btn-danger btn-round" title="Gender Select" data-size="7" required>
                                        <option disabled selected>Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div class="col-md-4">
                                    <select id="sibling_living_status" class="selectpicker select-status" data-style="btn btn-danger btn-round" title="Living Status Select" data-size="7" required>
                                        <option disabled>Status</option>
                                        <option value="Living" selected>Living</option>
                                        <option value="Deceased">Deceased</option>
                                    </select>
                                </div>

                                <div class="col-md-4">
                                    <select id="sibling_role_in_tree" class="selectpicker select-role" data-style="btn btn-danger btn-round" title="Living Status Select" data-size="7" required>
                                        <option disabled selected>Role in Tree</option>
                                        <option value="guest">Guest</option>
                                        <option value="contributor">Contributor</option>
                                    </select>
                                </div>
                            </div>
                            <!-- Dropdowns end -->

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">email</i>
                                        </span>
                                        <div id="group_sibling_email" class="form-group label-floating">
                                            <label class="control-label">Email address <small>(required for Contributor Role)</small></label>
                                            <input id="sibling_email" name="email" type="text" class="form-control email">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Birth row start -->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">cake</i>
                                        </span>
                                        <input id="sibling_birth_date" name="birthdate" type="text" class="datepicker form-control birth-date" placeholder="Date of birth (required)" required>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">place</i>
                                        </span>
                                        <div id="group_sibling_birth_place" class="form-group label-floating">
                                            <label class="control-label">Place of birth</label>
                                            <input id="sibling_birth_place" name="birthplace" type="text" class="form-control birth-place">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Birth row end -->
                        </form>
                </div>

                <div class="modal-footer">
                    <button id="save_sibling" type="button" class="btn btn-success add" data-dismiss="modal">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Spouse Modal -->
    <div class="modal fade" id="modal_add_spouse" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        <i class="material-icons">clear</i>
                    </button>
                    <h4 class="modal-title"></h4>
                </div>

                <div class="modal-body">
                    <form id="form_add_spouse" class="form" action="">
                            <!-- Input name start -->
                            <div class="row">
                                <div class="col-md-4 text-center">
                                    <br>
                                    <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                                        <div class="fileinput-new thumbnail img-circle img-raised">
                                            <img class="fam-mem-pic" src="assets/img/placeholder.jpg" alt="...">
                                        </div>
                                        <div class="fileinput-preview fileinput-exists thumbnail img-circle img-raised"></div>
                                        <div>
                                            <span class="btn btn-raised btn-round btn-default btn-file">
                                            <span class="fileinput-new">Add Photo</span>
                                            <span class="fileinput-exists">Change</span>
                                            <input type="file" id="spouse_pic" value="upload" name="..." /></span>
                                            <br>
                                            <a href="" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i>Remove</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-8 row">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">face</i>
                                        </span>
                                        <div id="group_spouse_first_name" class="form-group label-floating">
                                            <label class="control-label">First Name <small>(required)</small></label>
                                            <input id="spouse_first_name" name="firstname" type="text" class="form-control first-name" required>
                                        </div>
                                    </div>

                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons" style="color: white;">face</i>
                                        </span>
                                        <div id="group_spouse_middle_name" class="form-group label-floating">
                                            <label class="control-label">Middle Name</label>
                                            <input id="spouse_middle_name" name="middlename" type="text" class="form-control middle-name">
                                        </div>
                                    </div>

                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">record_voice_over</i>
                                        </span>
                                        <div id="group_spouse_last_name" class="form-group label-floating">
                                            <label class="control-label">Last Name <small>(male)</small> / Maiden Name <small>(female)</small></label>
                                            <input id="spouse_last_name" name="lastname" type="text" class="form-control last-name" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Input name end -->

                            <!-- Dropdowns start -->
                            <div class="row">
                                <div class="col-md-6">
                                    <select id="spouse_gender" class="selectpicker select-gender" data-style="btn btn-danger btn-round" title="Gender Select" data-size="7" required>
                                        <option disabled selected>Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div class="col-md-6">
                                    <select id="spouse_living_status" class="selectpicker select-status" data-style="btn btn-danger btn-round" title="Living Status Select" data-size="7" required>
                                        <option disabled>Status</option>
                                        <option value="Living" selected>Living</option>
                                        <option value="Deceased">Deceased</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <select required id="spouse_relationship" class="selectpicker select-relationship" data-style="btn btn-danger btn-round" title="Relationship Status Select" data-size="7" required>
                                        <option disabled selected>Relationship</option>
                                        <option value="married">Married</option>
                                        <option value="separated">Separated</option>
                                    </select>
                                </div>

                                <div class="col-md-6">
                                    <select id="spouse_role_in_tree" class="selectpicker select-role" data-style="btn btn-danger btn-round" title="Role Select" data-size="7" required>
                                        <option disabled selected>Role in Tree</option>
                                        <option value="guest">Guest</option>
                                        <option value="contributor">Contributor</option>
                                    </select>
                                </div>
                            </div>
                            <!-- Dropdowns end -->

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                                <i class="material-icons">email</i>
                                            </span>
                                        <div id="group_spouse_email" class="form-group label-floating">
                                            <label class="control-label">Email address <small>(required for Contributor Role)</small></label>
                                            <input id="spouse_email" name="email" type="text" class="form-control email">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Birth row start -->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">cake</i>
                                        </span>
                                        <input id="spouse_birth_date" name="birthdate" type="text" class="datepicker form-control birth-date" placeholder="Date of birth (required)" required>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">place</i>
                                        </span>
                                        <div id="group_spouse_birth_place" class="form-group label-floating">
                                            <label class="control-label">Place of birth</label>
                                            <input id="spouse_birth_place" name="birthplace" type="text" class="form-control birth-date">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Birth row end -->
                        </form>
                </div>

                <div class="modal-footer">
                    <button id="save_spouse" type="button" class="btn btn-success add" data-dismiss="modal">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Child Modal -->
    <div class="modal fade" id="modal_add_child" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        <i class="material-icons">clear</i>
                    </button>
                    <h4 class="modal-title"></h4>
                </div>

                <div class="modal-body">
                    <form id="form_add_child" class="form" action="">
                        <!-- Input name start -->
                        <div class="row">
                            <div class="col-md-4 text-center">
                                <br>
                                <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail img-circle img-raised">
                                        <img class="fam-mem-pic" src="assets/img/placeholder.jpg" alt="...">
                                    </div>
                                    <div class="fileinput-preview fileinput-exists thumbnail img-circle img-raised"></div>
                                    <div>
                                        <span class="btn btn-raised btn-round btn-default btn-file">
                                            <span class="fileinput-new">Add Photo</span>
                                            <span class="fileinput-exists">Change</span>
                                            <input type="file" id="child_pic" value="upload" name="..." />
                                        </span>
                                        <br>
                                        <a href="" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i>Remove</a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-8 row">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">face</i>
                                    </span>
                                    <div id="group_child_first_name" class="form-group label-floating">
                                        <label class="control-label">First Name <small>(required)</small></label>
                                        <input id="child_first_name" name="firstname" type="text" class="form-control first-name" required>
                                    </div>
                                </div>

                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons" style="color: white;">face</i>
                                    </span>
                                    <div id="group_child_middle_name" class="form-group label-floating">
                                        <label class="control-label">Middle Name</label>
                                        <input id="child_middle_name" name="middlename" type="text" class="form-control middle-name">
                                    </div>
                                </div>

                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">record_voice_over</i>
                                    </span>
                                    <div id="group_child_last_name" class="form-group label-floating">
                                        <label class="control-label">Last Name <small>(required)</small></label>
                                        <input id="child_last_name" name="lastname" type="text" class="form-control last-name" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Input name end -->

                        <!-- Dropdowns start -->
                        <div class="row">
                            <div class="col-md-6">
                                <select id="child_gender" class="selectpicker select-gender" data-style="btn btn-danger btn-round" title="Gender Select" data-size="7" required>
                                    <option disabled selected>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div class="col-md-6">
                                <select id="child_living_status" class="selectpicker select-status" data-style="btn btn-danger btn-round" title="Living Status Select" data-size="7" required>
                                    <option disabled>Status</option>
                                    <option value="Living" selected>Living</option>
                                    <option value="Deceased">Deceased</option>
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <select id="child_parenthood" class="selectpicker select-parenthood" data-style="btn btn-danger btn-round" title="Parenthood Select" data-size="7" required>
                                    <option disabled selected>Parenthood</option>
                                    <option value="guest">Biological</option>
                                    <option value="contributor">Adopted</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <select id="child_role_in_tree" class="selectpicker select-role" data-style="btn btn-danger btn-round" title="Living Status Select" data-size="7" required>
                                    <option disabled selected>Role in Tree</option>
                                    <option value="guest">Guest</option>
                                    <option value="contributor">Contributor</option>
                                </select>
                            </div>
                        </div>
                        <!-- Dropdowns end -->

                        <div class="row">
                            <div class="col-md-12">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">email</i>
                                    </span>
                                    <div id="group_child_email" class="form-group label-floating">
                                        <label class="control-label">Email address <small>(required for Contributor Role)</small></label>
                                        <input id="child_email" name="email" type="text" class="form-control email">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Birth row start -->
                        <div class="row">
                            <div class="col-md-6">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">cake</i>
                                    </span>
                                    <input id="child_birth_date" name="birthdate" type="text" class="datepicker form-control birth-date" placeholder="Date of birth (required)" required>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">place</i>
                                    </span>
                                    <div id="group_child_birth_place" class="form-group label-floating">
                                        <label class="control-label">Place of birth</label>
                                        <input id="child_birth_place" name="birthplace" type="text" class="form-control birth-place">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Birth row end -->
                        <br>
                        <p class="col-md-12"><b>Parents</b></p>
                        <div class="row">
                            <div id="parents_container" class="col-md-12" style="height: 100px; overflow: auto;"></div>
                        </div>
                    </form>
                </div>

                <div class="modal-footer">
                    <button id="save_child" type="button" class="btn btn-success add" data-dismiss="modal">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Show Details Modal -->
    <div class="modal fade" id="modal_show_details" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="card card-profile card-hidden">
                <div class="card-avatar">
                    <a><img id="node_img" src="assets/img/default-avatar.png" alt=""></a>
                </div>
                <h2 id="node_name" class="card-title"></h2>
                <button type="button" id="node_edit" class="btn btn-default" data-toggle="modal" data-dismiss="modal">Quick Edit</button>
                <div class="modal-body">
                    <!-- <div class="row">
                        <div class="col-md-3" style="text-align: right;">
                            <h4>Key:</h4>
                        </div>
                        <div class="col-md-9">
                            <h4 id="node_key" class="text-left"></h4>
                        </div>
                    </div>  -->
                    <div class="row">
                        <div class="col-md-3 col-sm-3" style="text-align: right;">
                            <h4>Date of Birth:</h4>
                        </div>
                        <div class="col-md-9">
                            <h4 id="node_birth_date" class="text-left"></h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3" style="text-align: right;">
                            <h4>Living Status:</h4>
                        </div>
                        <div class="col-md-9">
                            <h4 id="node_living_status" class="text-left"></h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3" style="text-align: right;">
                            <h4>Email:</h4>
                        </div>
                        <div class="col-md-9">
                            <h4 id="node_email" class="text-left"></h4>
                        </div>
                    </div> 
                </div>
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>

    <!-- Update Users Modal -->
    <div class="modal fade" id="modal_update_users" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 id="modal_update_title" class="modal-title"></h4>
                </div>
                <div class="modal-body">
                    <form id="form_update_users" class="form" action="">
                            <!-- Input name start -->
                            <div class="row">
                                <div class="col-md-4 text-center">
                                    <br>
                                    <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                                        <div class="fileinput-new thumbnail img-circle img-raised">
                                            <img class="users-pic" id="users_pic" src="assets/img/placeholder.jpg" alt="...">
                                        </div>
                                        <div class="fileinput-preview fileinput-exists thumbnail img-circle img-raised"></div>
                                        <div>
                                            <span class="btn btn-raised btn-round btn-default btn-file">
                                            <span class="fileinput-new">Add Photo</span>
                                            <span class="fileinput-exists">Change</span>
                                            <input type="file" name="..." /></span>
                                            <br>
                                            <a href="" class="btn btn-danger btn-round fileinput-exists" data-dismiss="fileinput"><i class="fa fa-times"></i>Remove</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-8 row">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">face</i>
                                        </span>
                                        <div id="group_users_first_name" class="form-group label-floating">
                                            <input id="users_first_name" name="firstname" type="text" class="form-control first-name" placeholder="First Name (required)" required>
                                        </div>
                                    </div>

                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons" style="color: white;">face</i>
                                        </span>
                                        <div id="group_users_middle_name" class="form-group label-floating">
                                            <input id="users_middle_name" name="middlename" type="text" class="form-control middle-name" placeholder="Middle Name">
                                        </div>
                                    </div>

                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">record_voice_over</i>
                                        </span>
                                        <div id="group_users_last_name" class="form-group label-floating">
                                            <input id="users_last_name" name="lastname" type="text" class="form-control last-name" placeholder="Last Name (required)" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Input name end -->

                            <!-- Dropdowns start -->
                            <div class="row">
                                <div class="col-md-4">
                                    <select id="users_gender" class="selectpicker select-gender" data-style="btn btn-danger btn-round" title="Gender Select" data-size="7" required>
                                        <option disabled selected>Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                <div class="col-md-4">
                                    <select id="users_living_status" class="selectpicker select-status" data-style="btn btn-danger btn-round" title="Living Status Select" data-size="7" required>
                                        <option disabled selected>Status</option>
                                        <option value="Living">Living</option>
                                        <option value="Deceased">Deceased</option>
                                    </select>
                                </div>

                                <div class="col-md-4">
                                    <select id="users_role_in_tree" class="selectpicker select-role" data-style="btn btn-danger btn-round" title="Role Select" data-size="7" required>
                                        <option disabled selected>Role in Tree</option>
                                        <option value="guest">Guest</option>
                                        <option value="contributor">Contributor</option>
                                    </select>
                                </div>
                            </div>
                            <!-- Dropdowns end -->

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                                <i class="material-icons">email</i>
                                            </span>
                                        <div id="group_users_email" class="form-group label-floating">
                                            <input id="users_email" name="email" type="text" class="form-control email" placeholder="Email address (required for Contributor Role)">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Birth row start -->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">cake</i>
                                        </span>
                                        <input id="users_birth_date" name="birthdate" type="text" class="datepicker form-control birth-date" placeholder="Date of birth (required)" required>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">place</i>
                                        </span>
                                        <div id="group_users_birth_place" class="form-group label-floating">
                                            <input id="users_birth_place" name="birthplace" type="text" class="form-control birth-place" placeholder="Place of birth">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Birth row end -->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">weekend</i>
                                        </span>
                                        <div id="group_users_street_address" class="form-group label-floating">
                                            <input id="users_street_address" name="street_address" type="text" class="form-control street-address" placeholder="Street Address">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">home</i>
                                        </span>
                                        <div id="group_users_barangay" class="form-group label-floating">
                                            <input id="users_barangay" name="barangay" type="text" class="form-control barangay" placeholder="Barangay">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">account_balance</i>
                                        </span>
                                        <div id="group_users_city" class="form-group label-floating">
                                            <input id="users_city" name="city" type="text" class="form-control city" placeholder="City">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">room</i>
                                        </span>
                                        <div id="group_users_postal_code" class="form-group label-floating">
                                            <input id="users_postal_code" name="postal_code" type="text" class="form-control postal-code" placeholder="Postal Code">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                </div>

                <div class="modal-footer" id="update_footer">
                    <button id="update_users" type="button" class="btn btn-success add" data-dismiss="modal">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Error Modal -->
    <div class="modal fade" id="error_details" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="card card-profile card-hidden">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <h4 id="error_details_node" class="text-left"></h4>
                            <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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

<!-- Go JS -->
<script src="assets/js/gojs/go-debug.js"></script>
<script src="assets/js/gojs/genogram2.js"></script>
<script src="assets/js/genealogy.js"></script>
<script src="assets/js/onclick_button.js"></script>
<script src="assets/js/add_member.js"></script>
<script src="assets/js/node_details.js"></script>
<script src="assets/js/update_details.js"></script>
</html>