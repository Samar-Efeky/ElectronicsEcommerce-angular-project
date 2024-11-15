import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable(); 

  categories: string[] = [
    'Laptops', 'Digital camera', 'Tablets',
    'Smartwatches', 'Smart TVs', 'Headphones',
    '3D Printers', 'Gaming Consoles', 'Monitors',
    'Speakers', 'Network Devices', 'Electronic components',
    'Computers', 'Mobiles'
  ];

  constructor(private _httpClient: HttpClient) { }

  getAllProducts(category: string): Observable<any[]> {
    return this._httpClient.get(`../assets/api-files/${category}-us-en-true-1-100-images--.json`).pipe(
      map((data: any) => {
        let productsData = data.images.slice(0, 30);
        let startIndex = this.productsSubject.getValue().length;

        let processedProducts = productsData.map((product: any, index: number) => ({
          ...product,
          id: startIndex + index + 1,
          randomPrice: this.getRandom(20, 20000),
          countRated: this.getRandom(1, 100),
          rating: this.getRandom(1, 5),
          randomOffer: this.getRandom(200, 600),
          category: category,
        }));
        this.productsSubject.next([...this.productsSubject.getValue(), ...processedProducts]);
        return processedProducts; 
      })
    );
  }

  getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
