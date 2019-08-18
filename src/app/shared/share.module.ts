import { NgModule } from '@angular/core';
import { AuthGuard } from './guard/auth.guard';
import { TruncateTextPipe } from './pipes';
import { AuthenticateService } from './services/authenticate.service';

@NgModule({
    imports: [],
    declarations: [TruncateTextPipe],
    exports: [TruncateTextPipe],
    providers: [AuthGuard, AuthenticateService]
})
export class ShareModule { }
