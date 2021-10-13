import {Application,Request,Response} from "express";
import {UserController} from "../controllers/user.controller";
import {PostController} from "../controllers/post.controller";
import {AuthController} from "../controllers/auth.controller";

export class UserRoutes {
  private userController: UserController = new UserController();
  private authController: AuthController = new AuthController();

  public route(app: Application) {

    app.post('/register', (req: Request, res: Response) => {
      this.userController.register(req,res);
    });

    app.post('/login', (req: Request, res: Response) => {
      this.userController.login(req,res);
    });

    app.post('/validate/token',(req: Request, res: Response)=> {
      this.authController.validateToken(req,res);
    });

    app.get('/profile',(req: Request,res: Response)=> {
      this.userController.profile(req,res);
    });
  }
}
