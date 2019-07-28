import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatSelectModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { TodoMainSidebarComponent } from 'app/modules/main/apps/todo/sidebars/main/main-sidebar.component';
import { TodoDetailsComponent } from 'app/modules/main/apps/todo/todo-details/todo-details.component';
import { TodoListItemComponent } from 'app/modules/main/apps/todo/todo-list/todo-list-item/todo-list-item.component';
import { TodoListComponent } from 'app/modules/main/apps/todo/todo-list/todo-list.component';
import { TodoComponent } from 'app/modules/main/apps/todo/todo.component';
import { TodoService } from 'app/modules/main/apps/todo/todo.service';



const routes: Routes = [
    {
        path: 'all',
        component: TodoComponent,
        resolve: {
            todo: TodoService
        }
    },
    {
        path: 'all/:todoId',
        component: TodoComponent,
        resolve: {
            todo: TodoService
        }
    },
    {
        path: 'tag/:tagHandle',
        component: TodoComponent,
        resolve: {
            todo: TodoService
        }
    },
    {
        path: 'tag/:tagHandle/:todoId',
        component: TodoComponent,
        resolve: {
            todo: TodoService
        }
    },
    {
        path: 'filter/:filterHandle',
        component: TodoComponent,
        resolve: {
            todo: TodoService
        }
    },
    {
        path: 'filter/:filterHandle/:todoId',
        component: TodoComponent,
        resolve: {
            todo: TodoService
        }
    },
    {
        path: '**',
        redirectTo: 'all'
    }
];

@NgModule({
    declarations: [
        TodoComponent,
        TodoMainSidebarComponent,
        TodoListItemComponent,
        TodoListComponent,
        TodoDetailsComponent
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
        MatSelectModule,

        NgxDnDModule,

        FuseSharedModule,
        FuseSidebarModule
    ],
    providers: [
        TodoService
    ]
})
export class TodoModule {
}
