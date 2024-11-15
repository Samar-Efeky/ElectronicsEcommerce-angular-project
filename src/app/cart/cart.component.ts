import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from './../services/products.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,CurrencyPipe,FormsModule,RouterLink],
templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];  
  totalPrice: number = 0;
  mostRating:any[]=[];

  constructor(private _cartService: CartService,private _ProductsService:ProductsService) {}

  ngOnInit() {
    this._cartService.getCartItems().subscribe(items => {
      this.cartItems = items.map(item => ({
        ...item,
        quantity: 1 
      }));
      this.calculateTotalPrice();
    });
    this._ProductsService.getAllProducts("Laptops").subscribe((data)=>{
      this.mostRating=data.slice(0,20);
      
      
    })
  }
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + ((item.randomPrice - item.randomOffer) * item.quantity); 
    }, 0);
  }
  removeFromCart(item: any) {
    this._cartService.removeFromCart(item); 
    this.calculateTotalPrice(); 
  }
  clearCart() {
    this._cartService.clearCart(); 
    this.cartItems = []; 
    this.calculateTotalPrice(); 
  }
  updateQuantity(item: any, quantity: number) {
    const foundItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (foundItem) {
      foundItem.quantity = quantity;
      this.calculateTotalPrice(); 
    }
  }
}
