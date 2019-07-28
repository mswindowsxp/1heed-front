import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { apiConfigFactory } from 'app/configs/';
import { ApiModule, BASE_PATH } from 'app/core/http';
import { AppStoreModule } from 'app/core/store/store.module';
import { FakeDbService } from 'app/fuse/fake-db/fake-db.service';
import { fuseConfig } from 'app/fuse/fuse-config';
import { LayoutModule } from 'app/fuse/layout/layout.module';
import { ShareModule } from 'app/shared/share.module';
import { environment } from 'environments/environment';
import { CoreRoutingModule } from './core.routing';
import { AuthorizedRequestHttpInterceptor } from './interceptor';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        LayoutModule,
        AppStoreModule,
        ApiModule.forRoot(apiConfigFactory),
        ShareModule,
        MatIconModule,
        FuseProgressBarModule,
        FuseModule.forRoot(fuseConfig),
        FuseSidebarModule,
        FuseThemeOptionsModule,
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),
        MatMomentDateModule,
        MatButtonModule,
        FuseSharedModule,
        CoreRoutingModule
    ],
    providers: [
        { provide: BASE_PATH, useValue: environment.apiBasePath },
        { provide: HTTP_INTERCEPTORS, useClass: AuthorizedRequestHttpInterceptor, multi: true }
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule,
        LayoutModule,
        AppStoreModule,
        ApiModule,
        ShareModule,
        MatIconModule,
        FuseProgressBarModule,
        FuseModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        InMemoryWebApiModule,
        MatMomentDateModule,
        MatButtonModule,
        FuseSharedModule,
        CoreRoutingModule
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() core: CoreModule) {
        if (core) {
            throw new Error('You should import core module only in the root module');
        }
    }
}
