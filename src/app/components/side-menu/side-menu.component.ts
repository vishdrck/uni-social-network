import { Component, OnInit } from '@angular/core';
import {LoggedUserDataStore} from "../../data/logged-user.data-store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  loggedUserDataStore: LoggedUserDataStore = LoggedUserDataStore.getLoggedUserDateStore();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public getProfileName() {
    let fullName = 'John Doe';
    if(this.loggedUserDataStore.profile) {
      fullName = this.loggedUserDataStore.profile.firstName + ` ${this.loggedUserDataStore.profile.lastName?this.loggedUserDataStore.profile.lastName: ''}`;
    } else {
      this.router.navigate(['/account/login']);
    }
    return fullName;
  }

}
