import {Application,Request,Response} from "express";
import {UserController} from "../controllers/user.controller";
import {PostController} from "../controllers/post.controller";
import {AuthController} from "../controllers/auth.controller";
import multer from "multer";
import env from "../env";
import path from "path";

export class UserRoutes {
  private userController: UserController = new UserController();
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

    app.put('/profile',(req: Request,res: Response) => {
      this.userController.updateProfile(req,res);
    });

    app.post('/profile/avatar',this.upload.single('file'),(req: Request,res: Response) => {
      this.userController.updateProfilePhoto(req,res);
    });

    app.post('/profile/cover',this.upload.single('file'),(req: Request,res: Response) => {
      this.userController.updateProfilePhoto(req,res);
    });
  }
}
