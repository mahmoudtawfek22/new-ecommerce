import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import AOS from 'aos';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  headImage: string;
  images: string[];
  catagories: string[];
  stop: any;
  constructor(private route: ActivatedRoute) {
    this.catagories = [
      'beauty',
      'fragrances',
      'furniture',
      'groceries',
      'home-decoration',
      'kitchen-accessories',
      'laptops',
      'mens-shirts',
      'mens-shoes',
      'mens-watches',
      'mobile-accessories',
      'motorcycle',
      'skin-care',
      'smartphones',
      'sports-accessories',
      'sunglasses',
      'tablets',
      'tops',
      'vehicle',
      'womens-bags',
      'womens-dresses',
      'womens-jewellery',
      'womens-shoes',
      'womens-watches',
    ];
    this.images = [
      'assets/camera.jpg',
      'assets/glasses.jpg',
      'assets/watch.jpg',
      'assets/mobile.jpg',
      'assets/perfume.jpg',
      'assets/bag.jpg',
      'assets/watch2.jpg',
      'assets/camera.jpg',
    ];
    this.headImage = this.images[0];
  }
  index: number = 0;
  ngOnInit(): void {
    AOS.init();
    this.startImageSlideshow();
    window.addEventListener('scroll', () => {
      if (scrollY >= 733) {
        clearInterval(this.stop);
        // clearTimeout(this.timeout);
      } else {
        clearInterval(this.stop);

        this.startImageSlideshow();
        // clearInterval(this.stop);
      }
    });
  }

  startImageSlideshow() {
    this.stop = setInterval(() => {
      this.index = (this.index + 1) % this.images.length;
      const imgElement = document.querySelector('#head-image') as HTMLElement;

      this.headImage = this.images[this.index];
    }, 5000);
  }
  ngOnDestroy(): void {
    clearInterval(this.stop);
  }
}
