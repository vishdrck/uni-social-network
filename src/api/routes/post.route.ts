import {Application,Request,Response} from "express";
import {UserController} from "../controllers/user.controller";
import {PostController} from "../controllers/post.controller";
import {AuthController} from "../controllers/auth.controller";
import multer from 'multer';
import env from "../env";
const path = require('path');

export class PostRoutes {
  private userController: UserController = new UserController();
  private postController: PostController = new PostController();
  private authController: AuthController = new AuthController();

  private storage = multer.diskStorage({
    destination: function (req,res,cb) {
      cb(null,env.getImagesStoragePath())
    },
    filename: function (req,file,cb) {
      const uniqueSuffix = Date.now();
      cb(null,file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });


  private upload = multer({storage: this.storage});

  public route(app: Application) {

    app.get('/post', (req: Request, res: Response) => {
      this.postController.getAllPosts(req,res);
    });

    app.post('/post/create',this.upload.single('file'), (req: Request, res: Response) => {
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
