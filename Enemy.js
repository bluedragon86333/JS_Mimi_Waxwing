class Enemy extends MovingSprite {
	constructor() {
		super();
		this.type = "enemy";
		this.setHitbox(0,0,this.width,this.height);
		this.addAnimation("enemy_death",0,496,16,16,10,2);
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
	
	die = function() {
		this.setHitbox(0,0,0,0);
		console.log("enemy died in Enemy.js");
		if (this.currentCostume.name.includes("death")) {
			if (this.currentFrame >= 10 && this.frameTics >= 1) {
				this.visible = false;
			}
		} else {
			this.setAnimation("enemy_death");
		}
	}
}


class JumpingKaidi extends Enemy {
	constructor(x,y) {
		super();
		this.setSize(16,12);
		this.setHitbox(0,0,this.width,this.height);
		this.setHP(1,1);
		this.moveTo(x,y);
		this.heading = -1; //left
		this.speed = 2;
		this.addAnimation("jump_left",0,388,16,12,5,2);
		this.addAnimation("jump_right",0,404,16,12,5,2);
		this.addCostume("stand_left",0,388,16,12);
		this.addCostume("stand_right",0,404,16,12);
		this.setAnimation("jump_left");
	}
	
	changeDirection = function() {
		if (this.heading == -1 && this.x <=2) {
			this.heading = 1;
			this.setAnimation("jump_right");
		} else if (this.heading == 1 && this.x > game.window.width - 2 - this.width) {
			this.heading = -1;
			this.setAnimation("jump_left");
		}
	}
	
	reachedEdge = function() {
		this.heading *= -1;
		if (this.heading == 1) {
			this.setAnimation("jump_right");
		} else {
			this.setAnimation("jump_left");
		}
	}
	
	process = function() {
		this.tick();
		this.yv = 0;
		if ((this.animations[this.animationActive].name.includes("jump")) && (this.currentFrame == 2 || this.currentFrame == 3)) {
			this.xv = this.speed * this.heading;
		} else {
			this.xv = 0;
		}
		
		this.changeDirection();
		this.moveByVel();
	}
	

}

class BigJumpingKaidi extends JumpingKaidi {
	constructor(x,y) {
		super(x,y);
		this.setSize(24,18);
		this.setHitbox(0,0,24,18);
		this.speed = 4;
		this.setHP(2,2);
		this.deleteAllAnimations();
		this.addAnimation("jump_left",0,416,24,18,5,2);
		this.addAnimation("jump_right",0,434,24,18,5,2);
		this.addAnimation("enemy_death",0,472,24,24,10,2);
		this.setAnimation("jump_left");
		
		this.visible = true;
		this.invincible = false;
		
	}
	
	

	
	process = function() {
		this.tick();
		this.yv = 0;
		if ((this.animations[this.animationActive].name.includes("jump")) && (this.currentFrame == 2 || this.currentFrame == 3)) {
			this.xv = this.speed * this.heading;
		} else {
			this.xv = 0;
		}
		
		this.changeDirection();
		this.moveByVel();
		
		this.invisFrames();
		this.healthProcess();
		
		if (this.currentCostume.name.includes("death")) {
			this.setSize(24,24);
		}
	}
}














