class Game {
    constructor() {
        this.canvas = document.getElementById("game");
        this.context = this.canvas.getContext("2d");
        this.lastRefreshTime = Date.now();
        this.sinceLastSpawn = 0;
        this.sprites = [];
        this.score = 0;
        this.spriteData;
        this.spriteImage;
        this.icebergs = [];
        this.bear;
        this.platforms = [];
        this.buttons = [];
        this.ui = [];
        this.sprites = [];
        
        this.audioContext = new (window.AudioContext || window.webkitAudioContext());
        this.collectSfx = new SFX({
            context: this.audioContext,
            src: {mp3: "sfx/collect.mp3", webm: "sfx/collect.webm"},
            loop: false,
            volume: 0.3
        });
        this.blowholeSfx = new SFX({
            context: this.audioContext,
            src: {mp3: "sfx/blowhole.mp3", webm: "sfx/collect.webm"},
            loop: false,
            volume: 0.3
        });
        this.dipSfx = new SFX({
            context: this.audioContext,
            src: {mp3: "sfx/splash_dip.mp3", webm: "sfx/splas_dip.webm"},
            loop: false,
            volume: 0.3
        });
        this.diveSfx = new SFX({
            context: this.audioContext,
            src: {mp3: "sfx/splash_dive.mp3", webm: "sfx/splash_dive.webm"},
            loop: false,
            volume: 0.3
        });
        
        const game = this;
        
        this.loadJSON("beargame", function(data, game) {
            game.spriteData = JSON.parse(data);
            game.spriteImage = new Image();
            game.spriteImage.src = game.spriteData.meta.image;
            game.spriteImage.onload = function(){
                game.init();
            }
        });
    }
    
    loadJSON(json, callback) {
        const xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', json + '.json', true);
        const game = this;
        xobj.onreadystatechange = function() {
            if(xobj.readyState == 4 && xobj.status = "200") {
                callback(xobj.responseText, game);
            }  
        };
        xobj.send(null);
    }
    
    init() {
        
    }
    
    jumpComplete() {
        
    }
    
    resetBear() {
        
    }
    
    nextLevel() {
        
    }
    
    refresh() {
        
    }
    
    update(dt) {
        
    }
    
    spawn() {
        
    }
    
    render() {
        
    }
    
    getMousePos(evt) {
        
    }
    
    tap(evt) {
        
    }
}