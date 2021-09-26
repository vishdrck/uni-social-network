import { Component, Input, OnInit } from '@angular/core';
import { postTypes } from 'src/app/common/post.types';

@Component({
  selector: 'yatter-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() title = '';
  @Input() subTitle = '';
  @Input() imagePath = '';
  @Input() postType = postTypes.STANDARD_PHOTO;
  @Input() noOfComments = '0';

  constructor() { }

  ngOnInit(): void {
  }

}
