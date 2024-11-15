import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TitlePipe } from '../pipes/title.pipe';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CarouselModule,CommonModule,CurrencyPipe,TitlePipe,RouterLink],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnChanges{
  @Input() products:any[]=[];
  productsOffers:any[]=[];
  constructor(private _cartService:CartService){}
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 15,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      800: {
        items: 3
      },
      1100: {
        items: 4
      }
    },
    nav: true
  }
  ngOnChanges() {
    this.productsOffers=this.products;
  }
  addToCart(product: any) {
    this._cartService.addToCart(product); 
  }
 
}
