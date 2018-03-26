// function setupIdentical(diagram) {
//     var model = diagram.model;
//     var nodeDataArray = model.nodeDataArray;

//     for (var i = 0; i < nodeDataArray.length; i++) {
//         var person1 = nodeDataArray[i];
//         var person1Key = person1.key;
//         var person1S = person1.s;
//         var person1Bd = person1.bd;
//         var person1BdSplit = person1Bd.split("/");
//         var person1Bday = parseInt(person1BdSplit[1]);

//         var it = diagram.nodes;

//         if(it.next()) {
//             var person2 = it.value;
//             var person2Key = person2.data.key;
//             var person2S = person2.data.s;
//             var person2Bd = person2.data.bd;
//             var person2BdSplit = person2Bd.split("/");
//             var person2Bday = parseInt(person2BdSplit[1]);

//             if(person1Bday == person2Bday ||
//                 person1Bday == (person2Bday-1) ||
//                 person2Bday == (person1Bday-1)) {

//                 if(person1S == person2S) {
//                     var node = { s: "Identical" };
//                     model.addNodeData(node);

//                     var link = {
//                         from: person1Key,
//                         to: person2Key,
//                         labelKeys: [node.key],
//                         category: "Identical"
//                     };
//                     model.addLinkData(link);
//                 }
//             }

//             console.log('person1Key', person1Key);
//             console.log('person2Key', person2Key);
//             console.log('-------');
//         }
//     }
// }