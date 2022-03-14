import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/product';
import { map } from 'rxjs/operators';
import { Category } from '../interface/category';
import { NumberValueAccessor } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.apiUrl}/product/viewProduct/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  public getProductListPaginate(thePage: number,
    thePageSize: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.apiUrl}/product/productList/?page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  public searchProducts(thePage: number, thePageSize: number, theKeyword: string): Observable<GetResponseProducts> {

    const searchUrl = `${this.apiUrl}/product/searchList?page=${thePage}&size=${thePageSize}&theKeyword=${theKeyword}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  public getProductCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}/product/categoryList`);
  }


}

interface GetResponseProducts {
  content: {
    products: Product[];
  }
  pageable: {
    pageSize: number,
    pageNumber: number
  }
  totalElements: number;
}
