import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgxSpinnerService} from "ngx-spinner";
import constants from "../../services/constants.service";
import {ILoginRegistrationResponse, ItokenResponse} from "../../common/common.types";
import {LocalStorage} from "@ngx-pwa/local-storage";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoggedUserDataStore} from '../../data/logged-user.data-store';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, AfterViewInit {

  loggedUserData: LoggedUserDataStore = LoggedUserDataStore.getLoggedUserDateStore();

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    remember: new FormControl('')
  });

  constructor(
    public spinner: NgxSpinnerService,
    private router: Router,
    private localstorage: LocalStorage,
    private snackbar: MatSnackBar,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.localstorage.getItem('remember').subscribe((remember) => {
      if (remember === true) {
        this.localstorage.getItem('token').subscribe((token) => {
          const url = constants.getURL('validate/token');
          this.http.post<ItokenResponse>(url, {token: token}).subscribe((response:any) => {
            console.log(response);
            if (response && response.STATUS && response.STATUS === 'success') {
              if (response.DATA && response.DATA.validity === true) {
                this.spinner.hide();
                this.loggedUserData.headers = {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                };
                this.router.navigate(['account/feeds']);
              } else {
                this.spinner.hide();
              }
            } else {
              this.spinner.hide();
            }
          });
        });
      } else {
        this.spinner.hide();
      }
    });

  }

  ngAfterViewInit(): void {
  }

  onSubmit() {
    this.loginForm.controls['remember'].value ? this.loginForm.controls['remember'].setValue(true) : this.loginForm.controls['remember'].setValue(false);
    if (this.loginForm.valid) {
      this.localstorage.clear();
      this.spinner.show();
      const url = constants.getURL('login');
      this.http.post<ILoginRegistrationResponse>(url, {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value
      }).subscribe((response) => {
        if (response && response.STATUS && response.STATUS === 'success') {
          if (response.DATA && response.DATA.token) {
            this.localstorage.setItem('token', response.DATA.token).subscribe(() => {
              this.localstorage.setItem('_uid', response.DATA._uid).subscribe(() => {
                this.localstorage.setItem('remember', this.loginForm.controls['remember'].value).subscribe(() => {
                  this.loggedUserData.headers = {
                    headers: {
                      Authorization: `Bearer ${response.DATA.token}`
                    }
                  };
                  this.spinner.hide();
                  this.router.navigate(['account/feeds']);
                });
              });
            });
          } else {
            this.spinner.hide();
            this.snackbar.open('User not found!','close', {duration: 3000});
          }
        } else {
          this.spinner.hide();
          this.snackbar.open('Email and password are not found', 'close', {duration: 3000});
        }
      });
    } else {
      this.snackbar.open('Valid data required for login to your account', 'close', {duration: 3000});
    }
  }

}
