module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id){
        var storedItem = this.items[id];
        if(!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, newPrice: 0};
        } 
        storedItem.qty++;
        this.totalQty++;
        storedItem.newPrice = storedItem.item.newPrice * storedItem.qty;
        this.totalPrice += storedItem.item.newPrice;
    };

    this.genArray = function(){
        var arr = [];
        for (var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};