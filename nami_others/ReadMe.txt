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
    Register new email
    Register existing email
    Login wrong credentials
    Add New Members
    Add Existing Parent w/ Spouse (not parent2)
    Add Existing Parent w/ Spouse (parent2)
    Add Existing Parent w/ Spouse (not parent2) w/ child
    Add Existing Parent w/ Spouse (parent2) w/ child
    Add Existing Sibling w/ Parents
    Add Existing Spouse
    Add Existing Child
    Register Member w/ email
    Register Member w/o email

BIRTHDAY
    Jan 31, 2019, Feb 1, 2019
    Jan 30, 2019, Jan 31, 2019
    Dec 31, 2019, Jan 1, 2020

TO DO LIST
    Spouse1 is not an extended family to spouse2 but spouse1child is extended to spouse2
    User's spouse becomes user1
    Retrieve ms from parents only on retrieving tree
    When deleting parent and adding another, add siblings to parent as children if parent2 is the same

console.log("key", key)
