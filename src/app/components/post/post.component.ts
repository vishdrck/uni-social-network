import {Component, Input, OnInit} from '@angular/core';
import {postTypes} from 'src/app/common/post.types';

@Component({
  selector: 'yatter-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() title = '';
  @Input() subTitle = '';
  @Input() imagePath = '';
  @Input() postType = 'standard_photo';
  @Input() noOfComments = '0';
  @Input() postContent = '';
  @Input() postColor = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  getClass() {
    return this.postColor;
  }

  getSubTitle() {
    if(this.postType === 'checkin') {
      this.subTitle += ' @ ' + this.postContent;
    }
    return this.subTitle;
  }

}
