/*
	marital status - spouses only
	child type - children only
*/

var potential_users = firebase.database().ref('potential_users');
var user_family = firebase.database().ref('user_family/64dOBUKtZqOBFWJmPCxEhUsBMFF3/sons');
var user_tree_go = firebase.database().ref('user_tree_go/-L41dY5Iw2j0Acp-4rLf');
var user_key = potential_users.push().key;

var potential =
[
	{
		birthDate: 		"09/17/1995",
		birthPlace: 	"Great Britain",
		childType: 		"adopted",
		clanId: 		"-L41dY5Iw2j0Acp-4rLf",
		displayName: 	"Neville Potter",
		email: 			"nevillepotter@gmail.com",
		firstName: 		"Neville",
		gender: 		"male",
		lastName: 		"Potter",
		livingStatus: 	"living",
		// maritalStatus: 	"separated",
		merged: 		false,
		// middleName: 	"Lao Cubelo",
		relationship: 	"son",
		role: 			"guest",
		tempKeyInClan: 	user_key
	}
];

var family =
[
	{
		birthDate: 		"09/17/1995",
		birthPlace: 	"Great Britain",
		childType: 		"adopted",
		clanId: 		"-L41dY5Iw2j0Acp-4rLf",
		displayName: 	"Neville Potter",
		email: 			"nevillepotter@gmail.com",
		firstName: 		"Neville",
		gender: 		"male",
		lastName: 		"Potter",
		livingStatus: 	"living",
		// maritalStatus: 	"separated",
		merged: 		false,
		// middleName: 	"Lao Cubelo",
		relationship: 	"son",
		role: 			"guest"
	}
];

var tree =
[
	{
		bd: 	"09/17/1995",
		ct: 	"adopted",
		f: 		"-L41lWRX3sX-RYPQrTPV",
		// img: 	"something",
		key: 	user_key,
		loc: 	"/user_family/64dOBUKtZqOBFWJmPCxEhUsBMFF3/sons/",
		m: 		"64dOBUKtZqOBFWJmPCxEhUsBMFF3",
		// ms: 	"something",
		n: 		"Neville Potter",
		s: 		"male"
	}
];

potential.forEach(function(element) {
    potential_users.child(user_key).set(element);
});

family.forEach(function(element) {
    user_family.child(user_key).set(element);
});

tree.forEach(function(element) {
    user_tree_go.child(user_key).set(element);
});
 