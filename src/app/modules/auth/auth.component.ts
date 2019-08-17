import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthenticationService } from 'app/core/http/api/api';
import { AuthConst } from 'app/shared/constants/auth.const';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginResponse } from '../../core/http/model/loginResponse';
import { AuthenticateService } from './../../shared/services/authenticate.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any>;
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly _fuseConfigService: FuseConfigService,
        private readonly router: Router,
        private readonly authSerice: AuthenticateService
    ) {
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
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Check token exist in local storage or not
        const token = localStorage.getItem(AuthConst.TOKEN);
        const refreshToken = localStorage.getItem(AuthConst.REFRESH_TOKEN);
        if (token) {
            // Verify token
            this.authenticationService
                .apiAuthVerifyTokenPost({ token: token })
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(
                    () => {
                        this.authSerice.login();
                        setTimeout(() => {
                            this.router.navigate(['/login']);
                        }, 0);
                    },
                    () => {
                        // Refresh token if token can not verify
                        this.authenticationService
                            .apiAuthRefreshTokenPost({
                                refreshToken: refreshToken
                            })
                            .pipe(takeUntil(this._unsubscribeAll))
                            .subscribe(
                                (data: LoginResponse) => {
                                    localStorage.setItem(AuthConst.FB_TOKEN, data.token);
                                    localStorage.setItem(AuthConst.TOKEN, data.token);
                                    this.authSerice.login();
                                    setTimeout(() => {
                                        this.router.navigate(['/login']);
                                    }, 0);
                                },
                                () => {
                                    // navigate to login screen if can not refresh token
                                    localStorage.clear();
                                    setTimeout(() => {
                                        this.router.navigate(['/login']);
                                    }, 0);
                                }
                            );
                    }
                );
        } else {
            setTimeout(() => {
                this.router.navigate(['/login']);
            }, 0);
        }
    }

    ngOnDestroy(): void {
        if (this._unsubscribeAll) {
            this._unsubscribeAll.next();
            this._unsubscribeAll.complete();
        }
    }
}
