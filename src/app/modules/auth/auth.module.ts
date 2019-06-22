import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
    imports: [AuthRoutingModule],
    declarations: [AuthComponent]
})
export class AuthModule {}
