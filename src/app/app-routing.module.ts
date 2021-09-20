import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {RegistrationFormComponent} from './components/registration-form/registration-form.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {WallComponent} from './pages/wall/wall.component';
import {ProfileComponent} from "./components/profile/profile.component";
import {WallPostsComponent} from "./components/wall-posts/wall-posts.component";
import {FriendsComponent} from "./pages/friends/friends.component";

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
    path: 'account/feeds',
    component: WallComponent,
    children: [
      {
        path: '',
        component: WallPostsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent
      }, {
        path: 'friends',
        component: FriendsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
