import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddAPostComponent } from 'src/app/popups/add-post/popups.components';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private dialog: MatDialog) {

    }

  ngOnInit(): void {

  }

  public addStandardPhoto() {
    const dialogRef = this.dialog.open(DialogAddAPostComponent, { width: '600px',data: 'standard'});
  }
  public addColoredPhoto() {
    const dialogRef = this.dialog.open(DialogAddAPostComponent, { width: '600px', data: 'coloredPost' });
  }
  public addFeeling() {
    const dialogRef = this.dialog.open(DialogAddAPostComponent, { width: '600px', data: 'feeling' });
  }
  public addCheckin() {
    const dialogRef = this.dialog.open(DialogAddAPostComponent, { width: '600px', data: 'checkin' });
  }

}
