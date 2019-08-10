import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../../core/http/configuration';
import { PageAccounts } from '../../core/http/model/pageAccounts';

@Injectable()
export class FacebookService {
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient) {}

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }

    /**
     *
     * get list of pages user administer
     * @param authorization
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiFacebookPagesGet(authorization: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling apiFacebookPagesGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = ['application/json'];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        //graph.facebook.com/v3.3/me/accounts?access_token=<access_token>&fields=id,name,picture,access_token
        return this.httpClient.get<Array<PageAccounts>>(
            `https://graph.facebook.com/v3.3/me/accounts?access_token=${authorization}&fields=id,name,picture,access_token`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
}
