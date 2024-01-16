import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../interface/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  adminUrl = 'https://dbln.onrender.com/products';

  constructor(private http: HttpClient) { }
  getData():Observable<Product[]>{
    return this.http.get<Product[]>(this.adminUrl)
  }
  getPrdAdmin():Observable<Product[]>{
    return this.http.get<Product[]>(this.adminUrl);
  }
  getProductById(id:string):Observable<Product>{
    return this.http.get<Product>(`${this.adminUrl}/${id}`)
  }
  deletePrdAdmin(id:string):Observable<Product>{
    return this.http.delete<Product>(`${this.adminUrl}/${id}`);
  }
  createPrdAdmin(product:Product):Observable<Product>{
    return this.http.post<Product>(this.adminUrl, product);
  }
  updatePrdAdmin(id:string, product:Product):Observable<Product>{
    return this.http.put<Product>(`${this.adminUrl}/${id}`, product);
  }
}
