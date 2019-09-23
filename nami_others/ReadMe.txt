if (!(obj.ux === undefined || obj.ux === null)) {
    let arrUx = Object.values(obj.ux);
    
    obj.ux = arrUx;
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
    / Check update, delete member
    / Check firebase functions
    Check spouse becoming user
    / If siblings exist, instead of deleting parents, user can only update data
    User must be able to add an existing member as one parent
    Email verification
    Keyboard	Add enter, tab events

console.log("key", key)
console.log("key")
console.log(key)
git push -u origin dev_branch

create harry's immediate family
check extended family function
add parenthood on genealogy on children
