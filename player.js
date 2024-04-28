class Player extends MovingSprite {
	constructor()
	{
		super();
		this.setVel(2,2);
		this.moveTo(100,50);
		this.width = 16;
		this.height = 16;
		this.size = 1;
		this.addCostume("side_walk_0",0,48,16,16);
		this.addAnimation("side_walk",0,48,16,16,5,4);
		this.setAnimation("side_walk");
	}
	
	keyInput = function () {
		if (key.up) {
			this.y -= this.yv;
		}
		if (key.down) {
			this.y += this.yv;
		}
		if (key.right) {
			this.x += this.xv;
		}
		if (key.left) {
			this.x -= this.xv;
		}
	}
	
	
	
	process = function() {
		//console.log("player.process() called");
		this.tick();
		this.keyInput();
		this.checkBounds();
		
	}
	

}