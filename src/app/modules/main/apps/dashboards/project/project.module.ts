import { NgModule } from '@angular/core';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatTableModule, MatTabsModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FuseSidebarModule } from '@fuse/components';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProjectDashboardComponent } from 'app/modules/main/apps/dashboards/project/project.component';
import { ProjectDashboardService } from 'app/modules/main/apps/dashboards/project/project.service';



const routes: Routes = [
    {
        path: '**',
        component: ProjectDashboardComponent,
        resolve: {
            data: ProjectDashboardService
        }
    }
];

@NgModule({
    declarations: [
        ProjectDashboardComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,

        NgxChartsModule,

        FuseSharedModule,
        FuseSidebarModule,
        FuseWidgetModule
    ],
    providers: [
        ProjectDashboardService
    ]
})
export class ProjectDashboardModule {
}

