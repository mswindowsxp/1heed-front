import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

const routes: Routes = [
    {
        path: 'working-with-fuse',
        loadChildren:
            './working-with-fuse/working-with-fuse.module#WorkingWithFuseModule'
    },
    {
        path: 'components-third-party',
        loadChildren:
            './components-third-party/components-third-party.module#ComponentsThirdPartyModule'
    },
    {
        path: 'directives',
        loadChildren: './directives/directives.module#DirectivesModule'
    },
    {
        path: 'services',
        loadChildren: './services/services.module#ServicesModule'
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes), MatIconModule, FuseSharedModule]
})
export class DocumentationModule {}
