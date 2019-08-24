import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { ChatService } from 'app/modules/main/apps/chat/chat.service';
import { AuthConst } from 'app/shared/constants/auth.const';
import { TagEnum } from 'app/shared/constants/tag-code.enum';
import { TagMessage } from 'app/shared/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Conversation, Message } from '../../../../../core/http';

@Component({
    selector: 'chat-view',
    templateUrl: './chat-view.component.html',
    styleUrls: ['./chat-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatViewComponent implements OnInit, OnDestroy, AfterViewInit {
    user: any;
    chat: any;
    dialog: Conversation;
    contact: any;
    replyInput: any;
    selectedChat: Conversation;
    pageToken: string;
    avarSrc: string;
    @ViewChild(FusePerfectScrollbarDirective)
    directiveScroll: FusePerfectScrollbarDirective;

    @ViewChildren('replyInput')
    replyInputField;

    @ViewChild('replyForm')
    replyForm: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;

    availableTag: TagMessage[] = [
        { name: 'Lọc Câu Hỏi', color: 'primary', tagCode: TagEnum.QUESTION },
        { name: 'Lọc Kiểm Hàng', color: undefined, tagCode: TagEnum.CHECK_REPO },
        { name: 'Lọc Mua Hàng', color: 'accent', tagCode: TagEnum.BUY_PRODUCT },
        { name: 'Lọc Trả Hàng', color: 'accent', tagCode: TagEnum.SEND_PRODUCT },
        { name: 'Lọc Đã Gửi', color: 'warn', tagCode: TagEnum.SENT_PRODUCT },
        { name: 'Lọc Hết Hàng', color: 'warn', tagCode: TagEnum.SOLD_OUT },
        { name: 'Lọc Chưa Gắn Thẻ', color: 'accent', tagCode: TagEnum.UN_TAG }
    ];
    /**
     * Constructor
     *
     * @param {ChatService} _chatService
     */
    constructor(private _chatService: ChatService) {
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
        this.pageToken = localStorage.getItem(AuthConst.PAGE_TOKEN);
        this.user = this._chatService.user;
        this._chatService.onChatSelected.pipe(takeUntil(this._unsubscribeAll)).subscribe((chatData: Conversation) => {
            if (chatData) {
                this.selectedChat = chatData;
                // this.contact = chatData.contact;
                this.dialog = chatData;
                this.readyToReply();
            }
        });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        this.replyInput = this.replyInputField.first.nativeElement;
        this.readyToReply();
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
     * Decide whether to show or not the contact's avatar in the message row
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    shouldShowContactAvatar(message: any, i, userID: string): boolean {
        return (
            message.from.id !== userID &&
            ((this.dialog.messages.data[i + 1] && this.dialog.messages.data[i + 1].from.id !== message.from.id) ||
                !this.dialog.messages.data[i + 1])
        );
    }

    /**
     * Check if the given message is the first message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isFirstMessageOfGroup(message, i): boolean {
        return i === 0 || (this.dialog.messages.data[i - 1] && this.dialog.messages.data[i - 1].from.id !== message.from.id);
    }

    /**
     * Check if the given message is the last message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isLastMessageOfGroup(message, i): boolean {
        return (
            i === this.dialog.messages.data.length - 1 ||
            (this.dialog.messages.data[i + 1] && this.dialog.messages.data[i + 1].from.id !== message.from.id)
        );
    }

    /**
     * Select contact
     */
    selectContact(): void {
        this._chatService.selectContact(this.contact);
    }

    /**
     * Ready to reply
     */
    readyToReply(): void {
        setTimeout(() => {
            this.focusReplyInput();
            this.scrollToBottom();
        });
    }

    /**
     * Focus to the reply input
     */
    focusReplyInput(): void {
        setTimeout(() => {
            this.replyInput.focus();
        });
    }

    /**
     * Scroll to the bottom
     *
     * @param {number} speed
     */
    scrollToBottom(speed?: number): void {
        speed = speed || 400;
        if (this.directiveScroll) {
            this.directiveScroll.update();

            setTimeout(() => {
                this.directiveScroll.scrollToBottom(0, speed);
            });
        }
    }

    /**
     * Reply
     */
    reply(event): void {}

    isImageEmbed(data: Message): boolean {
        return (
            data &&
            data.shares &&
            data.shares.data[0] &&
            data.shares.data[0].link &&
            (data.shares.data[0].link.indexOf('.png') !== -1 || data.shares.data[0].link.indexOf('.jpg') !== -1)
        );
    }
    isAttachment(data: Message): boolean | any {
        return data && data.attachments && data.attachments.data[0];
    }

    isImage(attachment: any): boolean {
        return attachment && attachment.mime_type.indexOf('image') !== -1;
    }

    isFile(attachment: any): boolean {
        return attachment && attachment.mime_type.indexOf('image') === -1 && attachment.mime_type.indexOf('video') === -1;
    }

    isVideoEmbed(attachment: any): boolean {
        return attachment && attachment.mime_type.indexOf('video') !== -1;
    }

    tagConvesation(tag: TagMessage) {
        console.log(tag);
    }
}
