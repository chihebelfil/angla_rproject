import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot) {
      const expectedRole = route.data.role;
      console.log(expectedRole);
    if(this.tokenStorage.isLoggedIn && this.tokenStorage.getRole(expectedRole)){
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }

  
  
}
