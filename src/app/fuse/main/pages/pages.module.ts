import { NgModule } from '@angular/core';
import { MailConfirmModule } from 'app/fuse/main/pages/authentication/mail-confirm/mail-confirm.module';
import { ComingSoonModule } from 'app/fuse/main/pages/coming-soon/coming-soon.module';
import { Error404Module } from 'app/fuse/main/pages/errors/404/error-404.module';
import { Error500Module } from 'app/fuse/main/pages/errors/500/error-500.module';
import { KnowledgeBaseModule } from 'app/fuse/main/pages/knowledge-base/knowledge-base.module';
import { MaintenanceModule } from 'app/fuse/main/pages/maintenance/maintenence.module';
import { SearchClassicModule } from 'app/fuse/main/pages/search/classic/search-classic.module';
import { SearchModernModule } from 'app/fuse/main/pages/search/modern/search-modern.module';

@NgModule({
    imports: [
        MailConfirmModule,
        ComingSoonModule,
        Error404Module,
        Error500Module,
        MaintenanceModule,
        SearchClassicModule,
        SearchModernModule,
        KnowledgeBaseModule
    ]
})
export class PagesModule {}
