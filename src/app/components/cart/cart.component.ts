import { Component } from '@angular/core';
import { AddToCartService } from '../../services/add-to-cart.service';
import { Product } from '../../product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartProducts!: Product[];
  totalPrice: number = 0;
  quantities!: number[];
  constructor(private addToCartSer: AddToCartService) {}
  ngOnInit(): void {
    this.addToCartSer.getCartProducts().subscribe((res) => {
      this.cartProducts = res;
      // this.quantities = this.addToCartSer.quantity;
    });
    this.addToCartSer.getQuantities().subscribe((res) => {
      this.quantities = res;
      this.totalprice(this.quantities);
    });
  }

  delete(index: number) {
    this.addToCartSer.delteProduct(index);
  }
  totalprice(quantity: number[]) {
    this.totalPrice = 0;

    this.cartProducts.forEach((prd, index) => {
      console.log(index);
      this.totalPrice += parseFloat(
        (prd.priceAfterDiscount * this.quantities[index]).toFixed(2)
      );
      this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
    });
  }

  increase(productIndex: number) {
    // this.addToCartSer.quantity[productIndex]++;
    // this.quantities = this.addToCartSer.quantity;
    this.addToCartSer.increaseQuantities(productIndex);
    this.totalprice(this.quantities);
  }
  decrease(productIndex: number) {
    // this.addToCartSer.quantity[productIndex]--;

    this.addToCartSer.decreaseQuantities(productIndex);

    // this.quantities = this.addToCartSer.quantity;
    this.totalprice(this.quantities);
  }
  placeOrder() {
    this.addToCartSer.placeOrder();
    console.log(this.cartProducts);
    this.totalPrice = 0;
  }
}
