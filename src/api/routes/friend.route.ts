import {Application,Request,Response} from "express";
import {UserController} from "../controllers/user.controller";
import {PostController} from "../controllers/post.controller";
import {AuthController} from "../controllers/auth.controller";
import multer from "multer";
import env from "../env";
import path from "path";
import {FriendController} from "../controllers/friend.controller";

export class FriendRoutes {
  private userController: UserController = new UserController();
  private authController: AuthController = new AuthController();
  private friendController: FriendController = new FriendController();

  public route(app: Application) {
    app.get( '/friends/all',(req: Request,res: Response) => {
      this.friendController.getFriends(req,res);
    });

    app.post('/friends/add', (req: Request,res: Response) => {
      this.friendController.addFriend(req,res);
    });

    app.get('/friends/my',(req: Request,res: Response)=> {
      this.friendController.getMyFriends(req,res);
    });
  }
}
