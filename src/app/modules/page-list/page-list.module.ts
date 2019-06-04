import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from './../../../@fuse/shared.module';
import { PageListComponent } from './page-list.component';

const routes = [
    {
        path: 'page-list',
        component: PageListComponent
    }
];

@NgModule({
    declarations: [PageListComponent],
    imports: [
        RouterModule.forChild(routes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule
    ]
})
export class LockModule {}
