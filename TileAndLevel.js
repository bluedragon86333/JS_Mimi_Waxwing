var levelData = [





];

class Tile extends Sprite{
	
}

class Level {
	constructor(world,level) { //worlds = spaces currently in use. A single dungeon, overworld map, cave system, etc. Levels = screens.
		this.currentLevel = levelData[world][level];
	}
}