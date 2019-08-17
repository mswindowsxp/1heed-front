import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MailConfirmComponent } from 'app/modules/main/pages/authentication/mail-confirm/mail-confirm.component';



const routes = [
    {
        path: 'auth/mail-confirm',
        component: MailConfirmComponent
    }
];

@NgModule({
    declarations: [
        MailConfirmComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,

        FuseSharedModule
    ]
})
export class MailConfirmModule {
}