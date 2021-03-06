// See the README! Licensed under MIT. Endorsed by raptors!

var width = $(window).width() - 20;
var height = $(window).height() - 20;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', {
    preload: preload, create: create, update: update
});

var startState;
var playState;
var scoreState;

var currentState;

var backgroundColorValue = 0xff0000;

function preload() {
    startState = new StartState(game);
    playState = new PlayState(game);
	scoreState = new ScoreState(game);
}

function create() {
    currentState = startState;
	currentState.enable();
}

function update() {
    var oldState = currentState;
    switch (currentState.tick()) {
        case "STARTSTATE":
            currentState = startState;
            break;
        case "PLAYSTATE":
            currentState = playState;
            break;
		case "SCORESTATE":
            currentState = scoreState;
            break;
    }
    if (oldState != currentState) {
        oldState.disable();
        currentState.enable();
    }
}

function updateBackgroundColor() {
    switch (this.backgroundColorValue) {
        case 0xff0000:              // red
            this.incrementer = 0x100;    // approaches yellow
            break;
        case 0xffff00:              // yellow
            this.incrementer = -65536;   // -0x100000, approaches green
            break;
        case 0x00ff00:              // green
            this.incrementer = 0x1;      // approaches cyan
            break;
        case 0x00ffff:              // cyan
            this.incrementer = -256;     // approaches blue
            break;
        case 0x0000ff:              // blue
            this.incrementer = 0x010000; // approaches purple
            break;
        case 0xff00ff:              // purple
            this.incrementer = -1;       // approaches red
            break;
    }

    this.backgroundColorValue += this.incrementer;
    this.game.stage.backgroundColor = this.backgroundColorValue; // updates background
}
