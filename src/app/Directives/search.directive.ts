import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSearch]',
  standalone: true
})
export class SearchDirective {

  constructor( private searchInput: ElementRef ) { }
  @HostListener("input", ["$event.target"]) oninput(target: HTMLInputElement) {
    const input=target as HTMLInputElement;


}
