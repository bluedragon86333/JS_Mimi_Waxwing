class Player extends Sprite {
	
	
	keyInput() {
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
	
	
	
	process() {
		this.keyInput();
		this.checkBounds();
	}
	
	init() {
		this.setVel(2,2);
		this.moveTo(100,50);
		this.width = 16;
		this.addCostume("onion",0,0);
		this.setCurrentCostume("onion");
		this.height = 22;
		this.size = 1;
	}
}