import {Component, Input, OnInit} from '@angular/core';

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
  @Input() avatarImage = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  getClass() {
    return this.postColor;
  }

  getProfileAvatar() {
    return this.avatarImage ? `background-image: url('${this.avatarImage}')`: 'background-image: url(\'/uploads/profile.jpg\')';
  }

  getSubTitle() {
    if(this.postType === 'checkin') {
      this.subTitle += ' @ ' + this.postContent;
    }
    return this.subTitle;
  }

}
