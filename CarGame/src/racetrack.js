let debugTrackArray = [
    ["0000000000"],
    ["0000000000"],
    ["0000000000"],
    ["0000010000"],
    ["0000010000"],
    ["0000010000"],
    ["0000000000"],
    ["0000000000"],
    ["0000000000"],
    ["0000000000"],
];

class RaceTrack{
    constructor(mapArray){
        this.rawMap = mapArray;
        
        this.loadedMap;

        this.roadIMG = Images.trackRoadImage;
        this.grassIMG = Images.trackGrassImage;
    }

    static loadMap(){
        this.loadedMap = this.rawMap.map(row => row.split('').map(tile => tile.turnIntoTile()))
    }
}

