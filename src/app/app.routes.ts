import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { UserAuthGuard } from './guards/user-auth.guard';

export const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [
      UserAuthGuard
    ] 
  },
  { 
    path: 'dashboard/messages/:messageId/edit', 
    component: DashboardComponent,
    canActivate: [
      UserAuthGuard
    ]      
  },
  //the order here MATTERS!
  { path: '**', redirectTo: '/login', pathMatch: 'full'}  
];