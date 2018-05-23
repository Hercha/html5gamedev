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
        
    }
    
    assetsLoaded() {
        
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