import {Application} from "express";

export class UserRoutes {
  public route(app: Application) {
    app.post('login');
  }
}
