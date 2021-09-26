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
  _fromUid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  requestedDate: {
    type: Date
  }
});

export default mongoose.model('Requests', schema,'requests');
