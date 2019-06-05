import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { PageService } from 'app/http/api/page.service';
import { forkJoin, Observable } from 'rxjs';

import { AuthenticationService } from '../../http';
import { AuthenticateService } from '../../shared/services/authenticate.service';

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
                    this.prepareData(response);
                    this.authService.login();
                } else {
                    this.isLogin = true;
                }
            });
        });
    }

    fbLogout() {
        FB.logout();
        this.isLogin = false;
    }

    getUserDataData(response: any): Observable<any> {
        return this.authenticateService.apiLoginFacebookPost({
            accessToken: response.authResponse.accessToken,
            userId: response.authResponse.userID,
            expires: response.authResponse.expiresIn
        });
    }

    getPagesManage(response: any): Observable<any> {
        return forkJoin(
            this.getUserDataData(response),
            this.pageService.apiFacebookPagesGet(
                response.authResponse.accessToken
            )
        );
    }

    prepareData(response: any): void {
        this.getPagesManage(response).subscribe(data => {
            this.authService.isLoggedIn = true;
            this.isLogin = true;
            this.userInformation = data[0];
            this.widgets = data[1];
            // this.widgets = listPage;
        });
    }

    chosingPage(page) {
        if (this.authService.isLoggedIn) {
            this.router.navigate(['/dashboard']);
        }
    }
}
