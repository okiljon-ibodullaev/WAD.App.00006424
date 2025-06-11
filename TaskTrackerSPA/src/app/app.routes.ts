import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "tasks",
        pathMatch: "full" 
    },
    {
        path: "users",
        component: UsersComponent
    },
    {
        path: "users/create",
        component: UserFormComponent
    },
    {
        path: "users/:id",
        component: UserFormComponent
    },
    {
        path: "tasks",
        component: TasksComponent
    },
    {
        path: "tasks/create",
        component: TaskFormComponent
    },
    {
        path: "tasks/:id",
        component: TaskFormComponent
    },
];
