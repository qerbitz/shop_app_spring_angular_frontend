import { OrderItem } from "./order-item";

export class Order {
    totalQuantity: number;
    totalPrice: number;
    orderTrackingNumber: string;
    orderDate: Date;
    orderItems: OrderItem[]; 
}