import 'hammerjs';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppComponent } from 'app/app.component';
import { FakeDbService } from 'app/fake-db/fake-db.service';
import { fuseConfig } from 'app/fuse-config';
import { LayoutModule } from 'app/layout/layout.module';
import { AppStoreModule } from 'app/store/store.module';
import {ApiModule, BASE_PATH, Configuration, ConfigurationParameters} from './http';
import {environment} from '../environments/environment';
import {AuthGuard} from './shared/guard/auth.guard';
import {ShareModule} from './shared/share.module';

const appRoutes: Routes = [
    {
        path: 'apps',
        loadChildren: './main/apps/apps.module#AppsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'pages',
        loadChildren: './main/pages/pages.module#PagesModule'
    },
    {
        path: 'ui',
        loadChildren: './main/ui/ui.module#UIModule'
    },
    {
        path: 'documentation',
        loadChildren:
            './main/documentation/documentation.module#DocumentationModule'
    },
    {
        path: 'angular-material-elements',
        loadChildren:
            './main/angular-material-elements/angular-material-elements.module#AngularMaterialElementsModule'
    },
    {
        path: 'login',
        loadChildren: './main/pages/authentication/login/login.module#LoginModule'
    },
    {
        path: '**',
        redirectTo: 'apps/dashboards/analytics',
    }
];


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule,
        ApiModule.forRoot(apiConfigFactory),
        ShareModule
    ],
    providers: [{provide: BASE_PATH, useValue: environment.apiBasePath}],
    bootstrap: [AppComponent]
})
export class AppModule {}

export function apiConfigFactory(): Configuration {
    const params: ConfigurationParameters = {
        basePath: environment.apiBasePath
    };
    return new Configuration(params);
}
