import { Routes } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';

export const SessionsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'cadastrar',
      component: SignupComponent,
      data: { title: 'Nova conta' }
    }, {
      path: 'entrar',
      component: SigninComponent,
      data: { title: 'Entrar' }
    }, {
      path: 'esqueci-senha',
      component: ForgotPasswordComponent,
      data: { title: 'Esqueci minha senha' }
    }, {
      path: 'bloquear',
      component: LockscreenComponent,
      data: { title: 'Bloquear' }
    }, {
      path: '404',
      component: NotFoundComponent,
      data: { title: 'Não encontrado' }
    }, {
      path: 'erro',
      component: ErrorComponent,
      data: { title: 'Erro' }
    }]
  }
];