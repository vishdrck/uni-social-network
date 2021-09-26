import mongoose from "mongoose";

const SCHEMA = mongoose.Schema;

const updateNote = {
  updatedOn: Date,
  updatedBy: String,
  updateNote: String
};

const schema = new SCHEMA({
  _uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  _fuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  acceptedDate: {
    type: Date
  }
});

export default mongoose.model('Friends', schema,'friends');
