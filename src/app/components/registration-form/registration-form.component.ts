import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import constants from '../../services/constants.service';
import {ILoginRegistrationResponse} from "../../common/common.types";
import {LocalStorage} from "@ngx-pwa/local-storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit, AfterViewInit {

  public registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    firstName: new FormControl(''),
    indexNumber: new FormControl(''),
    email: new FormControl('',[Validators.required])
  });


  constructor(
    public spinner: NgxSpinnerService,
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private localstorage: LocalStorage,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    //this.spinner.hide();
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.spinner.show();
      const url = constants.getURL('register');

      this.http.post<ILoginRegistrationResponse>(url, {
        firstName: this.registrationForm.controls['firstName'].value,
        username: this.registrationForm.controls['username'].value,
        indexNumber: this.registrationForm.controls['indexNumber'].value,
        password: this.registrationForm.controls['password'].value,
        email: this.registrationForm.controls['email'].value
      }).subscribe((response) => {
        if (response && response.STATUS && response.STATUS === 'success') {
          if (response.DATA && response.DATA.token) {
            this.localstorage.setItem('token',response.DATA.token).subscribe(()=> {
              this.localstorage.setItem('_uid',response.DATA._uid).subscribe(()=>{
                this.spinner.hide();
                this.router.navigate(['account/feeds']);
              });
            });
          }
        }
      });
    } else {
      this.snackbar.open('Valid data required for registration', 'close', {duration: 3000});
    }
  }


}
