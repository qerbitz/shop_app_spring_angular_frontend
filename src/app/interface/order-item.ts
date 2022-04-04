import { CartItem } from './cart-item';
import { Order } from './order';
import { Product } from './product';

export class OrderItem {

    quantity: number;
    order: Order;
    product: Product;

    constructor(cartItem: CartItem) {
        this.quantity = cartItem.quantity;
        this.product = new Product(cartItem);
    }
}