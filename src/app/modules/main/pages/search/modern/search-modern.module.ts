import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule, MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { SearchModernComponent } from 'app/modules/main/pages/search/modern/search-modern.component';
import { SearchModernService } from 'app/modules/main/pages/search/modern/search-modern.service';




const routes = [
    {
        path: 'search/modern',
        component: SearchModernComponent,
        resolve: {
            search: SearchModernService
        }
    }
];

@NgModule({
    declarations: [
        SearchModernComponent,
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatTabsModule,

        FuseSharedModule
    ],
    providers: [
        SearchModernService
    ]
})
export class SearchModernModule {
}
