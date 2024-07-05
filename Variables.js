var spawnPoints = [];

	
addSpawnPoint = function(world,level,x,y) {
	spawnPoints.push([world,level,x,y]);
}

addSpawnPoint(0,0,101,114);
addSpawnPoint(1,0,100,94);


var player = new Player();
var coins = new ObjectHandler();
var bushes = new ObjectHandler();
var enemies = new ObjectHandler();
var barriers = new ObjectHandler();
var trees = new ObjectHandler();
