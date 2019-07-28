import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule, MatRippleModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseNavigationComponent } from './navigation.component';
import { FuseNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { FuseNavVerticalGroupComponent } from './vertical/group/group.component';
import { FuseNavVerticalItemComponent } from './vertical/item/item.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,

        TranslateModule.forChild()
    ],
    exports: [
        FuseNavigationComponent
    ],
    declarations: [
        FuseNavigationComponent,
        FuseNavVerticalGroupComponent,
        FuseNavVerticalItemComponent,
        FuseNavVerticalCollapsableComponent
    ]
})
export class FuseNavigationModule {
}
