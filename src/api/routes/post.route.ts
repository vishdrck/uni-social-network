import {Application,Request,Response} from "express";
import {UserController} from "../controllers/user.controller";
import {PostController} from "../controllers/post.controller";
import {AuthController} from "../controllers/auth.controller";

export class PostRoutes {
  private userController: UserController = new UserController();
  private postController: PostController = new PostController();
  private authController: AuthController = new AuthController();

  public route(app: Application) {

    app.get('/post', (req: Request, res: Response) => {
      this.postController.getAllPosts(req,res);
    });

    app.post('/post/create', (req: Request, res: Response) => {
      this.postController.createPost(req,res);
    });

    app.put('/post/edit',(req: Request, res: Response)=> {
      this.authController.validateToken(req,res);
    });

    app.delete('/post/edit',(req: Request, res: Response)=> {
      this.authController.validateToken(req,res);
    });
  }
}
