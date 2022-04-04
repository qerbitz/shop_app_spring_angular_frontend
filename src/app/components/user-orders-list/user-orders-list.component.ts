import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interface/order';
import { User } from 'src/app/interface/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-user-orders-list',
  templateUrl: './user-orders-list.component.html',
  styleUrls: ['./user-orders-list.component.css']
})
export class UserOrdersListComponent implements OnInit {

  public orders: Order[] = [];
  public user: User;

  constructor(private orderService: CheckoutService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    this.user = this.authenticationService.getUserFromLocalCache();

    this.orderService.getOrdersByUser().subscribe(
      data => {
        this.orders = data;
      }
    );


    }
}
