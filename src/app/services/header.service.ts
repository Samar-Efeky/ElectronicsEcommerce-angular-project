import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(private _httpClient:HttpClient) { }
  getHeaderImages():Observable<any>{
    return this._httpClient.get(`../assets/api-files/Laptops-us-en-true-1-100-images--.json`);
  }
}
