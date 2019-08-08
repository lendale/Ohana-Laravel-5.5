LINKS
https://gojs.net/latest/intro/panels.html
https://gojs.net/latest/intro/palette.html
https://gojs.net/latest/intro/nodes.html

if (!(obj.ux === undefined || obj.ux === null)) {
    let arrUx = Object.values(obj.ux);
    
    obj.ux = arrUx;
}
    
if (!(obj.vir === undefined || obj.vir === null)) {
    let arrVir = Object.values(obj.vir);
    
    obj.vir = arrVir;
}

SCENARIOS
    / Register new email
    / Register existing email
    / Login wrong credentials
    / Add New Members
    Add Existing Parent w/ Spouse (not parent2)
    Add Existing Parent w/ Spouse (parent2)
    Add Existing Parent w/ Spouse (not parent2) w/ child
    Add Existing Parent w/ Spouse (parent2) w/ child
    Add Existing Sibling w/ Parents
    Add Existing Spouse
    Add Existing Child
    / Register Member w/ email
    Register Member w/o email

BIRTHDAY
    Jan 31, 2019, Feb 1, 2019
    Jan 30, 2019, Jan 31, 2019
    Dec 31, 2019, Jan 1, 2020

PROBLEMS
    Address not saved
    Loading after parent adding should be longer
    Add new member but exists, no name displayed

TO DO
    / If siblings exist, instead of deleting parents, user can only update data
    Retrieve ms from parents only on retrieving tree (for user's child w/o parent2)
    User must be able to add an existing member as one parent
    User's spouse becomes user1
    Email verification
    Keyboard	Add enter, tab events

SEARCH2
use immediate family for checking on ginny and dean
    retrieve immediate family of ginny and dean then compare
    if none, retrieve ginny's child's immediate family. dean is the same

console.log("key", key)
console.log("key")
console.log(key)

create harry's immediate family
check for snap4.val().m
recheck spouse becoming user