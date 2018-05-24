class Game {
    constructor() {
        this.canvas = document.getElementById("game");
        this.context = this.canvas.getContext("2d");
        this.lastRefreshTime = Date.now();
        this.config = {cardWidth: 170, cardHeight: 255};
        this.debug = false;
        this.sprites = [];
        this.ui = [];
        
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        this.clickSfx = new SFX({
            context: this.audioContext,
            src: {mp3: "sfx/click.mp3", webm: "sfx/click.webm"},
            loop: false,
            volume: 0.3
        });
        
        this.errorSfx = new SFX({
            context: this.audioContext,
            src: {mp3: "sfx/boing.mp3", webm: "sfx/boing.webm"},
            loop: false,
            volume: 0.3
        });
        
        this.dealSfx = new SFX({
            context: this.audioContext,
            src: {mp3: "sfx/swish.mp3", webm: "sfx/swish.webm"},
            loop: false,
            volume: 0.3
        });
        
        this.completeSfx = new SFX({
            context: this.audioContext,
            src: {mp3: "sfx/gliss.mp3", webm: "sfx/gliss.webm"},
            loop: false,
            volume: 0.3
        });
        
        this.state = "loading";
        this.resize();
        
        const game = this;
        this.loadJSON("cards", function(data, game) {
            game.spriteData = JSON.parse(data);
            game.spriteImage = new Image();
            game.spriteImage.src = game.spriteData.meta.image;
            game.spriteImage.onload = function() {
                game.init();
                game.refresh();
                if(window.PointerEvents) {
                    game.canvas.addEventListener("pointerdown", function(event){game.tap(event);});
                    game.canvas.addEventListener("pointermove", function(event){game.move(event);});
                    game.canvas.addEventListener("pointerup", function(event){game.up(event);});
                } else if('ontouchstart' in window) {
                    game.canvas.addEventListener("touchstart", function(event){game.tap(event);});
                    game.canvas.addEventListener("touchstart", function(event){game.move(event);});
                    game.canvas.addEventListener("touchstart", function(event){game.up(event);});
                } else {
                    game.canvas.addEventListener("mousedown", function(event){game.tap(event);});
                    game.canvas.addEventListener("mousemove", function(event){game.move(event);});
                    game.canvas.addEventListener("mouseup", function(event){game.up(event);});
                }
            }
        })
    }

    loadJSON(json, callback) {
        const xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', json + '.json', true);
        const game = this;
        xobj.onreadystatechange = function() {
            if(xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText, game);
            }
        };
        xobj.send(null);
    }
    
    resize() {
        
    }
    
    get scale() {
        
    }
    
    shuffleDeck(suits) {
        
    }
    
    init() {
        
    }
    
    initGame(button) {
        
    }
    
    buildSpriteList() {
        
    }
    
    dealFromStack() {
        
    }
    
    checkForCompletedPile(pile) {
        
    }
    
    cardName(index) {
        
    }
    
    dumpCards(cards, prefix="", startIndex = 0, limit = -1) {
        
    }
    
    legalMove(pile, index) {
        
    }
    
    getNextCardCoordinates(col) {
        
    }
    
    emptyTableauPiles() {
        
    }
    
    legalDrop(card, dragInfo) {
        
    }
    
    insertArrayAt(array, index, arrayToInsert) {
        
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
    
    move(evt) {
        
    }
    
    up(evt) {
        
    }
    
}