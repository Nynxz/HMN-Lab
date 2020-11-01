//Test Extension Class - dont worry about this

class Tile {
    constructor(x, y){
        this.sprite = createSprite(x, y);
    }

    changeTile(img){
        this.sprite.addImage(img);
    }

    static spawnTileAtMouseDEBUG(){
        let tile = new Tile(mouseX, mouseY);
        tile.changeTile(Images.DEBUGBLOCK);
        tile.sprite.depth = tile.sprite.position.y;
    }
}

