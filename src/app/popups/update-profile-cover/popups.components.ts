import {Component, Inject, OnInit} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {LoggedUserDataStore} from "../../data/logged-user.data-store";
import constants from '../../services/constants.service';
import {Router} from "@angular/router";
import {LocalStorage} from "@ngx-pwa/local-storage";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-dialog-update-profile-cover-dialog',
  templateUrl: './dialog-update-profile-cover-dialog.html',
  styleUrls: ['./dialog-update-profile-cover-dialog.scss']
})
export class DialogUpdateProfileCoverComponent implements OnInit {
  files: File[] = [];


  private loggedUserDataStore: LoggedUserDataStore = LoggedUserDataStore.getLoggedUserDateStore();

  feelingTypes: iFeeling[] = [
    {key: 'happy', value: 'Happy'},
    {key: 'loved', value: 'Loved'},
    {key: 'satisfied', value: 'Satisfied'},
    {key: 'strong', value: 'Strong'},
    {key: 'sad', value: 'Sad'},
    {key: 'crazy', value: 'Crazy'},
    {key: 'tired', value: 'Tired'},
    {key: 'sleepy', value: 'Sleepy'},
    {key: 'confused', value: 'Confused'},
    {key: 'worried', value: 'Worried'},
    {key: 'angry', value: 'Angry'},
    {key: 'shocked', value: 'Shocked'},
    {key: 'down', value: 'Down'},
    {key: 'confounded', value: 'Confounded'}
  ]

  constructor(
    public dialogRef: MatDialogRef<DialogUpdateProfileCoverComponent>,
    @Inject(MAT_DIALOG_DATA) public uploadType: string,
    public snackbar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private localstorage: LocalStorage,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {

  }


  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }


  onUpdated() {

    if (this.files.length > 0) {
      this.spinner.show();
      const url = this.uploadType === 'profile' ? constants.getURL('profile/avatar') : constants.getURL('profile/cover');

      const formData = new FormData();
      formData.append('file', this.files[0]);
      formData.append('uploadType', this.uploadType);
      this.localstorage.getItem('token').subscribe((token) => {
        if (token) {
          this.http.post(url, formData, {headers: {Authorization: `Bearer ${token}`}}).subscribe((response: any) => {
            if (response.STATUS && response.STATUS === 'success') {
              this.snackbar.open('Image has been updated successfully', 'close', {duration: 3000});
              window.location.reload();
              // this.dialogRef.close();
            } else {
              this.spinner.hide();
              this.snackbar.open('Something went wrong!. Please try again', 'close', {duration: 3000});
            }
          });
        } else {
          this.spinner.hide();
          this.router.navigate(['/account/login']);
        }
      });


    } else {
      this.snackbar.open('Please select a image', 'close', {duration: 3000});
    }
  }


}

export interface iFeeling {
  key: string,
  value: string
}
