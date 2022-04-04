import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: Category[];
  actual_category: string = "0";
  actual_gender: string = "all";
  actual_price: string = "0";
  
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
    console.log(`kategoriapobrana= ${key}`);
    console.log('ten teges'+this.actual_category);
    this.router.navigateByUrl(`/filter/${this.actual_category}/${this.actual_gender}`);

  }

  public genderProducts(key: string) {
    this.actual_gender=key;
    console.log(`plec pobrana= ${key}`);
    this.router.navigateByUrl(`/filter/${this.actual_category}/${this.actual_gender}`);
  }

  public priceProducts(key: string) {
    this.actual_price=key;
    console.log(`kwotapobrana= ${key}`);
    this.router.navigateByUrl(`/filterByPrice/${this.actual_category}/${this.actual_price}`);
  }


}