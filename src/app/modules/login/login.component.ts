import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FacebookService } from 'app/shared/services/facebook.service';
import { forkJoin, Observable } from 'rxjs';

import { AuthenticationService, PageService } from '../../http';
import { AuthenticateService } from '../../shared/services/authenticate.service';
import { environment } from './../../../environments/environment';
import { AuthConst } from './../../shared/constants/auth.const';
import {
    AuthResponse,
    FacebookResponse
} from './../../shared/models/facebook-token';
import { Data } from 'app/shared/models';

declare var FB: any;
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    isLogin = false;
    userInformation;
    widgets;
    token: string;
    userID: string;
    experiedIn: number;
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
        private readonly authService: AuthenticateService,
        private readonly router: Router,
        private ngZone: NgZone,
        private readonly authenticateService: AuthenticationService,
        private readonly facebookService: FacebookService,
        private readonly splasScreen: FuseSplashScreenService,
        private readonly pageService: PageService
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
        this.splasScreen.show();
        if (this.authService.isLogin()) {
            this.token = sessionStorage.getItem(AuthConst.FB_TOKEN);
            this.userID = sessionStorage.getItem(AuthConst.USER_ID);
            this.experiedIn = parseInt(
                sessionStorage.getItem(AuthConst.EXPERIED_TIME),
                0
            );
            this.prepareData({
                expiresIn: this.experiedIn,
                accessToken: this.token,
                userID: this.userID
            });
        } else {
            (window as any).fbAsyncInit = function(): void {
                FB.init({
                    appId: environment.fbAppId,
                    cookie: true,
                    xfbml: true,
                    version: environment.fbApiVer
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
    }

    fbLogin(): void {
        this.splasScreen.show();
        FB.login(
            (response: FacebookResponse) => {
                this.ngZone.run(() => {
                    if (response.authResponse) {
                        this.prepareData(response.authResponse);
                    } else {
                        this.isLogin = true;
                    }
                });
            },
            { scope: 'email,manage_pages' }
        );
    }

    fbLogout(): void {
        FB.logout();
        this.isLogin = false;
    }

    getUserDataData(authResponse: AuthResponse): Observable<any> {
        return this.authenticateService.apiLoginFacebookPost({
            accessToken: authResponse.accessToken,
            userId: authResponse.userID,
            expires: authResponse.expiresIn
        });
    }

    getPagesManage(authResponse: AuthResponse): Observable<any> {
        return forkJoin(
            this.getUserDataData(authResponse),
            this.facebookService.apiFacebookPagesGet(authResponse.accessToken)
        );
    }

    prepareData(authResponse: AuthResponse): void {
        sessionStorage.setItem(AuthConst.FB_TOKEN, authResponse.accessToken);
        sessionStorage.setItem(AuthConst.USER_ID, authResponse.userID);
        sessionStorage.setItem(
            AuthConst.EXPERIED_TIME,
            authResponse.expiresIn.toString()
        );
        this.getPagesManage(authResponse).subscribe(
            data => {
                this.splasScreen.hide();
                this.isLogin = true;
                this.userInformation = data[0];
                this.widgets = data[1].data;
                this.authService.login();
                sessionStorage.setItem(AuthConst.TOKEN, data[0].token);
                sessionStorage.setItem(
                    AuthConst.REFRESH_TOKEN,
                    data[0].refreshToken
                );
            },
            error => {
                this.splasScreen.hide();
            }
        );
    }

    chosingPage(page: Data): void {
        if (this.authService.isLogin()) {
            this.pageService.apiFacebookPagesPost({accessToken: page.access_token, avatar: page.picture.data.url, id: page.id, name: page.name}).subscribe(response => {
                this.router.navigate(['/apps/chat']);
            }, error => {
                console.log(error)
            })
        }
    }
}
