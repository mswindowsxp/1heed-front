import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConst } from 'app/shared/constants/auth.const';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizedRequestHttpInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenCurrent = sessionStorage.getItem(AuthConst.TOKEN);
        if (tokenCurrent) {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + tokenCurrent
                }
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}
