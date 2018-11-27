$(document).ready(function() {
    materialKit.initFormExtendedDatetimepickers();

    $('ul#ul_tabs li#li_tab_search').click(function() {
        $('#btn_add').hide();
        $('#btn_search').show();
    })

    $("ul#ul_tabs li#li_tab_tree").click(function() {
        $("#btn_add").show();
        $("#btn_search").hide();
    })

    $('#add_father').click(function() {
        $('div#modal_add_father h4').empty()
        $('div#modal_add_father h4').append("Add a Father for " + currentUser.displayName)
    })

    $('#add_mother').click(function() {
        $('div#modal_add_mother h4').empty()
        $('div#modal_add_mother h4').append("Add a Mother for " + currentUser.displayName)
    })

    $('#add_spouse').click(function() {
        $('div#modal_add_spouse h4').empty()
        $('div#modal_add_spouse h4').append("Add a Spouse for " + currentUser.displayName)
    })

    $('#add_child').click(function() {
        $('div#modal_add_child h4').empty()
        $('div#modal_add_child h4').append("Add a Child for " + currentUser.displayName)
    })

    $('#add_father2').click(function() {
        $('div#modal_add_existing_father h4').empty()
        $('div#modal_add_existing_father h4').append("Add a Father for " + currentUser.displayName)
    })

    $('#add_mother2').click(function() {
        $('div#modal_add_existing_mother h4').empty()
        $('div#modal_add_existing_mother h4').append("Add a Mother for " + currentUser.displayName)
    })

    $('#add_spouse2').click(function() {
        $('div#modal_add_existing_spouse h4').empty()
        $('div#modal_add_existing_spouse h4').append("Add Existing Spouse for " + currentUser.displayName)
    })

    $('#add_child2').click(function() {
        $('div#modal_add_existing_child h4').empty()
        $('div#modal_add_existing_child h4').append("Add a Child for " + currentUser.displayName)
    })

    // $('#father_pic').change(handleFatherPic);
    // $('#mother_pic').change(handleMotherPic);
    // $('#spouse_pic').change(handleSpousePic);
    // $('#child_pic').change(handleChildPic);

    $('#save_father').click(function() {
        addFather();
        resetForm();
    })

    $('#save_mother').click(function() {
        addMother();
        resetForm();
    })

    $('#save_spouse').click(function() {
        addSpouse();
        resetForm();
    })

    $('#save_child').click(function() {
        addChild();
        resetForm();
    })

    $('#search_button').click(function() {
        searchBar();
    })

    $('#search_delete_button').click(function() {
        $("#search_found").css('display', 'none');
        $("#search_found2").css('display', 'none');
        $("#search_found3").css('display', 'none');
        $("#search_no_result").css('display', 'none');
    })

    $('#search_disconfirm').click(function() {
        $("#search_found").css('display', 'none');
        $("#search_found2").css('display', 'none');
        $("#search_found3").css('display', 'none');
        $("#search_no_result").css('display', 'none');
    })

    userTreeRef.once('value').then(snap => {
        console.log('SNAP', snap.val())
    })
})