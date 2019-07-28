import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FuseCountdownModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { ComingSoonComponent } from 'app/modules/main/pages/coming-soon/coming-soon.component';




const routes = [
    {
        path: 'coming-soon',
        component: ComingSoonComponent
    }
];

@NgModule({
    declarations: [
        ComingSoonComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
        FuseCountdownModule
    ]
})
export class ComingSoonModule {
}
