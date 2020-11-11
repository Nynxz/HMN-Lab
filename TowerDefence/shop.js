//This is where we will be able to choose how to spend our resources to place traps, walls, etc
class Shop{

    static ShopTab;
    static isShopTabOpen = false;
    static ShopButtons = [];

    static initShop(){
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
            } else {
                Shop.ShopTab.position.y -= movementDifference;
                Shop.isShopTabOpen = true;
                Shop.ShopButtons.forEach((button,x) => {
                    button.sprite.position.y -= movementDifference;
                });
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
}

class ShopButton{
    constructor(_img, _itemToPlace, _cost){
        this.img = _img;
        this.itemToPlace = _itemToPlace;
        this.cost = _cost;
        this.sprite = createSprite(-100, -100);
        this.sprite.addImage(this.img);
        this.sprite.addToGroup(LayerManager.Layers.PlayerCharactersGroup);
        this.sprite.onMouseReleased = () => {
            console.log("Cost: ", this.cost, "| Item to Place: ", this.itemToPlace);
        };
        Shop.ShopButtons.push(this);
    }
}