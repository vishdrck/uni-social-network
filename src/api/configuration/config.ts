import express from 'express';
import * as bodyParser from 'body-parser';
import bearerToken from 'express-bearer-token';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import { MongoConnection } from './mongo';
import { CommonRoutes } from '../routes/common.route';
import {UserRoutes} from "../routes/user.route";
import {PostRoutes} from "../routes/post.route";
import {FriendRoutes} from "../routes/friend.route";

class App {
  public app: express.Application;
  private mongoConnection: MongoConnection = new MongoConnection();
  private commonRoutes: CommonRoutes = new CommonRoutes();
  private userRoutes: UserRoutes = new UserRoutes();
  private postRoutes: PostRoutes = new PostRoutes();
  private friendRoutes: FriendRoutes = new FriendRoutes();

  // Routes

  constructor() {
    this.app = express();
    this.config();
    this.mongoConnection.connect();
    this.commonRoutes.route(this.app);
    this.userRoutes.route(this.app);
    this.postRoutes.route(this.app);
    this.friendRoutes.route(this.app);
  }

  private config(): void {

    //Converts the requests into json format for handling purposes
    this.app.use(bodyParser.json({ limit: '10mb' }));
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

    const logDir = path.join(__dirname, '../log');
    fs.existsSync(logDir) || fs.mkdirSync(logDir);

    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, '../log/api-log.log'), { flags: 'a' }
    );

    this.app.use(bearerToken());

    this.app.use((req, res, next) => {
      const allowedOrigins = [
        'https://tuitionclasses.lk',
        'https://dev.tuitionclasses.lk',
        'https://qa.tuitionclasses.lk',
        'http://localhost:4200'
      ];

      const origin = req.headers.host;
      if (allowedOrigins.indexOf(<string>origin) > -1) {
        // @ts-ignore
        res.setHeader('Access-Control-Allow-Origin', origin);
      } else {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      }

      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');;
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');

      // In case if request comes with '/api' prefix route, then have to conclude it
      if (req.url.substr(0, 4) === '/api') {
        req.url = req.url.substr(4);
      }

      // Finally pass next()
      next();
    });
  }
}

export default new App().app;
