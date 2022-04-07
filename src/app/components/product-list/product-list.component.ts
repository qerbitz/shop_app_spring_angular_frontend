import { Component, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/interface/cart-item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable, Subscriber } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: Product[] = [];
  searchMode: boolean = false;
  categoryMode: boolean = false;
  priceMode: boolean = false;
  sort_option: number = 0;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  public onLogOut(): void {
    this.authenticationService.logOut();
  }

  public listProducts() {


    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.categoryMode = this.route.snapshot.paramMap.has('category');

    console.log(this.route.snapshot.paramMap);

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    if(this.categoryMode){
      this.handleCategoryProducts();
    }
    else {
      this.handleListProducts();
    }
  }


  public handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(this.thePageNumber - 1,
      this.thePageSize, theKeyword).subscribe(
        this.processResult());
        
  }

  public handleCategoryProducts() {
    const category_id: string = this.route.snapshot.paramMap.get('category');
    const gender: string = this.route.snapshot.paramMap.get('gender');
    const price: string = this.route.snapshot.paramMap.get('price');

    this.productService.getProductListByCategory(this.thePageNumber - 1,
      this.thePageSize, category_id, gender, price, this.sort_option).subscribe(
        this.processResult());    
  }

  public handleListProducts() {
    this.productService.getProductList(this.thePageNumber - 1,
      this.thePageSize, this.sort_option).subscribe(
        this.processResult());
  }


  public handleDiscountListproducts() {
    const products_with_discount: Product[] = [];
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].discount != null) {
        products_with_discount.push(this.products[i]);
      }
    }

    this.productService.getProductList(this.thePageNumber - 1,
      this.thePageSize, this.sort_option).subscribe(
        this.processResult2(products_with_discount));
  }

  addToCart(theProduct: Product) {
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }

  handleSorting(option: number){

    if(option==1){
      this.sort_option = 1;
    }
    if(option==2){
      this.sort_option = 2;
    }
    if(option==3){
      this.sort_option = 3;
    }
    if(option==4){
      this.sort_option = 4;
    }

    this.listProducts();
  }


  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  private processResult() {
    return data => {
      this.products = data.content;
      this.thePageNumber = data.pageable.pageNumber + 1;
      this.thePageSize = data.pageable.pageSize;
      this.theTotalElements = data.totalElements;
    }
  }

  private processResult2(product: Product[]) {
    return data => {
      this.products = product;
      this.thePageNumber = data.pageable.pageNumber + 1;
      this.thePageSize = data.pageable.pageSize;
      this.theTotalElements = data.totalElements;
    }
  }


}

