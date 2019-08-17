import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { Conversation, ConversationResponse, ConversationService } from 'app/core/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable()
export class ChatService implements Resolve<any> {
    contacts: any[];
    chats: ConversationResponse;
    user: any;
    onChatSelected: BehaviorSubject<Conversation>;
    onContactSelected: BehaviorSubject<any>;
    onChatsUpdated: Subject<any>;
    onUserUpdated: Subject<any>;
    onLeftSidenavViewChanged: Subject<any>;
    onRightSidenavViewChanged: Subject<any>;

    /**
     * Constructor
     *
     * @param {ConversationService} conversationService
     * @param splashScreenService
     */
    constructor(private readonly conversationService: ConversationService, private readonly splashScreenService: FuseSplashScreenService) {
        // Set the defaults
        this.onChatSelected = new BehaviorSubject(null);
        this.onContactSelected = new BehaviorSubject(null);
        this.onChatsUpdated = new Subject();
        this.onUserUpdated = new Subject();
        this.onLeftSidenavViewChanged = new Subject();
        this.onRightSidenavViewChanged = new Subject();
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getChats()]).then(([chats]) => {
                this.chats = chats;
                this.splashScreenService.hide();
                resolve();
            }, reject);
        });
    }

    /**
     * Get chat
     *
     * @param contactId
     * @returns {Promise<any>}
     */
    getChat(chatID): void {
        const chatItem = this.chats.data.find(item => {
            return item.id === chatID;
        });
        this.onChatSelected.next(chatItem);
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
     * Select contact
     *
     * @param contact
     */
    selectContact(contact): void {
        this.onContactSelected.next(contact);
    }

    /**
     * Set user status
     *
     * @param status
     */
    setUserStatus(status): void {
        this.user.status = status;
    }

    /**
     * Update user data
     *
     * @param userData
     */
    updateUserData(userData): void {}

    /**
     * Update the chat dialog
     *
     * @param chatId
     * @param dialog
     * @returns {Promise<any>}
     */
    updateDialog(chatId, dialog): Observable<any> {
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
     * Get chats
     *
     * @returns {Promise<any>}
     */
    getChats(): Promise<ConversationResponse> {
        return this.conversationService.apiConversationGet().toPromise();
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
