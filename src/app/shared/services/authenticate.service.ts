import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';

declare var FB: any;

@Injectable({ providedIn: 'root' })
export class AuthenticateService {
  isLogin: boolean;
  constructor(private ngZone: NgZone) {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId: '671546413259624',
        cookie: true,
        xfbml: true,
        version: 'v3.3'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
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

  // store the URL so we can redirect after logging in

  login(): Observable<boolean> {
    return FB.login(response => {
      return this.ngZone.run(() => {
        if (response.authResponse) {
          this.isLogin = true;
          return this.getUserDataData(response.authResponse);
        } else {
          return of(false);
        }
      });
    });
  }

  logout() {
    this.isLogin = false;
    FB.logout();
  }

  getUserDataData(response: any) {
    return of(true);

    // this.authenticationService
    //   .apiOauth2LoginFacebookPost(response.authResponse.accessToken)
    //   .subscribe(
    //     data => {
    //       this.isLogin = true
    //       this.router.navigate(['/dashboard']);
    //     },
    //     error => {
    //       this.isLogin = false
    //     }
    //   );
  }
}
