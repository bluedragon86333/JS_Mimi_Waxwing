class Hearts {
	constructor(hp,max,tlx,tly) {
		this.hearts = hp;
		this.maxHearts = max;
		this.x = tlx;
		this.y = tly;
		addAtlas("heart_full",480,48,8,8);
		addAtlas("heart_half",488,48,8,8);
		addAtlas("heart_empty",496,48,8,8);
	}
	
	setHealth = function(value,max) {
		this.hearts = value;
		this.maxHearts = max;
	}
	
	draw = function() {
		for (let i = 0; i < this.maxHearts; i++) {
			let name = "";
			if (i < Math.floor(this.hearts)) {
				name = "full";
			} else if (i == Math.floor(this.hearts) && this.hearts % 1 == .5) {
				name = "half";
			}
			else {
				name = "empty";
			}
			drawImgFromAtlas("heart_" + name,this.x + i * 8, this.y);
		}
	}
}

class UIHandler {
	init = function() {
		addAtlas("icon_carrot",504,48,8,8);
		this.heartHandler = new Hearts(player.hp,player.maxhp,4,4);
	}
	
	draw = function () {
		drawer.fillRect(0,0,screen.width,32,"black");
		//document.getElementById("coinCounter").innerHTML = "Coins: " + saveFile.coins;
		drawImgFromAtlas("icon_carrot",4,12);
		
		this.heartHandler.setHealth(player.hp,player.maxhp);
		this.heartHandler.draw();
		
		text.print("x" + saveFile.carrots,12,13,false,"white4x6");
	}
}

var UI = new UIHandler();