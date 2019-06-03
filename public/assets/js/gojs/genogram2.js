function initGenogram(data, user_id) {
    var $ = go.GraphObject.make;

    myDiagram = $(go.Diagram, "genogram", {
        // The diagram is initially displayed at the center
        initialContentAlignment: go.Spot.Center, // Centers diagram
        // initialAutoScale: go.Diagram.UniformToFill,
        // The user won't be able to move the elements
        allowMove: true,
        "undoManager.isEnabled": true,
        // Use a custom layout defined below
        layout: $(GenogramLayout, {
            direction: 90, // direction the graph grows toward
            layerSpacing: 60, // space between parent and child node layers (30)
            columnSpacing: 10, // space between children
        })
    });

    /* NODE TEMPLATES IN GENDER, MARITAL STATUS, CHILD STATUS NAMED BY CATEGORY VALUE (GENDER) */

    /* gender */

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
                new go.Binding("source", "photoURL")),
            $(go.Panel,
                $(go.Shape, "RoundedRectangle", {
                        width: 110,
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
                    new go.Binding("text", "displayName"),
                    // new go.Binding("stroke", "", livingStatus)
                )
            ))
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
                new go.Binding("source", "photoURL")),
            $(go.Panel,
                $(go.Shape, "RoundedRectangle", {
                        width: 110,
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
                    new go.Binding("text", "displayName"),
                    // new go.Binding("stroke", "", livingStatus)
                )
            ))
    );

    /* nothing shows on marital status */

    myDiagram.nodeTemplateMap.add("Married",
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

    /* LINK TEMPLATES IN MARITAL STATUS, CHILD STATUS */

    /* child status */

    myDiagram.linkTemplate = $(
        TwinLink, {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            layerName: "Background",
            selectable: false,
            fromSpot: go.Spot.Bottom,
            toSpot: go.Spot.Top
        },
        $(go.Shape, { strokeWidth: 1 })
    );

    // myDiagram.linkTemplate =
    //     $(go.Link, {
    //         routing: go.Link.AvoidsNodes,
    //         curve: go.Link.JumpOver,
    //         layerName: "Background",
    //         selectable: false,
    //         fromSpot: go.Spot.Bottom,
    //         toSpot: go.Spot.Top
    //     },
    //     $(go.Shape, { strokeWidth: 1 })
    // );

    /* marital status */

    myDiagram.linkTemplateMap.add("Marriage",
        $(go.Link, {
                selectable: false,
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver
            },
            $(go.Shape, {
                strokeWidth: 2,
                stroke: "blue",
            }))
    );

    myDiagram.linkTemplateMap.add("Separated",
        $(go.Link, {
                selectable: false,
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver
            },
            $(go.Shape, {
                strokeWidth: 2,
                stroke: "blue",
                strokeDashArray: [5, 3]
            }))
    );

    /*
        Event listener 'on click' on person. Display the information the person.
    */
    myDiagram.addDiagramListener("ObjectDoubleClicked", function(e) {
        var part = e.subject.part;

        // if (!(part instanceof go.Link)) showNodeData(part.data);

        if (!(part instanceof go.Link)) getNodeData(part.data.key);
    });

    setupDiagram(myDiagram, data, user_id);
}

// Gives specific color to shape for name
function consanguinity(node) {
    if(node.registered == true) return "#D43143";
    else if(node.registered == false) {
        if(node.livingStatus == "deceased") return "#cccccc";
        else if(node.parenthood == "adopted") return "#4667E8";
        else if(node.livingStatus == "living") {
            switch (node.relationship) {
                // a shade of red
                case "mother":
                    return "#e74c3c";
                case "father":
                    return "#e74c3c";
                case "daughter":
                    return "#e74c3c";
                case "son":
                    return "#e74c3c";
                case "brother":
                    return "#e74c3c";
                case "sister":
                    return "#e74c3c";
                    // a shade of blue
                case "wife":
                    return "#4667E8";
                case "husband":
                    return "#4667E8";
                case "aunt":
                    return "#4667E8";
                case "uncle":
                    return "#4667E8";
                default:
                    return "#cccccc"; // a shade of gray
            }
        }
    }
    else return "#cccccc";
}

function livingStatus(node) {
    if(node.livingStatus == "deceased") return "#666666";
    else return "black";
}

function setupDiagram(diagram, array, focusId) {
    diagram.model = go.GraphObject.make(go.GraphLinksModel, {
        linkLabelKeysProperty: "labelKeys",
        nodeCategoryProperty: "gender",
        nodeDataArray: array
    });

    setupMaritalStatus(diagram);
    setupParents(diagram);

    var node = diagram.findNodeForKey(focusId);
    if (node !== null) {
        diagram.select(node);
    }
}

function findMarriage(diagram, a, b) {
    var nodeA = diagram.findNodeForKey(a);
    var nodeB = diagram.findNodeForKey(b);

    if (nodeA !== null && nodeB !== null) {
        var it = nodeA.findLinksBetween(nodeB); // in either direction

        while (it.next()) {
            var link = it.value;

            if (link.data !== null && link.data.category === "Marriage") return link;
            else if (link.data !== null && link.data.category === "Separated") return link;
        }
    }
    return null;
}

function setupMaritalStatus(diagram) {
    var model = diagram.model;
    var nodeDataArray = model.nodeDataArray;

    for (var i = 0; i < nodeDataArray.length; i++) {
        var data = nodeDataArray[i];
        var key = data.key;
        var uxs = data.ux;
        var virs = data.vir;
        var ms = data.ms;

        if (uxs !== undefined) {
            if (typeof uxs === "String") uxs = [uxs];
            if (typeof ms === "String") ms = [ms];
            for (var a = 0; a < uxs.length; a++) {
                for (let b = 0; b < ms.length; b++) {
                    var wife = uxs[a];

                    if (key === wife) {
                        continue;
                    }

                    var marstat = ms[b];
                    var connect = findMarriage(diagram, key, wife);

                    if (connect === null) {
                        if (marstat === "married") {
                            var node = { gender: "Married" };
                            model.addNodeData(node);

                            var link = {
                                from: key,
                                to: wife,
                                labelKeys: [node.key],
                                category: "Marriage"
                            };
                            model.addLinkData(link);
                        } else if (marstat === "separated") {
                            var node = { gender: "Separated" };
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
            }
        }

        if (virs !== undefined) {
            if (typeof virs === "String") virs = [virs];
            if (typeof ms === "String") ms = [ms];
            for (var j = 0; j < virs.length; j++) {
                for (let b = 0; b < ms.length; b++) {
                    var husband = virs[j];

                    if (key === husband) {
                        continue;
                    }

                    var marstat = ms[b];
                    var connect = findMarriage(diagram, key, husband);

                    if (connect === null) {
                        if (marstat === "married") {
                            var node = { gender: "Married" };
                            model.addNodeData(node);

                            var link = {
                                from: key,
                                to: husband,
                                labelKeys: [node.key],
                                category: "Marriage"
                            };
                            model.addLinkData(link);
                        } else if (marstat === "separated") {
                            var node = { gender: "Separated" };
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
    }
}

function setupParents(diagram) {
    var model = diagram.model;
    var nodeDataArray = model.nodeDataArray;
    
    for (var i = 0; i < nodeDataArray.length; i++) {
        var data = nodeDataArray[i];
        var key = data.key;
        var mom = data.m;
        var dad = data.f;

        if (mom !== undefined && dad !== undefined) {
            var connect = findMarriage(diagram, mom, dad);
            if (connect === null) {
                if (window.console)
                    // window.console.log("unknown marriage: " + mom + " & " + dad);
                continue;
            }

            var parents = connect.data;
            var parentKey = parents.labelKeys[0];
            var link = {
                from: parentKey,
                to: key
            };
            model.addLinkData(link);
        } else if (mom !== undefined && dad === undefined) {
            var link = {
                from: mom,
                to: key
            };
            model.addLinkData(link);
        } else if (mom === undefined && dad !== undefined) {
            var link = {
                from: dad,
                to: key
            };
            model.addLinkData(link);
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

/*  override    */
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

//  creating LayeredDigraphNetwork where husband/wife pairs are represented by a single LayeredDigraphVertex corresponding to the label Node on the marriage Link
GenogramLayout.prototype.add = function(net, coll, nonmemberonly) {
    var multiSpousePeople = new go.Set();
    var it = coll.iterator;
    while (it.next()) {
        var nodeAdd = it.value;
        if (!(nodeAdd instanceof go.Node)) continue;
        if (!nodeAdd.isLayoutPositioned || !nodeAdd.isVisible()) continue;
        if (nonmemberonly && nodeAdd.containingGroup !== null) continue;
        // if an unmarried Node or a Link Label Node, create LayoutVertex
        if (nodeAdd.isLinkLabel) {
            // get marriage Link
            var linkAdd = nodeAdd.labeledLink;
            var spouseA = linkAdd.fromNode;
            var spouseB = linkAdd.toNode;
            // create vertex representing both husband and wife
            var vertexAdd = net.addNode(nodeAdd);

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

    it.reset();
    while (it.next()) {
        var link = it.value;
        if (!(link instanceof go.Link)) continue;
        if (!link.isLayoutPositioned || !link.isVisible()) continue;
        if (nonmemberonly && link.containingGroup !== null) continue;
        // if a parent-child link, add a LayoutEdge
        if (!link.isLabeledLink) {
            var parent = net.findVertex(link.fromNode); // should be a label node
            var child = net.findVertex(link.toNode);
            if (child !== null) {
                // an unmarried child
                net.linkVertexes(parent, child, link);
            } else {
                link.toNode.linksConnected.each(function(l) {
                    // if no label node, it's a parent-child link
                    if (!l.isLabeledLink) return;
                    // found the Link, now get its label Node
                    var mlab = l.labelNodes.first();
                    // parent-child link should connect with the label node so LayoutEdge should connect with LayoutVertex representing the label node
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
        //  connecting them all with a common vertex
        var dummyvert = net.createVertex();
        net.addVertex(dummyvert);
        var marriages = new go.Set();
        cohort.each(function(n) {
            n.linksConnected.each(function(l) {
                marriages.add(l);
            });
        });
        marriages.each(function(link) {
            // find the vertex for the marriage link (for the label node)
            var mlab = link.labelNodes.first();
            var v = net.findVertex(mlab);
            if (v !== null) {
                net.linkVertexes(dummyvert, v, null);
            }
        });
        //  check if there are any other multiple-married people
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

/*  override    */
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
    //  every vertex has the maximum width or height according to which layer it is in and aligned on the left (if horizontal) or the top (if vertical)
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
};

/*  override    */
GenogramLayout.prototype.commitNodes = function() {
    go.LayeredDigraphLayout.prototype.commitNodes.call(this);
    // position regular nodes
    this.network.vertexes.each(function(v) {
        if (v.node !== null && !v.node.isLinkLabel) {
            v.node.position = new go.Point(v.x, v.y);
        }
    });
    // position spouses of each marriage vertex
    var layout = this;
    this.network.vertexes.each(function(v) {
        if (v.node === null) return;
        if (!v.node.isLinkLabel) return;
        var labnode = v.node;
        var lablink = labnode.labeledLink;
        // if spouses are not moved, marriage link needed
        // position the label node, because LayoutVertex.commit() was called above
        lablink.invalidateRoute();
        var spouseA = lablink.fromNode;
        var spouseB = lablink.toNode;
        // prefer fathers on the left, mothers on the right
        if (spouseA.data.gender === "female") {
            // sex is female
            var tempSpouse = spouseA;
            spouseA = spouseB;
            spouseB = tempSpouse;
        }
        // check if parents are on the desired sides to avoid link crossing
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
    // position only-child nodes under the marriage label node
    this.network.vertexes.each(function(v) {
        if (v.node === null || v.node.linksConnected.count > 1) return;
        var mnode = layout.findParentsMarriageLabelNode(v.node);
        if (mnode !== null && mnode.linksConnected.count === 1) {
            // if only one child
            var mvert = layout.network.findVertex(mnode);
            var newbnds = v.node.actualBounds.copy();
            newbnds.x = mvert.centerX - v.node.actualBounds.width / 2;
            // check if any empty space at horizontal mid-point in that layer
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

function TwinLink() {
    go.Link.call(this);
}
go.Diagram.inherit(TwinLink, go.Link);

TwinLink.prototype.computePoints = function() {
    var result = go.Link.prototype.computePoints.call(this);
    var pts = this.points; // greek
    if (pts.length >= 4) { // greek
        var birthId = this.toNode.data["birthDate"];
        var genderId = this.toNode.data["gender"];
        if (birthId) {
            var parents = this.fromNode;
            var sameBirth = 0;
            var sumX = 0;
            var it = parents.findNodesOutOf();

            while (it.next()) {
                var child = it.value;
                var childBd = child.data["birthDate"];
                var childGender = child.data["gender"];
                var childSpliter = childBd.split("/");
                var childBdDay = parseInt(childSpliter[1]);
                var childBdMonth = parseInt(childSpliter[0]);

                var birthIdSplit = birthId.split("/");
                var birthIdDay = parseInt(birthIdSplit[1]);
                var birthIdMonth = parseInt(birthIdSplit[0]);
                
                if((childBdDay == birthIdDay ||
                    childBdDay == (birthIdDay - 1) ||
                    birthIdDay == (childBdDay - 1)) &&
                    (childBdMonth == birthIdMonth ||
                    childBdMonth == (birthIdMonth - 1) ||
                    birthIdMonth == (childBdMonth - 1))) {
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