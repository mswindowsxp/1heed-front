import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/guard/auth.guard';

const appRoutes: Routes = [
    {
        path: 'authentication',
        loadChildren: '../modules/auth/auth.module#AuthModule'
    },
    {
        path: 'login',
        loadChildren: '../modules/login/login.module#LoginModule'
    },
    {
        path: 'apps',
        loadChildren: '../modules/main/apps/apps.module#AppsModule',
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'authentication'
    }
];
@NgModule({ imports: [RouterModule.forRoot(appRoutes)], exports: [RouterModule] })
export class CoreRoutingModule {}
