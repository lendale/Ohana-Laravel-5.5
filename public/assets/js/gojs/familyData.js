/*
	marital status - spouses only
	child type - children only
	-L8vLsdfgEdgfdhsrt3425rsdg

	var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
*/

var user_key = users.push().key;
var tree_key = user_tree_go.push().key;
var potential_key = potential_users.push().key;

var users = firebase.database().ref('users');
var user_tree_go = firebase.database().ref('user_tree_go/' + tree_key);

var potential_users = firebase.database().ref('potential_users');
var user_family = firebase.database().ref('user_family/' + user_key + '/sons');

var user =
[
	{
		birthDate: 		"10/12/1995",
		birthPlace: 	"Cebu",
		// childType: 		"adopted",
		clanId: 		"-L8vfadf5467tyhfgsERRDGSDh5",
		displayName: 	"Nina Dakay",
		email: 			"ninadakay@gmail.com",
		// fbId: 			"something",
		firstName: 		"Nina",
		gender: 		"female",
		lastName: 		"Dakay",
		merged: 		false,
		// middleName: 	"Lao Cubelo",
		// photoUrl: 		"something",
		uid: 			45gsdfhjghr89GSdfgjs4tgsdg
	}
];

var tree =
[
	{
		bd: 	"10/12/1995",
		// ct: 	"adopted",
		// f: 		"-L41lWRX3sX-RYPQrTPV",
		// img: 	"something",
		key: 	user_key,
		loc: 	"users",
		// m: 		"64dOBUKtZqOBFWJmPCxEhUsBMFF3",
		// ms: 	"something",
		n: 		"Nina Dakay",
		s: 		"female",
		// vir: 	"something",
		// ux: 	"something"
	}
];

// if not user, include below

// var potential =
// [
// 	{
// 		birthDate: 		"09/17/1995",
// 		birthPlace: 	"Great Britain",
// 		childType: 		"adopted",
// 		clanId: 		"-L41dY5Iw2j0Acp-4rLf",
// 		displayName: 	"Neville Potter",
// 		email: 			"nevillepotter@gmail.com",
// 		firstName: 		"Neville",
// 		gender: 		"male",
// 		lastName: 		"Potter",
// 		livingStatus: 	"living",
// 		// maritalStatus: 	"separated",
// 		merged: 		false,
// 		// middleName: 	"Lao Cubelo",
// 		parentKeys: 	[],
// 		relationship: 	"son",
// 		tempKeyInClan: 	user_key
// 	}
// ];

// var family =
// [
// 	{
// 		birthDate: 		"09/17/1995",
// 		birthPlace: 	"Great Britain",
// 		childType: 		"adopted",
// 		clanId: 		"-L41dY5Iw2j0Acp-4rLf",
// 		displayName: 	"Neville Potter",
// 		email: 			"nevillepotter@gmail.com",
// 		firstName: 		"Neville",
// 		gender: 		"male",
// 		lastName: 		"Potter",
// 		livingStatus: 	"living",
// 		// maritalStatus: 	"separated",
// 		merged: 		false,
// 		// middleName: 	"Lao Cubelo",
// 		// parentKeys: 	[],
// 		relationship: 	"son"
// 	}
// ];

user.forEach(function(element) {
    users.child(user_key).set(element);
});

tree.forEach(function(element) {
    user_tree_go.child(user_key).set(element);
});

// if not user, include below

// potential.forEach(function(element) {
//     potential_users.child(potential_key).set(element);
// });

// family.forEach(function(element) {
//     user_family.child(potential_key).set(element);
// });

// tree.forEach(function(element) {
//     user_tree_go.child(potential_key).set(element);
// });
 