import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatIconModule, MatListModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { KnowledgeBaseArticleComponent } from 'app/modules/main/pages/knowledge-base/dialogs/article/article.component';
import { KnowledgeBaseComponent } from 'app/modules/main/pages/knowledge-base/knowledge-base.component';
import { KnowledgeBaseService } from 'app/modules/main/pages/knowledge-base/knowledge-base.service';



const routes = [
    {
        path: 'knowledge-base',
        component: KnowledgeBaseComponent,
        resolve: {
            knowledgeBase: KnowledgeBaseService
        }
    }
];

@NgModule({
    declarations: [
        KnowledgeBaseComponent,
        KnowledgeBaseArticleComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,

        FuseSharedModule
    ],
    providers: [
        KnowledgeBaseService
    ],
    entryComponents: [
        KnowledgeBaseArticleComponent
    ]
})
export class KnowledgeBaseModule {
}
