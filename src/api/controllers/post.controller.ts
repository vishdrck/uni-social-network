import {Request, Response} from 'express';
import {IIAMUser, IUser} from "../modules/user/types/user.type";
import {AuthController} from "./auth.controller";
import sendResponseService from "../modules/common/services/send.response.service";
import {HTTPCODES} from "../modules/common/types/http-codes.type";
import internalErrorResponseService from "../modules/common/services/internalError.response.service";
import insufficientDataResponseService from "../modules/common/services/insufficient-data.response.service";
import {IDetailedPost, IPost} from "../modules/post/types/post.type";
import {PostService} from "../modules/post/services/post.service";
import queryBuilderHelper from "../helpers/query-builder.helper";
import logger from "../helpers/logger";
import axios from "axios";
import env from '../env';
import {UserService} from "../modules/user/services/user.service";
import {FriendService} from "../modules/friend/services/friend.service";
import {IFriend} from "../modules/friend/types/friend.type";

export class PostController {

  private authService: AuthController = new AuthController();
  private postService: PostService = new PostService();
  private userService: UserService = new UserService();
  private friendService: FriendService = new FriendService();

  public createPost(req: Request, res: Response) {
    this.authService.validateLogin(req, res, (dataLoggedUser: IIAMUser) => {
      if (dataLoggedUser) {
        if (req.body && req.body.postType && req.body.postTitle) {
          let imagePath = '';
          let postContent = '-';
          if (req.file) {
            imagePath = req.file.filename;
          }
          if (req.body.postContent) {
            postContent = req.body.postContent;
          }

          const newPost: IPost = {
            _uid: dataLoggedUser._uid,
            postColor: req.body.className,
            postContent: postContent,
            title: req.body.postTitle,
            imagePath: imagePath,
            publishedIn: new Date(Date.now()),
            postType: req.body.postType
          };
          this.postService.createPost(newPost, (error: any, isAdded: boolean) => {
            if (error) {
              internalErrorResponseService(error, res);
            } else {
              if (isAdded) {
                sendResponseService(HTTPCODES.SUCCESS, 'success', 'Post published successfully', {}, res);
              } else {
                internalErrorResponseService({}, res);
              }
            }
          });
        } else {
          insufficientDataResponseService(res);
        }
      } else {
        sendResponseService(HTTPCODES.ERR_UNAUTHORIZED, 'failed', 'Logged user not found', {}, res);
      }
    });
  }

  public getAllPosts(req: Request, res: Response) {
    this.authService.validateLogin(req, res, (dataLoggedUser: IIAMUser) => {
      if (dataLoggedUser) {
        this.userService.filterUsers({_uid: dataLoggedUser._uid}, (err: any, dataUser: IUser[]) => {
          if (err) {
            internalErrorResponseService(err, res);
          } else {
            if (dataUser && dataUser.length && dataUser.length === 1) {
              this.friendService.filterFriends({_uid: dataLoggedUser._uid},(err_: any, friendsList: IFriend[])=> {
                let uids_ = friendsList.map(friend => {
                  return friend._fuid.toString();
                });

                uids_.push(dataLoggedUser._uid.toString());

                let skip = 0;
                if (req.query.skip) {
                  skip = parseInt(req.query.skip.toString());
                }
                let filter = {};
                filter = queryBuilderHelper.arrayElementMatcher(filter, '_uid', uids_);
                this.postService.filterPostPagination(filter, 10, skip, (error: any, dataPosts: IPost[]) => {
                  if (error) {
                    internalErrorResponseService(error, res);
                  } else {
                    if (dataPosts && dataPosts.length && dataPosts.length > 0) {
                      const uids = dataPosts.map(user => {
                        return user._uid.toString();
                      });
                      const url = env.getIamUrl('user/all');
                      axios.patch(url, {users: uids}).then(response => {
                        if (response.data && response.data.STATUS && response.data.STATUS === 'success' && response.data.DATA && response.data.DATA.length > 0) {
                          const users = response.data.DATA;
                          const allPosts = dataPosts.map((post) => {
                            const postAuthor: IIAMUser[] = users.filter((user: IIAMUser) => user._uid.toString() === post._uid.toString());
                            if (postAuthor && postAuthor.length && postAuthor.length === 1) {
                              return {
                                _id: post._id,
                                _uid: postAuthor[0]._uid,
                                firstName: postAuthor[0].firstName,
                                lastName: postAuthor[0].lastName ? postAuthor[0].lastName : '',
                                username: postAuthor[0].username,
                                postContent: post.postContent ? post.postContent : '',
                                postColor: post.postColor ? post.postColor : '',
                                postType: post.postType ? post.postType : '',
                                publishedIn: post.publishedIn,
                                title: post.title ? post.title : '',
                                imagePath: post.imagePath ? '/uploads/' + post.imagePath : '',
                                reactions: post.reactions,
                                profilePhoto: dataUser[0].profilePhoto? '/uploads/' + dataUser[0].profilePhoto: ''
                              } as IDetailedPost;
                            }
                          }).filter(Boolean);
                          sendResponseService(HTTPCODES.SUCCESS, 'success', 'Posts found', allPosts, res);
                        } else {
                          sendResponseService(HTTPCODES.SUCCESS, 'success', 'No users found', [], res);
                          // no users found
                        }
                      });
                    } else {
                      sendResponseService(HTTPCODES.SUCCESS, 'success', 'Posts not found', [], res);
                      // no posts
                    }
                  }
                });

              });

            } else {
              sendResponseService(HTTPCODES.SUCCESS, 'success', 'No user found', [], res);
            }
          }

        });

      } else {
        sendResponseService(HTTPCODES.ERR_UNAUTHORIZED, 'failed', 'Logged user not found', {}, res);
      }
    });
  }

}
