import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule, MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { SearchClassicComponent } from 'app/modules/main/pages/search/classic/search-classic.component';
import { SearchClassicService } from 'app/modules/main/pages/search/classic/search-classic.service';




const routes = [
    {
        path: 'search/classic',
        component: SearchClassicComponent,
        resolve: {
            search: SearchClassicService
        }
    }
];

@NgModule({
    declarations: [
        SearchClassicComponent,
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
        SearchClassicService
    ]
})
export class SearchClassicModule {
}
