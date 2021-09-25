import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  indexNumber: string;
  academicYear: string;
  combination: string;
  faculty: string;
  department: string;
  username: string;
}

export interface IIAMUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface IIAMUserResponse {
  status: string;
  message: string;
  data: {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
  };
}

export interface IIAMLoginRequest {
  email: string;
  password: string;
}

export interface IIAMLoginResponse {
  status: string;
  message: string;
  data: {
    token: string
  }
}

