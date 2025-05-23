import { Component, ElementRef, OnChanges } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Product, ProductsResponse } from '../../product';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddToCartService } from '../../services/add-to-cart.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    RouterModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  allProducts!: Product[];
  selectedProducts!: Product[];

  catagoriesList!: string[];
  selectedCatagory!: string;
  load: boolean = true;
  searchValue!: string;
  cartProducts!: Product[];
  constructor(
    private products: ProductsService,
    private addToCartSer: AddToCartService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // this.selectedCatagory = this.activatedRoute.snapshot.params['catagory'];
    window.scroll(0, 0);

    this.selectedProducts = [];
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
  ngOnInit(): void {
    // window.scroll(0, 0);

    this.addToCartSer.getCartProducts().subscribe((res) => {
      this.cartProducts = res;
    });
    this.activatedRoute.paramMap.subscribe((param) => {
      this.selectedCatagory = String(param.get('catagory'));
      this.filterByCatagory(this.selectedCatagory);
    });

    this.products.catagoriesList().subscribe((res) => {
      this.catagoriesList = ['all', ...res];
    });
  }
  lastProducts!: Product[];

  filterByCatagory(catagory: string) {
    if (catagory == 'all') {
      this.router.navigate([`/shop`, catagory]);

      let observal = {
        next: (res: ProductsResponse) => {
          this.selectedProducts = res.products;
          // this.allProducts = this.selectedProducts;
          this.lastProducts = [...this.selectedProducts];
          this.load = false;
          const cartProductIds = new Set(
            this.cartProducts.map((cprd) => cprd.id)
          );

          // Iterate over selectedProducts and set the `added` flag if the product is in cartProducts
          this.selectedProducts.forEach((product) => {
            if (cartProductIds.has(product.id)) {
              product.added = true;
            }

            product.priceAfterDiscount = parseFloat(
              (
                product.price -
                product.price * (product.discountPercentage / 100)
              ).toFixed(2)
            );
          });
        },
        error: (err: Error) => {
          console.log(err);
        },
      };
      this.products.getAllProducts().subscribe(observal);
      // this.selectedProducts = this.allProducts;

      this.lastProducts = [...this.selectedProducts];
    } else {
      this.router.navigate([`/shop`, catagory]);

      this.products
        .getProductsByCatagory(catagory)
        .subscribe((res: ProductsResponse) => {
          this.selectedProducts = res.products;
          this.lastProducts = [...this.selectedProducts];
          this.load = false;

          const cartProductIds = new Set(
            this.cartProducts.map((cprd) => cprd.id)
          );

          // Iterate over selectedProducts and set the `added` flag if the product is in cartProducts
          this.selectedProducts.forEach((product) => {
            if (cartProductIds.has(product.id)) {
              product.added = true;
            }
            product.priceAfterDiscount = parseFloat(
              (
                product.price -
                product.price * (product.discountPercentage / 100)
              ).toFixed(2)
            );
          });
        });
    }
  }

  addToCart(product: Product, ev: Event, index: number) {
    let ele: HTMLElement = ev.target as HTMLElement;

    if (product?.added != true && product) {
      this.addToCartSer.add(product);

      this.selectedProducts[index].added = true;
    } else if (product?.added == true && product) {
      let i = this.cartProducts.findIndex((prd) => prd.id == product.id);
      this.addToCartSer.delteProduct(i);
      this.selectedProducts[index].added = false;
    }
  }

  search() {
    const searchTerm = this.searchValue.toLowerCase();

    this.selectedProducts = this.lastProducts.filter((prd) =>
      prd.title.toLowerCase().includes(searchTerm)
    );

    if (searchTerm == '') {
      this.selectedProducts = this.lastProducts;
    }
  }
}
