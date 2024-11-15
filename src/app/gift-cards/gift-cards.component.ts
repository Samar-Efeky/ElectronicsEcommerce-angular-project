import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-gift-cards',
  standalone: true,
  imports: [SliderComponent],
  templateUrl: './gift-cards.component.html',
  styleUrl: './gift-cards.component.css'
})
export class GiftCardsComponent implements OnInit{
  products: any[] = [];
  originalProducts: any[] = []; 
  categoriesList: string[] = [];
  paginatedItems: any[] = [];
  itemsPerPage = 12;
  currentPage = 1;
  totalPages = 0;
  watches:any[]=[];
  private subscriptions: Subscription[] = [];
    constructor(private _productsService:ProductsService,private _cartService:CartService){}
    ngOnInit() {
      this.categoriesList = this._productsService.categories;
      for (let category of this.categoriesList) {
        let subscription = this._productsService.getAllProducts(category).subscribe(() => {
          this._productsService.products$.subscribe(products => {
            this.products = products.filter(x=> x.category=='Digital camera').slice(0,20);
            this.watches= products.filter(x=> x.category=='Smartwatches').slice(0,20);

            
          });
        });
        this.subscriptions.push(subscription); 
      }
  }
}
