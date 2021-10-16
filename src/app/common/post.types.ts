export enum postTypes{
  STANDARD_PHOTO = 'standard_photo',
  COLORED_PHOTO = 'colored_photo',
  CHECKIN = 'checkin',
  FEELING ='feeling'
}

export interface IDetailedPost {
  _id: any;
  _uid: any;
  postType: string;
  title: string;
  imagePath?: string;
  publishedIn: Date;
  postColor?: string;
  postContent: string;
  reactions?: number;
  firstName: string;
  lastName?: string;
  username: string;
  profilePhoto: string;
}

export interface IDetailedPostResponse {
  STATUS: string;
  MESSAGE: string;
  DATA: [IDetailedPost]
}
