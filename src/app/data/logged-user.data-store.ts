import {HttpHeaders} from "@angular/common/http";
import {IProfile} from "../common/common.types";

export class LoggedUserDataStore {
  private static data: LoggedUserDataStore;

  headers: any;

  profile: IProfile | null;

  private constructor() {
    this.headers = null;
    this.profile = null;

  }

  public static getLoggedUserDateStore() {
    if (!this.data) {
      this.data = new LoggedUserDataStore();
    }
    return this.data;
  }
}
