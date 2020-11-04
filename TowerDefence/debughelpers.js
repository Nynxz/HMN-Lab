class DebugHelpers{

    static isShowingButtons = false;
    static buttons = [];
    static toggleButtons(){
        if(!DebugHelpers.isShowingButtons){
            let buttonRegenMap = createButton('Regen Floor');
            buttonRegenMap.position(25,25);
            buttonRegenMap.mousePressed(() => {
                Map._generateFloorTiles();
            })
            DebugHelpers.buttons.push(buttonRegenMap);
            DebugHelpers.isShowingButtons = true;
        } else {
            buttons = [];
            DebugHelpers.isShowingButtons = true;
        }
    }
}