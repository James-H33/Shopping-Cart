module.exports = function Cart(oldCart) { // Get data from old cart 
    this.items = oldCart.items || {}; // Gathers data from oldCart and assigns it
    this.totalQty = oldCart.totalQty || 0; // Gathers data from oldCart and assigns it
    this.totalPrice = oldCart.totalPrice || 0; // Gathers data from oldCart and assigns it

    this.add = function(item, id) { 
        let storedItem = this.items[id];

        // on add || if not added then add item to storedItem
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }

        // if item is already added then increase the quantity
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    }

    this.generateArray = function() {
        let arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
};

