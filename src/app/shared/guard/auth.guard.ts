import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticateService } from 'src/app/shared/services/authenticate.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.authService.isLogin) {
      return true;
    }

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
