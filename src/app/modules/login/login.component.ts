import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { Data } from 'app/shared/models';
import { FacebookService } from 'app/shared/services/facebook.service';
import { UserInformationService } from 'app/shared/services/user-information.service';
import { forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService, LoginResponse, PageService } from '../../core/http';
import { AuthenticateService } from '../../shared/services/authenticate.service';
import { environment } from './../../../environments/environment';
import { AuthConst } from './../../shared/constants/auth.const';
import { AuthResponse, FacebookResponse } from './../../shared/models/facebook-token';

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
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param _fuseConfigService
     * @param authService
     * @param router
     * @param ngZone
     * @param authenticateService
     * @param facebookService
     * @param splashScreen
     * @param pageService
     * @param userInfoService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private readonly authService: AuthenticateService,
        private readonly router: Router,
        private readonly ngZone: NgZone,
        private readonly authenticateService: AuthenticationService,
        private readonly facebookService: FacebookService,
        private readonly splashScreen: FuseSplashScreenService,
        private readonly pageService: PageService,
        private readonly userInfoService: UserInformationService
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

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.token = localStorage.getItem(AuthConst.FB_TOKEN);
        if (this.token) {
            this.token = localStorage.getItem(AuthConst.FB_TOKEN);
            this.userID = localStorage.getItem(AuthConst.USER_ID);
            this.experiedIn = parseInt(localStorage.getItem(AuthConst.EXPERIED_TIME), 0);
            this.splashScreen.show();
            this.prepareData({
                expiresIn: this.experiedIn,
                accessToken: this.token,
                userID: this.userID
            });
        }
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
            let js = null;
            const fjs: any = d.getElementsByTagName(s)[0];
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
        this.splashScreen.show();
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
            { scope: 'email,manage_pages,pages_show_list,pages_messaging,public_profile' }
        );
        this.authService.setFB(FB);
    }

    fbLogout(): void {
        this.authService.logout();
        this.isLogin = false;
    }

    getUserDataData(authResponse: AuthResponse): Observable<LoginResponse> {
        return this.authenticateService.apiLoginFacebookPost({
            accessToken: authResponse.accessToken,
            userId: authResponse.userID,
            expires: authResponse.expiresIn
        });
    }

    getPagesManage(authResponse: AuthResponse): Observable<[LoginResponse, any]> {
        return forkJoin(this.getUserDataData(authResponse), this.facebookService.apiFacebookPagesGet(authResponse.accessToken));
    }

    prepareData(authResponse: AuthResponse): void {
        localStorage.setItem(AuthConst.FB_TOKEN, authResponse.accessToken);
        localStorage.setItem(AuthConst.USER_ID, authResponse.userID);
        localStorage.setItem(AuthConst.EXPERIED_TIME, authResponse.expiresIn.toString());
        this.getPagesManage(authResponse)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                data => {
                    this.processForSpecifyData(data);
                },
                () => {
                    this.splashScreen.hide();
                }
            );
    }

    private processForSpecifyData(data: any): void {
        this.isLogin = true;
        this.userInformation = data[0];
        this.widgets = data[1].data;
        this.userInfoService.setUserInformation({ name: this.userInformation.user.name, avatarUrl: this.userInformation.user.avatar });
        this.userInfoService.setListPage(this.widgets);
        this.authService.login();
        localStorage.setItem(AuthConst.TOKEN, data[0].token);
        localStorage.setItem(AuthConst.REFRESH_TOKEN, data[0].refreshToken);
        this.splashScreen.hide();
    }

    choosingPage(page: Data): void {
        this.splashScreen.show();
        this.pageService
            .apiFacebookPagesPost({ accessToken: page.access_token, avatar: page.picture.data.url, id: page.id, name: page.name })
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                () => {
                    localStorage.setItem(AuthConst.PAGE_TOKEN, page.access_token);
                    this.userInfoService.setPageSeletedInfor({ avatarUrl: page.picture.data.url, name: page.name });
                    this.router.navigate(['/apps/chat']);
                },
                () => {
                    this.splashScreen.hide();
                }
            );
    }
}
