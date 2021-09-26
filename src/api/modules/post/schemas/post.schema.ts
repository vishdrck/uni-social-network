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
  title: {
    type: String,
    required: true
  },
  postType: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: false
  },
  publishedIn: {
    type: Date,
    required: true
  },
  postColor: {
    type: String,
    required: false
  },
  postContent: {
    type: String,
    required: true
  },
  reactions: {
    type: Number,
    required: false,
    default: 0
  }
});
