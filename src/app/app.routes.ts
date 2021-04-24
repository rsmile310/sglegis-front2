import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/common/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './components/common/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './services/auth/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessao',
        loadChildren: './views/sessions/sessions.module#SessionsModule',
        data: { title: 'Sessão' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },      
      {
        path: 'home',
        loadChildren: './views/business/home/home.module#HomeModule',
        data: { title: 'home', breadcrumb: '' }
      },
      {
        path: 'cadastros',
        loadChildren: './views/business/business.module#BusinessModule',
        data: { title: 'Cadastros', breadcrumb: '' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

