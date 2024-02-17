import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../interface/Product';
import { TokenInterceptorService } from '../interceptor/token-interceptor.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  adminUrl = 'https://dbln.onrender.com/products';

  constructor(
    private http: HttpClient,
    private tokenInterceptor: TokenInterceptorService,
    private httpHandler: HttpHandler
  ) {}
  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.adminUrl);
  }
  getPrdAdmin(): Observable<Product[]> {
    return this.http.get<Product[]>(this.adminUrl);
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.adminUrl}/${id}`);
  }
  deletePrdAdmin(id: string): Observable<any> {
    const request: HttpRequest<any> = new HttpRequest(
      'DELETE',
      `${this.adminUrl}/${id}`
    );
    return this.tokenInterceptor.intercept(request, this.httpHandler);
  }

  createPrdAdmin(product: Product): Observable<any> {
    const request: HttpRequest<any> = new HttpRequest(
      'POST',
      this.adminUrl,
      product
    );
    return this.tokenInterceptor.intercept(request, this.httpHandler);
  }

  updatePrdAdmin(id: string, product: Product): Observable<any> {
    const request: HttpRequest<any> = new HttpRequest(
      'PUT',
      `${this.adminUrl}/${id}`,
      product
    );
    return this.tokenInterceptor.intercept(request, this.httpHandler);
  }
}
