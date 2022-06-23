export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {return;}
    if (this.cartItems.length > 0) {
      for (let cartItem of this.cartItems) {
        if (cartItem.product.id === product.id) {
          cartItem.count += 1;
          this.onProductUpdate(cartItem);
          return;
        }
      }
    }
    
    let cartItem = {};
    cartItem.product = product;
    cartItem.count = 1;
    this.cartItems.push(cartItem);

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    for (let cartItem of this.cartItems) {
      if (cartItem.product.id === productId) {
        cartItem.count += amount;

        if (cartItem.count < 1) {
          let currentIndex = this.cartItems.indexOf(cartItem);
          this.cartItems.splice(currentIndex, 1);
          this.onProductUpdate(cartItem);
          return;
        }
        this.onProductUpdate(cartItem);
      }
    }
  }

  isEmpty() {
    return !(this.cartItems.length > 0);
  }

  getTotalCount() {
    if (this.cartItems.length < 1) {return 0;}

    let totalCount = 0;

    for (let cartItem of this.cartItems) {
      totalCount += cartItem.count;
    }
    
    return totalCount;
  }

  getTotalPrice() {
    if (this.cartItems.length < 1) {return 0;}
    
    let totalPrice = 0;
    
    for (let cartItem of this.cartItems) {
      totalPrice += cartItem.product.price * cartItem.count;
    }
    
    return totalPrice;
  }

  onProductUpdate(cartItem) {

    this.cartIcon.update(this);
  }
}

