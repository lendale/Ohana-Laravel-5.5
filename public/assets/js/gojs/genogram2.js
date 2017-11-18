// strokeDashArray: [<pixels number of dashes>, <pixels spaces between dashes>]

function initGenogram(data, user_id) {
    var $ = go.GraphObject.make;

    myDiagram = $(go.Diagram, "genogram", {
        // The diagram is initially displayed at the center
        initialContentAlignment: go.Spot.Center, // Centers diagram
        // The user won't be able to move the elements
        allowMove: false,
        "undoManager.isEnabled": true,
        // Use a custom layout, defined below
        layout: $(GenogramLayout, {
            direction: 90, // direction the graph grows towards
            layerSpacing: 40, // space between parent and child node layers
            columnSpacing: 10 // space between children
        })
    });

    function consanguinity(node) {
        var loc = node.loc;

        switch (loc) {
            // a shade of red
            case "users":
                return "#ff5b6b";
            case "/user_family/" + user_id + "/mothers/":
                return "#ff5b6b";
            case "/user_family/" + user_id + "/fathers/":
                return "#ff5b6b";
            case "/user_family/" + user_id + "/daughters/":
                return "#ff5b6b";
            case "/user_family/" + user_id + "/sons/":
                return "#ff5b6b";
                // a shade of blue
            case "/user_family/" + user_id + "/wives/":
                return "#5b9fff";
            case "/user_family/" + user_id + "/husbands/":
                return "#5b9fff";
            default:
                return "#d9dde2"; // a shade of gray
        }
    }

    /*
        NODE TEMPLATES IN GENDER, MARITAL STATUS, CHILD STATUS NAMED BY CATEGORY VALUE (S)
    */

    /*  gender  */

    myDiagram.nodeTemplateMap.add("male",
        $(go.Node, "Vertical", {
                locationSpot: go.Spot.Center,
                locationObjectName: "ICON"
            },
            // shows img on node; preset pic if none available
            $(go.Picture, "assets/img/default-avatar.png", {
                    width: 100,
                    height: 100
                },
                new go.Binding("source", "img")),
            $(go.Panel,
                $(go.Shape, "RoundedRectangle", {
                        width: 100,
                        height: 33,
                        strokeWidth: 0
                    },
                    new go.Binding("fill", "", consanguinity)),
                $(go.TextBlock, {
                        textAlign: "center",
                        margin: 2,
                        width: 100,
                        height: 33
                    },
                    new go.Binding("text", "n"))))
    );

    myDiagram.nodeTemplateMap.add("female",
        $(go.Node, "Vertical", {
                locationSpot: go.Spot.Center,
                locationObjectName: "ICON"
            },
            // shows img on node; preset pic if none available
            $(go.Picture, "assets/img/default-avatar-female.png", {
                    width: 100,
                    height: 100
                },
                new go.Binding("source", "img")),
            $(go.Panel,
                $(go.Shape, "RoundedRectangle", {
                        width: 100,
                        height: 33,
                        strokeWidth: 0
                    },
                    new go.Binding("fill", "", consanguinity)),
                $(go.TextBlock, {
                        textAlign: "center",
                        margin: 2,
                        width: 100,
                        height: 33
                    },
                    new go.Binding("text", "n"))))
    );

    /*  nothing shows on marital status  */

    myDiagram.nodeTemplateMap.add("Married",
        $(go.Node, {
            selectable: false,
            width: 1,
            height: 1,
            fromEndSegmentLength: 20
        })
    );

    myDiagram.nodeTemplateMap.add("Divorced",
        $(go.Node, {
            selectable: false,
            width: 1,
            height: 1,
            fromEndSegmentLength: 20
        })
    );

    myDiagram.nodeTemplateMap.add("Separated",
        $(go.Node, {
            selectable: false,
            width: 1,
            height: 1,
            fromEndSegmentLength: 20
        })
    );

    /*  child status  */

    myDiagram.nodeTemplateMap.add("Adopted",
        $(go.Node, {
            selectable: false,
            width: 1,
            height: 1,
            fromEndSegmentLength: 20
        })
    );

    /*
        LINK TEMPLATES IN MARITAL STATUS, CHILD STATUS
    */

    /*  child status  */

    // parent-child
    myDiagram.linkTemplate = $(
        go.Link, {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            curviness: 15,
            layerName: "Background",
            selectable: false,
            fromSpot: go.Spot.Bottom,
            toSpot: go.Spot.Top
        },
        $(go.Shape, { strokeWidth: 1 })
    );

    // same birth child
    myDiagram.linkTemplate = $(
        TwinLink, {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            curviness: 10,
            layerName: "Background",
            selectable: false,
            fromSpot: go.Spot.Bottom,
            toSpot: go.Spot.Top
        },
        $(go.Shape, { strokeWidth: 1 })
    );

    myDiagram.linkTemplateMap.add("Adopted",
        $(go.Link, {
                selectable: false,
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver
            },
            $(go.Shape, {
                strokeWidth: 1,
                stroke: "blue",
                strokeDashArray: [5, 2]
            }))
    );

    /*  marital status  */

    myDiagram.linkTemplateMap.add("Marriage",
        $(go.Link, {
                selectable: false,
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver
            },
            $(go.Shape, {
                strokeWidth: 1,
                stroke: "blue"
            }))
    );

    myDiagram.linkTemplateMap.add("Divorced",
        $(go.Link, {
                selectable: false,
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver
            },
            $(go.Shape, { stroke: "red" }),
            $(go.Shape, { // the "from" end arrowhead
                fromArrow: "DoubleForwardSlash",
                strokeWidth: 1,
                stroke: "red"
            }),
            $(go.Shape, { // the "to" end arrowhead
                toArrow: "DoubleForwardSlash",
                strokeWidth: 1,
                stroke: "red"
            })
        )
    );

    myDiagram.linkTemplateMap.add("Separated",
        $(go.Link, {
                selectable: false,
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver
            },
            $(go.Shape, { stroke: "red" }),
            $(go.Shape, { // the "from" end arrowhead
                fromArrow: "ForwardSlash",
                strokeWidth: 1,
                stroke: "red"
            }),
            $(go.Shape, { // the "to" end arrowhead
                toArrow: "ForwardSlash",
                strokeWidth: 1,
                stroke: "red"
            })
        )
    );

    /*
        Event listener 'on click' on person. Display the information the person.
    */
    myDiagram.addDiagramListener("ObjectSingleClicked", function(e) {
        var part = e.subject.part;

        if (!(part instanceof go.Link)) showNodeData(part.data, user_id);
    });

    setupDiagram(myDiagram, data, user_id);
}

function showNodeData(data, uid) {
    const rootRef = firebase.database().ref();
    const usersRef = rootRef.child('users');
    const userTreeRef = rootRef.child('user_tree_go');
    const userWivesRef = rootRef.child("user_wives");
    const userHusbandssRef = rootRef.child("user_husbands");
    const userMothersRef = rootRef.child("user_mothers");
    const userFathersRef = rootRef.child("user_fathers");
    const userDaughtersRef = rootRef.child("user_daughters");
    const userSonsRef = rootRef.child("user_sons");
    const details = [];
    const key = data.key;
    const loc = data.loc;

    $("#modal_node_details")
        .modal('show');

    $("#node_img")
        .attr('src', data.img)
        .css({
            'max-height': 150,
            'max-width': 150
        });

    $("#node_name")
        .empty()
        .append(data.n);

    $("#code")
        .empty();

    if (loc === "users") {
        usersRef
            .child(key)
            .once('value')
            .then(function(snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function(childSnapshot) {
                    var obj = childSnapshot.val();
                    details.push(obj);
                    console.log(obj);

                    $("#code")
                        .append(obj + '. <br>')
                        .css('textTransform', 'capitalize');
                })
            })
    }

    if (loc === "user_husbands") {
        userHusbandssRef
            .child(uid)
            .child(key)
            .once('value')
            .then(function(snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function(childSnapshot) {
                    var obj = childSnapshot.val();
                    details.push(obj);
                    console.log(obj);

                    $("#code")
                        .append(obj + '. <br>')
                        .css('textTransform', 'capitalize');
                })
            })
    } else if (loc === "user_wives") {
        userWivesRef
            .child(uid)
            .child(key)
            .once('value')
            .then(function(snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function(childSnapshot) {
                    var obj = childSnapshot.val();
                    details.push(obj);
                    console.log(obj);

                    $("#code")
                        .append(obj + '. <br>')
                        .css('textTransform', 'capitalize');
                })
            })
    }

    if (loc === "user_mothers") {
        userMothersRef
            .child(uid)
            .child(key)
            .once('value')
            .then(function(snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function(childSnapshot) {
                    var obj = childSnapshot.val();
                    details.push(obj);
                    console.log(obj);

                    $("#code")
                        .append(obj + '. <br>')
                        .css('textTransform', 'capitalize');
                })
            })
    } else if (loc === "user_fathers") {
        userFathersRef
            .child(uid)
            .child(key)
            .once('value')
            .then(function(snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function(childSnapshot) {
                    var obj = childSnapshot.val();
                    details.push(obj);
                    console.log(obj);

                    $("#code")
                        .append(obj + '. <br>')
                        .css('textTransform', 'capitalize');
                })
            })
    }

    if (loc === "user_daughters") {
        userDaughtersRef
            .child(uid)
            .child(key)
            .once('value')
            .then(function(snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function(childSnapshot) {
                    var obj = childSnapshot.val();
                    details.push(obj);
                    console.log(obj);

                    $("#code")
                        .append(obj + '. <br>')
                        .css('textTransform', 'capitalize');
                })
            })
    } else if (loc === "user_sons") {
        userSonsRef
            .child(uid)
            .child(key)
            .once('value')
            .then(function(snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function(childSnapshot) {
                    var obj = childSnapshot.val();
                    details.push(obj);
                    console.log(obj);

                    $("#code")
                        .append(obj + '. <br>')
                        .css('textTransform', 'capitalize');
                })
            })
    }
}

// create and initialize the Diagram.model given an array of node data representing people
function setupDiagram(diagram, array, focusId) {
    diagram.model = go.GraphObject.make(go.GraphLinksModel, {
        // name of the data property that returns an array of keys of node data on that link data
        linkLabelKeysProperty: "labelKeys",
        // this property determines which template is used (category)
        nodeCategoryProperty: "s",
        // create all of the nodes for people
        nodeDataArray: array
    });

    setupSeparation(diagram);
    setupDivorces(diagram);
    setupMarriages(diagram);
    setupParents(diagram);
    setupChild(diagram);

    var node = diagram.findNodeForKey(focusId);
    if (node !== null) {
        diagram.select(node);
    }
}

// still error
function setupChild(diagram) {
    var model = diagram.model;
    var nodeDataArray = model.nodeDataArray;

    for (var i = 0; i < nodeDataArray.length; i++) {
        var data = nodeDataArray[i];
        var key = data.key;
        var f = data.f;
        var m = data.m;
        var ct = data.ct;

        if (f !== undefined && m !== undefined) {
            if (typeof f === "String") f = [f];
            if (typeof m === "String") m = [m];

            for (var a = 0; a < f.length; a++) {
                for (var b = 0; b < m.length; b++) {
                    var dad = f[a];
                    var mom = m[b];
                    if (key === dad || key === mom) {
                        continue;
                    }

                    var parentsA = [dad, mom];
                    console.log(parentsA + 'parents');

                    var connect = findMarriage(diagram, m, f);
                    if (connect === null) {
                        if (ct === "adopted") {
                            var node = { s: "Adopted" };
                            model.addNodeData(node);
                            var link = {
                                from: parentsA,
                                to: key,
                                labelKeys: [node.key],
                                category: "Adopted"
                            };
                            model.addLinkData(link);
                        }
                    }
                }
            }
        }
    }
}

function findMarriage(diagram, a, b) {
    // A and B are node keys
    var nodeA = diagram.findNodeForKey(a);
    var nodeB = diagram.findNodeForKey(b);
    if (nodeA !== null && nodeB !== null) {
        var it = nodeA.findLinksBetween(nodeB); // in either direction
        while (it.next()) {
            var link = it.value;

            if (link.data !== null && link.data.category === "Marriage") return link;
            else if (link.data !== null && link.data.category === "Divorced") return link;
            else if (link.data !== null && link.data.category === "Separated") return link;
        }
    }
    return null;
}

// determine marriages
function setupMarriages(diagram) {
    var model = diagram.model;
    var nodeDataArray = model.nodeDataArray;

    for (var i = 0; i < nodeDataArray.length; i++) {
        var data = nodeDataArray[i];
        var key = data.key;
        var uxs = data.ux;
        var virs = data.vir;

        if (uxs !== undefined) {
            if (typeof uxs === "String") uxs = [uxs];
            // uxs = [uxs];
            for (var a = 0; a < uxs.length; a++) {
                var wife = uxs[a];
                if (key === wife) {
                    // or warn no reflexive marriages
                    continue;
                }
                var linkMarriage = findMarriage(diagram, key, wife);
                if (linkMarriage === null) {
                    // add a label node for the marriage link
                    var node = { s: "Married" };
                    model.addNodeData(node);
                    // add the marriage link itself, also referring to the label node
                    var link = {
                        from: key,
                        to: wife,
                        labelKeys: [node.key],
                        category: "Marriage"
                    };
                    model.addLinkData(link);
                }
            }
        }

        if (virs !== undefined) {
            if (typeof virs === "String") virs = [virs];
            // virs = [virs];
            for (var j = 0; j < virs.length; j++) {
                var husband = virs[j];
                if (key === husband) {
                    // or warn no reflexive marriages
                    continue;
                }
                var link = findMarriage(diagram, key, husband);
                if (link === null) {
                    // add a label node for the marriage link
                    var node = { s: "Married" };
                    model.addNodeData(node);
                    // add the marriage link itself, also referring to the label node
                    var link = {
                        from: key,
                        to: husband,
                        labelKeys: [node.key],
                        category: "Marriage"
                    };
                    model.addLinkData(link);
                }
            }
        }
    }
}

function setupDivorces(diagram) {
    var model = diagram.model;
    var nodeDataArray = model.nodeDataArray;

    for (var i = 0; i < nodeDataArray.length; i++) {
        var data = nodeDataArray[i];
        var key = data.key;
        var uxs = data.ux;
        var virs = data.virs;
        var ms = data.ms;

        if (uxs !== undefined) {
            if (typeof uxs === "String") uxs = [uxs];
            console.log("UX", uxs);
            // uxs = [uxs];
            ms = [ms];
            for (var a = 0; a < uxs.length; a++) {
                for (var b = 0; b < ms.length; b++) {
                    var wife = uxs[a];
                    console.log('A', wife)
                    if (key === wife) {
                        continue;
                    }

                    var marstat = ms[b];
                    var connect = findMarriage(diagram, key, wife)
                    console.log('WIFE', wife)
                    if (connect === null) {
                        if (marstat === "divorced") {
                            // add a label node for the marriage link
                            var node = { s: "Divorced" };
                            model.addNodeData(node);
                            // add the marriage link itself, also referring to the label node
                            var link = {
                                from: key,
                                to: wife,
                                labelKeys: [node.key],
                                category: "Divorced"
                            };
                            console.log("Link", link)
                            model.addLinkData(link);
                        }
                    }
                }
            }
        }

        if (virs !== undefined) {
            if (typeof virs === "String") virs = [virs];
            // virs = [virs];
            ms = [ms];
            for (var j = 0; j < virs.length; j++) {
                for (var b = 0; b < ms.length; b++) {
                    var husband = virs[j];
                    if (key === husband) {
                        continue;
                    }

                    var marstat = ms[b];
                    var connect = findMarriage(diagram, key, husband);
                    if (connect === null) {
                        if (marstat === "divorced") {
                            // add a label node for the marriage link
                            var node = { s: "Divorced" };
                            model.addNodeData(node);
                            // add the marriage link itself, also referring to the label node
                            var link = {
                                from: key,
                                to: husband,
                                labelKeys: [node.key],
                                category: "Divorced"
                            };
                            model.addLinkData(link);
                        }
                    }
                }
            }
        }
    }
}

function setupSeparation(diagram) {
    var model = diagram.model;
    var nodeDataArray = model.nodeDataArray;

    for (var i = 0; i < nodeDataArray.length; i++) {
        var data = nodeDataArray[i];
        var key = data.key;
        var uxs = data.ux;
        var virs = data.virs;
        var ms = data.ms;

        if (uxs !== undefined) {
            uxs = [uxs];
            for (var a = 0; a < uxs.length; a++) {
                var wife = uxs[a];
                if (key === wife) {
                    continue;
                }
                if (ms === "separated") {
                    var node = { s: "Separated" };
                    model.addNodeData(node);

                    var link = {
                        from: key,
                        to: wife,
                        labelKeys: [node.key],
                        category: "Separated"
                    };
                    model.addLinkData(link);
                }
            }
        }

        if (virs !== undefined) {
            virs = [virs];
            for (var j = 0; j < virs.length; j++) {
                var husband = virs[j];
                if (key === husband) {
                    continue;
                }
                if (ms === "separated") {
                    var node = { s: "Separated" };
                    model.addNodeData(node);

                    var link = {
                        from: key,
                        to: husband,
                        labelKeys: [node.key],
                        category: "Separated"
                    };
                    model.addLinkData(link);
                }
            }
        }
    }
}

// process parent-child relationships once all marriages are known
function setupParents(diagram) {
    var model = diagram.model;
    var nodeDataArray = model.nodeDataArray;

    for (var i = 0; i < nodeDataArray.length; i++) {
        var data = nodeDataArray[i];
        var key = data.key;
        var mother = data.m;
        var father = data.f;

        if (mother !== undefined && father !== undefined) {
            var link = findMarriage(diagram, mother, father);
            if (link === null) {
                // or warn no known mother or no known father or no known marriage between them
                if (window.console)
                    window.console.log("unknown marriage: " + mother + " & " + father);
                continue;
            }

            var mdata = link.data;
            var mlabkey = mdata.labelKeys[0];
            var cdata = { from: mlabkey, to: key };
            myDiagram.model.addLinkData(cdata);
        } else if (mother !== undefined && father === undefined) {
            var cdata = { from: mother, to: key };
            myDiagram.model.addLinkData(cdata);
        } else if (mother === undefined && father !== undefined) {
            var cdata = { from: father, to: key };
            myDiagram.model.addLinkData(cdata);
        }
    }
}

// A custom layout that shows the two families related to a person's parents
function GenogramLayout() {
    go.LayeredDigraphLayout.call(this);
    this.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
    this.spouseSpacing = 30; // minimum space between spouses
}
go.Diagram.inherit(GenogramLayout, go.LayeredDigraphLayout);

/** @override */
GenogramLayout.prototype.makeNetwork = function(coll) {
    // generate LayoutEdges for each parent-child Link
    var net = this.createNetwork();
    if (coll instanceof go.Diagram) {
        this.add(net, coll.nodes, true);
        this.add(net, coll.links, true);
    } else if (coll instanceof go.Group) {
        this.add(net, coll.memberParts, false);
    } else if (coll.iterator) {
        this.add(net, coll.iterator, false);
    }
    return net;
};

// internal method for creating LayeredDigraphNetwork where husband/wife pairs are represented
// by a single LayeredDigraphVertex corresponding to the label Node on the marriage Link
GenogramLayout.prototype.add = function(net, coll, nonmemberonly) {
    var multiSpousePeople = new go.Set();
    // consider all Nodes in the given collection
    var it = coll.iterator;
    while (it.next()) {
        var nodeAdd = it.value;
        if (!(nodeAdd instanceof go.Node)) continue;
        if (!nodeAdd.isLayoutPositioned || !nodeAdd.isVisible()) continue;
        if (nonmemberonly && nodeAdd.containingGroup !== null) continue;
        // if it's an unmarried Node, or if it's a Link Label Node, create a LayoutVertex for it
        if (nodeAdd.isLinkLabel) {
            // get marriage Link
            var linkAdd = nodeAdd.labeledLink;
            var spouseA = linkAdd.fromNode;
            var spouseB = linkAdd.toNode;
            // create vertex representing both husband and wife
            var vertexAdd = net.addNode(nodeAdd);
            // now define the vertex size to be big enough to hold both spouses
            vertexAdd.width =
                spouseA.actualBounds.width +
                this.spouseSpacing +
                spouseB.actualBounds.width;
            vertexAdd.height = Math.max(
                spouseA.actualBounds.height,
                spouseB.actualBounds.height
            );
            vertexAdd.focus = new go.Point(
                spouseA.actualBounds.width + this.spouseSpacing / 2,
                vertexAdd.height / 2
            );
        } else {
            // don't add a vertex for any married person!
            // instead, code above adds label node for marriage link
            // assume a marriage Link has a label Node
            var nbMarriages = 0;
            nodeAdd.linksConnected.each(function(l) {
                if (l.isLabeledLink) nbMarriages++;
            });
            if (nbMarriages === 0) {
                net.addNode(nodeAdd);
            } else if (nbMarriages > 1) {
                multiSpousePeople.add(nodeAdd);
            }
        }
    }
    // now do all Links
    it.reset();
    while (it.next()) {
        var link = it.value;
        if (!(link instanceof go.Link)) continue;
        if (!link.isLayoutPositioned || !link.isVisible()) continue;
        if (nonmemberonly && link.containingGroup !== null) continue;
        // if it's a parent-child link, add a LayoutEdge for it
        if (!link.isLabeledLink) {
            var parent = net.findVertex(link.fromNode); // should be a label node
            var child = net.findVertex(link.toNode);
            if (child !== null) {
                // an unmarried child
                net.linkVertexes(parent, child, link);
            } else {
                // a married child
                link.toNode.linksConnected.each(function(l) {
                    if (!l.isLabeledLink) return; // if it has no label node, it's a parent-child link
                    // found the Marriage Link, now get its label Node
                    var mlab = l.labelNodes.first();
                    // parent-child link should connect with the label node,
                    // so the LayoutEdge should connect with the LayoutVertex representing the label node
                    var mlabvert = net.findVertex(mlab);
                    if (mlabvert !== null) {
                        net.linkVertexes(parent, mlabvert, link);
                    }
                });
            }
        }
    }

    while (multiSpousePeople.count > 0) {
        // find all collections of people that are indirectly married to each other
        var node = multiSpousePeople.first();
        var cohort = new go.Set();
        this.extendCohort(cohort, node);
        // then encourage them all to be the same generation by connecting them all with a common vertex
        var dummyvert = net.createVertex();
        net.addVertex(dummyvert);
        var marriages = new go.Set();
        cohort.each(function(n) {
            n.linksConnected.each(function(l) {
                marriages.add(l);
            });
        });
        marriages.each(function(link) {
            // find the vertex for the marriage link (i.e. for the label node)
            var mlab = link.labelNodes.first();
            var v = net.findVertex(mlab);
            if (v !== null) {
                net.linkVertexes(dummyvert, v, null);
            }
        });
        // done with these people, now see if there are any other multiple-married people
        multiSpousePeople.removeAll(cohort);
    }
};

// collect all of the people indirectly married with a person
GenogramLayout.prototype.extendCohort = function(coll, node) {
    if (coll.contains(node)) return;
    coll.add(node);
    var lay = this;
    node.linksConnected.each(function(l) {
        if (l.isLabeledLink) {
            // if it's a marriage link, continue with both spouses
            lay.extendCohort(coll, l.fromNode);
            lay.extendCohort(coll, l.toNode);
        }
    });
};

/** @override */
GenogramLayout.prototype.assignLayers = function() {
    go.LayeredDigraphLayout.prototype.assignLayers.call(this);
    var horiz = this.direction == 0.0 || this.direction == 180.0;
    // for every vertex, record the maximum vertex width or height for the vertex's layer
    var maxsizes = [];
    this.network.vertexes.each(function(v) {
        var lay = v.layer;
        var max = maxsizes[lay];
        if (max === undefined) max = 0;
        var sz = horiz ? v.width : v.height;
        if (sz > max) maxsizes[lay] = sz;
    });
    // now make sure every vertex has the maximum width or height according to which layer it is in,
    // and aligned on the left (if horizontal) or the top (if vertical)
    this.network.vertexes.each(function(v) {
        var lay = v.layer;
        var max = maxsizes[lay];
        if (horiz) {
            v.focus = new go.Point(0, v.height / 2);
            v.width = max;
        } else {
            v.focus = new go.Point(v.width / 2, 0);
            v.height = max;
        }
    });
    // from now on, the LayeredDigraphLayout will think that the Node is bigger than it really is
    // (other than the ones that are the widest or tallest in their respective layer).
};

/** @override */
GenogramLayout.prototype.commitNodes = function() {
    go.LayeredDigraphLayout.prototype.commitNodes.call(this);
    // position regular nodes
    this.network.vertexes.each(function(v) {
        if (v.node !== null && !v.node.isLinkLabel) {
            v.node.position = new go.Point(v.x, v.y);
        }
    });
    // position the spouses of each marriage vertex
    var layout = this;
    this.network.vertexes.each(function(v) {
        if (v.node === null) return;
        if (!v.node.isLinkLabel) return;
        var labnode = v.node;
        var lablink = labnode.labeledLink;
        // In case the spouses are not actually moved, we need to have the marriage link
        // position the label node, because LayoutVertex.commit() was called above on these vertexes.
        // Alternatively we could override LayoutVetex.commit to be a no-op for label node vertexes.
        lablink.invalidateRoute();
        var spouseA = lablink.fromNode;
        var spouseB = lablink.toNode;
        // prefer fathers on the left, mothers on the right
        if (spouseA.data.s === "female") {
            // sex is female
            var tempSpouse = spouseA;
            spouseA = spouseB;
            spouseB = tempSpouse;
        }
        // see if the parents are on the desired sides, to avoid a link crossing
        var aParentsNode = layout.findParentsMarriageLabelNode(spouseA);
        var bParentsNode = layout.findParentsMarriageLabelNode(spouseB);
        if (
            aParentsNode !== null &&
            bParentsNode !== null &&
            aParentsNode.position.x > bParentsNode.position.x
        ) {
            // swap the spouses
            var temp = spouseA;
            spouseA = spouseB;
            spouseB = temp;
        }
        spouseA.position = new go.Point(v.x, v.y);
        spouseB.position = new go.Point(
            v.x + spouseA.actualBounds.width + layout.spouseSpacing,
            v.y
        );
        if (spouseA.opacity === 0) {
            var position = new go.Point(
                v.centerX - spouseA.actualBounds.width / 2,
                v.y
            );
            spouseA.position = position;
            spouseB.position = position;
        } else if (spouseB.opacity === 0) {
            var pos = new go.Point(v.centerX - spouseB.actualBounds.width / 2, v.y);
            spouseA.position = pos;
            spouseB.position = pos;
        }
    });
    // position only-child nodes to be under the marriage label node
    this.network.vertexes.each(function(v) {
        if (v.node === null || v.node.linksConnected.count > 1) return;
        var mnode = layout.findParentsMarriageLabelNode(v.node);
        if (mnode !== null && mnode.linksConnected.count === 1) {
            // if only one child
            var mvert = layout.network.findVertex(mnode);
            var newbnds = v.node.actualBounds.copy();
            newbnds.x = mvert.centerX - v.node.actualBounds.width / 2;
            // see if there's any empty space at the horizontal mid-point in that layer
            var overlaps = layout.diagram.findObjectsIn(
                newbnds,
                function(x) {
                    return x.part;
                },
                function(p) {
                    return p !== v.node;
                },
                true
            );
            if (overlaps.count === 0) {
                v.node.move(newbnds.position);
            }
        }
    });
};

GenogramLayout.prototype.findParentsMarriageLabelNode = function(node) {
    var it = node.findNodesInto();
    while (it.next()) {
        var n = it.value;
        if (n.isLinkLabel) return n;
    }
    return null;
};
// end GenogramLayout class

function TwinLink() {
    go.Link.call(this);
}
go.Diagram.inherit(TwinLink, go.Link);

TwinLink.prototype.computePoints = function() {
    var result = go.Link.prototype.computePoints.call(this);
    var pts = this.points;
    if (pts.length >= 4) {
        var birthId = this.toNode.data["bd"];
        if (birthId) {
            var parents = this.fromNode;
            var sameBirth = 0;
            var sumX = 0;
            var it = parents.findNodesOutOf();
            while (it.next()) {
                var child = it.value;
                if (child.data["bd"] === birthId) {
                    sameBirth++;
                    sumX += child.location.x;
                }
            }
            if (sameBirth > 0) {
                var midX = sumX / sameBirth;
                var oldp = pts.elt(pts.length - 3);
                pts.setElt(pts.length - 3, new go.Point(midX, oldp.y));
                pts.setElt(pts.length - 2, pts.elt(pts.length - 1));
            }
        }
    }
    return result;
};