import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css'
})
export class BestSellersComponent {
  products: any[] = [];
  originalProducts: any[] = []; 
  categoriesList: string[] = [];
  paginatedItems: any[] = [];
  itemsPerPage = 12;
  currentPage = 1;
  totalPages = 0;
  private subscriptions: Subscription[] = [];
    constructor(private _productsService:ProductsService,private _cartService:CartService){}
    ngOnInit() {
      this.categoriesList = this._productsService.categories;
      for (let category of this.categoriesList) {
        let subscription = this._productsService.getAllProducts(category).subscribe(() => {
          this._productsService.products$.subscribe(products => {
            this.products = products.filter(x=> x.countRated>=60).slice(0,30);
  
            this.allProducts();
            this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
            this.updatePaginatedItems();
          });
        });
        this.subscriptions.push(subscription); 
      }
  }
  
  allProducts() {
    this.products.sort(() => Math.random() - 0.5);
    this.originalProducts.sort(() => Math.random() - 0.5);

  }
  updatePaginatedItems() {
    let startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;

    this.paginatedItems = this.products.slice(startIndex, endIndex);
  }
  totalPagesArray() {
    return new Array(this.totalPages);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedItems();
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  addToCart(product: any) {
    this._cartService.addToCart(product); 
  }
  getPages(): number[] {
    let pagesToShow = 3;
    let pages: number[] = [];
    for (let i = this.currentPage - pagesToShow; i <= this.currentPage + pagesToShow; i++) {
      if (i >= 1 && i <= this.totalPages) {
        pages.push(i);
      }
    }
    return pages;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}


