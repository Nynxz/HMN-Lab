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
        this.type = type;
        this.createTile(posx, posy);
    }

    createTile(posx, posy){
        this.sprite = createSprite((posx) * GameManager.tileSize + (GameManager.tileSize/2), (posy) * GameManager.tileSize + (GameManager.tileSize/2));
        
        switch(this.type){
            case '0':
                this.sprite.addImage(Images.trackGrassImage);
                break;

            case '1':
                this.sprite.addImage(Images.trackRoadImage);
                break;
        }
    }
}

