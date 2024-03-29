import mongoose from "mongoose";

export interface IPost {
  _id?: mongoose.Types.ObjectId;
  _uid: mongoose.Types.ObjectId;
  postType: string;
  title: string;
  imagePath?: string;
  publishedIn: Date;
  postColor?: string;
  postContent: string;
  reactions?: number;
}

export interface IDetailedPost {
  _id?: mongoose.Types.ObjectId;
  _uid: mongoose.Types.ObjectId;
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
}
