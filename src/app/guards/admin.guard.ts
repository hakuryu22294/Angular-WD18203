import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (
      typeof window !== 'undefined' &&
      typeof window.sessionStorage !== 'undefined'
    ) {
      const role = sessionStorage.getItem('role');
      console.log(role);
      if (role === 'admin') {
        return true;
      } else {
        this.router.navigateByUrl('/error');
        return false;
      }
    } else {
      return false;
    }
  }
}