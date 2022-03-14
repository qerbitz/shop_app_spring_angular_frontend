import { Order } from './order';
import { OrderItem } from './order-item';
import { Address } from './address';

export class Purchase {
    //adress: Address;
    order: Order;
    orderItems: OrderItem[]; 
}