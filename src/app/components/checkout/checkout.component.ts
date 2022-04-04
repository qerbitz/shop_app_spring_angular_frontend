import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { ShopValidators } from 'src/app/validators/shop-validators';
import { Order } from 'src/app/interface/order';
import { OrderItem } from 'src/app/interface/order-item';
import { CartItem } from 'src/app/interface/cart-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  storage: Storage = sessionStorage;

  // initialize Stripe API

  cardElement: any;
  displayError: any = "";

  isDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {

   this.cartItems = this.cartService.cartItems;
   this.reviewCartDetails();
  }

  reviewCartDetails() {

    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

  }

  onSubmit() {
    console.log("Handling the submit button");

    // set up order
    let order = new Order();
    

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    // - short way of doing the same thingy
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));


    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    order.orderItems = orderItems;

    // call REST API via the CheckoutService
    //this.checkoutService.placeOrder(order);
    this.checkoutService.placeOrder(order).subscribe({
      next: response => {
        // reset cart
       // this.resetCart();

      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    }
    );

  }

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.persistCartItems();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }
}