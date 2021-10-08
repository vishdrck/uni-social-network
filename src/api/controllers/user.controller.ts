import {UserService} from "../modules/user/services/user.service";
import logger from './../helpers/logger';
import {Request, Response} from "express";
import insufficientDataResponseService from '../modules/common/services/insufficient-data.response.service';
import internalErrorResponseService from '../modules/common/services/internalError.response.service';
import sendResponseService from '../modules/common/services/send.response.service';
import {IIAMUserResponse, INewUser, ItokenResponse, IUser} from "../modules/user/types/user.type";
import axios from 'axios';
import env from '../env';
import {HTTPCODES} from "../modules/common/types/http-codes.type";
import queryBuilderHelper from "../helpers/query-builder.helper";

export class UserController {
  private userService: UserService = new UserService();

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

  public validateToken(req: Request, res: Response) {
    logger.info('function validateToken started execution');

    if (req && req.body && req.body.token) {
      const url = env.getIamUrl('validate/token');
      axios.post<ItokenResponse>(url, {
          token: req.body.token
        }
      ).then(response => {
        if (response.data && response.data.STATUS && response.data.STATUS === 'success') {
          if (response.data.DATA) {
            sendResponseService(HTTPCODES.SUCCESS, 'success', 'Token validated successfully', {
                STATUS: 'success',
                MESSAGE: 'Token is validated',
                DATA: {
                  validity: response.data.DATA.validity
                }
              },
              res);
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

    logger.info('function validateToken ended execution');
  }
}
