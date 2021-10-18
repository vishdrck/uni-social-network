import {UserService} from "../modules/user/services/user.service";
import logger from './../helpers/logger';
import {Request, Response} from "express";
import insufficientDataResponseService from '../modules/common/services/insufficient-data.response.service';
import internalErrorResponseService from '../modules/common/services/internalError.response.service';
import sendResponseService from '../modules/common/services/send.response.service';
import {
  IIAMUser,
  IIAMUserProfileResponse,
  IIAMUserResponse,
  INewUser, IProfile,
  ItokenResponse,
  IUser
} from "../modules/user/types/user.type";
import axios from 'axios';
import env from '../env';
import {HTTPCODES} from "../modules/common/types/http-codes.type";
import queryBuilderHelper from "../helpers/query-builder.helper";
import {AuthController} from "./auth.controller";


export class UserController {
  private userService: UserService = new UserService();
  private authService: AuthController = new AuthController();

  public login(req: Request, res: Response) {
    logger.info('function login() started execution');

    if (req && req.body && req.body.email && req.body.password) {
      const url = env.getIamUrl('login');
      axios.post<IIAMUserResponse>(url, {
          email: req.body.email,
          password: req.body.password
        }
      ).then(response => {
        if (response && response.data && response.data.STATUS && response.data.STATUS == 'success' && response.data.DATA) {
          let filter = {};
          filter = queryBuilderHelper.objectIdMatcher(filter, '_uid', response.data.DATA._uid);
          this.userService.filterUsers(filter, (error: any, dataUser: IUser[]) => {
            if (error) {
              internalErrorResponseService(error, res);
            } else {
              if (dataUser && dataUser.length && dataUser.length === 1) {

                sendResponseService(HTTPCODES.SUCCESS, 'success', 'Login Successfully', {
                  _uid: response.data.DATA._uid,
                  firstName: response.data.DATA.firstName,
                  indexNumber: dataUser[0].indexNumber,
                  email: response.data.DATA.email,
                  username: response.data.DATA.username,
                  token: response.data.DATA.token
                }, res);
              } else {
                sendResponseService(HTTPCODES.SUCCESS, 'failure', 'User not found!', {}, res);
              }
            }
          });
        } else {
          sendResponseService(HTTPCODES.SUCCESS, 'failure', 'User not found!', {}, res);
        }
      });
    } else {
      insufficientDataResponseService(res);
    }

    logger.info('function login() ended execution');
  }

  public register(req: Request, res: Response) {
    logger.info('function register started execution');

    if (req && req.body && req.body.firstName && req.body.indexNumber && req.body.email && req.body.password) {
      const url = env.getIamUrl('register');
      axios.post<IIAMUserResponse>(url, {
          firstName: req.body.firstName,
          email: req.body.email,
          password: req.body.password,
          username: req.body.username
        }
      ).then(response => {
        if (response.data && response.data.STATUS && response.data.STATUS === 'success') {
          console.log(response.data)
          if (response.data.DATA &&
            response.data.DATA._uid &&
            response.data.DATA.email &&
            response.data.DATA.username &&
            response.data.DATA.firstName &&
            response.data.DATA.token
          ) {
            const newUserParams: INewUser = {
              _uid: response.data.DATA._uid,
              indexNumber: req.body.indexNumber
            };

            this.userService.createUser(newUserParams, (error: any, isAdded: boolean) => {
              if (error) {
                internalErrorResponseService(error, res);
              } else {
                if (isAdded) {
                  sendResponseService(HTTPCODES.SUCCESS, 'success', 'User Registered Successfully', {
                      _uid: response.data.DATA._uid,
                      firstName: response.data.DATA.firstName,
                      indexNumber: req.body.indexNumber,
                      email: response.data.DATA.email,
                      username: response.data.DATA.username,
                      token: response.data.DATA.token
                    },
                    res);
                }
              }
            });
          } else {
            internalErrorResponseService({error: 'IAM Error'}, res);
          }
        } else {
          sendResponseService(HTTPCODES.SUCCESS, 'failure', response.data.MESSAGE, {}, res);
        }
      }).catch(reject => {
        internalErrorResponseService(reject, res);
      });
    } else {
      insufficientDataResponseService(res);
    }

    logger.info('function register ended execution');
  }

  public profile(req: Request, res: Response) {
    this.authService.validateLogin(req, res, (dataLoggedUser: IIAMUser) => {
      if (dataLoggedUser) {
        this.userService.filterUsers({_uid: dataLoggedUser._uid}, (error: any, dataUser: IUser[]) => {
          if (error) {
            internalErrorResponseService(error, res);
          } else {
            if (dataUser && dataUser.length && dataUser.length === 1) {
              sendResponseService(HTTPCODES.SUCCESS, 'success', 'User found', {
                _uid: dataLoggedUser._uid,
                email: dataLoggedUser.email,
                firstName: dataLoggedUser.firstName,
                lastName: dataLoggedUser.firstName ? dataLoggedUser.lastName : '',
                username: dataLoggedUser.username,
                indexNumber: dataUser[0].indexNumber ? dataUser[0].indexNumber : '',
                academicYear: dataUser[0].academicYear ? dataUser[0].academicYear : '',
                combination: dataUser[0].combination ? dataUser[0].combination : '',
                department: dataUser[0].department ? dataUser[0].department : '',
                faculty: dataUser[0].faculty ? dataUser[0].faculty : '',
                profilePhoto: dataUser[0].profilePhoto? '/uploads/' + dataUser[0].profilePhoto: '',
                coverPhoto: dataUser[0].coverPhoto? '/uploads/' + dataUser[0].coverPhoto: ''
              } as IProfile, res);
            } else {
              sendResponseService(HTTPCODES.SUCCESS, 'failed', 'User not found', {}, res);
            }
          }
        });

      } else {
        sendResponseService(HTTPCODES.ERR_UNAUTHORIZED, 'failed', 'User not found', {}, res);
      }
    });
  }

  public updateProfile(req: Request, res: Response) {
    this.authService.validateLogin(req, res, (dataLoggedUser: IIAMUser) => {
      if (dataLoggedUser) {
        this.userService.filterUsers({_uid: dataLoggedUser._uid}, (error: any, dataUser: IUser[]) => {
          if (error) {
            internalErrorResponseService(error, res);
          } else {
            if (dataUser && dataUser.length && dataUser.length === 1) {
              if (req.body.password) {
                let url = env.getIamUrl(`user/password?id=${dataUser[0]._uid}`);
                axios.put(url, {password: req.body.password}).then(response => {
                  if (response.data.STATUS && response.data.STATUS === 'success') {
                    url = env.getIamUrl(`user/update?id=${dataUser[0]._uid}`);
                    axios.put(url, {
                      firstName: req.body.firstName,
                      lastName: req.body.lastName ? req.body.lastName : '',
                      email: req.body.email,
                      username: req.body.username
                    }).then(_response => {
                      console.log(_response);
                      if (_response.data.STATUS && _response.data.STATUS === 'success') {
                        dataUser[0].indexNumber = req.body.indexNumber ? req.body.indexNumber : '';
                        dataUser[0].faculty = req.body.faculty ? req.body.faculty : '';
                        dataUser[0].department = req.body.department ? req.body.department : '';
                        dataUser[0].combination = req.body.combination ? req.body.combination : '';
                        dataUser[0].academicYear = req.body.academicYear ? req.body.academicYear : '';
                        this.userService.updateUser(dataUser[0]._uid, dataUser[0], (error: any, isUpdated: boolean) => {
                          if (error) {
                            internalErrorResponseService(error, res);
                          } else {
                            if (isUpdated) {
                              sendResponseService(HTTPCODES.SUCCESS, 'success', 'Profile updated successfully', {}, res);
                            } else {
                              sendResponseService(HTTPCODES.SUCCESS, 'failed', 'Profile updated failed', {}, res);
                            }
                          }
                        });
                      } else {
                        sendResponseService(HTTPCODES.SUCCESS, 'failed', 'Profile updated failed', {}, res);
                      }
                    });
                  } else {
                    sendResponseService(HTTPCODES.SUCCESS, 'failed', 'Password is not updated', {}, res);
                  }
                });
              } else {
                const url = env.getIamUrl(`user/update?id=${dataUser[0]._uid}`);
                axios.put(url, {
                  firstName: req.body.firstName,
                  lastName: req.body.lastName ? req.body.lastName : '',
                  email: req.body.email,
                  username: req.body.username
                }).then(_response => {
                  if (_response.data.STATUS && _response.data.STATUS === 'success') {
                    dataUser[0].indexNumber = req.body.indexNumber ? req.body.indexNumber : '';
                    dataUser[0].faculty = req.body.faculty ? req.body.faculty : '';
                    dataUser[0].department = req.body.department ? req.body.department : '';
                    dataUser[0].combination = req.body.combination ? req.body.combination : '';
                    dataUser[0].academicYear = req.body.academicYear ? req.body.academicYear : '';
                    this.userService.updateUser(dataUser[0]._uid, dataUser[0], (error: any, isUpdated: boolean) => {
                      if (error) {
                        internalErrorResponseService(error, res);
                      } else {
                        if (isUpdated) {
                          sendResponseService(HTTPCODES.SUCCESS, 'success', 'Profile updated successfully', {}, res);
                        } else {
                          sendResponseService(HTTPCODES.SUCCESS, 'failed', 'Profile updated failed!', {}, res);
                        }
                      }
                    });
                  } else {
                    sendResponseService(HTTPCODES.SUCCESS, 'failed', 'Profile updated failed', {}, res);
                  }
                }).catch((err ) => {
                  logger.log(err.response);
                });
              }
            } else {
              sendResponseService(HTTPCODES.SUCCESS, 'failed', 'User not found!', {}, res);
            }
          }
        });
      } else {
        sendResponseService(HTTPCODES.ERR_UNAUTHORIZED, 'failed', 'Logged user not found', {}, res);
      }
    });
  }

  public updateProfilePhoto(req: Request, res: Response) {
    if (req.file && req.body.uploadType) {
      this.authService.validateLogin(req, res, (dataLoggedUser: IIAMUser) => {
        if (dataLoggedUser) {
          this.userService.filterUsers({_uid: dataLoggedUser._uid}, (error: any, dataUser: IUser[]) => {
            if (error) {
              internalErrorResponseService(error, res);
            } else {
              if (dataUser && dataUser.length && dataUser.length === 1) {
                if (req.body.uploadType === 'profile') {
                  dataUser[0].profilePhoto = req.file ? req.file.filename : '';
                  this.userService.updateUser(dataLoggedUser._uid, dataUser[0], (err: any, isUpdated: boolean) => {
                    if (err) {
                      internalErrorResponseService(err,res);
                    } else {
                      if (isUpdated) {
                        sendResponseService(HTTPCODES.SUCCESS,'success','Profile photo updated successfully',{},res);
                      } else {
                        sendResponseService(HTTPCODES.SUCCESS,'failed','Profile photo update failed',{},res);
                      }
                    }
                  });
                } else if (req.body.uploadType === 'cover') {
                  dataUser[0].coverPhoto = req.file ? req.file.filename : '';
                  this.userService.updateUser(dataLoggedUser._uid, dataUser[0], (err: any, isUpdated: boolean) => {
                    if (err) {
                      internalErrorResponseService(err,res);
                    } else {
                      if (isUpdated) {
                        sendResponseService(HTTPCODES.SUCCESS,'success','Cover photo updated successfully',{},res);
                      } else {
                        sendResponseService(HTTPCODES.SUCCESS,'failed','Cover photo update failed',{},res);
                      }
                    }
                  });
                } else {
                  sendResponseService(HTTPCODES.SUCCESS,'failed','Upload type cannot be determined',{},res);
                }
              } else {
                sendResponseService(HTTPCODES.SUCCESS, 'failed', 'User not found', {}, res);
              }
            }
          });
        } else {
          sendResponseService(HTTPCODES.ERR_UNAUTHORIZED, 'failed', 'User not found', {}, res);
        }
      });
    } else {
      insufficientDataResponseService(res);
    }
  }
}
