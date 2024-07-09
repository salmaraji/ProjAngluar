import { CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let authenticated = this.authService.isAuthenticated();
    if (!authenticated) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }
}
