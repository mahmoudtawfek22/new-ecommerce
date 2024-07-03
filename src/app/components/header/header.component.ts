import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faCookie } from '@fortawesome/free-solid-svg-icons';
import { AddToCartService } from '../../services/add-to-cart.service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  faCoffee = faCoffee;
  isShopActive = false;
  token!: string;
  constructor(
    private addToCartSer: AddToCartService,
    private router: Router,
    private authService: AuthService
  ) {
    // this.token = localStorage.getItem('token');
    console.log(this.token);

    this.router.events.subscribe((event) => {
      // if (event instanceof NavigationEnd) {

      this.isShopActive = this.router.url.startsWith('/shop');
      // }
    });
  }
  orderedProducstNum: number = 0;
  ngOnInit(): void {
    // this.token = localStorage.getItem('token');
    this.authService.getToken().subscribe((res) => {
      this.token = res;
    });
    this.addToCartSer.getCartProducts().subscribe((res) => {
      this.orderedProducstNum = res.length;
    });
  }
  go(roure: string) {
    this.router.navigate([roure]);
  }
  logout() {
    // localStorage.removeItem('token');
    // this.cookie.delete('token');
    // window.location.reload();
    this.authService.logout();
  }
}
