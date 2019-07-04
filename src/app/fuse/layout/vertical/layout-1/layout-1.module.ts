import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { ContentModule } from 'app/fuse/layout/components/content/content.module';
import { FooterModule } from 'app/fuse/layout/components/footer/footer.module';
import { NavbarModule } from 'app/fuse/layout/components/navbar/navbar.module';
import { QuickPanelModule } from 'app/fuse/layout/components/quick-panel/quick-panel.module';
import { ToolbarModule } from 'app/fuse/layout/components/toolbar/toolbar.module';
import { VerticalLayout1Component } from 'app/fuse/layout/vertical/layout-1/layout-1.component';
import { ChatPanelModule } from 'app/modules/chat-panel/chat-panel.module';

@NgModule({
    declarations: [VerticalLayout1Component],
    imports: [
        RouterModule,
        FuseSharedModule,
        FuseSidebarModule,
        ChatPanelModule,
        ContentModule,
        FooterModule,
        NavbarModule,
        QuickPanelModule,
        ToolbarModule
    ],
    exports: [VerticalLayout1Component]
})
export class VerticalLayout1Module {}
