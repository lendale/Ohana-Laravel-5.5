$('#submit_search').click(getSearch);
var usersRef = firebase.database().ref().child('users')
var immediateFamilyRef = firebase.database().ref().child('immediate_family')
var person1;
var person2;
var person1_key;
var person2_key;
var person1_familyId;
var person2_familyId;
var person1_imm = [];
var person2_imm = [];
var common_person = [];


function getSearch() {
    common_person = [];
    var person1_imm = [];
    var person2_imm = [];
    person1 = $("#person_1").val();
    person2 = $("#person_2").val();
    let family = {
        person1: '',
        person2: ''
    }

    if (person1 != "" && person2 != "") {
        usersRef.once("value").then(snap => {
            var _snap = snap.toJSON();
            var _snapObj = Object.values(_snap);
            for (i = 0; i < _snapObj.length; i++) {
                person1_familyId = undefined;
                person2_familyId = undefined;
                if (_snapObj[i].firstName.toLowerCase() == person1.toLowerCase()) {
                    person1_key = _snapObj[i].key
                    person1_familyId = _snapObj[i].familyId
                    family.person1 = _snapObj[i].familyId
                    // console.log(person1_key, person1_familyId)
                }
                if (_snapObj[i].firstName.toLowerCase() == person2.toLowerCase()) {
                    person2_key = _snapObj[i].key
                    person2_familyId = _snapObj[i].familyId
                    family.person2 = _snapObj[i].familyId
                    // console.log(person2_key, person2_familyId)
                }
                if (family.person1 !== '' && family.person2 !== '') {
                    filterData(family.person1, family.person2)
                    family.person2 = '';
                    family.person1 = ''

                }
            }
        })
    }
}

function isObject(val) {
    return (typeof val === 'object');
}

async function person1retrieveImm(famId) {

    return new Promise(async function (resolve, reject) {
        await immediateFamilyRef.child(famId).once('value').then(snap => {
            var _snap = snap.toJSON();
            var _snapObj = Object.values(_snap);
            for (i = 0; i < _snapObj.length; i++) {
                let val;
                if (isObject(_snapObj[i])) {
                    val = Object.keys(_snapObj[i]).join();
                } else {
                    val = (_snapObj[i]);
                }
                if (!person1_imm.includes(val)) {
                    person1_imm.push(isObject(_snapObj[i]) ? Object.keys(_snapObj[i]).join() : (_snapObj[i]));
                }
            }
            return resolve(person1_imm);

        })
    })
}

async function person2retrieveImm(famId) {
    return new Promise(async function (resolve, reject) {
        await immediateFamilyRef.child(famId).once("value").then(snap => {

            var _snap = snap.toJSON();
            var _snapObj = Object.values(_snap);
            for (i = 0; i < _snapObj.length; i++) {
                let val;
                if (isObject(_snapObj[i])) {
                    val = Object.keys(_snapObj[i]).join();
                } else {
                    val = (_snapObj[i]);
                }
                if (!person2_imm.includes(val)) {
                    person2_imm.push(isObject(_snapObj[i]) ? Object.keys(_snapObj[i]).join() : (_snapObj[i]));
                }
            }
            return resolve(person2_imm)

        })
    })
}

async function filterData(famId_1, famId_2) {
    let ctr = 1;
    let person1Array = await person1retrieveImm(famId_1);
    let person2Array = await person2retrieveImm(famId_2);

    checkCommon(person1Array, person2Array);
    if (common_person.length === 0) {
        for (let n = 0; n < person1_imm.length; n++) {
            usersRef.child(person1_imm[n]).once('value').then(async function (p1id_id) {
                person1Array = await person1retrieveImm(p1id_id.val().familyId);
                checkCommon(person1Array, person2Array);
                if (common_person.length === 0) {
                    for (let x = 0; x < person2_imm.length; x++) {
                        usersRef.child(person2_imm[x]).once('value').then(async function (p2id_id) {
                            if (common_person.length === 0) {
                                person2Array = await person2retrieveImm(p2id_id.val().familyId);
                                checkCommon(person1Array, person2Array);
                                if (common_person.length === 0 ){
                                    for (let x = 0; x < person1_imm.length; x++) {
                                        usersRef.child(person1_imm[x]).once('value').then(async function (p1id_id) {
                                            
                                                person1Array = await person1retrieveImm(p1id_id.val().familyId);
                                                checkCommon(person1Array, person2Array);
                                                if (common_person.length === 0 ){
                                                    for (let x = 0; x < person2_imm.length; x++) {
                                                        usersRef.child(person2_imm[x]).once('value').then(async function (p2id_id) {
                                                            
                                                                person2Array = await person2retrieveImm(p2id_id.val().familyId);
                                                                checkCommon(person1Array, person2Array);
                                                                // if (common_person.length === 0 ){
                                                                    // *insert code if continue...
                                                                // }
                                                                // console.log(common_person);
                                                        })
                                                    }
                                                }
                                        })
                                    }
                                }
                                // console.log(common_person);
                            }
                        })
                    }
                }
            })
        }
    }
}

function checkCommon(person1, person2) {
    let common1 = person1.filter(value => -1 !== person2.indexOf(value))
    if (common1.length !== 0 && common_person.length === 0 ) {
        common_person = common1;
    //   $("#common_person").val(common_person);
    console.log(common_person)
    console.log(common1)
    }
}