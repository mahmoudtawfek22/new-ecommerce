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

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterLink, FormsModule, RouterModule],
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
    this.selectedProducts = [];
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
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

          // let buyed = this.cartProducts.map((cartProduct) =>
          //   this.selectedProducts.findIndex(
          //     (product) => product.id === cartProduct.id
          //   )
          // );
          // buyed.forEach((index) => {
          //   this.selectedProducts[index].added = true;
          // });
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

  // ngOnDestroy(): void {
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.
  //   this.stop.unsubscribe;
  // }

  // addButton="Add to Cart"
  addToCart(product: Product, ev: Event, index: number) {
    let ele: HTMLElement = ev.target as HTMLElement;

    if (ele.innerText == 'Add To Cart') {
      this.addToCartSer.add(product);

      this.selectedProducts[index].added = true;
      // ele.innerText = 'Remove From Cart';
    } else if (ele.innerText == 'Remove From Cart') {
      let i = this.cartProducts.findIndex((prd) => prd.id == product.id);
      this.addToCartSer.delteProduct(i);
      console.log(index);
      // ele.innerText = 'Add To Cart';
      this.selectedProducts[index].added = false;
    }
  }

  search() {
    // const inputElement = ev.target as HTMLInputElement;
    const searchTerm = this.searchValue.toLowerCase();

    // Filter products based on the search term
    this.selectedProducts = this.lastProducts.filter((prd) =>
      prd.title.toLowerCase().includes(searchTerm)
    );

    if (searchTerm == '') {
      this.selectedProducts = this.lastProducts;
    }
  }
}
