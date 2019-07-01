import { NgModule } from '@angular/core';
import { AppComponent } from 'app/app.component';
import 'hammerjs';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [AppComponent],
    imports: [CoreModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
