import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticateService {
    public isLoggedIn: boolean;
    FB: any;
    constructor(private readonly router: Router) {}

    // store the URL so we can redirect after logging in

    login(): void {
        this.isLoggedIn = true;
    }

    isLogin(): boolean {
        return this.isLoggedIn;
    }

    logout(): void {
        if (this.FB) {
            this.FB.logout();
        }
        sessionStorage.clear();
        this.isLoggedIn = false;
    }

    setFB(FB: any): void {
        this.FB = FB;
    }
}
