import { Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { imageAnimation, slideInAnimation } from '../animations/animation';
import { HeaderService } from '../services/header.service';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { SliderComponent } from './../slider/slider.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe,SliderComponent],
templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations:[slideInAnimation,imageAnimation]
})
export class HomeComponent implements OnInit, OnDestroy{
  constructor(private ngZone: NgZone, private el: ElementRef, private _headerService: HeaderService,
    private _productsService:ProductsService,private _cartService:CartService
  ) {}
  categoriesList: string[] = [];
  homeImages: any[] = [];
  imgSrc: string = '';
  imgTitle: string = '';
  index: number = 0;
  state: string = 'visible';
  intervalId: any;
  products:any[]=[];
  laptops:any[]=[];
  allCategories:any[]=[];
  ngOnInit(): void {
      this.categoriesList = this._productsService.categories;
      for (let category of this.categoriesList) {
         this._productsService.getAllProducts(category).subscribe(() => {
          this._productsService.products$.subscribe(products => {

            this.products = products.filter(x=> x.category=='Digital camera').slice(0,20);
            this.laptops = products.filter(x=> x.category=='Laptops').slice(0,20);  
            this.allCategories=products.slice(0,30);          
          });
        });
      }
  
    this._headerService.getHeaderImages().subscribe(
      (data) => {
        if (data && data.images && data.images.length > 0) {
          this.homeImages = data.images;
          this.imgSrc = this.homeImages[0].imageUrl;
          this.imgTitle = this.homeImages[0].title;
          this.startImageRotation();
        } else {
          console.error('No images found or data is undefined');
        }
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }
  startImageRotation() {
    if (this.homeImages.length > 0) {
      this.ngZone.runOutsideAngular(() => {
        this.intervalId = setInterval(() => {
          this.ngZone.run(() => {
            this.state = 'hidden';
            setTimeout(() => {
              if (this.homeImages.length > 0) {
                this.index = (this.index + 1) % this.homeImages.length;
                this.imgSrc = this.homeImages[this.index].imageUrl;
                this.imgTitle = this.homeImages[this.index].title;
                this.state = 'visible';
              }
            }, 600);
          });
        }, 5000);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
