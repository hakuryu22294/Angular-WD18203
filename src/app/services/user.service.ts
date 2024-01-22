import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/User';
import { Observable, map, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService{  
  userURL = 'https://dbln.onrender.com/users';
  constructor(private http:HttpClient) { }
  getAll(){
    return this.http.get(this.userURL)
  }
  getByEmail(email: string): Observable<any> { 
    return this.getAll().pipe( 
      map((users: any) => users.find((user: any) => user.email === email)),
      switchMap((user: any) => {
        if (user) {
          return this.http.get(this.userURL + '/' + user.id);
        } else {
          throw new Error('User not found');
        }
      })
    );
  }

  
  register(email:string, username:string, password:string, role:string='member'):Observable<any>{
    const body={
      email,
      username,
      password,
      role
    }
    return this.http.post(this.userURL,body)
  }

  isLoggedIn() {
    return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined'
      && sessionStorage.getItem('id') !== null;
  }
  
  getRole() {
    return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined'
      ? sessionStorage.getItem('role')?.toString()
      : null;
  }
  
}

