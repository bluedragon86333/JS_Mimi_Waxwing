class Coin extends Sprite {
	constructor(x,y,value) {
		super();
		this.moveTo(x,y);
		this.setSize(16,16);
		this.value = value;
		this.addAnimation("coin_spin",80,0,16,16,4,3);
		this.addCostume("default",80,0,16,16);
		this.animationActive = 0;
		
		this.setAnimation("coin_spin");
	}
	
	
	
	process = function() {
		this.tick();
	}
}



class Bush extends Sprite {
	constructor(x,y) {
		super();
		this.moveTo(x,y);
		this.solid = true;
		this.addAnimation("bush_idle",432,256,16,17,4,6);
		this.setAnimation("bush_idle");
	}
	
	process = function() {
		this.tick();
	}
}

class Barrier extends Sprite {
	constructor(x,y) {
		super();
		this.moveTo(x + 4,y);
		this.solid = true;
		this.setSize(8,16);
		this.setHitbox(0,0,8,16);
		this.addAnimation("descend",432,272,8,16,5,3);
		this.addCostume("tall",432,272,8,16);
		this.addCostume("short",464,272,8,16);
		this.setCostume("tall");
	}
	
	process = function() {
		this.tick();
		if (this.animationActive != -1) {
			if (this.animations[this.animationActive].frames.length - 1 == this.currentFrame) {
				this.setCostume("short");
			}
		}
	}
}