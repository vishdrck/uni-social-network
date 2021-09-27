import {UserService} from "../modules/user/services/user.service";
import logger from './../helpers/logger';
import {Request, Response} from "express";
import insufficientDataResponseService from '../modules/common/services/insufficient-data.response.service';
import {IIAMUserRequest, IIAMUserResponse} from "../modules/user/types/user.type";
import axios from 'axios';
import env from '../env';

export class UserController {
  private userService: UserService = new UserService();

  public login(req: Request, res: Response) {
    logger.info('function login() started execution');

    if (req && req.body && req.body.firstName && req.body.email && req.body.username && req.body.password) {
      const url = env.getIamUrl();
      axios.post<IIAMUserResponse>(url, {
          firstName: req.body.firstName,
          email: req.body.email,
          password: req.body.password,
          username: req.body.username
        }
      ).then(response => {
        console.log(response);
      });

    }

    logger.info('function login() ended execution');
  }

  public register(req: Request, res: Response) {
    logger.info('function register started execution');
    if (req && req.body && req.body.firstName && req.body.indexNumber && req.body.email && req.body.password) {
      const url = env.getIamUrl() + 'register';
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
            response.data.DATA.firstName) {

          } else {

          }
            }
      });
    } else {
      insufficientDataResponseService(res);
    }
  }
}
