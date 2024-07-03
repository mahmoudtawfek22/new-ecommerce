import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Product, ProductsResponse } from '../product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  options;
  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      }),
    };
  }

  getAllProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>('https://dummyjson.com/products');
    // .pipe(retry(3));
  }

  getProduct(id: any): Observable<Product> {
    return this.http
      .get<Product>(`https://dummyjson.com/product/${id}`)
      .pipe(retry(3));
  }

  catagoriesList(): Observable<[]> {
    return this.http.get<[]>('https://dummyjson.com/products/category-list');
  }

  getProductsByCatagory(catagory: string): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(
      'https://dummyjson.com/products/category/' + catagory
    );
  }
}
