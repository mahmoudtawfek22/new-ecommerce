import { Component } from '@angular/core';
import { AddToCartService } from '../../services/add-to-cart.service';
import { Product } from '../../product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DiscountPipe } from '../../pipes/discount.pipe';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DiscountPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartProducts!: Product[];
  totalPrice: number = 0;
  quantities!: number[];
  token!: string;
  constructor(
    private addToCartSer: AddToCartService,
    private auth: AuthService
  ) {
    window.scroll(0, 0);
  }
  ngOnInit(): void {
    this.auth.getToken().subscribe((res) => {
      this.token = res;
    });
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
