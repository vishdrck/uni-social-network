import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit, AfterViewInit {

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    firstName: new FormControl(''),
    uniID: new FormControl('')
  });


  constructor(public spinner: NgxSpinnerService) { }

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

  }


}
