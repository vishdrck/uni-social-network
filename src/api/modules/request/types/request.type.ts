import mongoose from "mongoose";

export interface IRequest {
  _id?: mongoose.Types.ObjectId;
  _uid: mongoose.Types.ObjectId;
  _fromUid: mongoose.Types.ObjectId;
  requestDate: Date;

}
