import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticateService {
    public isLoggedIn: boolean;

    constructor(private readonly router: Router) {}

    // store the URL so we can redirect after logging in

    login(): void {
        this.isLoggedIn = true;
    }
}
