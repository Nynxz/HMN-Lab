//This will be where I try to combine my own ideas, Coding Trains and Andys
let debugPActor, debugPActor2, debugPActor3, debugPActor4, debugPActor5, debugPActor6;

class PathingPoint extends Tile{
    constructor(_arrayToStore, _tileToPlace){
        super(_arrayToStore, _tileToPlace);
        this.Path ={
            id: 0,
            x: 0,
            y: 0,
            connections: [],
            nodeParent: 0,
            cost: 0
        }
    }
}


function drawGrid(grid, showConnections) {
	fill(255,255,255);
	stroke(0,0,0);
	
	let nodes = grid.nodes;
	for (let i = 0; i < nodes.length; i++) {
		circle(nodes[i].x, nodes[i].y, 15);
		if (showConnections) {
			let cons = nodes[i].connections;
			for (let j = 0; j < cons.length; j++) {
				line(nodes[i].x, nodes[i].y, cons[j].x, cons[j].y);
			}
		}
	}
}

function drawPath(path) {
	LayerManager.Layers.GroundFloorExtras.fill(255,0,0);
	LayerManager.Layers.GroundFloorExtras.stroke(255,0,0);
	
	for (let i = 0; i < path.length; i++) {
		LayerManager.Layers.GroundFloorExtras.circle(path[i].x, path[i].y + Map.tileSize, 10);
		if (i > 0) {
			LayerManager.Layers.GroundFloorExtras.line(path[i].x, path[i].y  + Map.tileSize, path[i-1].x, path[i-1].y  + Map.tileSize);
		}
	}
}

