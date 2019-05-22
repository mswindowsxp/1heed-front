import { AuthenticateService } from 'src/app/shared/services/authenticate.service';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';

declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoginFalure: boolean;
  constructor(
    private readonly authService: AuthenticateService,
    private readonly router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
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

  ngOnDestroy(): void {}

  fbLogin() {
    FB.login(response => {
      this.ngZone.run(() => {
        if (response.authResponse) {
          this.authService.login();
        } else {
          this.authService.logout();
          this.isLoginFalure = true;
        }
      });
    });
  }
}
