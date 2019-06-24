import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthenticationService } from 'app/http/api/api';
import { AuthConst } from 'app/shared/constants/auth.const';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private _fuseConfigService: FuseConfigService
    ) {}

    ngOnInit() {
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
        const token = sessionStorage.getItem(AuthConst.TOKEN);
        if (token) {
            this.authenticationService
                .apiVerifyTokenPost({ token: token })
                .subscribe(
                    data => {
                        this.authenticationService
                            .apiVerifyTokenPost({
                                token: token
                            })
                            .subscribe(data => {
                                console.log(data);
                            });
                    },
                    error => {
                        this.authenticationService
                            .apiRefreshTokenPost({
                                refreshToken: token
                            })
                            .subscribe(data => {
                                console.log(data);
                            });
                    }
                );
        }
    }
}
