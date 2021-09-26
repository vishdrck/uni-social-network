import {IPost} from "../types/post.type";
import posts from '../schemas/post.schema';
import mongoose from "mongoose";

export class PostService {
  public createPost(postParams: IPost, callback: mongoose.Callback) {
    const post = new posts(postParams);
    post.save(callback);
  }

  public editPost(_uid: mongoose.Types.ObjectId,postParams: IPost, callback: mongoose.Callback) {
    posts.findOneAndUpdate({_uid: _uid},postParams,null,callback)
  }

  public deletePost(_uid: mongoose.Types.ObjectId,callback: mongoose.Callback) {
    posts.findOneAndUpdate({_uid: _uid}, {isDeleted: true}, callback);
  }

  public restorePost(_uid: mongoose.Types.ObjectId,callback: mongoose.Callback) {
    posts.findOneAndUpdate({_uid: _uid}, {isDeleted: false}, callback);
  }
}
