import {IRequest} from "../types/request.type";
import requests from '../schemas/request.schema';
import mongoose from "mongoose";

export class FriendService {
  public createRequest(requestParams: IRequest, callback: mongoose.Callback) {
    const request = new requests(requestParams);
    request.save(callback);
  }

  public editRequest(_uid: mongoose.Types.ObjectId,requestParams: IRequest, callback: mongoose.Callback) {
    requests.findOneAndUpdate({_uid: _uid},requestParams,null,callback)
  }

  public deleteRequest(_uid: mongoose.Types.ObjectId,callback: mongoose.Callback) {
    requests.findOneAndUpdate({_uid: _uid}, {isDeleted: true}, callback);
  }

  public restoreRequest(_uid: mongoose.Types.ObjectId,callback: mongoose.Callback) {
    requests.findOneAndUpdate({_uid: _uid}, {isDeleted: false}, callback);
  }
}
