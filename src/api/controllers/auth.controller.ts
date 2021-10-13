import {Request, Response} from 'express';
import logger from "../helpers/logger";
import env from "../env";
import axios from "axios";
import {IIAMUserProfileResponse, ItokenResponse, IUser} from "../modules/user/types/user.type";
import sendResponseService from "../modules/common/services/send.response.service";
import {HTTPCODES} from "../modules/common/types/http-codes.type";
import internalErrorResponseService from "../modules/common/services/internalError.response.service";
import insufficientDataResponseService from "../modules/common/services/insufficient-data.response.service";
import mongoose from "mongoose";

export class AuthController {

  public validateLogin(req: Request, res: Response, next: Function) {
    if (req && req.token) {
      req.body.token = req.token;
      const url = env.getIamUrl('validate/token');
      axios.post(url, {
          token: req.token
        }
      ).then(response => {
        if (response.data && response.data.STATUS && response.data.STATUS === 'success') {
          let url = env.getIamUrl(`user?id=${response.data.DATA._uid}`);
          axios.get<IIAMUserProfileResponse>(url).then((_response) => {
            if (_response && _response.data && _response.data.STATUS && _response.data.STATUS === 'success') {
              next(_response.data.DATA);
            } else {
              next(false);
            }
          }).catch((err) => {
            next(false);
          });
        } else {
          next(false);
        }
      }).catch((err_) => {
        next(false);
      });

    } else {
      next(false);
    }
  }

  private validateAuthToken(token: string): any {
    const url = env.getIamUrl('validate/token');
    axios.post(url, {
        token: token
      }
    ).then(response => {
      if (response.data && response.data.STATUS && response.data.STATUS === 'success') {
        if (response.data.DATA) {
          return {validity: true, _id: response.data.DATA._id};
        } else {
          return {validity: false};
        }
      } else {
        return {validity: false};
      }
    }).catch(() => {
      return {validity: false};
    });

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
            sendResponseService(HTTPCODES.SUCCESS, 'success', 'Token validated successfully',
              {validity: response.data.DATA.validity},
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
