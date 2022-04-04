import { CartItem } from "./cart-item";
import { Category } from "./category";
import { Product_size } from "./product_size";

export class Product {
    id_product: number;
    name: string;
    price: number;
    category : Category;
    image: string;
    season: string;
    discount: number;
    product_sizes: Product_size;



    constructor(cartItem?: CartItem) {
        this.id_product = cartItem?.id;
        this.name = cartItem?.name;
    }
}
