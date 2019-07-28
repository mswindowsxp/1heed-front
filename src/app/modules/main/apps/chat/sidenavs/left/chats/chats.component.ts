import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { fuseAnimations } from '@fuse/animations';
import { FuseMatSidenavHelperService } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';
import { ChatService } from 'app/modules/main/apps/chat/chat.service';
import { AuthConst } from 'app/shared/constants/auth.const';
import { ObjectInfor, UserInformationService } from 'app/shared/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Conversation } from '../../../../../../../core/http';

@Component({
    selector: 'chat-chats-sidenav',
    templateUrl: './chats.component.html',
    styleUrls: ['./chats.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ChatChatsSidenavComponent implements OnInit, OnDestroy {
    chats: Conversation[];
    chatSearch: any;
    contacts: any[];
    searchText: string;
    user: any;
    pageToken: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ChatService} _chatService
     * @param {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
     * @param {ObservableMedia} _observableMedia
     */
    constructor(
        private _chatService: ChatService,
        private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
        public _observableMedia: ObservableMedia,
        private readonly userInformationService: UserInformationService
    ) {
        // Set the defaults
        this.chatSearch = {
            name: ''
        };
        this.searchText = '';

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
        this.user = this._chatService.user;
        this.userInformationService.pageSeleted$.pipe(takeUntil(this._unsubscribeAll)).subscribe((userInfor: ObjectInfor) => {
            this.user = {
                ...this.user,
                name: userInfor.name,
                avatar: userInfor.avatarUrl
            };
        });
        this.chats = this._chatService.chats.data;
        this.contacts = this._chatService.contacts;
        this.pageToken = sessionStorage.getItem(AuthConst.PAGE_TOKEN);
        this._chatService.onChatsUpdated.pipe(takeUntil(this._unsubscribeAll)).subscribe(updatedChats => {
            this.chats = updatedChats;
        });

        this._chatService.onUserUpdated.pipe(takeUntil(this._unsubscribeAll)).subscribe(updatedUser => {
            this.user = updatedUser;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get chat
     *
     * @param contact
     */
    getChat(chatID): void {
        this._chatService.getChat(chatID);
        if (!this._observableMedia.isActive('gt-md')) {
            this._fuseMatSidenavHelperService.getSidenav('chat-left-sidenav').toggle();
        }
    }

    /**
     * Set user status
     *
     * @param status
     */
    setUserStatus(status): void {
        this._chatService.setUserStatus(status);
    }

    /**
     * Change left sidenav view
     *
     * @param view
     */
    changeLeftSidenavView(view): void {
        this._chatService.onLeftSidenavViewChanged.next(view);
    }

    /**
     * Logout
     */
    logout(): void {
        console.log('logout triggered');
    }
}
