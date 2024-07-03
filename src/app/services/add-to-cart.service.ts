import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root',
})
export class AddToCartService {
  products: Product[] = [];
  quantity: number[];
  private cartProducts!: BehaviorSubject<Product[]>;

  private quantities!: BehaviorSubject<number[]>;
  constructor() {
    this.cartProducts = new BehaviorSubject<Product[]>([]);
    this.quantities = new BehaviorSubject<number[]>([]);
    this.products = [];
    this.quantity = [];
  }
  add(product: Product) {
    const productExists = this.products.find((p) => p.id === product.id);

    if (!productExists) {
      this.products.push(product);
      this.quantity.push(1);
      this.quantities.next(this.quantity);
      this.cartProducts.next(this.products);
      console.log(this.products);
    }
  }
  getCartProducts(): Observable<Product[]> {
    console.log(this.products);
    return this.cartProducts;
  }

  delteProduct(index: number) {
    // let index= this.products.findIndex(prd=>prd.id==product.id)
    this.products.splice(index, 1);
    this.quantity.splice(index, 1);
    this.cartProducts.next(this.products);
    this.quantities.next(this.quantity);

    console.log(this.products);
  }
  increaseQuantities(index: number) {
    this.quantity[index]++;
    this.quantities.next(this.quantity);
  }
  decreaseQuantities(index: number) {
    this.quantity[index]--;
    if (this.quantity[index] == 0) {
      this.delteProduct(index);
    }
    this.quantities.next(this.quantity);
  }
  getQuantities(): Observable<number[]> {
    return this.quantities;
  }
  placeOrder() {
    this.products = [];
    this.cartProducts.next(this.products);
  }
}
