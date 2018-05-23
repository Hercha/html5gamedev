class Game {
    constructor(index) {
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext("2d");
        const game = this;
        const options = {
            assets: [
                "background.jpg",
                "bits.json",
                "bits.png",
                "xbloke.json",
                "xbloke.png"
            ],
            oncomplete: function() {
                const progress = document.getElementById('progress');
                progress.style.display = "none";
                game.load();
            },
            onprogress: function(value) {
                const bar = document.getElementById('progress-bar');
                bar.style.width = `${value * 100}%`;
            }
        }
        
        const preloader = new Preloader(options);
    }
    
    load() {
        this.assets = {xbloke: false, background: false, bits: false};
        const game = this;
        
        this.loadJSON("xbloke", function(data) {
            game.spriteData = JSON.parse(data);
            let imageSrc = game.spriteData.meta.image;
            game.spriteImage = new Image();
            game.spriteImage.onload = function() {
                game.assets.xbloke = true;
                if(game.assesLoaded()) {
                    game.init();
                }
            }
            game.spriteImage.src = imageSrc;
        });
        this.loadJSON("bits", function(data) {
            game.bitsData = JSON.parse(data);
            let imageSrc = game.bitsData.meta.image;
            game.bitsImage = new Image();
            game.bitsImage.onload = function() {
                game.assets.bits = true;
                if(game.assetsLoaded()) {
                    game.init();
                }
            }
            game.bitsImage.src = imageSrc;
        });
        this.background = new Image();
        this.background.onload = function() {
            game.assets.background = true;
            if(game.assetsLoaded()) {
                game.init();
            }
        }
        game.background.src = "background.jpg";
    }
    
    assetsLoaded() {
        for(let prop in this.assets) {
            if(!this.assets[prop]) {
                return false;
            }
        }
        return true;
    }
    
    // Loads the sprite data json file
    loadJSON(fileName, callback) {
        
    }
    
    // Called after the spritesheet is loaded to initialize the actors and their initial action
    init() {
        
    }
    
    getMousePos(evt) {
        
    }
    
    mousedown(evt) {
        
    }
    
    mousemove(evt) {
        
    }
    
    mouseup(evt) {
        
    }
    
    animNamed(name) {
        
    }
    
    setAction(spriteName, animName, flipped) {
        
    }
    
    checkFloor() {
        
    }
    
    // Triggers an update and render
    refresh() {
        
    }
    
    drawPlatforms() {
        
    }
    
    drawDiamonds() {
        
    }
    
    checkDiamonds() {
        
    }
    
    constrainBackground() {
        
    }
    
    // Update the actors
    update(dt) {
        
    }
    
    // Renders all actors
    render() {
        
    }
    
}