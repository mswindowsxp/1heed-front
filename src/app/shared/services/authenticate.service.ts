import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthConst } from './../constants/auth.const';

@Injectable({ providedIn: 'root' })
export class AuthenticateService {
    public isLoggedIn: boolean;

    constructor(private readonly router: Router) {}

    // store the URL so we can redirect after logging in

    login(token: string): void {
        this.isLoggedIn = true;
        sessionStorage.setItem(AuthConst.TOKEN, token);
    }
}
