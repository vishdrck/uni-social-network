import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { WallComponent } from './pages/wall/wall.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HttpClientModule } from '@angular/common/http';
import { SvgIconComponent } from './Elements/svg-icon/svg-icon.component';
import { PostComponent } from './components/post/post.component';
import { DialogAddAPostComponent } from './popups/add-post/popups.components';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { ProfileComponent } from './components/profile/profile.component';
import { WallPostsComponent } from './components/wall-posts/wall-posts.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { FriendCardComponent } from './components/friend-card/friend-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    FooterComponent,
    WallComponent,
    SideMenuComponent,
    PostsComponent,
    CreatePostComponent,
    SvgIconComponent,
    PostComponent,
    DialogAddAPostComponent,
    ProfileComponent,
    WallPostsComponent,
    FriendsComponent,
    FriendCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    NgxDropzoneModule,
    TextareaAutosizeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogAddAPostComponent
  ]
})
export class AppModule { }
