import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseUtils } from '@fuse/utils';
import { Conversation, ConversationResponse, ConversationService } from 'app/core/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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
     * @param {HttpClient} _httpClient
     * @param {ConversationService} conversationService
     */
    constructor(
        private _httpClient: HttpClient,
        private readonly conversationService: ConversationService,
        private readonly splashScreenService: FuseSplashScreenService
    ) {
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
            Promise.all([this.getContacts(), this.getChats(), this.getUser()]).then(([contacts, chats, user]) => {
                this.contacts = contacts;
                this.chats = chats;
                this.user = user;
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
    getChat(chatID): Promise<any> {
        const chatItem = this.chats.data.find(item => {
            return item.id === chatID;
        });

        // Create new chat, if it's not created yet.
        if (!chatItem) {
            this.createNewChat(chatID).then(newChats => {
                this.getChat(chatID);
            });
            return;
        }

        return new Promise(() => {
            this.onChatSelected.next(chatItem);
        });
    }

    /**
     * Create new chat
     *
     * @param contactId
     * @returns {Promise<any>}
     */
    createNewChat(contactId): Promise<any> {
        return new Promise((resolve, reject) => {
            const contact = this.contacts.find(item => {
                return item.id === contactId;
            });

            const chatId = FuseUtils.generateGUID();

            const chat = {
                id: chatId,
                dialog: []
            };

            const chatListItem = {
                contactId: contactId,
                id: chatId,
                lastMessageTime: '2017-02-18T10:30:18.931Z',
                name: contact.name,
                unread: null
            };

            // Add new chat list item to the user's chat list
            this.user.chatList.push(chatListItem);

            // Post the created chat
            this._httpClient.post('api/chat-chats', { ...chat }).subscribe((response: any) => {
                // Post the new the user data
                this._httpClient.post('api/chat-user/' + this.user.id, this.user).subscribe(newUserData => {
                    // Update the user data from server
                    this.getUser().then(updatedUser => {
                        this.onUserUpdated.next(updatedUser);
                        resolve(updatedUser);
                    });
                });
            }, reject);
        });
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
    updateUserData(userData): void {
        this._httpClient.post('api/chat-user/' + this.user.id, userData).subscribe((response: any) => {
            this.user = userData;
        });
    }

    /**
     * Update the chat dialog
     *
     * @param chatId
     * @param dialog
     * @returns {Promise<any>}
     */
    updateDialog(chatId, dialog): Promise<any> {
        return new Promise((resolve, reject) => {
            const newData = {
                id: chatId,
                dialog: dialog
            };

            this._httpClient.post('api/chat-chats/' + chatId, newData).subscribe(updatedChat => {
                resolve(updatedChat);
            }, reject);
        });
    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    getContacts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-contacts').subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
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
    getUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-user').subscribe((response: any) => {
                resolve(response[0]);
            }, reject);
        });
    }
}
