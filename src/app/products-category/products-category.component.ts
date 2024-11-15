import { CommonModule, CurrencyPipe} from '@angular/common';
import { Component,  OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitlePipe } from '../pipes/title.pipe';
import { ProductsService } from '../services/products.service';
import { RouterLink } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-products-category',
  standalone: true,
  imports: [CommonModule,FormsModule,TitlePipe,CurrencyPipe,RouterLink],
templateUrl: './products-category.component.html',
  styleUrl: './products-category.component.css'
})
export class ProductsCategoryComponent implements OnInit ,OnDestroy{
  products: any[] = [];
  originalProducts: any[] = []; 
  categoriesList: string[] = [];
  paginatedItems: any[] = [];
  itemsPerPage = 12;
  currentPage = 1;
  totalPages = 0;
  selectedFilterText: string = '';
  textFilter:boolean=false;
  filterTexts: string[] = [];
  selectedFilters: { category?: string, priceRange?: { min: number, max: number }, rating?: number } = {};
  private subscriptions: Subscription[] = [];
  constructor(private _productsService: ProductsService, private _cartService:CartService) {}
  index:number=0;
  @Output() buttonClicked = new EventEmitter<void>();
  ngOnInit() {
    this.categoriesList = this._productsService.categories;
    const categoryObservables = this.categoriesList.map(category => 
      this._productsService.getAllProducts(category)
    );

    let subscription = combineLatest(categoryObservables).subscribe(() => {
      this._productsService.products$.subscribe(products => {
        this.products = products;
        this.originalProducts = [...this.products];
  
        this.allProducts();
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.updatePaginatedItems();
      });
    });
  
    this.subscriptions.push(subscription);
  }

  updateProducts() {
    this.products = this.originalProducts.filter(product => {
      const categoryMatch = !this.selectedFilters.category || product.category === this.selectedFilters.category;
      const ratingMatch = !this.selectedFilters.rating || product.rating >= this.selectedFilters.rating;
      const priceMatch = !this.selectedFilters.priceRange || 
                         (product.randomPrice >= this.selectedFilters.priceRange.min && product.randomPrice <= this.selectedFilters.priceRange.max);
      return categoryMatch && ratingMatch && priceMatch;
    });

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.updatePaginatedItems();
    this.filterActive();
  }
  allProducts() {
    this.products.sort(() => Math.random() - 0.5);
    this.originalProducts.sort(() => Math.random() - 0.5);

  }
 
  filterByCategory(category: string, filterText: string) {
    this.selectedFilters.category = category;
    this.filterTexts.push(filterText);
    this.updateProducts();
  }

  
  filterProductsByRating(value: number, filterText: string) {
    this.selectedFilters.rating = value;
    this.filterTexts.push(filterText);
    this.updateProducts();
  }
  filterProductsByPrice(minPrice: number, maxPrice: number, filterText: string) {
    this.selectedFilters.priceRange = { min: minPrice, max: maxPrice };
    this.filterTexts.push(filterText);
    this.updateProducts();
  }
  deleteFilter(filterText: string) {
    this.filterTexts = this.filterTexts.filter(text => text !== filterText);
    if (this.filterTexts.length === 0) {
      this.selectedFilters = {}; 
    } else {
    }

    this.updateProducts();
  }
filterActive(){
  this.textFilter=true;

}
searchText: string = ''; 
isSearchListVisible: boolean = false;
onSearch() {
  const searchTerm = this.searchText.toLowerCase();
  this.products = this.originalProducts.filter(product => 
    product.title.toLowerCase().includes(searchTerm)
  );
  this.updatePaginatedItems(); 
}
onSearchFocus() {
  this.isSearchListVisible = true;
}

onSearchBlur() {
  setTimeout(() => {
    this.isSearchListVisible = false;
  }, 200);
}


  // pagination //////////////////////////////////////////////////////////
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
  getfilter(){
    this.buttonClicked.emit();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
 
  
}
