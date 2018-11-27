<div class="modal fade" id="modal_add_existing_father" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    <i class="material-icons">clear</i>
                </button>
                <h4 class="modal-title"></h4>
            </div>

            <div class="modal-body">
                <form id="form_add_existing_father" class="form" action="">
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
                                        <input type="file" id="existing_father_pic" name="..." value="upload"/></span>
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
                                    <div id="group_existing_father_first_name" class="form-group label-floating">
                                        <input id="existing_father_first_name" name="firstname" type="text" class="form-control first-name" required>
                                    </div>
                                </div>

                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons" style="color: white;">face</i>
                                    </span>
                                    <div id="group_existing_father_middle_name" class="form-group label-floating">
                                        <input id="existing_father_middle_name" name="middlename" type="text" class="form-control middle-name">
                                    </div>
                                </div>

                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">record_voice_over</i>
                                    </span>
                                    <div id="group_existing_father_last_name" class="form-group label-floating">
                                        <input id="existing_father_last_name" name="lastname" type="text" class="form-control last-name" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Input name end -->

                        <!-- Dropdowns start -->
                        <div class="row">
                            <div class="col-md-4">
                                <select id="existing_father_gender" class="selectpicker select-gender" data-style="btn btn-danger btn-round" title="Gender Select" data-size="7" required>
                                    <option disabled>Gender</option>
                                    <option value="male" selected>Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div class="col-md-4">
                                <select id="existing_father_living_status" class="selectpicker select-status" data-style="btn btn-danger btn-round" title="Living Status Select" data-size="7" required>
                                    <option disabled>Status</option>
                                    <option value="Living" selected>Living</option>
                                    <option value="Deceased">Deceased</option>
                                </select>
                            </div>

                            <div class="col-md-4">
                                <select id="existing_father_role_in_tree" class="selectpicker select-role" data-style="btn btn-danger btn-round" title="Role Select" data-size="7" required>
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
                                    <div id="group_existing_father_email" class="form-group label-floating">
                                        <input id="existing_father_email" name="email" type="text" class="form-control email">
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
                                    <input id="existing_father_birth_date" name="birthdate" type="text" class="datepicker form-control birth-date" placeholder="Date of birth (required)" required>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">place</i>
                                    </span>
                                    <div id="group_existing_father_birth_place" class="form-group label-floating">
                                        <input id="existing_father_birth_place" name="birthplace" type="text" class="form-control birth-place">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Birth row end -->
                    </form>
            </div>

            <div class="modal-footer">
                <button id="save_existing_father" type="button" class="btn btn-success add" data-dismiss="modal">Save</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
</div>