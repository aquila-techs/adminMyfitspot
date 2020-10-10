import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHelperService } from '../services/authHelper.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private rout: Router, private authService: AuthHelperService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user = this.authService.currentUser;
      if (user && (user.type == 'su' || (user.level && user.level.isAdmin ))) {
        return true;
      }
      if (localStorage.getItem('fat')) {
        localStorage.removeItem('fat');
      }
      this.rout.navigate(["/login"]);
      return false;

  }

}
