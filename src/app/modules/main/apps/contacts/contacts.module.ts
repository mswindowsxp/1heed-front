import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { ContactsContactFormDialogComponent } from 'app/modules/main/apps/contacts/contact-form/contact-form.component';
import { ContactsContactListComponent } from 'app/modules/main/apps/contacts/contact-list/contact-list.component';
import { ContactsComponent } from 'app/modules/main/apps/contacts/contacts.component';
import { ContactsService } from 'app/modules/main/apps/contacts/contacts.service';
import { ContactsSelectedBarComponent } from 'app/modules/main/apps/contacts/selected-bar/selected-bar.component';
import { ContactsMainSidebarComponent } from 'app/modules/main/apps/contacts/sidebars/main/main.component';



const routes: Routes = [
    {
        path: '**',
        component: ContactsComponent,
        resolve: {
            contacts: ContactsService
        }
    }
];

@NgModule({
    declarations: [
        ContactsComponent,
        ContactsContactListComponent,
        ContactsSelectedBarComponent,
        ContactsMainSidebarComponent,
        ContactsContactFormDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule
    ],
    providers: [
        ContactsService
    ],
    entryComponents: [
        ContactsContactFormDialogComponent
    ]
})
export class ContactsModule {
}
