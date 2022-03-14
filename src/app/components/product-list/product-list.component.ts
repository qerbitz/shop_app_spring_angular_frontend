import { Component, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/interface/cart-item';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public products: Product[];
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,) { }

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

    if (this.searchMode) {
      this.handleSearchProducts();
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



  public handleListProducts() {
    this.productService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize).subscribe(
        this.processResult());
  }

  addToCart(theProduct: Product) {
    
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.price}`);

    // TODO ... do the real work
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
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


}

