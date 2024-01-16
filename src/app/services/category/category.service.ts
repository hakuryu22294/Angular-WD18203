import { Injectable } from '@angular/core';
import { Category } from '../../interface/Category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  cateUrl = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) { }
  getAllCate():Observable<Category[]>{
    return this.http.get<Category[]>(this.cateUrl);
  }
  deleteCate(id:number):Observable<Category>{
    return this.http.delete<Category>(`${this.cateUrl}/${id}`);
  }
  createCate(category:Category):Observable<Category>{
    return this.http.post<Category>(this.cateUrl, category);
  }
  updateCate(id:number, category:Category):Observable<Category>{
    return this.http.put<Category>(`${this.cateUrl}/${id}`, category);
  }
}
