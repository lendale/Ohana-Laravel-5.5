function searchBar() {
    var input = $("#search_input").val();

    if(input !== "") {
        usersRef.once("value")
            .then(snap => {
                snap.forEach(snap2 => {
                    if((snap2.val().displayName.toLowerCase() == input) ||
                        (snap2.val().email == input)) {
                        console.log('1st if')
                        $("#search_no_result").hide();
                        $("#search_found").show();
                        $("#search_found2").show();
                        $("#search_found3").show();

                        $("#search_first_name")
                            .empty()
                            .attr("value", snap2.val().firstName);
                        $("#search_last_name")
                            .empty()
                            .attr("value", snap2.val().lastName);
                        $("#seach_email")
                            .empty()
                            .attr("value", snap2.val().email);
                        $("#search_birth_date")
                            .empty()
                            .attr("value", snap2.val().birthDate);

                        $('#search_confirm').click(function() {
                            searchedResultModal(snap2.val());
                        })
                    }
                })
            })
    }
    else {
        $("#search_no_result").show();
        $("#search_none_input")
            .empty()
            .attr("value", 'Nothing is inputted.');
        $("#search_no_result").hide();

    }
}

function searchedResultModal(data) {
    $("#modal_add_existing_member")
        .modal('show');

    $('#add_parent2').click(function() {
        displayExistingParent(data);
    })

    $('#add_sibling2').click(function() {
        displayExistingSibling(data);
    })

    $('#add_spouse2').click(function() {
        displayExistingSpouse(data);
    })

    $('#add_child2').click(function() {
        displayExistingChild(data);
    })
}
