import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as autosize from 'autosize';

@Component({
  selector: 'app-dialog-add-a-post-dialog',
  templateUrl: './dialog-add-a-post-dialog.html',
  styleUrls: ['./dialog-add-a-post-dialog.scss']
})
export class DialogAddAPostComponent implements OnInit {
  files: File[] = [];
  className: string;



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

  constructor(public dialogRef: MatDialogRef<DialogAddAPostComponent>, @Inject(MAT_DIALOG_DATA) public postType: string) {
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
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}

export interface iFeeling {
  key: string,
  value: string
}
