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

    $('#button_add_new').click(function() {
        $("#div_add_existing").hide();
        $("#search_found").hide();
        $("#search_found2").hide();
        $("#search_found3").hide();
        $("#div_add_new").show();
        $("#div_add_new2").show();
    })

    $('#button_add_existing').click(function() {
        $("#div_add_existing").show();
        $("#div_add_new").hide();
        $("#div_add_new2").hide();
    })

    $('#search_button').click(function() {
        searchBar();
    })

    $('#search_delete_button').click(function() {
        $("#search_found").hide();
        $("#search_found2").hide();
        $("#search_found3").hide();
        $("#search_no_result").hide();
    })

    $('#search_disconfirm').click(function() {
        $("#search_found").hide();
        $("#search_found2").hide();
        $("#search_found3").hide();
        $("#search_no_result").hide();
    })

    $('#add_parent').click(function() {
        $('div#modal_add_parent h4').empty()
        $('div#modal_add_parent h4').append("Add a Parent for " + currentUser.displayName)
    })

    $('#add_sibling').click(function() {
        $('div#modal_add_sibling h4').empty()
        $('div#modal_add_sibling h4').append("Add a Sibling for " + currentUser.displayName)
    })

    $('#add_spouse').click(function() {
        $('div#modal_add_spouse h4').empty()
        $('div#modal_add_spouse h4').append("Add a Spouse for " + currentUser.displayName)
    })

    $('#add_child').click(function() {
        $('div#modal_add_child h4').empty()
        $('div#modal_add_child h4').append("Add a Child for " + currentUser.displayName)
    })

    $('#add_parent2').click(function() {
        $('div#modal_add_existing_parent h4').empty()
        $('div#modal_add_existing_parent h4').append("Add a Parent for " + currentUser.displayName)
    })

    $('#add_sibling2').click(function() {
        $('div#modal_add_existing_sibling h4').empty()
        $('div#modal_add_existing_sibling h4').append("Add a Sibling for " + currentUser.displayName)
    })

    $('#add_spouse2').click(function() {
        $('div#modal_add_existing_spouse h4').empty()
        $('div#modal_add_existing_spouse h4').append("Add Existing Spouse for " + currentUser.displayName)
    })

    $('#add_child2').click(function() {
        $('div#modal_add_existing_child h4').empty()
        $('div#modal_add_existing_child h4').append("Add a Child for " + currentUser.displayName)
    })

    // $('#father_pic').change(handleParentPic);
    // $('#mother_pic').change(handleSiblingPic);
    // $('#spouse_pic').change(handleSpousePic);
    // $('#child_pic').change(handleChildPic);

    $('#save_parent').click(function() {
        addParent();
    })

    $('#save_sibling').click(function() {
        addSibling();
    })

    $('#save_spouse').click(function() {
        addSpouse();
    })

    $('#save_child').click(function() {
        addChild();
    })
})