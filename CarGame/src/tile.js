//Test Extension Class - dont worry about this

class Tile {

    static Tiles = [];

    constructor(x, y){
        this.sprite = createSprite(x, y);
        this.sprite.life = 500;
        Tile.Tiles.push(this);
        
    }

    changeTile(img){
        this.sprite.addImage(img);
    }

    shrink(){
        this.sprite.scale = constrain(this.sprite.scale-=.001, 0, 1);
    }

    static spawnTileAtMouseDEBUG(){
        console.log(Tile.Tiles.length)
        testAs().then(console.log);
        let randx = random(-100, 100);
        let randy = random(-100, 100);
        let tile = new Tile(mouseX + randx, mouseY + randy);
        tile.changeTile(Images.DEBUGBLOCK);
        tile.sprite.depth = tile.sprite.position.y;
    }

    
    static Refresh(){
        Tile.Tiles = Tile.Tiles.filter(e => e.sprite.life > 0);
        Tile.Tiles.forEach(e => e.shrink());
    }
}

let testAs = async () => {return "Test Async"};


