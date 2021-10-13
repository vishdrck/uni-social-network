import {Component, OnInit} from '@angular/core';
import constants from '../../services/constants.service';
import {HttpClient} from "@angular/common/http";
import {LoggedUserDataStore} from '../../data/logged-user.data-store';
import {IProfileResponse} from "../../common/common.types";
import {Router} from "@angular/router";
import {LocalStorage} from "@ngx-pwa/local-storage";

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  screenWidth: number;
  loggedUserDataStore: LoggedUserDataStore = LoggedUserDataStore.getLoggedUserDateStore();

  constructor(private http: HttpClient, private router: Router, private localstorage: LocalStorage) {
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
    this.localstorage.getItem('token').subscribe((token) => {
      if (token) {
        this.http.get(url, {headers: {Authorization: `Bearer ${token}`}}).subscribe((response: any) => {
          if (response.STATUS && response.STATUS === 'success') {
            this.loggedUserDataStore.profile = response.DATA;
          }
        });
      } else {
        this.router.navigate(['/account/login']);
      }
    });
  }

  logout() {
    this.localstorage.clear().subscribe(() => {
      this.router.navigate(['/account/login']);
    });
  }
}
