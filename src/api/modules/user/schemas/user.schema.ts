import mongoose from "mongoose";

const SCHEMA = mongoose.Schema;

const updateNote = {
  updatedOn: Date,
  updatedBy: String,
  updateNote: String
};

const schema = new SCHEMA({
  _uid: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  indexNumber: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: false
  },
  combination: {
    type: String,
    required: false,
  },
  faculty: {
    type: String,
    required: false
  },
  department: {
    type: String,
    required: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('Users', schema,'users');
