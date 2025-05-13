import { ExtraOptions, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopComponent } from './components/shop/shop.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './auth.guard';
import { EcommerceComponent } from './components/ecommerce.component';

export const routes: Routes = [
  {
    path: '',
    component: EcommerceComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },

      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'shop/:catagory',
        component: ShopComponent,
      },

      {
        path: 'product/:id',
        component: SingleProductComponent,
      },

      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

// const routerOptions: ExtraOptions = {
//   scrollPositionRestoration: 'enabled', // Scroll to top on route change
// };
