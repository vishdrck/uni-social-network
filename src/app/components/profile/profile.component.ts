import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {IAcademicYear, ICombination, IDepartments, IFaculties} from "../../common/common.types";
import {LocalStorage} from "@ngx-pwa/local-storage";
import constants from "../../services/constants.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxSpinnerService} from "ngx-spinner";
import {MatDialog} from "@angular/material/dialog";
import {DialogUpdateProfileCoverComponent} from "../../popups/update-profile-cover/popups.components";

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
    academicYear: new FormControl(),
    combination: new FormControl(),
    faculty: new FormControl(),
    department: new FormControl()
  });

  profilePhoto = '';
  coverPhoto = '';
  combinationList: ICombination[] = [
    {key: 'cs-mat-phy', value: 'CS/MAT/PHY'},
    {key: 'applied-mat-phy', value: 'APPLIED/MAT/PHY'},
    {key: 'cs-mat-stat', value: 'CS/MAT/STAT'}
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
    {key: '2017/18', value: '2017/18'},
    {key: '2018/19', value: '2018/19'},
    {key: '2019/20', value: '2019/20'},
    {key: '2020/21', value: '2020/21'},
    {key: '2021/22', value: '2021/22'}
  ];

  constructor(
    private localstorage: LocalStorage,
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar,
    public spinner: NgxSpinnerService,
    private dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.getProfile();
  }

  private getProfile() {
    this.spinner.show();
    const url = constants.getURL('profile');
    this.localstorage.getItem('token').subscribe((token) => {
      if (token) {
        this.http.get(url, {headers: {Authorization: `Bearer ${token}`}}).subscribe((response: any) => {
          if (response.STATUS && response.STATUS === 'success') {
            this.editProfileFormGroup = new FormGroup({
              firstName: new FormControl(response.DATA.firstName),
              lastName: new FormControl(response.DATA.lastName),
              email: new FormControl(response.DATA.email),
              username: new FormControl(response.DATA.username),
              indexNumber: new FormControl(response.DATA.indexNumber),
              password: new FormControl(null),
              department: new FormControl(response.DATA.department),
              faculty: new FormControl(response.DATA.faculty),
              combination: new FormControl(response.DATA.combination),
              academicYear: new FormControl(response.DATA.academicYear)
            });

            this.profilePhoto = response.DATA.profilePhoto ? `background-image: url('${response.DATA.profilePhoto}');`: 'background-image: url(\'/assets/uploads/profile.jpg\');';
            this.coverPhoto = response.DATA.coverPhoto ? `background-image: url('${response.DATA.coverPhoto}');`: 'background-image: url(\'/assets/uploads/cover.jpg\');';
          }
          this.spinner.hide();
        });
      } else {
        this.spinner.hide();
        this.router.navigate(['/account/login']);
      }
    });
  }

  public updateProfile() {
    this.spinner.show();
    const url = constants.getURL('profile');
    this.localstorage.getItem('token').subscribe((token) => {
      if (token) {
        this.http.put(url, {
          firstName: this.editProfileFormGroup.controls['firstName'].value,
          lastName: this.editProfileFormGroup.controls['lastName'].value,
          email: this.editProfileFormGroup.controls['email'].value,
          username: this.editProfileFormGroup.controls['username'].value,
          indexNumber: this.editProfileFormGroup.controls['indexNumber'].value,
          password:this.editProfileFormGroup.controls['password'].value,
          faculty: this.editProfileFormGroup.controls['faculty'].value,
          department: this.editProfileFormGroup.controls['department'].value,
          combination: this.editProfileFormGroup.controls['combination'].value,
          academicYear: this.editProfileFormGroup.controls['academicYear'].value
        }, {headers: {Authorization: `Bearer ${token}`}}).subscribe((response: any) => {
          this.spinner.hide();
          if (response.STATUS && response.STATUS === 'success') {
            this.snackbar.open('Profile updated successfully','close', {duration: 3000});
          } else {
            this.snackbar.open('Profile update failed. Try again','close', {duration: 3000});
          }
        });
      } else {
        this.spinner.hide();
        this.router.navigate(['/account/login']);
      }
    });
  }

  openProfileUploader() {
    this.dialog.open(DialogUpdateProfileCoverComponent,{
      data: 'profile',
      width: '600px',
      height: '320px'
    });
  }

  openCoverUploader() {
    this.dialog.open(DialogUpdateProfileCoverComponent,{
      data: 'cover',
      width: '600px',
      height: '320px'
    });
  }
}

