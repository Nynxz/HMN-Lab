//This is where we will be able to choose how to spend our resources to place traps, walls, etc
class Shop{

    static ShopTab;
    static isShopTabOpen = false;
    static ShopButtons = [];

    static currentShopSelection;

    static initShop(){
        Shop.ShopButtons = [];
        Shop.isShopTabOpen = false;
        Shop.currentShopSelection = null;
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

    static initShopButtons(){
        new ShopButton(Images.Shop.ShopButtonBarricade, "Barricade", "10 Wood");
        new ShopButton(Images.Shop.ShopButtonSpikes, new RawTile(RawTile.Type.Spike), "10 Metal");
        new ShopButton(Images.Shop.ShopButtonBarricade, "item", "cost");
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
           
            LayerManager.Layers.HUDLayer.imageMode(CENTER);
            LayerManager.Layers.HUDLayer.image(eval(Shop.currentShopSelection.info.image), mouseX, mouseY, Map.tileSize, Map.tileSize);
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
    constructor(_img, _itemToPlace, _cost){
        this.img = _img;
        this.itemToPlace = _itemToPlace;
        this.cost = _cost;
        this.sprite = createSprite(-100, -100);
        this.sprite.addImage(this.img);
        this.sprite.addToGroup(LayerManager.Layers.HUDGroup);
        this.sprite.onMouseReleased = () => {
            Shop.currentShopSelection = this.itemToPlace;
            console.log("Cost: ", this.cost, "| Item to Place: ", this.itemToPlace);
        };
        Shop.ShopButtons.push(this);
    }
}