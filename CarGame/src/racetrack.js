let debugTrackArray = [
    "0000000000",
    "0000000000",
    "0000000000",
    "0000010000",
    "0000010000",
    "0000010000",
    "0000000000",
    "0000000000",
    "0000000000",
    "0000000000",
];

class RaceTrack{
    constructor(mapArray){
        this.rawMap = mapArray;
        
        this.loadedMap;

        this.roadIMG = Images.trackRoadImage;
        this.grassIMG = Images.trackGrassImage;
    }

    loadMap(){
        this.loadedMap = this.rawMap.map((row,y) => split(row, '').map((tile,x) => RaceTrack.turnIntoTile(tile, x, y)));
    }
    static turnIntoTile(tile, posx, posy){
        return new TrackTile(tile, posx, posy);
    }
}


//Group Track
class TrackTile{
    //GameManager.tileSize
    constructor(type, posx, posy){
        this.createTile(posx, posy);
    }

    createTile(posx, posy){
        this.sprite = createSprite((posx + 1) * GameManager.tileSize, (posy + 1) * GameManager.tileSize);
        this.sprite.addImage(Images.trackGrassImage);
    }
}

