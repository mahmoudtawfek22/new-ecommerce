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
    ];
    this.headImage = this.images[0];
  }
  index: number = 0;
  ngOnInit(): void {
    AOS.init();
    this.startImageSlideshow();
    // let index = 0;
    // this.stop = setInterval(() => {

    //   if (index == this.images.length) {
    //     index = 0;
    //   }
    //   this.headImage = this.images[index];
    //   index++;
    // }, 5000);
  }

  startImageSlideshow() {
    const interval = 5000; // Change image every 5 seconds
    const transitionDuration = 1000; // Match this duration with CSS transition duration

    const slide = () => {
      this.index = (this.index + 1) % this.images.length;
      this.changeImage();
      this.stop = setTimeout(() => {
        requestAnimationFrame(slide);
      }, interval - transitionDuration);
    };

    requestAnimationFrame(slide);
  }

  changeImage() {
    const imgElement = document.querySelector('.head-image') as HTMLElement;
    imgElement.classList.add('hide');

    setTimeout(() => {
      this.headImage = this.images[this.index];
      imgElement.classList.remove('hide');
    }, 1000); // Match this delay to the transition duration in CSS
  }
  ngOnDestroy(): void {
    clearInterval(this.stop);
  }
}
