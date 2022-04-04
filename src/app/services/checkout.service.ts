import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../interface/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  placeOrder(order: Order): Observable<any> {  
    console.log(order);
    const searchUrl = `${this.apiUrl}/order/placeOrder`;
    return this.httpClient.post<Order>(searchUrl, order);  
  }

  getOrdersByUser(): Observable<any> {  
    const searchUrl = `${this.apiUrl}/order/allOrders`;
    return this.httpClient.get<Order>(searchUrl);  
  }

  getOrderById(order_id: string): Observable<any> {  
    const searchUrl = `${this.apiUrl}/order/orderDetails?order_id=${order_id}`;
    return this.httpClient.get<Order>(searchUrl);  
  }


  
}