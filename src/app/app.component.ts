import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { CartComponent } from './components/cart/cart.component';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EcommerceComponent } from './components/ecommerce.component';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FilePondModule } from 'ngx-filepond';
import { fromEvent, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TranslateModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FilePondModule,
    CommonModule,
    ShopComponent,
    SingleProductComponent,
    CartComponent,
    RouterModule,
    FooterComponent,
    EcommerceComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  inactivityTmer!: Subscription;
  title = 'E-commerce';
  constructor(private translate: TranslateService, private router: Router) {
    this.translate.setDefaultLang('en');
    this.translate.use('en'); // Set your default language here
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.scrollTo(0, 0);

    fromEvent(document, 'mousemove').subscribe(() => {
      if (this.inactivityTmer) {
        this.inactivityTmer.unsubscribe();
      }

      this.inactivityTmer = timer(1800000).subscribe(() => {
        this.router.navigate(['./login']);
      });
    });
  }
}
