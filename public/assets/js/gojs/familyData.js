/*
	marital status - spouses only
	child type - children only
*/

var potential_users = firebase.database().ref('potential_users');
var user_family = firebase.database().ref('user_family/64dOBUKtZqOBFWJmPCxEhUsBMFF3/husbands');
var user_tree_go = firebase.database().ref('user_tree_go/-Kzdom0HTgVfH3Zttv4p');
var user_key = potential_users.push().key;

var potential =
[
	{
		birthDate: 		"09/17/1995",
		birthPlace: 	"Cebu",
		childType: 		"adopted",
		clanId: 		"-Kzdom0HTgVfH3Zttv4p",
		displayName: 	"Neville Longbottom",
		email: 			"nevilleLongbottom@gmail.com",
		firstName: 		"Neville",
		gender: 		"male",
		lastName: 		"Longbottom",
		livingStatus: 	"living",
		maritalStatus: 	"separated",
		merged: 		false,
		middleName: 	"Lao Cubelo",
		relationship: 	"husband",
		role: 			"guest",
		tempKeyInClan: 	user_key
	}
];

var family =
[
	{
		birthDate: 		"09/17/1995",
		birthPlace: 	"Cebu",
		childType: 		"adopted",
		clanId: 		"-Kzdom0HTgVfH3Zttv4p",
		displayName: 	"Neville Longbottom",
		email: 			"nevilleLongbottom@gmail.com",
		firstName: 		"Neville",
		gender: 		"male",
		lastName: 		"Longbottom",
		livingStatus: 	"living",
		maritalStatus: 	"separated",
		merged: 		false,
		middleName: 	"Lao Cubelo",
		relationship: 	"husband",
		role: 			"guest"
	}
];

var tree =
[
	{
		bd: 	"09/17/1995",
		ct: 	"adopted",
		f: 		"-KzdpKCuk_irfRKv8fZz",
		img: 	"something",
		key: 	user_key,
		loc: 	"/user_family/64dOBUKtZqOBFWJmPCxEhUsBMFF3/sons/",
		m: 		"64dOBUKtZqOBFWJmPCxEhUsBMFF3",
		ms: 	"something",
		n: 		"Neville Longbottom",
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
 