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
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', fileName + '.json', true);
        xobj.onreadystatechange = function() {
            if(xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simple returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }
    
    // Called after the spritesheet is loaded to initialize the actors and their initial action
    init() {
        this.position = {x: 0, y: -120, width: this.canvas.width};
        
        let options = {
            context: this.context,
            image: this.spriteImage,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2 +230,
            canvasOffset: this.position
        };
        this.xbloke = new AnimSprite('xbloke', options);
        
        const game = this;
        this.anims = [];
        this.anims.push(new Anim("walk", {frameData:this.spriteData.frames, frames:[9,"..",25], motion:{x:150, y:0}}));
        this.anims.push(new Anim("run", {frameData:this.spriteData.frames, frames:[9,"..2",25], motion:{x:250, y:0}}));
        this.anims.push(new Anim("jump", {frameData:this.spriteData.frames, frames:[41,"..",58], motion:{x:100, easing:{type:"outQuad", change:-150, duration:18/30}}, loop:false, oncomplete:function(){
            game.setAction("xbloke", "drop");
        }}));
        this.anims.push(new Anim("drop", {frameData:this.spriteData.frames, frames:[59,"..",73], motion:{x:150, easing:{type:"intQuad", change:150, duration:18/30}}, loop:false, oncomplete:function(){
            game.checkFloor();
        }}));
        this.anims.push(new Anim("land", {frameData:this.spriteData.frames, frames:[74,"..",87], loop:false, oncomplete:function(){
            if(game.mouseData != null && game.mouseData.down) {
                game.setAction("xbloke", "walk");
            } else {
                game.setAction("xbloke", "landrest");
            }
        }}));
        this.anims.push(new Anim("landrest", {frameData:this.spriteData.frames, frames:[88,"..",100], loop:false, oncomplete:function(){
            game.setAction("xbloke", "ambient");
        }}));
        this.anims.push(new Anim("ambient", {frameData:this.spriteData.frames, frames:[101,"..",575]}));
        this.anims.push(new Anim("kick", {frameData:this.spriteData.frames, frames:[580,"..",605], motion:{x:50, easing:{type:"projektile", change:-30, duration:25/30}}, loop:false, oncomplete:function(){
            game.checkFloor();
            game.setAction("xbloke", "ambient");
        }}));
        this.anims.push(new Anim("lookback", {frameData:this.spriteData.frames, frames:[606,"..",675], loop:false, oncomplete:function(){
            game.setAction("xbloke", "ambient");
        }}));
        this.anims.push(new Anim("lookforward", {frameData:this.spriteData.frames, frames:[680,"..",759], loop:false, oncomplete:function(){
            game.setAction("xbloke", "ambient");
        }}));
        this.anims.push(new Anim("dance", {frameData:this.spriteData.frames, frames:[762,"..",880]}));
        
        this.xbloke.anim = this.setAction("xbloke", "ambient");
        
        this.lastTime = Date.now();
        
        this.refresh();
        
        if('ontouchstart' in window) {
            this.canvas.addEventListener('touchstart', down);
            this.canvas.addEventListener('touchmove', move);
            document.addEventListener('touchend', up);
        } else {
            this.canvas.addEventListener('mousedown', down);
            this.canvas.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
        }
        
        function down(evt) {
            game.mousedown(evt);
        }
        
        function move(evt) {
            game.mousemove(evt);
        }
        
        function up(evt) {
            game.mouseup(evt);
        }
        
    }
    
    getMousePos(evt) {
        let clientX = evt.targetTouches ? evt.targetTouches[0].pageX : evt.pageX;
		let clientY = evt.targetTouches ? evt.targetTouches[0].pageY : evt.pageY;
        return new Vertex(clientX - this.canvas.offsetLeft, clientY - this.canvas.offsetTop);
    }
    
    mousedown(evt) {
        evt.preventDefault();
        let mousePos = this.getMousePos(evt);
        let mouseData = {down:true, clickPosition:mousePos, swipePosition:new Vertex(mousePos.x, mousePos.y), clickTime: Date.now()};
        let flipped = mousePos.x < this.canvas.width * 0.3;
        let actionSet = false;
        
        if(this.mouseData != null) {
            let elapsedTime = mouseData.clickTime - this.mouseData.clickTime;
            if(elapsedTime < 500) {
                // Double click
                if(this.xbloke.onground) {
                    if(mousPos.y > this.canvas.height / 2) {
                        this.setAction("xbloke", "kick", flipped);
                    } else {
                        this.setAction("xbloke", "jump", flipped);
                    }
                    actionSet = true;
                }
            }
        }
        
        if(!actionSet && this.xbloke.onground) {
            if(flipped) {
                this.setAction("xbloke", "walk", flipped);
            } else if (mousePos.x > this.canvas.width * 0.7) {
                this.setAction("xbloke", "walk", flipped);
            }
        }
        
        this.mouseData = mouseData;
    }
    
    mousemove(evt) {
        evt.preventDefault();
        
        let mousePos = this.getMousePos(evt);
        
        if(this.mouseData != null) {
            if(this.mouseData.down && this.xbloke.onground && (this.mouseData.swipePosition.y - mousePos.y) > 100) {
                this.mouseData.swipePosition.y = mousePos.y;
                this.setAction("xbloke", "jump", this.xbloke.flipped);
            } else if(mousePos.y > this.mouseData.swipePosition.y) {
                this.mouseData.swipePosition.y = mousePos.y;
            }
        }
    }
    
    mouseup(evt) {
        evt.preventDefault();
        
        this.mouseData.down = false;
        
        if(this.xbloke.onground) {
            let anim;
            if(this.xbloke.animName == "run") {
                anim = new Anim("slowdown", {frameData:this.spriteData.frames, frames:[9, "..2",25], motion: {x:150, y:0}});
                this.xbloke.anim = anim;
            } else if(this.xbloke.animName == "walk") {
                anim = new Anim("slowdown", {frameData:this.spriteData.frames, frames:[9, "..",25], motion: {x:50, y:0}});
                this.xbloke.anim = anim;
            } else {
                this.setAction("xbloke", "ambient", this.xbloke.flipped);
            }
        }
    }
    
    animNamed(name) {
        for(let i = 0;i < this.anims.length; i++) {
            if(this.anims[i].name == name) {
                return this.anims[i];
            }
        }
        return null;
    }
    
    setAction(spriteName, animName, flipped) {
        let anim = this.animNamed(animName);
        anim.reset();
        anim.y = this[spriteName].y;
        this.[spriteName].anim = anim;
        if(flipped != null) {
            this[spriteName].flipped = flipped;
            if(spriteName == "xbloke") {
                switch(animName) {
                    case "walk":
                    case "land":
                    case "landrest":
                    case "ambient":
                    case "dance":
                    case "run":
                    case "lookback":
                    case "lookforward":
                        this.xbloke.onground = true;
                        break;
                    default:
                        this.xbloke.onground = false;
                }
            }
            return anim;
        }
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