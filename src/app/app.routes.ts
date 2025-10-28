import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { GeneratePermissionComponent } from './modules/generate-permission/generate-permission.component';
import { TutoradosComponent } from './modules/tutorados/tutorados.component';
import { Login } from './modules/login/login';

export const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, children: [
        { path: 'generate-permission', component: GeneratePermissionComponent },
        { path: 'tutorados', component: TutoradosComponent },
    ]},
    { path: '', component: Login }
];
