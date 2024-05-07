class Player extends MovingSprite {
	constructor()
	{
		super();
		this.setVel(2,2);
		this.moveTo(100,140);
		this.width = 16;
		this.height = 16;
		this.speed = 2;
		this.size = 1;
		this.setHP(3,3);
		this.setHitbox(1,8,14,12);
		this.canLeaveScreen = true;
		this.attack = new PlayerAttack(this.x,this.y,this.xv,this.yv);
		// ANIMATIONS ///////////////////////////////////////
		this.addCostume("left_walk_0",0,48,16,16);
		this.addCostume("right_walk_0",0,64,16,16);
		this.addCostume("up_walk_0",0,80,16,16);
		this.addCostume("down_walk_0",0,96,16,16);
		this.addAnimation("left_walk",16,48,16,16,4,2);
		this.addAnimation("right_walk",16,64,16,16,4,2);
		this.addAnimation("up_walk",16,80,16,16,4,2);
		this.addAnimation("down_walk",16,96,16,16,4,2);
		/*
		this.addCostume("grass_left_walk_0",64,48,16,16);
		this.addCostume("grass_right_walk_0",64,64,16,16);
		this.addCostume("grass_up_walk_0",64,80,16,16);
		this.addCostume("grass_down_walk_0",64,96,16,16);
		this.addAnimation("grass_left_walk",80,48,16,16,4,2);
		this.addAnimation("grass_right_walk",80,64,16,16,4,2);
		this.addAnimation("grass_up_walk",80,80,16,16,4,2);
		this.addAnimation("grass_down_walk",80,96,16,16,4,2);
		*/
		
		this.setCurrentCostume("right_walk_0");
		this.visible = true;
		this.invisLength = 60;
		this.costumePrefix = "";
		
	}
	
	keyInput = function () {
		if (key.z && !this.attack.active) {
			this.attack.activate();
		}
		//this.speed = 2 + (key.space * 2);
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
		
		//this.moveTo(this.x + this.xv,this.y + this.yv);
		this.moveByVel();
		
		let nom = "side_walk";
		if (this.animationActive >= 0) {
			nom = this.animations[this.animationActive].name;
		}
		if (oldv[0] != this.xv || oldv[1] != this.yv) { //if direction has changed
		
			if (this.xv > 0) {
				this.setAnimation(this.costumePrefix + "right_walk");
			} else if (this.xv < 0) {
				this.setAnimation(this.costumePrefix + "left_walk");
			}
			else if (this.yv > 0) {
				this.setAnimation(this.costumePrefix + "down_walk");
			}
			else if (this.yv < 0) {
				this.setAnimation(this.costumePrefix + "up_walk");
			} else {
				this.animationActive = -1;
				this.setCurrentCostume(this.costumePrefix + nom + "_0");
			}
			

		}
		

	}
	
	invisFrames = function() {
		if (this.invincible) {
			if (this.invisFrameTick < 20) {
				this.visible = (this.invisFrameTick % 3 == 0);
			} else {
				this.visible = (this.invisFrameTick % 10 < 5);
			}
		}
		else {
			this.visible = true;
		}
	}
	
	process = function() {
		//console.log("player.process() called");
		this.costumePrefix = "";
		this.tick();
		this.invisFrames();
		this.healthProcess();
		this.keyInput();
		this.checkBounds();
		if (this.attack.active) {
			this.attack.process(this.x,this.y,this.xv,this.yv,this.currentCostume.name);
		}
	}
	
	die = function() {
		game.status = "gameOver";
	}
}

class PlayerAttack extends MovingSprite {
	constructor(x,y,xv,yv) {
		super();
		this.moveTo(x,y);
		this.setVel(xv,yv);
		this.setSize(8,32);
		
		
		this.active = false;
		this.visible = false;
		this.addCostume("empty",24,112,8,32);
		this.addAnimation("attack",32,112,8,32,5,3);
		this.setAnimation("attack");
	}
	
	activate = function() {

		this.active = true;
		this.visible = true;
		this.setAnimation("attack");
	}
	
	process = function(x,y,xv,yv,playerName) {
		this.moveTo(x,y);
		this.setVel(xv,yv);
		this.tick();
		
		if (playerName.includes("right")) {
			this.x += 16;
		} else {
			if (playerName.includes("left")) {
				this.x -= 16;
			}
		}
		
		if (this.currentFrame == 4 && this.frameTics >= 2) {
			this.active = false;
			this.visible = false;
		}
	}
};