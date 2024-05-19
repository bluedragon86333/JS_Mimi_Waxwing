class LevelPortal {
	constructor(id,x,y,name,connections) {
		this.x = x;
		this.y = y;
		this.id = id;
		this.name = name;
		this.connections = connections;
		this.up = this.getUpConnect();
		this.down = down;
		this.right = right;
		this.left = left;
		
		this.addCostume("red_level",400,48,16,16);
		this.addCostume("blue_level",416,48,16,16);
		this.addCostume("black_level",432,48,16,16);
	}
	
	getUpConnect = function() {
		return (connections[0] == '1');
	}
}

class LevelSelectInterface {
	constructor() {
		this.levels = [];
		this.addLevel
		
		this.addCostume("cursor",384,48,16,16);
	}
	
	addLevel = function(id,x,y,name,connections) {
		this.levels.push(new LevelPortal(id,x,y,name,connections));
	}
}