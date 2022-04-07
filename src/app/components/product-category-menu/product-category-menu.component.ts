import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: Category[];
  actual_category: string = "0";
  actual_gender: string = "all";
  actual_price: string = "0-10000";

  
  constructor(
    private productService: ProductService,
     private router: Router) { }

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {

    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    );

  }

  public kategoriaProducts(key: string) {
    this.actual_category = key;
    this.router.navigateByUrl(`/filter/${this.actual_category}/${this.actual_gender}/${this.actual_price}`);

  }

  public genderProducts(gender: string) {
    this.actual_gender=gender;

    this.router.navigateByUrl(`/filter/${this.actual_category}/${this.actual_gender}/${this.actual_price}`);
  }

  public priceProducts(price: string) {
    this.actual_price=price;
    this.router.navigateByUrl(`/filter/${this.actual_category}/${this.actual_gender}/${this.actual_price}`);
  }


}