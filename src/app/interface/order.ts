import { OrderItem } from "./order-item";
import { User } from "./user";

export class Order {
    totalQuantity: number;
    totalPrice: number;
    orderTrackingNumber: string;
    orderDate: Date;
    orderItems: OrderItem[];
    user: User; 
}