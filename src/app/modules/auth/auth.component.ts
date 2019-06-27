import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthenticationService } from 'app/http/api/api';
import { AuthConst } from 'app/shared/constants/auth.const';

import { FuseSplashScreenService } from './../../../@fuse/services/splash-screen.service';
import { LoginResponse } from './../../http/model/loginResponse';
import { AuthenticateService } from './../../shared/services/authenticate.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly _fuseConfigService: FuseConfigService,
        private readonly router: Router,
        private readonly splasScreen: FuseSplashScreenService,
        private readonly authSerice: AuthenticateService
    ) {}

    ngOnInit(): void {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        // Check token exist in local storage or not
        const token = sessionStorage.getItem(AuthConst.TOKEN);
        const refreshToken = sessionStorage.getItem(AuthConst.REFRESH_TOKEN);
        if (token) {
            this.splasScreen.show();
            // Verify token
            this.authenticationService
                .apiVerifyTokenPost({ token: token })
                .subscribe(
                    data => {
                        this.authSerice.login();
                        this.router.navigate(['/login']);
                    },
                    error => {
                        // Refresh token if token can not verify
                        this.authenticationService
                            .apiRefreshTokenPost({
                                refreshToken: refreshToken
                            })
                            .subscribe(
                                (data: LoginResponse) => {
                                    sessionStorage.setItem(
                                        AuthConst.FB_TOKEN,
                                        data.token
                                    );
                                    sessionStorage.setItem(
                                        AuthConst.TOKEN,
                                        data.token
                                    );
                                    this.authSerice.login();
                                    this.router.navigate(['/login']);
                                },
                                error => {
                                    // navigate to login screen if can not refresh token
                                    this.router.navigate(['/login']);
                                }
                            );
                    }
                );
        } else {
            this.router.navigate(['/login']);
        }
    }
}
