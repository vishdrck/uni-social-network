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
    required: true
  },
  combination: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('Users', schema,'users');
