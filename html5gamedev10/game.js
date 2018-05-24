class Game {
    constructor() {
        this.canvas = document.getElementById("game");
        this.context = this.canvas.getContext("2d");
        this.lastRefreshTime = Date.now();
        this.config = {tilesize: 128};
        this.computer = {row: -1, col: -1};
        this.sprites = [];
        this.ui = [];
        
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        this.clickSfx = new SFX({
            context: this.audioContext,
            crc: {mp3: "sfx/click.mp3", webm: "sfx/click.webm"},
            loop: false,
            volume: 0.3
        });
        
        this.errorSfx = new SFX({
            context: this.audioContext,
            src: {mp3: "sfx/boing.mp3", webm: "sfx/boing.webm"},
            loop: false,
            volume: 0.3
        });
        
        this.state = "loading";
        this.resize();
        
        const game = this;
        this.loadJSON("reverse1", function(data, game) {
            game.spriteData = JSON.parse(data);
            game.spriteImage = new Image();
            game.spriteImage.src = game.spriteData.meta.image;
            game.spriteImage.onload = function() {
                game.init();
            }
            
        });
        
    }
    
    loadJSON(json, callback) {
        
    }
    
    resize() {
        
    }
    
    init() {
        
    }
    
    get padding() {
        
    }
    
    get cellsize() {
        
    }
    
    newtile(row, col, black = true) {
        
    }
    
    flipComplete(anim, animName) {
        
    }
    
    tileAt(row,col) {
        
    }
    
    checkTile(tile, black) {
        
    }
    
    boundaryCheck(row, col) {
        
    }
    
    checkLine(row, col, black, dirX, dirY) {
        
    }
    
    getFlips(row, col, black) {
        
    }
    
    checkPlayerMoves() {
        
    }
    
    computerMove() {
        
    }
    
    legalMove(row, col, black = true) {
        
    }
    
    newGame() {
        
    }
    
    refresh() {
        
    }
    
    update(dt) {
        
    }
    
    render() {
        
    }
    
    getMousePos(evt) {
        
    }
    
    tap(evt) {
        
    }
}

class Board {
    constructor(tiles) {
        
    }
    
    tileAt(row, col) {
        
    }
    
    checkTile(tile, black) {
        
    }
    
    boundaryCheck(row, col) {
        
    }
    
    checkLine(row, col, black, dirX, dirY) {
        
    }
    
    getFlips(row, col, black) {
        
    }
    
    insertTile(row, col, black = true) {
        
    }
    
    legalMove(row, col, black = true) {
        
    }
    
    cellWeight(row, col) {
        
    }
    
    get score () {
        
    }
}

class Tile {
    constructor(row, col, black) {
        
    }
    
    toString() {
        
    }
}