import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve,reject)=>{
      this.auth.isAuth$.subscribe({
        next: (bool: boolean)=>{
          const isAuth = bool
          if(isAuth){
            resolve(isAuth)
          }else{
            this.router.navigate(['/signup'])
            reject(isAuth)
          }
        }
      })
    });
  }

}
