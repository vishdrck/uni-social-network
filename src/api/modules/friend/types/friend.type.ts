import mongoose from "mongoose";

export interface IFriend {
  _id?: mongoose.Types.ObjectId;
  _uid: mongoose.Types.ObjectId;
  _fuid: mongoose.Types.ObjectId;
  requestedDate: Date;

}
