import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticateService {
  constructor(private readonly router: Router) {}
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  login(): void {
    this.isLoggedIn = true;
    this.router.navigate(['/dashboard']);
  }
  logout(): void {
    this.isLoggedIn = false;
  }
}
