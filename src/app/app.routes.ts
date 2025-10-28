import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { GeneratePermissionComponent } from './modules/generate-permission/generate-permission.component';
import { TutoradosComponent } from './modules/tutorados/tutorados.component';
import { Evidencias } from './modules/evidencias/evidencias';
import { WelcomeComponent } from './modules/welcome/welcome.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard/welcome', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, children: [
        { path: 'generate-permission', component: GeneratePermissionComponent },
        { path: 'tutorados', component: TutoradosComponent },
        { path: 'evidencias', component: Evidencias},
        {path: 'welcome', component: WelcomeComponent}
    ]}
];
