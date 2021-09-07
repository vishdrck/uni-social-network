import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/account/login',
    pathMatch: 'full'
  },
  {
    path: 'app',
    redirectTo: '/app/account',
    pathMatch: 'full'
  },
  {
    path: 'app/account',
    redirectTo: '/app/account/login',
    pathMatch: 'full'
  },
  {
    path: 'app/account',
    component: LoginPageComponent,
    children: [
      {
        path: 'login',
        component: LoginFormComponent
      },
      {
        path: 'register',
        component: RegistrationFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
