import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true,
})
export class DiscountPipe implements PipeTransform {
  transform(price: number | any, discount: number = 0) {
    let PriceAfterDiscount = price - price * (discount / 100);
    PriceAfterDiscount = parseFloat(PriceAfterDiscount.toFixed(2));
    return PriceAfterDiscount;
  }
}
