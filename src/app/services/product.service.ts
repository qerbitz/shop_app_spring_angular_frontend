import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interface/product';
import { map } from 'rxjs/operators';
import { Category } from '../interface/category';
import { NumberValueAccessor } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  getProduct(theProductId: number): Observable<HttpResponse<Product>> {
    const productUrl = `${this.apiUrl}/product/viewProduct/${theProductId}`;
    return this.httpClient.get<Product>(productUrl, { observe: 'response' });
  }

  public getProductList(thePage: number,
    thePageSize: number, sort_option: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.apiUrl}/product/productList/?page=${thePage}&size=${thePageSize}&sort_option=${sort_option}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
  public getProductListByCategory(thePage: number,
    thePageSize: number, category_id: string, gender: string, price: string, sort_option: number): Observable<GetResponseProducts> {
      
        const searchUrl = `${this.apiUrl}/product/filter/?page=${thePage}&size=${thePageSize}&category=${category_id}&sort_option=${sort_option}&gender=${gender}&price=${price}`;
        return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  public getProductListBySale(): Observable<Product[]> {
    const searchUrl = `${this.apiUrl}/product/BySaleProductList`;
    return this.httpClient.get<Product[]>(searchUrl);
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
