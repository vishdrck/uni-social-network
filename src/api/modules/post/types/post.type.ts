import mongoose from "mongoose";

export interface IPost {
  _id?: mongoose.Types.ObjectId;
  _uid: mongoose.Types.ObjectId;
  postType: string;
  title: string;
  imagePath?: string;
  publishedIn: string;
  postColor?: string;
  postContent: string;
  reactions: number;
}
