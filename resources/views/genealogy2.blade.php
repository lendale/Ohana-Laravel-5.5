<!-- Add Existing -->
<div class="modal fade" id="modal_add_existing" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                    <div class="col-md-6 col-sm-6">
                        <input type="text" id="search_add_existing" placeholder="Type email or name" onfocus="this.value=''" style="width:100%; padding: 20px 20px; font-size: 15px;">
                    </div>
                    <div class="col-md-3 col-sm-3">
                        <!-- <button id="add_existing" class="btn btn-danger btn-block" data-toggle="modal" data-dismiss="modal">Search</button> -->
                        <button id="search_add_button" class="btn btn-danger btn-lg">
                            <i class="material-icons">send</i>
                        </button>
                    </div>
                    <div class="col-md-3 col-sm-3">
                        <!-- <button id="add_existing" class="btn btn-danger btn-block" data-toggle="modal" data-dismiss="modal">Search</button> -->
                        <button id="search_delete_button" class="btn btn-danger btn-lg">
                            <i class="material-icons">delete_forever</i>
                        </button>
                    </div>
                </div>
                <br>
                <div class="row" style="display: none;" id="search_data">
                    <h4 class="modal-title">Is this person the one you're looking for?</h4>
                    <div class="col-md-6 col-sm-6">
                        <label class="control-label">First Name</label>
                        <input id="search_add_first_name2" name="firstname" type="text" class="form-control first-name" readonly>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        <label class="control-label">Last Name</label>
                        <input id="search_add_last_name2" name="lastname" type="text" class="form-control last-name" readonly>
                    </div>
                </div>
                <div class="row" style="display: none;" id="search_data2">
                    <div class="col-md-6 col-sm-6">
                        <label class="control-label">Email address</label>
                        <input id="search_add_email2" name="email" type="text" class="form-control email" readonly>
                    </div>
                    <div class="col-md-6 col-sm-6">
                        <label class="control-label">Birth Date</label>
                        <input id="search_add_birth_date" name="birthdate" type="text" class="datepicker form-control birth-date" readonly>
                    </div>
                </div>
                <div class="row" id="search_data3" style="display: none;">
                    <div class="col-md-12 col-sm-12">
                        <input id="search_none_result" type="text" class="form-control" style="font-size: 15px;" readonly>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>