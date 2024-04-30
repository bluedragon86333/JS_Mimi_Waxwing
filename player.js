class Player extends MovingSprite {
	constructor()
	{
		super();
		this.setVel(2,2);
		this.moveTo(100,50);
		this.width = 16;
		this.height = 16;
		this.speed = 2;
		this.size = 1;
		this.setHP(3,3);
		this.hitbox.tly = 4;
		this.hitbox.height = 12;
		// ANIMATIONS ///////////////////////////////////////
		this.addCostume("left_walk_0",0,48,16,16);
		this.addCostume("right_walk_0",0,64,16,16);
		this.addCostume("up_walk_0",0,80,16,16);
		this.addCostume("down_walk_0",0,96,16,16);
		this.addAnimation("left_walk",16,48,16,16,4,2);
		this.addAnimation("right_walk",16,64,16,16,4,2);
		this.addAnimation("up_walk",16,80,16,16,4,2);
		this.addAnimation("down_walk",16,96,16,16,4,2);
		this.setCurrentCostume("right_walk_0");
		
	}
	
	keyInput = function () {
		this.speed = 2 + (key.space * 2);
		let oldv = [this.xv,this.yv];
		if (key.up) {
			this.yv = this.speed * -1;
		}
		else if (key.down) {
			this.yv = this.speed;
		}
		else {
			this.yv = 0;
		}
		if (key.right) {
			this.xv = this.speed;
		}
		else if (key.left) {
			this.xv = this.speed * -1;
		}
		else {
			this.xv = 0;
		}
		
		this.moveTo(this.x + this.xv,this.y + this.yv);
		
		let nom = "side_walk";
		if (this.animationActive >= 0) {
			nom = this.animations[this.animationActive].name;
		}
		if (oldv[0] != this.xv || oldv[1] != this.yv) { //if direction has changed
		
			if (this.xv > 0) {
				this.setAnimation("right_walk");
			} else if (this.xv < 0) {
				this.setAnimation("left_walk");
			}
			else if (this.yv > 0) {
				this.setAnimation("down_walk");
			}
			else if (this.yv < 0) {
				this.setAnimation("up_walk");
			} else {
				this.animationActive = -1;
				this.setCurrentCostume(nom + "_0");
			}
			

		}
		

	}
	
	
	
	process = function() {
		//console.log("player.process() called");
		this.tick();
		this.keyInput();
		this.checkBounds();
		
	}
	

}