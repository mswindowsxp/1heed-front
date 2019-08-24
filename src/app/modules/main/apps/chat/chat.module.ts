import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatRadioModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { ChatStartComponent } from 'app/modules/main/apps/chat/chat-start/chat-start.component';
import { ChatViewComponent } from 'app/modules/main/apps/chat/chat-view/chat-view.component';
import { ChatComponent } from 'app/modules/main/apps/chat/chat.component';
import { ChatService } from 'app/modules/main/apps/chat/chat.service';
import { ChatChatsSidenavComponent } from 'app/modules/main/apps/chat/sidenavs/left/chats/chats.component';
import { ChatLeftSidenavComponent } from 'app/modules/main/apps/chat/sidenavs/left/left.component';
import { ChatUserSidenavComponent } from 'app/modules/main/apps/chat/sidenavs/left/user/user.component';
import { ShareModule } from 'app/shared/share.module';

const routes: Routes = [
    {
        path: '**',
        component: ChatComponent,
        children: [],
        resolve: {
            chat: ChatService
        }
    }
];

@NgModule({
    declarations: [
        ChatComponent,
        ChatViewComponent,
        ChatStartComponent,
        ChatChatsSidenavComponent,
        ChatUserSidenavComponent,
        ChatLeftSidenavComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatRadioModule,
        MatSidenavModule,
        MatToolbarModule,
        FuseSharedModule,
        MatChipsModule,
        ShareModule
    ],
    providers: [ChatService]
})
export class ChatModule { }
