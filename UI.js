class UIHandler {
	init = function() {
		addAtlas("icon_carrot",504,48,8,8);
	}
	
	draw = function () {
		drawer.fillRect(0,0,screen.width,32,"black");
		document.getElementById("coinCounter").innerHTML = "Coins: " + saveFile.coins;
		drawImgFromAtlas("icon_carrot",4,4);
		
		text.print("x" + saveFile.carrots,12,5,false,"white4x6");
	}
}

var UI = new UIHandler();