import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { SliderComponent } from "../slider/slider.component";
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, SliderComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  id: number = 0;
  productsCategory:any[]=[];
  constructor(
    private route: ActivatedRoute,
    private _productsService: ProductsService,
    private  _cartService:CartService
  ) { }

  ngOnInit(): void {
    const Id = this.route.snapshot.paramMap.get('id'); 
    this._productsService.products$.subscribe(products => {
      if (Id) {
        this.id = +Id;
        this.product = products.find(x => x.id === this.id);
        this.productsCategory=products.filter(x=> x.category).slice(0,5);
        
      }
    });
    this._productsService.categories.forEach(category => {
      this._productsService.getAllProducts(category).subscribe();
    });
    
  }
  addToCart(product: any) {
    this._cartService.addToCart(product); 
  }
}
