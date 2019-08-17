import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {FuseUtils} from '@fuse/utils';
import {Observable, of} from 'rxjs';

@Injectable()
export class ChatPanelService {
    contacts: any[];
    chats: any[];
    user: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
    }

    /**
     * Loader
     *
     * @returns {Promise<any> | any}
     */
    loadContacts(): Promise<any> | any {

    }

    /**
     * Get chat
     *
     * @param contactId
     * @returns {Promise<any>}
     */
    getChat(contactId): Observable<any> {
        return of({});
    }


    /**
     * Create new chat
     *
     * @param contactId
     * @returns {Promise<any>}
     */
    createNewChat(contactId): Observable<any> {
        return of({});
    }

    /**
     * Update the chat
     *
     * @param chatId
     * @param dialog
     * @returns {Promise<any>}
     */
    updateChat(chatId, dialog): Observable<any> {
        return of({});
    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    getContacts(): Observable<any> {
        return of({});
    }

    /**
     * Get user
     *
     * @returns {Promise<any>}
     */
    getUser(): Observable<any> {
        return of({});
    }
}
