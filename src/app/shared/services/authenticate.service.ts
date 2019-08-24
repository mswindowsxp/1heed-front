import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticateService {
    public isLoggedIn: boolean;
    FB: any;
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
        localStorage.clear();
        this.isLoggedIn = false;
    }

    setFB(FB: any): void {
        this.FB = FB;
    }
}
