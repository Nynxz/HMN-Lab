//This is where we will be able to choose how to spend our resources to place traps, walls, etc
class Shop{

    static ShopTab;
    static isShopTabOpen = false;
    static ShopButtons = [];

    static currentShopSelection;
    static currentShopSelectionCost;

    static initShop(){
        Shop.ShopButtons = [];
        Shop.isShopTabOpen = false;
        Shop.currentShopSelection = null;
        Shop.currentShopSelectionCost = null;
        Shop.drawGrid();
        let padding = 25
        Shop.ShopTab = createSprite(175 + padding, height+100);
        Shop.ShopTab.addToGroup(LayerManager.Layers.HUDGroup);
        Shop.ShopTab.addImage(Images.Shop.ShopTabLeft);
        Shop.ShopTab.scale = .5;
        let movementDifference = 200;
        Shop.ShopTab.setCollider("rectangle", 0, -125, Shop.ShopTab.width, 100);
        Shop.ShopTab.onMouseReleased = () => {
            if(Shop.isShopTabOpen){
                Shop.ShopTab.position.y += movementDifference;
                Shop.isShopTabOpen = false;
                Shop.ShopButtons.forEach((button,x) => {
                    button.sprite.position.y += movementDifference;
                });
                Shop.currentShopSelection = null;
                Shop.currentShopSelectionCost = null;
                LayerManager.Layers.Grid.isEnabled = false;
            } else {
                Shop.ShopTab.position.y -= movementDifference;
                Shop.isShopTabOpen = true;
                Shop.ShopButtons.forEach((button,x) => {
                    button.sprite.position.y -= movementDifference;
                });
                LayerManager.Layers.Grid.isEnabled = true;
                
            }
        }
        Shop.ShopTab.debug = true;

        Shop.initShopButtons();
    }

    static checkResource(_resource, _amount){
        let currentlyValid = true;
        for(let i = 0; i < _resource.length; i++){
            switch(_resource[i]){
                case 'wood':
                    if(!(GameManager.resources.Wood >= _amount[i]))
                        currentlyValid = false;
                        break;
                case 'iron':
                    if(!(GameManager.resources.Iron >= _amount[i]))
                        currentlyValid = false;
                        break;
            }
        }
        
       return currentlyValid;
    }

    static removeResource(_resource, _amount){
        for(let i = 0; i < _resource.length; i++){
            switch(_resource[i]){
                case 'wood':
                    GameManager.resources.Wood -= _amount[i]
                    break;
                case 'iron':
                    GameManager.resources.Iron -= _amount[i]
                    break;
            }
        }
    }

    static initShopButtons(){
        new ShopButton(Images.Shop.ShopButtonBarricade, new RawTile(RawTile.Type.Barricade), ["wood"], [10]);
        
        
        new ShopButton(Images.Shop.ShopButtonSpikes, new RawTile(RawTile.Type.Spike), ["iron"], [10]);

        new ShopButton(Images.Shop.ShopButtonTurret1, new RawTile(RawTile.Type.Turret) , ["iron", "wood"], [10, 5]);

        new ShopButton(Images.Shop.ShopButtonBarricade, "item", "cost");
        new ShopButton(Images.Shop.ShopButtonBarricade, "item", "cost");
        new ShopButton(Images.Shop.ShopButtonBarricade, "item", "cost");
        new ShopButton(Images.Shop.ShopButtonBarricade, "item", "cost");
        new ShopButton(Images.Shop.ShopButtonBarricade, "item", "cost");

        let y = 0, x = 0;
        Shop.ShopButtons.forEach((button) => {
            button.sprite.position.x = ((x+1) * 75) + 15; 
            button.sprite.position.y = ((y+1) * 75) + height;
            if(x > 2){
                y++;
                x = 0;
            } else {
                x++;
            } 
        });
    }

    static refreshShopSelection(){
        if(Shop.currentShopSelection){
            if(Shop.currentShopSelection.info instanceof RawTurret){
                LayerManager.Layers.HUDLayer.imageMode(CENTER);
                LayerManager.Layers.HUDLayer.image(eval(Shop.currentShopSelection.info.image), mouseX, mouseY, Map.tileSize*6, Map.tileSize*6);
            }else {
                LayerManager.Layers.HUDLayer.imageMode(CENTER);
                LayerManager.Layers.HUDLayer.image(eval(Shop.currentShopSelection.info.image), mouseX, mouseY, Map.tileSize, Map.tileSize);
            }

            
            if(mouseWentUp(LEFT) && DebugHelpers.checkForSpriteAtMouse()){
                console.log(DebugHelpers.checkForSpriteAtMouse())
                console.log("PAINTING")
                let tile = Map.getTileAtWorldPosition(mouseX, mouseY);
                if(tile.passable && !tile.node && DebugHelpers.checkForSpriteAtMouse())
                if(Shop.checkResource(Shop.currentShopSelectionCost.resource, Shop.currentShopSelectionCost.amount)) {
                    if(Shop.currentShopSelection.info instanceof RawTurret){
                        console.log("PLACING A TURRET");
                        console.log(Turret.checkPlacement(mouseX, mouseY))
                        if(Turret.checkPlacement(mouseX, mouseY) && tile.passable){
                            tile.passable = true
                            new Turret(Shop.currentShopSelection.info.image, tile.pos.x * Map.tileSize + (Map.tileSize/2), tile.pos.y * Map.tileSize + (Map.tileSize/2));
                        }
                        //Check Around Clicked Tile for Passable
                            //If all are passble, Place a turret with RawTurret Information
                    }else{
                        let tileToPlace = new RawTile(RawTile.Type.Grass);
                        let x = tile.pos.x;
                        let y = tile.pos.y;
    
                        tileToPlace.pos = {x: tile.pos.x, y: tile.pos.y};
                        tileToPlace.node = Shop.currentShopSelection;
                        Shop.removeResource(Shop.currentShopSelectionCost.resource, Shop.currentShopSelectionCost.amount)
    
                        let newTile = new PathingPoint(Map.floorTiles, tileToPlace);
                        newTile.getChildrenNodes();
                        Map.floorTiles[y][x] = newTile;
                    }
                    
                }
            }
        }
    }

    static drawGrid(){
        let cols = width /Map.tileSize
        let rows = height /Map.tileSize
        LayerManager.Layers.Grid.stroke(0, 0, 0, 55);
        for(let y = 0; y < rows; y++){
            for (let x = 0; x < cols; x++) {
                
                LayerManager.Layers.Grid.line(Map.tileSize * (x +1), 0,  Map.tileSize * (x +1), height);           
            }
            LayerManager.Layers.Grid.line(0, Map.tileSize * (y +1),  width, Map.tileSize * (y +1));           
        }
    }
}

class ShopButton{
    constructor(_img, _itemToPlace, _costResource, _costAmount){
        this.img = _img;
        this.itemToPlace = _itemToPlace;

        this.costResource = _costResource;
        this.costAmount = _costAmount;

        this.sprite = createSprite(-100, -100);
        this.sprite.addImage(this.img);
        this.sprite.addToGroup(LayerManager.Layers.HUDGroup);
        this.sprite.debug = true;
        this.sprite.onMousePressed = () => {
            Shop.currentShopSelection = this.itemToPlace;
            Shop.currentShopSelectionCost = {resource: _costResource, amount: _costAmount};
            console.log("Cost: ", this.cost, "| Item to Place: ", this.itemToPlace);
        };
        Shop.ShopButtons.push(this);
    }
}