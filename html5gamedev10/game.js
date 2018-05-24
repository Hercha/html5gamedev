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
        const xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', json + '.json', true);
        const game = this;
        xobj.onreadystatechange = function (){
            if(xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText, game):
            }
        };
        xobj.send(null);
    }
    
    resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspect = 1.1;
        
        if(width/height > aspect) {
            // Use height as cell size
            this.canvas.width = width;
            this.canvas.height = height;
        } else {
            // Use width for cell size
            this.canvas.width = width;
            this.canvas.height = height;
        }
        
        const cellsize = this.canvas.height/8;
        let scale = cellsize/this.config.tilesize;
        
        for(let sprite of this.sprites) {
            sprite.x = sprite.col * cellsize/2;
            sprite.y = sprite.row * cellsize/2;
            sprite.scale = scale;
        }
        
        const x = this.canvas.width - (this.canvas.width - cellsize*8)/2;
        scale /= 1.5;
        
        let i = 0;
        for(let sprite of this.ui) {
            sprite.x = x;
            sprite.y = cellsize/2 + i * cellsize;
            sprite.scale = scale;
            i++;
        }
        
        this.update();
        this.render();
    }
    
    init() {
       const cellsize = this.canvas.height/8;
        let scale = cellsize/this.config.tilesize;
        
        const x = this.canvas.width - (this.canvas.width - cellsize*8)/2;
        scale /= 1.5;
        
        const options = {
            game: this,
            frame: "tile_{03}.png",
            index: 10,
            x: x,
            y: cellsize/2,
            scale: scale
        }
        this.ui.push(new Sprite("white", options));
        options.index = 1;
        options.y = cellsize/2 + cellsize;
        this.ui.push(new Sprite("black", options));
        
        const gamne = this;
        
        if('ontouchstart' in window) {
            this.canvas.addEventListener("touchstart", function(event) {
               game.tap(event); 
            });
        } else {
            this.canvas.addEventListener("mousedown", function(event) {
               game.tap(event); 
            });
        }
        
        this.state = "player";
        
        this.refresh();
    }
    
    get padding() {
        return this.canvas.height/50;
    }
    
    get cellsize() {
        return (this.canvas.height - this.padding*2)/8;
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