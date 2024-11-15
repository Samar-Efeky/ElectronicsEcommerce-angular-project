import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { slideDownAnimation } from '../animations/animation';
import { ProductsService } from '../services/products.service';
import { ProductsCategoryComponent } from "../products-category/products-category.component";
import { ScreenWidthService } from '../services/screen-width.service';
@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductsCategoryComponent],
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
  animations:[slideDownAnimation]
})
export class ShoppingComponent implements OnInit {
  categoriesList: string[] = [];
  screenWidth:number=0
  products:any[]=[];
  @ViewChild(ProductsCategoryComponent) productsCategoryComponent!: ProductsCategoryComponent;
  
 filterByCategory(value:string,text:string){
    this.productsCategoryComponent.filterByCategory(value,text)
 }
  filterByRating(rating:number,text:string){
    this.productsCategoryComponent.filterProductsByRating(rating,text);
  }
  filterProducts(x:number,y:number,z:string) {
    this.productsCategoryComponent.filterProductsByPrice(x,y,z);
  }
  visable:boolean=false;
  constructor(private _productsService: ProductsService,private _screenWidthService:ScreenWidthService) {}
  ngOnInit() {
    this.categoriesList = this._productsService.categories;
    this._screenWidthService.currentWidth.subscribe(
      (width) => {
        this.screenWidth = width;
        console.log(this.screenWidth)
        if(this.screenWidth>=1200){
          this.visable=true;
        }
        else if(this.screenWidth<=1200){
          
        }
      }
  
    ); 
    
  }
  isvisable(){
    this.visable=!this.visable;
  }
  active:boolean=false;
  isActive(){
    this.active=!this.active;
  }
 
 
}
