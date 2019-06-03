import {NgModule} from '@angular/core';
import {AuthGuard} from './guard/auth.guard';
import {AuthenticateService} from './services/authenticate.service';

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [AuthGuard, AuthenticateService]
})
export class  ShareModule {}
