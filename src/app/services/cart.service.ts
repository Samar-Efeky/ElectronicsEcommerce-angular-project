import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>(this.getCartFromLocalStorage());
  currentCartItems = this.cartItems.asObservable();

  constructor() {}
  addToCart(item: any) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = [...currentItems, item];
    this.cartItems.next(updatedItems);
    this.saveCartToLocalStorage(updatedItems);
  }
  private getCartFromLocalStorage(): any[] {
    if (typeof window !== 'undefined') { 
      const cartData = localStorage.getItem('cart');
      return cartData ? JSON.parse(cartData) : [];
    }
    return []; 
  }
  private saveCartToLocalStorage(items: any[]) {
    if (typeof window !== 'undefined') { 
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }
  getCartItems() {
    return this.cartItems.asObservable();
  }
  removeFromCart(itemToRemove: any) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.id !== itemToRemove.id);
    this.cartItems.next(updatedItems);
    this.saveCartToLocalStorage(updatedItems);
  }
  clearCart() {
    this.cartItems.next([]);
    if (typeof window !== 'undefined') { 
      localStorage.removeItem('cart');
    }
  }
}
