class Sprite { //an assumption this class makes is that all costumes will be the same size. This may backfire eventually...
	x = 0;
	y = 0;
	speed = 0; //increment for x and y velocities
	xv = 0; //real velocity
	yv = 0;
	width = 16;
	height = 16;
	direction = 0;
	size = 1; //scale factor of an object
	show = true;
	currentFrame = 0;
	frameTics = 0;
	flipsHorizontally = false; //if true, moving left sets flip to true
	flip = false;
	costumes = []; //loose costumes- static frames, idle poses, etc. not animations!!
	currentCostume = new Costume("",this.x,this.y,this.width,this.height);
	animationActive = -1;
	canLeaveScreen = false;
	animations = [];
	hitbox = {"tly":this.y,"w":this.width,"h":this.height}; //used so that the player's head can peep in front of walls sometimes
	
	constructor() {
		
	}
	
	turnRight = function(degrees) {
		this.direction += degrees;
	};
	
	moveTo = function(newX,newY) {
		this.x = newX;
		this.y = newY;
	};
	
	setSize = function(w,h) {
		this.width = w;
		this.height = h;
	}
	
	setDir = function(newDeg) {
		this.direction = newDeg;
	};
	
	draw = function() {
		this.flip = (this.xv < 0 && this.flipsHorizontally);
		if (this.animationActive == -1) {
			drawImgFromAtlas(this.currentCostume.name,this.currentCostume.sx,this.currentCostume.sy,this.width,this.height,this.x,this.y,this.width * this.size,this.height * this.size,this.flip);
		} else {
			drawImgFromAtlas(this.currentCostume.name,this.currentCostume.sx,this.currentCostume.sy,this.width,this.height,this.x,this.y,this.width * this.size,this.height * this.size,this.flip);
		}
	};

	
	addCostume = function(name,sx,sy,w,h) {
		if (arguments.length == 3)
		{
			w = this.width;
			h = this.height;
		}
		this.costumes.push(new Costume(name,sx,sy,w,h));
	}
	
	addAnimation = function(name,tlx,tly,width,height,numOfFrames,frameDuration) { //frames are assumed to be left to right, horizontally
		let frames = [];
		for (let i = 0; i < numOfFrames; i++) {
			//onsole.log("frameDuration = " + frameDuration);
			frames.push(new AnimationFrame((name + "_" + i),(tlx + (i * width)),tly,width,height,frameDuration));
		}
		let anim = new Animation(name,frames);
		this.animations.push(anim);
	}
	
	setCurrentCostume = function(name) {
		if (this.animationActive == -1)
		{
			//this.currentCostume.name = name;
			for (let i = 0; i < this.costumes.length; i++) {
				if (name == this.costumes[i].name) {
					this.currentCostume = this.costumes[i];					
					return;
				}
			}
		}
		else
		{
			//let i = this.animationActive;
			//for (let i = 0; i < this.animations.length; i++) {
				//if (name == this.animations[i].name) {
					this.currentCostume = this.animations[this.animationActive].frames[this.currentFrame].getCostume();	
					//console.log("currentCostume: " + this.currentCostume);
					return;
				//}
			//}
		}
	}
	
	setAnimation = function(name) {
		
		for (let i = 0; i < this.animations.length; i++) {
			if (this.animations[i].name == name) {
				this.animationActive = i;	
				this.frameTics = 0;
				this.currentFrame = 0;
				this.setCurrentCostume();
				//console.log("animation set to " + name);
				return;
			}
		}
	}
	
	deleteAllAnimations = function() {
		this.animations = [];
	}
	
	animationProcess = function() {
		if (this.animationActive != -1) {
			let dur = this.animations[this.animationActive].frames[this.currentFrame].duration;
			//console.log("frameTics = " + this.frameTics + ", currentFrame = " + this.currentFrame, ", length of animation = " + this.animations[this.animationActive].frames.length);
			if (dur <= this.frameTics) { //if time to go to next frame of animation...
				//this.setCurrentCostume();
				this.currentFrame++;
				this.frameTics = 0; //set tics to 0
				if (this.animations[this.animationActive].frames.length == this.currentFrame) { //if reached end of animation...
					this.currentFrame = 0; //...go back to the beginning
					
				}
				else {
					//this.currentFrame++;
				}
				this.setCurrentCostume();
			}
			else {
				this.frameTics++;
			}
		}
	}
	
	tick = function() { //use super() to call this method in any subclasses of Sprite - contains all frame-to-frame processes necessary
		this.animationProcess();
	}
	
	isTouching = function(other) {
		return (
			this.x < other.x + other.width &&
			this.x + this.width > other.x &&
			this.y < other.y + other.height &&
			this.y + this.height > other.y
		);
	}
}

class MovingSprite extends Sprite {
	constructor() {
		super();
		this.hp = 3;
		this.maxhp = 3;
		this.invincible = false;
		this.invisFrameTick = 0;
	}
	
	// HEALTH CODE //////////////////////////////////////
	setHP = function(hp,max) {
		this.hp = hp;
		this.maxhp = max;
	}
	
	die = function() {
		
	}
	takeDamage = function(howMuch) {
		if (!this.invincible) {
			this.hp -= howMuch;
			if (this.hp <= 0) {
				//DEAD
				this.die();
				return;
			}
			else {
				invincible = true;
				invisFrameTick = 45; //how many frames you're invincible after taking damage. 45 / 30fps = 1.5 seconds.
			}
		}
	}
	
	healthProcess = function() {
		if (this.invincible) {
			if (this.invisFrameTick == 0) {
				this.invincible = false;
			} else {
				this.invisFrameTick--;
			}
		}
	}
	
	
	// MOVEMENT CODE ////////////////////////////////////
	moveSteps = function(stepCount) {
		this.x += Math.cos(this.direction);
		this.y += Math.sin(this.direction);
	};
	
	moveSteps = function(degrees) {
		this.direction -= degrees;
	};
	

	setVel = function(newXV,newYV) {
		this.xv = newXV;
		this.yv = newYV;
	};
	
	checkBounds = function() {
		if (!this.canLeaveScreen) {
			if (this.x < 0) {
				this.x = 0;
			}
			if (this.x + this.width > canvas.width) {
				this.x = game.window.width - this.width;
			}
			if (this.y < game.window.tly) {
				this.y = game.window.tly;
			}
			if (this.y + this.height > canvas.height) {
				this.y = game.window.bottom - this.height;
			}
		}
	};
	
	process = function() {
		this.super.process();
	}
}