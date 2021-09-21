import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IAcademicYear, ICombination, IDepartments, IFaculties} from "../../common/common.types";

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
    password: new FormControl(),
    city: new FormControl()
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
  ];

  facultiesList: IFaculties[] = [
    {key: 'fas', value: 'Faculty of Applied Sciences'},
    {key: 'fhss', value: 'Faculty of Humanities and Social Sciences'},
    {key: 'fmsc', value: 'Faculty of Management Studies and Commerce'},
    {key: 'fms', value: 'Faculty of Medical Sciences'},
    {key: 'fgs', value: 'Faculty of Graduate Studies'},
    {key: 'foe', value: 'Faculty of Engineering'},
    {key: 'fot', value: 'Faculty of Technology'},
    {key: 'fahs', value: 'Faculty of Allied Health Sciences'},
  ];

  academicYearList: IAcademicYear[] = [
    {key: '2017/18',value: '2017/18'},
    {key: '2018/19',value: '2018/19'},
    {key: '2019/20',value: '2019/20'},
    {key: '2020/21',value: '2020/21'},
    {key: '2021/22',value: '2021/22'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}

