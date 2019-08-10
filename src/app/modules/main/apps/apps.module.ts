import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path: 'dashboards/analytics',
        loadChildren:
            './dashboards/analytics/analytics.module#AnalyticsDashboardModule'
    },
    {
        path: 'chat',
        loadChildren: './chat/chat.module#ChatModule'
    },
    {
        path: 'e-commerce',
        loadChildren: './e-commerce/e-commerce.module#EcommerceModule'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), FuseSharedModule]
})
export class AppsModule {}
