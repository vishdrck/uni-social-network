import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ICombination, IDepartments} from "../../common/common.types";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editProfileFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    username: new FormControl(),
    indexNumber: new FormControl(),
    password: new FormControl()
  });

  combinationList: ICombination[] = [
    {key: 'cs-mat-phy',value: 'CS/MAT/PHY'},
    {key: 'applied-mat-phy',value: 'APPLIED/MAT/PHY'},
    {key: 'cs-mat-stat',value: 'CS/MAT/STAT'}
  ];

  departmentList: IDepartments[] = [
    {key: 'computer-science', value: 'Computer Science Department'},
    {key: 'statistics', value: 'Statistics Department'},
    {key: 'physics', value: 'Physics Department'},
    {key: 'mathematics', value: 'Mathematics Department'},
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}

