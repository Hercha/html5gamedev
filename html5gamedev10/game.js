class Game {
    constructor() {
        
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