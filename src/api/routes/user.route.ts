import {Application,Request,Response} from "express";
import {UserController} from "../controllers/user.controller";

export class UserRoutes {
  private userController: UserController = new UserController();

  public route(app: Application) {

    app.post('/register', (req: Request, res: Response) => {
      this.userController.register(req,res);
    });
  }
}
