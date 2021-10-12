import {Component, OnInit} from '@angular/core';
import constants from '../../services/constants.service';
import {HttpClient} from "@angular/common/http";
import {LoggedUserDataStore} from '../../data/logged-user.data-store';
import {IProfileResponse} from "../../common/common.types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  screenWidth: number;
  loggedUserDataStore: LoggedUserDataStore = LoggedUserDataStore.getLoggedUserDateStore();

  constructor(private http: HttpClient,private router: Router) {
    // Subscribe the width size
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    }
  }

  ngOnInit(): void {
    this.getProfile();
  }

  private getProfile() {
    const url = constants.getURL('profile');
    if (this.loggedUserDataStore.headers) {
      this.http.get(url, this.loggedUserDataStore.headers).subscribe((response: any) => {
        if (response.STATUS && response.STATUS === 'success') {
          this.loggedUserDataStore.profile = response.DATA;
        }
      });
    } else {
      this.router.navigate(['/account/login']);
    }

  }
}
