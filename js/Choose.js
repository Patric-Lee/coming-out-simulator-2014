var $ = {};

var timer = 0;
var TIMER_GAP = 100;
function getDuration(message){
	// Approx 6 words per second, or 160ms per word. Plus 1000ms just in case.
	return 100;
	//return 1000 + message.split(" ").length*160;
}

function Character(character){
	return function(message){
		timer += TIMER_GAP;
		setTimeout(function(){
			publish("/say", [character, message]);
		},timer);
		timer += getDuration(message);
	};
}

function Choose(choices){
	timer += TIMER_GAP;
	setTimeout(function(){
		publish("/choose", [choices]);
		timer = 0;
	},timer);
};

function Scene(image){
	publish("/scene", [image]);
}

window.onload = function(){
	Start();
}