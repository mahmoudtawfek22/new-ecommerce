import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../product';
import { DiscountPipe } from '../../pipes/discount.pipe';
import { AddToCartService } from '../../services/add-to-cart.service';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [DiscountPipe, RouterModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css',
})
export class SingleProductComponent {
  product?: Product;
  productImage?: string;
  load: boolean = true;
  CartProducts!: Product[];
  productImages!: string[];
  index!: number;
  constructor(
    private products: ProductsService,
    private activatesRoute: ActivatedRoute,
    private addToCartSer: AddToCartService
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    let id = this.activatesRoute.snapshot.params['id'];

    this.addToCartSer.getCartProducts().subscribe((res) => {
      this.CartProducts = res;
      this.index = this.CartProducts.findIndex((prd) => prd.id == id);
    });
    let observal = {
      next: (res: Product) => {
        this.product = res;

        let cartprods = new Set(this.CartProducts.map((prd) => prd.id));
        if (cartprods.has(this.product.id)) {
          this.product.added = true;
        }
        this.product.priceAfterDiscount = parseFloat(
          (
            this.product.price -
            this.product.price * (this.product.discountPercentage / 100)
          ).toFixed(2)
        );

        console.log(this.product.priceAfterDiscount);
        this.productImage = this.product.thumbnail;
        // this.productImages = this.product.images;
        this.load = false;
      },
      error: (err: Error) => {
        console.log(err);
      },
    };
    this.products.getProduct(id).subscribe(observal);
  }
  change(index: number) {
    this.productImage = this.product?.images[index];
  }
  addToCart() {
    if (this.product?.added != true && this.product) {
      this.addToCartSer.add(this.product);
      this.product.added = true;
    } else if (this.product?.added == true && this.product) {
      this.addToCartSer.delteProduct(this.index);
      this.product.added = false;
    }
  }
}
