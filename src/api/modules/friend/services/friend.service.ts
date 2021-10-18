import {IFriend} from "../types/friend.type";
import friends from '../schemas/friend.schema';
import mongoose from "mongoose";
import posts from "../../post/schemas/post.schema";

export class FriendService {
  public createFriend(friendParams: IFriend, callback: mongoose.Callback) {
    const friend = new friends(friendParams);
    friend.save(callback);
  }

  public editFriend(_uid: mongoose.Types.ObjectId,friendParams: IFriend, callback: mongoose.Callback) {
    friends.findOneAndUpdate({_uid: _uid},friendParams,null,callback)
  }

  public deleteFriend(id: mongoose.Types.ObjectId,callback: mongoose.Callback) {
    friends.findByIdAndDelete({_id: id},  callback);
  }

  public restoreFriend(_uid: mongoose.Types.ObjectId,callback: mongoose.Callback) {
    friends.findOneAndUpdate({_uid: _uid}, {isDeleted: false}, callback);
  }

  public filterFriendPagination(filters: any, limit: number, skip: number, callback: mongoose.Callback) {
    friends.find(filters).limit(limit).skip(skip).sort({'publishedIn': -1}).exec(callback);
  }

  public filterFriends(filters: any, callback: mongoose.Callback) {
    friends.find(filters,callback);
  }
}
