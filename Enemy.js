class Enemy extends MovingSprite {
	constructor() {
		super();
		this.type = "enemy";
		this.setHitbox(0,0,this.width,this.height);
		this.addAnimation("enemy_death",0,496,16,16,10,2);
	}
	
	die = function() {
		this.setHitbox(0,0,0,0);
		console.log("died in Enemy.js");
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
		this.speed = 4;
		this.deleteAllAnimations();
		this.addAnimation("jump_left",0,416,24,18,5,2);
		this.addAnimation("jump_right",0,434,24,18,5,2);
	}
}














