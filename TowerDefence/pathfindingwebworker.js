/* MESSAGE FORMAT
message = {
    type: <type>,
    from: <id>,
    payload: {<payload>}
}
*/
let nodes;
let tileSize = 24;

self.addEventListener('message', function(e) {
    //postMessage(e.data);
    let type = e.data.type;
    let from = e.data.from;
    let payload = e.data.payload;

    switch(type){
        
        case 'load':
            _loadMap(payload.grid, 0,0, false);
        break;

        case 'find':
            let _path = _findPath(payload.x1, payload.y1, payload.x2, payload.y2);
            let obj = {
                type: 'find',
                from: from,
                path: _path,
            }
            postMessage(obj);
        break;
    }
}, false);


//#region LOADING
function Node() {
	this.id;
	this.x;
	this.y;
	this.connections;
    this.nodeParent;
    this.cost;
}

_loadMap = function(grid, x, y, useDiagonals){
    nodes = [];
    if (grid.length > 0) {
        let tempGrid = [];
        let id = 0;
        //turn boolean grid into 2D array of points
        //invalid positions stored as false
        for (let i = 0; i < grid.length; i++) { //columns
            tempGrid.push([]);
            for (let j = 0; j < grid[i].length; j++) { //rows
                if (grid[i][j].passable == true) {
                    let n = new Node();
                    n.id = id;
                    n.x = (x + (j * tileSize)) + tileSize/2;
                    n.y = (y + (i * tileSize)) - tileSize/2;
                    n.connections = [];
                    n.nodeParent = 0;
                    n.cost = 0;
                    tempGrid[i].push(n);
                    id += 1;
                    grid[i][j].Path = n;
                } else {
                    tempGrid[i].push(false);
                }
            }
        }
        //make connections and save as an unorganised list of nodes
        for (let i = 0; i < tempGrid.length; i++) {
            for (let j = 0; j < tempGrid[i].length; j++) {
                let n = tempGrid[i][j];
                if (n != false) { //live node
                    //check each direction and see if there is a node there to connect to.
                    //north
                    if (i > 0) {
                        if (tempGrid[i-1][j] != false) {
                            n.connections.push(tempGrid[i-1][j]);
                        }
                        if (useDiagonals) {
                            //n-west
                            if (j > 0) {
                                if (tempGrid[i-1][j-1] != false) {
                                    n.connections.push(tempGrid[i-1][j-1]);
                                }
                            }
                            
                            //n-east
                            if (j < tempGrid[i].length-1) {
                                if (tempGrid[i-1][j+1] != false) {
                                    n.connections.push(tempGrid[i-1][j+1]);
                                }
                            }
                        }
                    }
                    //south
                    if (i < tempGrid.length-1) {
                        if (tempGrid[i+1][j] != false) {
                            n.connections.push(tempGrid[i+1][j]);
                        }
                        if (useDiagonals) {
                            //s-west
                            if (j > 0) {
                                if (tempGrid[i+1][j-1] != false) {
                                    n.connections.push(tempGrid[i+1][j-1]);
                                }
                            }
                            
                            //s-east
                            if (j < tempGrid[i].length-1) {
                                if (tempGrid[i+1][j+1] != false) {
                                    n.connections.push(tempGrid[i+1][j+1]);
                                }
                            }
                        }
                        
                    }
                    
                    //west
                    if (j > 0) {
                        if (tempGrid[i][j-1] != false) {
                            n.connections.push(tempGrid[i][j-1]);
                        }
                    }
                    
                    //east
                    if (j < tempGrid[i].length-1) {
                        if (tempGrid[i][j+1] != false) {
                            n.connections.push(tempGrid[i][j+1]);
                        }
                    }
                    nodes.push(n);
                }
            }
        }
    }
}
//#endregion
//#region FINDING
getDistance = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

 //returns the closest nav point, used or not.
getClosestNavPoint = function(x, y) {

    let closest = null;
    let closestDist = 0;

    for (let i = 0; i < nodes.length; i++) {
        
        let dist = getDistance(x, y, nodes[i].x, nodes[i].y);
        
        if (closest == null) { //first node, don't compare distances
            closest = nodes[i];
            closestDist = dist;
        } else {
            if (closestDist > dist) {
                closest = nodes[i];
                closestDist = dist
            }
        }
    }

    return closest;
}

//get how far we've travelled down the node path
getNodeCost = function(node) {
    
    let n = node;
    let dist = 0;
    
    //add straight line distance left to target
    //dist = this.getDistance(n.x, n.y, target.x, target.y);

    //recur up the list
    while (n.nodeParent != null) {
        dist += getDistance(n.x, n.y, n.nodeParent.x, n.nodeParent.y);
        n = n.nodeParent;
    }
    
    

    return dist;
}


getNodeRank = function(node, target) {
    return getNodeCost(node) - getDistance(node.x, node.y, target.x, target.y);
}

//check if newNode is a node within the node chain
isNodeParent = function(newNode, checkNode) { 

    let n = newNode;

    //recur up the list
    while (n.nodeParent != null) {
        if (n.nodeParent == checkNode) {
            return true;
        } else {
            n = n.nodeParent;
        }
    }
    return false;
}

_findPath = function(x1, y1, x2, y2){
    //find the starting node
    let startNode = getClosestNavPoint(x1, y1);
    //find the ending node
    let endNode = getClosestNavPoint(x2, y2);

    //clear costs and parents from nodes list
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].cost = 0;
        nodes[i].nodeParent = null;
    }

    //make our fringe node list
    let fringeNodes = [];
    fringeNodes.push(startNode);

    //used to store the closest node we got to if we can't reach the end.
    let closestNode = startNode;
    let closestNodeDist = getDistance(startNode.x, startNode.y, endNode.x, endNode.y);

    while (fringeNodes.length > 0) {
        //setTimeout()
        let n = fringeNodes[0];

        if (n != endNode) {
            //console.log("n", n);
            //Expend new nodes
            for (let i = 0; i < n.connections.length; i++) {
                let nn = n.connections[i];
                //check if connecting node is already in parent list
                
                //console.log(n);
                if (!isNodeParent(n, nn)) {
                    if (nn.nodeParent == null) {
                        //no path to this node, update values
                        nn.nodeParent = n;
                        nn.cost = getNodeCost(nn);
                        fringeNodes.push(nn);
                        
                    } else {
                        //has parent, check if new path is better
                        let oldParent = nn.nodeParent;
                        let oldCost = nn.cost;

                        nn.nodeParent = n;
                        nn.cost = getNodeCost(nn);

                        if (oldCost < nn.cost) {
                            nn.nodeParent = oldParent;
                            nn.cost = oldCost;
                        }
                    }
                    
                    let d = getDistance(nn.x, nn.y, endNode.x, endNode.y);
                    if (getDistance(nn.x, nn.y, endNode.x, endNode.y) < closestNodeDist) {
                        closestNode = nn;
                        closestNodeDist = d;
                    }
                }
            }
            
            //remove expanded node now.
            fringeNodes.shift();

            //Sort Fringe nodes by node cost
            let fringeNodesSorted = [];
            while (fringeNodes.length > 0) {
                let lowestIndex = 0;
                let lowest = fringeNodes[lowestIndex];
                let lowestRank = getNodeRank(lowest, endNode);
                for (let i = 1; i < fringeNodes.length; i++) {
                    let r = getNodeRank(fringeNodes[i], endNode);
                    if (r < lowestRank) {
                        lowestIndex = i;
                        lowest = fringeNodes[i];
                        lowestRank = r;
                    }
                }
                fringeNodesSorted.push(lowest);
                fringeNodes.splice(lowestIndex, 1);
            }

            fringeNodes = fringeNodesSorted;

        } else {
            //we've reached the end point.
            //return array of points for the path excluding start and end that were given.
            let path = [];
            let point;
            
            while (n != startNode) {
                point = {x: n.x, y: n.y};
                path.push(point);
                n = n.nodeParent;
            }
            
            point = {x: startNode.x, y: startNode.y};
            path.push(point);
            
            //reverse the order of the path.
            let pathR = [];
            for (let i = path.length-1; i >= 0; i--) {
                pathR.push(path[i]);
            }
            
            return pathR;
        }
    }

    //couldnt find a path, return closet node path
    let path = [];
    let point;
    
    let n = closestNode;
    
    while (n != startNode) {
        point = {x: n.x, y: n.y};
        path.push(point);
        n = n.nodeParent;
    }
    
    point = {x: startNode.x, y: startNode.y};
    path.push(point);
    
    //reverse the order of the path.
    let pathR = [];
    for (let i = path.length-1; i >= 0; i--) {
        pathR.push(path[i]);
    }
    
    return pathR;
}
//#endregion