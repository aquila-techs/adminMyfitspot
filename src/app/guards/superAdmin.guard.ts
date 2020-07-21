import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHelperService } from '../services/authHelper.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
  constructor(private auth: AuthHelperService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this.auth.currentUser;
    console.log(user)
    if (user && (user.type == 'su' && (user.level && user.level.isAdmin))) return true;

    this.router.navigate(['/dashboard']);
    return false;


  }
}
