import { Product } from './product';

export class CartItem {

    id: number;
    name: string;
    imageUrl: string;
    unitPrice: number;

    quantity: number;

    constructor(product: Product) {
        this.id = product.id_product;
        this.name = product.name;
        this.imageUrl = product.image;
        this.unitPrice = product.price

        this.quantity = 1;
    }
}
