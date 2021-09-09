import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { WallComponent } from './pages/wall/wall.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/account/login',
    pathMatch: 'full'
  },
  // {
  //   path: 'app',
  //   redirectTo: '/app/wall',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'app/account',
  //   redirectTo: '/app/account/login',
  //   pathMatch: 'full'
  // },
  {
    path: 'account',
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
  },
  {
    path: 'account/:username',
    children: [
      {
        path: 'r',
        component: WallComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
