import {IFriend} from "../types/friend.type";
import friends from '../schemas/friend.schema';
import mongoose from "mongoose";

export class FriendService {
  public createFriend(friendParams: IFriend, callback: mongoose.Callback) {
    const friend = new friends(friendParams);
    friend.save(callback);
  }

  public editFriend(_uid: mongoose.Types.ObjectId,friendParams: IFriend, callback: mongoose.Callback) {
    friends.findOneAndUpdate({_uid: _uid},friendParams,null,callback)
  }

  public deleteFriend(_uid: mongoose.Types.ObjectId,callback: mongoose.Callback) {
    friends.findOneAndUpdate({_uid: _uid}, {isDeleted: true}, callback);
  }

  public restoreFriend(_uid: mongoose.Types.ObjectId,callback: mongoose.Callback) {
    friends.findOneAndUpdate({_uid: _uid}, {isDeleted: false}, callback);
  }
}
