import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SideBarComponent } from './../sidebar/sidebar.component';
import { slideDownAnimation} from '../animations/animation';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ScreenWidthService } from '../services/screen-width.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink,SideBarComponent,FormsModule],
templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations:[slideDownAnimation]
})
export class NavbarComponent implements OnInit{
  sidebarState:string='out';
  isLogin:boolean=false;
  cartItemsCount: number = 0;
  Active:boolean=false;
  products:any[]=[];
  toggleSidebar() {
    this.sidebarState = this.sidebarState === 'out' ? 'in' : 'out';
  }
  onSidebarStateChange(newState: string) {
    this.sidebarState = newState;
  }
  categoriesList:string[]=[];
  constructor(private  _productsService:ProductsService,
    private _router:Router,
    private _authService:AuthService,
  private _screenWidthService:ScreenWidthService,
private _cartService:CartService){
  }
  screenWidth:number=0
  screen:boolean=false;
  searchVisable:boolean=false
  ngOnInit() {
    this.categoriesList=this._productsService.categories;
    for (let category of this.categoriesList) {
       this._productsService.getAllProducts(category).subscribe(() => {
        this._productsService.products$.subscribe(products => {
          this.products=products.slice(0,30);
        });
      });
    }
    this._authService.currentUser.subscribe(()=>{
      if(this._authService.currentUser.getValue()!=null){
        this.isLogin=true;
      }
      else{
        this.isLogin=false;
      }
    })
    this._screenWidthService.currentWidth.subscribe(
      (width) => {
        this.screenWidth = width;
        console.log(this.screenWidth)
        if(this.screenWidth>=1200){
          this.searchVisable=true;
          this.Active=true
        }
        else if(this.screenWidth<=1200){
          this.searchVisable=false;
          this.Active=false;
        }
      }
  
    ); 
    this._cartService.getCartItems().subscribe(items => {
      this.cartItemsCount = items.length;  
    });
  
  }
  
  isActive(){
    this.Active=!this.Active;
  }
  ActiveFalse(){
    this.Active=false;
  }
  log:boolean=false;
  getLogOut(){
    this.log=!this.log
  }
  
  isLogOut(){
    this._authService.logout();
  }
  getSearch(){
      this.searchVisable=!this.searchVisable;
  }
}

