import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';

import { AuthenticationService } from '../../../../http';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';

declare var FB: any;
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    isLoginFailure: boolean;
    isLogin: boolean;
    /**
     *
     * @param _fuseConfigService
     * @param _formBuilder
     * @param authService
     * @param router
     * @param ngZone
     * @param authenticateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private readonly authService: AuthenticateService,
        private readonly router: Router,
        private ngZone: NgZone,
        private readonly authenticateService: AuthenticationService
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        if (this.authService.isLoggedIn) {
            this.router.navigate(['/dashboard']);
        }
        (window as any).fbAsyncInit = function(): void {
            FB.init({
                appId: '671546413259624',
                cookie: true,
                xfbml: true,
                version: 'v3.3'
            });
            FB.AppEvents.logPageView();
        };

        (function(d, s, id): void {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }

    fbLogin(): void {
        FB.login(response => {
            this.ngZone.run(() => {
                if (response.authResponse) {
                    this.getUserDataData(response);
                    this.authService.login();
                } else {
                    this.isLoginFailure = true;
                }
            });
        });
    }

    getUserDataData(response: any): void {
        this.authenticateService
            .apiOauth2LoginFacebookPost({
                accessToken: response.authResponse.accessToken,
                userId: response.authResponse.userID,
                expires: response.authResponse.expiresIn
            })
            .subscribe(
                data => {
                    debugger;
                    this.isLogin = true;
                    // this.router.navigate(['/dashboard']);
                },
                error => {
                    this.isLogin = false;
                }
            );
    }
}
