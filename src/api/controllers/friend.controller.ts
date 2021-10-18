import {Request, Response} from "express";
import {IIAMUser, IUser} from "../modules/user/types/user.type";
import internalErrorResponseService from "../modules/common/services/internalError.response.service";
import {AuthController} from "./auth.controller";
import {UserService} from "../modules/user/services/user.service";
import queryBuilderHelper from "../helpers/query-builder.helper";
import logger from "../helpers/logger";
import axios from "axios";
import env from '../env';
import {HTTPCODES} from "../modules/common/types/http-codes.type";
import sendResponseService from "../modules/common/services/send.response.service";
import insufficientDataResponseService from "../modules/common/services/insufficient-data.response.service";
import {IFriend} from "../modules/friend/types/friend.type";
import mongoose from "mongoose";
import {FriendService} from "../modules/friend/services/friend.service";
import {IDetailedPost} from "../modules/post/types/post.type";
import {filter} from "rxjs/operators";

export class FriendController {
  private authService: AuthController = new AuthController();
  private userService: UserService = new UserService();
  private friendService: FriendService = new FriendService();

  public addFriend(req: Request, res: Response) {
    if (req.query && req.query.fuid) {
      this.authService.validateLogin(req, res, (dataLoggedUser: IIAMUser) => {
        if (dataLoggedUser) {
          this.userService.filterUsers({_uid: dataLoggedUser._uid}, (err: any, dataUser: IUser[]) => {
            if (err) {
              internalErrorResponseService(err, res);
            } else {
              if (dataUser && dataUser.length && dataUser.length === 1) {
                const newFrinedRequest: IFriend = {
                  _uid: dataUser[0]._uid,
                  // @ts-ignore
                  _fuid: new mongoose.Types.ObjectId(req.query.fuid.toString()),
                  requestedDate: new Date(Date.now())
                };
                this.friendService.createFriend(newFrinedRequest, (error: any, isCreated: boolean) => {
                  if (error) {
                    internalErrorResponseService(error, res);
                  } else {
                    if (isCreated) {
                      sendResponseService(HTTPCODES.SUCCESS, 'success', 'Friend added successfully', {}, res);
                    } else {
                      sendResponseService(HTTPCODES.SUCCESS, 'failed', 'Friend added failed', {}, res);
                    }
                  }
                });
              } else {
                sendResponseService(HTTPCODES.SUCCESS, 'failed', 'User not found', {}, res);
              }
            }
          });
        } else {
          sendResponseService(HTTPCODES.ERR_UNAUTHORIZED, 'failed', 'Logged user not found', {}, res);
        }
      });
    } else {
      insufficientDataResponseService(res);
    }
  }

  public getFriends(req: Request, res: Response) {
    this.authService.validateLogin(req, res, (dataLoggedUser: IIAMUser) => {
      if (dataLoggedUser) {
        this.userService.filterUsers({_uid: dataLoggedUser._uid}, (err: any, dataUser: IUser[]) => {
          if (err) {
            internalErrorResponseService(err, res);
          } else {
            if (dataUser && dataUser.length && dataUser.length === 1) {
              this.userService.filterUsersPagination({}, 10, 0, (error: any, dataUsers: IUser[]) => {
                if (error) {
                  internalErrorResponseService(error, res);
                } else {
                  if (dataUsers && dataUsers.length && dataUser.length > 0) {
                    const uids = dataUsers.map(user => {
                      return user._uid.toString();
                    });
                    const url = env.getIamUrl('user/all');
                    axios.patch(url, {users: uids}).then(response => {
                      if (response.data && response.data.STATUS && response.data.STATUS === 'success' && response.data.DATA && response.data.DATA.length > 0) {
                        const users = response.data.DATA;
                        let filters = {};
                        filters = queryBuilderHelper.arrayElementMatcher(filters, '_fuid', uids);
                        filters = queryBuilderHelper.objectIdMatcher(filters, '_uid', dataUser[0]._uid);
                        this.friendService.filterFriends(filters, (_err: any, friends: IFriend[]) => {
                          if (_err) {
                            internalErrorResponseService(_err, res);
                          } else {
                            // if(friends && friends.length && friends.length > 0) {
                            const allFriends = dataUsers.map((_user) => {
                              const allUser: IIAMUser[] = users.filter((user: IIAMUser) => user._uid.toString() === _user._uid.toString());
                              const friend: IFriend[] = friends.filter((_friend: IFriend) => _user._uid.toString() === _friend._fuid.toString());

                              if (allUser && allUser.length && allUser.length === 1) {
                                if (allUser[0]._uid.toString() !== dataUser[0]._uid.toString()) {
                                  return {
                                    _uid: allUser[0]._uid,
                                    firstName: allUser[0].firstName,
                                    lastName: allUser[0].lastName ? allUser[0].lastName : '',
                                    username: allUser[0].username,
                                    faculty: _user.faculty,
                                    academicYear: _user.academicYear,
                                    profilePhoto: _user.profilePhoto ? '/uploads/' + _user.profilePhoto : '',
                                    isAFriend: friend.length == 1
                                  };
                                }
                              }
                            }).filter(Boolean);
                            sendResponseService(HTTPCODES.SUCCESS, 'success', 'Friends found', allFriends, res);
                            // } else {
                            //
                            // }
                          }
                        });
                      } else {
                        sendResponseService(HTTPCODES.SUCCESS, 'failed', 'No friends found', [], res);
                      }
                    });
                  } else {
                    sendResponseService(HTTPCODES.SUCCESS, 'failed', 'No friends found', [], res);
                  }
                }
              })
            } else {
              sendResponseService(HTTPCODES.SUCCESS, 'failed', 'User not found', [], res);
            }
          }
        });
      } else {
        sendResponseService(HTTPCODES.ERR_UNAUTHORIZED, 'failed', 'Logged user not found', {}, res);
      }
    });
  }

  public getMyFriends(req: Request, res: Response) {
    this.authService.validateLogin(req, res, (dataLoggedUser: IIAMUser) => {
      if (dataLoggedUser) {
        this.userService.filterUsers({_uid: dataLoggedUser._uid}, (err: any, dataUser: IUser[]) => {
          if (err) {
            internalErrorResponseService(err, res);
          } else {
            if (dataUser && dataUser.length && dataUser.length === 1) {
              let filters = {};
              filters = queryBuilderHelper.objectIdMatcher(filters, '_uid', dataUser[0]._uid);
              this.friendService.filterFriends(filters, (_err: any, friends: IFriend[]) => {
                if (_err) {
                  internalErrorResponseService(_err, res);
                } else {
                  const uids = friends.map(friend => {
                    return friend._fuid.toString();
                  });

                  const url = env.getIamUrl('user/all');
                  axios.patch(url, {users: uids}).then(response => {
                    if (response.data && response.data.STATUS && response.data.STATUS === 'success' && response.data.DATA && response.data.DATA.length > 0) {
                      const iamUsersList = response.data.DATA;
                      let filters_ = {};
                      filters_ = queryBuilderHelper.arrayElementMatcher(filters_, '_uid', uids);
                      this.userService.filterUsers(filters_, (_err: any, friendUsers: IUser[]) => {
                        if (_err) {
                          internalErrorResponseService(_err, res);
                        } else {
                          const myFriends = friends.map(_friend => {
                            const iamUser: IIAMUser[] = iamUsersList.filter((user: IIAMUser) => user._uid.toString() === _friend._fuid.toString());
                            const friendUser: IUser[] = friendUsers.filter((user: IUser) => user._uid.toString() === _friend._fuid.toString());

                            if (iamUser && iamUser.length && iamUser.length === 1 && friendUser && friendUser.length && friendUser.length === 1) {
                              return {
                                _uid: iamUser[0]._uid,
                                firstName: iamUser[0].firstName,
                                lastName: iamUser[0].lastName ? iamUser[0].lastName : '',
                                username: iamUser[0].username,
                                faculty: friendUser[0].faculty,
                                academicYear: friendUser[0].academicYear,
                                profilePhoto: friendUser[0].profilePhoto ? '/uploads/' + friendUser[0].profilePhoto : '',
                                isAFriend: true
                              };
                            }
                          }).filter(Boolean);
                          sendResponseService(HTTPCODES.SUCCESS, 'success', 'Friends found', myFriends, res);
                        }
                      });
                    } else {
                      sendResponseService(HTTPCODES.SUCCESS, 'success', 'Friends not found', [], res);
                    }
                  });
                }
              });
            } else {
              sendResponseService(HTTPCODES.SUCCESS, 'failed', 'User not found', [], res);
            }
          }
        });

      } else {
        sendResponseService(HTTPCODES.ERR_UNAUTHORIZED, 'failed', 'Logged user not found', {}, res);
      }
    });
  }

  public removeFriend(req: Request, res: Response) {
    this.authService.validateLogin(req, res, (dataLoggedUser: IIAMUser) => {
      if (dataLoggedUser) {
        this.userService.filterUsers({_uid: dataLoggedUser._uid}, (err: any, dataUser: IUser[]) => {
          if (err) {
            internalErrorResponseService(err, res);
          } else {
            if (dataUser && dataUser.length && dataUser.length === 1) {
              let filters = {};
              filters = queryBuilderHelper.objectIdMatcher(filters, '_uid', dataUser[0]._uid);
              filters = queryBuilderHelper.objectIdMatcher(filters, '_fuid', req.query.fuid);
              this.friendService.filterFriends(filters, (_err: any, friends: IFriend[]) => {
                if (_err) {
                  internalErrorResponseService(_err,res);
                } else {
                  if (friends && friends.length && friends.length === 1) {
                    this.friendService.deleteFriend(new mongoose.Types.ObjectId(friends[0]._id),(error_:any,isDeleted: boolean)=> {
                      if(error_) {
                        internalErrorResponseService(error_,res);
                      } else {
                        if(isDeleted) {
                          sendResponseService(HTTPCODES.SUCCESS, 'success', 'Friend deleted successfully', [], res);
                        } else {
                          sendResponseService(HTTPCODES.SUCCESS, 'failed', 'Friend delete failed ', [], res);
                        }
                      }
                    });
                  } else {
                    sendResponseService(HTTPCODES.SUCCESS, 'failed', 'Friend not found', [], res);
                  }
                }
              });
            } else {
              sendResponseService(HTTPCODES.SUCCESS, 'failed', 'User not found', [], res);
            }
          }
        });
      } else {
        sendResponseService(HTTPCODES.ERR_UNAUTHORIZED, 'failed', 'Logged user not found', {}, res);
      }
    });
  }

}
