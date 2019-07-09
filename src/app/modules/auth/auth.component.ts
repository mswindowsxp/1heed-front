import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthenticationService } from 'app/core/http/api/api';
import { AuthConst } from 'app/shared/constants/auth.const';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginResponse } from '../../core/http/model/loginResponse';
import { FuseSplashScreenService } from './../../../@fuse/services/splash-screen.service';
import { AuthenticateService } from './../../shared/services/authenticate.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    private _unsubscribeAll: Subject<any>;
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly _fuseConfigService: FuseConfigService,
        private readonly router: Router,
        private readonly splasScreen: FuseSplashScreenService,
        private readonly authSerice: AuthenticateService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

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
            this.authenticationService.apiAuthVerifyTokenPost({ token: token }).pipe(takeUntil(this._unsubscribeAll)).subscribe(
                data => {
                    this.authSerice.login();
                    this.router.navigate(['/login']);
                },
                error => {
                    // Refresh token if token can not verify
                    this.authenticationService
                        .apiAuthRefreshTokenPost({
                            refreshToken: refreshToken
                        }).pipe(takeUntil(this._unsubscribeAll))
                        .subscribe(
                            (data: LoginResponse) => {
                                sessionStorage.setItem(AuthConst.FB_TOKEN, data.token);
                                sessionStorage.setItem(AuthConst.TOKEN, data.token);
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
