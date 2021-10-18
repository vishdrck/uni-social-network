import {INewUser, IUser} from "../types/user.type";
import users from '../schemas/user.schema';
import mongoose from "mongoose";
import posts from "../../post/schemas/post.schema";

export class UserService {
  public createUser(userParams: INewUser, callback: mongoose.Callback) {
    const user = new users(userParams);
    user.save(callback);
  }

  public updateUser(_uid: mongoose.Types.ObjectId,userParams: IUser, callback: mongoose.Callback) {
    users.findOneAndUpdate({_uid: _uid},userParams,null,callback)
  }

  public deleteUser(_uid: mongoose.Types.ObjectId,callback: mongoose.Callback) {
    users.findOneAndUpdate({_uid: _uid}, {isDeleted: true}, callback);
  }

  public restoreUser(_uid: mongoose.Types.ObjectId,callback: mongoose.Callback) {
    users.findOneAndUpdate({_uid: _uid}, {isDeleted: false}, callback);
  }

  public filterUsers(filters: any, callback: mongoose.Callback) {
    users.find(filters, callback);
  }

  public filterUsersPagination(filters: any, limit: number, skip: number, callback: mongoose.Callback) {
    users.find(filters).limit(limit).skip(skip).sort({'publishedIn': -1}).exec(callback);
  }
}
