import 'hammerjs';

import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatIconModule, MatButtonModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {FuseProgressBarModule} from '@fuse/components';
import {TranslateModule} from '@ngx-translate/core';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {AppComponent} from 'app/app.component';
import {fuseConfig} from 'app/fuse-config';
import {LayoutModule} from 'app/layout/layout.module';
import {AppStoreModule} from 'app/store/store.module';

import {environment} from '../environments/environment';
import {FuseSidebarModule} from './../@fuse/components/sidebar/sidebar.module';
import {FuseThemeOptionsModule} from './../@fuse/components/theme-options/theme-options.module';
import {FuseModule} from './../@fuse/fuse.module';
import {FakeDbService} from './fake-db/fake-db.service';
import {ApiModule, BASE_PATH, Configuration, ConfigurationParameters} from './http';
import {AuthGuard} from './shared/guard/auth.guard';
import {ShareModule} from './shared/share.module';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FuseSharedModule} from '@fuse/shared.module';

const appRoutes: Routes = [
    {
        path: 'apps',
        loadChildren: './main/apps/apps.module#AppsModule',
        // canActivate: [AuthGuard]
    },
    {
        path: 'pages',
        loadChildren: './main/pages/pages.module#PagesModule',
        // canActivate: [AuthGuard]
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
        // canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: './modules/login/login.module#LoginModule'
    },
    {
        path: '**',
        redirectTo: 'apps/dashboards/analytics'
    }
];

function apiConfigFactory(): Configuration {
    const params: ConfigurationParameters = {
        basePath: environment.apiBasePath
    };
    return new Configuration(params);
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
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
        FuseSharedModule
    ],
    providers: [{provide: BASE_PATH, useValue: environment.apiBasePath}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
