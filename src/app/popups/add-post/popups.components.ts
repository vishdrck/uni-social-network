import {Component, Inject, OnInit} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {LoggedUserDataStore} from "../../data/logged-user.data-store";
import constants from '../../services/constants.service';

@Component({
  selector: 'app-dialog-add-a-post-dialog',
  templateUrl: './dialog-add-a-post-dialog.html',
  styleUrls: ['./dialog-add-a-post-dialog.scss']
})
export class DialogAddAPostComponent implements OnInit {
  files: File[] = [];
  className: string;
  feelingControl = new FormControl(null);
  whatsyourmindControl = new FormControl(null);
  coloredPostTextControl = new FormControl(null);

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
    public dialogRef: MatDialogRef<DialogAddAPostComponent>,
    @Inject(MAT_DIALOG_DATA) public postType: string,
    public snackbar: MatSnackBar,
    private http: HttpClient
  ) {
    this.className = '';
  }

  ngOnInit() {

  }

  setColor(className: string) {
    this.className = className;
  }

  getClass() {
    return this.className;
  }


  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSelected(feelingType: string) {
    this.feelingControl.setValue(feelingType);
  }

  onPublished() {
    if (this.postType === 'standard') {

    }
    if (this.postType === 'coloredPost') {
      if (this.coloredPostTextControl.value && this.whatsyourmindControl.value) {
        if (this.loggedUserDataStore.headers) {
          const url = constants.getURL('post/create');
          this.http.post(url,{
            postType: this.postType,
            className: this.className,
            postContent: this.coloredPostTextControl.value,
            postTitle: this.whatsyourmindControl.value
          },this.loggedUserDataStore.headers).subscribe( response => {
            console.log(response);
          });
        }

      } else {
        this.snackbar.open('Please enter your thoughts', 'close', {duration: 3000});
      }
    }
  }


}

export interface iFeeling {
  key: string,
  value: string
}
