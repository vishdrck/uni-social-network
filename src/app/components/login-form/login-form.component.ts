import { Component, OnInit,AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, AfterViewInit {

 public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    remember: new FormControl('')
  });

  constructor(
    public spinner: NgxSpinnerService,
    private router: Router
  ) { }

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
    this.router.navigate(['/account/feeds'], {});
  }

}
