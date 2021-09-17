import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editProfileFormGroup: FormGroup= new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    username: new FormControl(),
    indexNumber: new FormControl(),
    password: new FormControl()
  });
  constructor() { }

  ngOnInit(): void {
  }

}
