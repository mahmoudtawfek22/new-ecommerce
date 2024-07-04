import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-ecommerce',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    ShopComponent,
    HeaderComponent,
    LoginComponent,
    SingleProductComponent,
    CartComponent,
    RouterModule,
    FooterComponent,
    FontAwesomeModule,
  ],
  templateUrl: './ecommerce.component.html',
  styleUrl: './ecommerce.component.css',
})
export class EcommerceComponent {
  ngOnInit(): void {
    window.scroll(0, 0);

    let up = document.getElementById('up');
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 400) {
        // Remove 'up' class and add 'visible' class
        up?.classList.remove('up');
        up?.classList.add('visible');
      } else {
        // Remove 'visible' class and add 'up' class
        up?.classList.remove('visible');
        up?.classList.add('up');
      }
    });
  }
  scroll() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
