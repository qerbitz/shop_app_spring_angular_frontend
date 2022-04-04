import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/interface/order';
import { OrderItem } from 'src/app/interface/order-item';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.component.html',
  styleUrls: ['./user-order-details.component.css']
})
export class UserOrderDetailsComponent implements OnInit {

  order: Order;

  constructor(private orderService: CheckoutService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {


    const orderNumber: string = this.route.snapshot.paramMap.get('orderNumber');

    this.orderService.getOrderById(orderNumber).subscribe(
      data => {
        this.order = data;
      }
    );

    
  }

}
