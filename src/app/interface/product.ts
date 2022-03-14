import { Category } from "./category";

export class Product {
    id_product: number;
    name: string;
    price: number;
    category : Category;
    image: string;
    quantity: number;
    season: string;
    discount: number;
}
