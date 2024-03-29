import mongoose from "mongoose";

export interface IProfile {
  _uid: mongoose.Types.ObjectId;
  firstName: string;
  lastName?: string;
  email: string;
  indexNumber: string;
  academicYear?: string;
  combination?: string;
  faculty?: string;
  department?: string;
  username: string;
}

export interface INewUser {
  _uid: mongoose.Types.ObjectId;
  indexNumber: string;
}

export interface IUser {
  _uid: mongoose.Types.ObjectId;
  indexNumber: string;
  academicYear?: string;
  combination?: string;
  faculty?: string;
  department?: string;
}

export interface IIAMUser {
  _uid: mongoose.Types.ObjectId;
  firstName: string;
  lastName?: string;
  email: string;
  username: string;
}

export interface IIAMUserRequest {
  firstName: string;
  lastName?: string;
  email: string;
  username: string;
  password: string;
}

export interface IIAMUserResponse {
  STATUS: string;
  MESSAGE: string;
  DATA: {
    _uid: mongoose.Types.ObjectId;
    firstName: string;
    lastName?: string;
    email: string;
    username: string;
    token: string;
  };
}

export interface IIAMUserProfileResponse {
  STATUS: string;
  MESSAGE: string;
  DATA: {
    _uid: mongoose.Types.ObjectId;
    firstName: string;
    lastName?: string;
    email: string;
    username: string;
  };
}

export interface IIAMLoginRequest {
  email: string;
  password: string;
}

export interface IIAMLoginResponse {
  STATUS: string;
  MESSAGE: string;
  DATA: {
    token: string
  }
}

export interface ItokenResponse {
  STATUS: string;
  MESSAGE: string;
  DATA: {
    validity: boolean
  }
}

