import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/guard/auth.guard';

const appRoutes: Routes = [
    {
        path: 'authentication',
        loadChildren: '../modules/auth/auth.module#AuthModule'
    },
    {
        path: 'apps',
        loadChildren: '../fuse/main/apps/apps.module#AppsModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'pages',
        loadChildren: '../fuse/main/pages/pages.module#PagesModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'documentation',
        loadChildren: '../fuse/main/documentation/documentation.module#DocumentationModule'
    },

    {
        path: 'login',
        loadChildren: '../modules/login/login.module#LoginModule'
    },
    {
        path: '**',
        redirectTo: 'authentication'
    }
];
@NgModule({ imports: [RouterModule.forRoot(appRoutes)], exports: [RouterModule] })
export class CoreRoutingModule {}
