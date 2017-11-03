/*
 * key, the unique ID of the person
 * n, the person's name
 * s, the person's sex
 * m, the person's mother's key
 * f, the person's father's key
 * ux, the person's wife
 * vir, the person's husband
 * a, an Array of the attributes or markers that the person has
 */
var family = [

    /**
     * -----------------------------------------------------
     * Family 'SAYER'
     * -----------------------------------------------------
     */
    // Maternal grand mother
    { key: "0", n: "Serge SAYER", s: "M", ux: "1" },
    { key: "1", n: "Simone KERDONCUFF", s: "F", vir: "0" },

    // Aunts and uncles
    { key: "2", n: "Chantal SAYER", s: "F", m: "1", f: "0", vir: "9" },
    { key: "3", n: "Patrice SAYER", s: "M", m: "1", f: "0", ux: "10" },
    { key: "4", n: "Henriette SAYER", s: "F", m: "1", f: "0", vir: "11" },
    { key: "5", n: "Jacques SAYER", s: "M", m: "1", f: "0", ux: "12" },
    { key: "6", n: "Bruno SAYER", s: "M", m: "1", f: "0", ux: "13" },
    { key: "7", n: "Jean-Michel SAYER", s: "M", m: "1", f: "0", ux: "14" },
    { key: "8", n: "Marcel SAYER", s: "M", m: '1', f: "0", ux: "15" },

    // Wife and husband's aunts and uncles
    { key: "9", n: "Yves GIGOU", s: "M", ux: "2", m: "41", f: "42" },
    { key: "10", n: "Gwendalina FASOLO", s: "F", vir: "3" },
    { key: "11", n: "Victor MUNSCH", s: "M", ur: "4" },
    { key: "12", n: "Mireille LEYOUR", s: "F", vir: "5" },
    { key: "13", n: "Sylvie AVENELLE", s: "F", vir: "6" },
    { key: "14", n: "Josette SAYER", s: "F", vir: "7" },
    { key: "15", n: "Patricia SAYER", s: "F", vir: "8" },

    // nth sub-children of Chantal SAYER
    { key: "15", n: "Christophe GIGOU", s: "M", m: "2", f: "9" },
    { key: "16", n: "Olivier GIGOU", s: "M", m: "2", f: "9", ux: "21" },
    { key: "17", n: "Sébastien GIGOU", s: "M", m: "2", f: "9" },
    { key: "18", n: "Sylvie GIGOU", s: "F", m: "2", f: "9", vir: "22" },
    { key: "19", n: "Nicolas GIGOU", s: "M", m: "2", f: "9", ux: "20" },
    { key: "20", n: "Maëva CAMART", s: "F", vir: "19" },
    { key: "21", n: "Marie-Hélène CHAPUIS", s: "F", vir: "16" },
    { key: "22", n: "Florent PERFEZOU", s: "M", ux: "18" },
    { key: "23", n: "Romain GIGOU", s: "M", m: "21", f: "16" },
    { key: "24", n: "Lylia PERFEZOU", s: "F", m: "18", f: "22" },
    { key: "25", n: "Thomas PERFEZOU", s: "M", m: "18", f: "22" },
    { key: "26", n: "Clément GIGOU", s: "M", m: "21", f: "16" },

    // nth sub-children of Henriette SAYER
    { key: "27", n: "Romain MUNSCH", s: "M", m: "4", f: "11" },
    { key: "28", n: "Victoria MUNSCH", s: "F", m: "4", f: "11" },
    { key: "29", n: "Cyril MUNSCH", s: "M", m: "4", f: "11", ux: "73" },
    { key: "30", n: "Lydia MUNSCH", s: "F", m: "4", f: "11", vir: "70" },
    { key: "31", n: "Sandrine MUNSCH", s: "F", m: "4", f: "11", vir: "67" },
    { key: "32", n: "Magali MUNSCH", s: "F", m: "4", f: "11", vir: "71" },
    { key: "67", n: "Éric LUCAS", s: "M", ux: "31" },
    { key: "68", n: "Lorie LUCAS", s: "F", m: "31", f: "67" },
    { key: "69", n: "Lucas LUCAS", s: "M", m: "31", f: "67" },
    { key: "70", n: "Lionel", s: "M", ux: "30" },
    { key: "71", n: "Mari", s: "M", ux: "32" },
    { key: "72", n: "Maylis", s: "F", m: "32", f: "71" },
    { key: "73", n: "Hélène", s: "F", vir: "29" },

    // nth sub-children of Patrice SAYER
    { key: "33", n: "Élodie SAYER", s: "F", m: "10", f: "3", vir: "65" },
    { key: "34", n: "Matthieu SAYER", s: "M", m: "10", f: "3" },
    { key: "35", n: "Rénaldo SAYER", s: "M", m: "10", f: "3" },
    { key: "65", n: "Emmanuel", s: "M", ux: "33" },
    { key: "66", n: "Clara", s: "F", m: "33", f: "65" },

    // nth sub-children of Marcel SAYER
    { key: "36", n: "Solenne SAYER", s: "F", m: "15", f: "8" },
    { key: "37", n: "Anthony SAYER", s: "M", m: "15", f: "8" },
    { key: "38", n: "Benjamin SAYER", s: "M", m: "15", f: "8" },
    { key: "39", n: "Amandine SAYER", s: "F", m: "15", f: "8" },
    { key: "40", n: "Nathan SAYER", s: "M", m: "15", f: "8" },

    /**
     * -----------------------------------------------------
     * Family 'GIGOU'
     * -----------------------------------------------------
     */
    // Paternal grand parents
    { key: "41", n: "Paternal grandmother", s: "F", vir: "42" },
    { key: "42", n: "Paternal grandfather", s: "M", ux: "41" },

    // Aunts and uncles
    { key: "43", n: "Françoise GIGOU", s: "F", m: "41", f: "42", vir: "47" },
    { key: "44", n: "Pierre GIGOU", s: "M", m: "41", f: "42", ux: "48" },
    { key: "45", n: "Charles GIGOU", s: "M", m: "41", f: "42", ux: "49" },
    { key: "46", n: "Jacques GIGOU", s: "M", m: "41", f: "42", ux: "50" },

    // Wife and husband's aunts and uncles
    { key: "47", n: "Gilbert ROYDOR", s: "M", ux: "43" },
    { key: "48", n: "Nicole", s: "F", vir: "44" },
    { key: "49", n: "Marie-Françoise GIGOU", s: "F", vir: "45" },
    { key: "50", n: "Brigitte CARRÉ", s: "F", vir: "46" },

    // nth sub-children of Françoise GIGOU
    { key: "51", n: "Géraldine ROYDOR", s: "F", m: "43", f: "47", vir: "60" },
    { key: "60", n: "Philippe LE ROUX", s: "M", ux: "51" },
    { key: "52", n: "Florian ROYDOR", s: "M", m: "43", f: "47", ux: "61" },
    { key: "61", n: "Sarah", s: "F", vir: "52" },
    { key: "53", n: "Ewen LE ROUX", s: "M", m: "51", f: "60" },
    { key: "62", n: "Erell LE ROUX", s: "F", m: "51", f: "60" },

    // nth sub-children of Pierre GIGOU
    { key: "54", n: "Isabelle GIGOU", s: "F", f: "44", m: "48", vir: "58" },
    { key: "58", n: "Christophe", s: "M", ux: "54" },
    { key: "59", n: "Quentin GIGOU", s: "M", f: "58", m: "54" },

    // nth sub-children of Charles GIGOU
    { key: "55", n: "Mélanie GIGOU", s: "F", f: "45", m: "49" },
    { key: "56", n: "Renaud GIGOU", s: "M", f: "45", m: "49" },
    { key: "64", n: "Sandrine TORRETON", s: "F", f: "45", m: "49" },

    // nth sub-children of Jacques GIGOU
    { key: "57", n: "Sylvain GIGOU", s: "M", f: "46", m: "50" },
    { key: "63", n: "Christelle HENDRYNKS", s: "F", f: "46", m: "50" }
];

// family.forEach(function(element) {
//     firebase.database().ref().child('user_family_tree').push(element);
// });