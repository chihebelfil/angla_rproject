import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenStorage:TokenStorageService, private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.tokenStorage.isLoggedIn         // {1}
      .pipe(
        take(1),                              // {2} 
        map((isLoggedIn: boolean) => {         // {3}
          if (!isLoggedIn){
            this.router.navigate(['/account/signin']);  // {4}
            return false;
          }
          return true;
        })
      );
  }
  
}
