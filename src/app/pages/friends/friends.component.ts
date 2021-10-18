import {Component, OnInit} from '@angular/core';
import {LocalStorage} from "@ngx-pwa/local-storage";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import constants from '../../services/constants.service';
import {IFriendsList} from "../../common/common.types";
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  enableSpinner = false;
  enableNoResults = false;
  filterFriends = 'all-users';
  friendsList: IFriendsList[] = [];

  constructor(private localStorage: LocalStorage,
              private http: HttpClient,
              private router: Router,
              private snackbar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    if (this.filterFriends === 'all-users') {
      this.getAllFriends();
    } else {
      this.getMyFriends();
    }
  }

  public getFriends(event: MatRadioChange) {
    if (event.value === 'all-users') {
      this.getAllFriends();
    } else {
      this.getMyFriends();
    }
  }

  public getAllFriends() {
    this.enableSpinner = true;
    this.localStorage.getItem('token').subscribe(token => {
      if (token) {
        const url = constants.getURL('friends/all');
        this.http.get(url, {headers: {Authorization: `Bearer ${token}`}}).subscribe((response: any) => {
          if (response && response.STATUS && response.STATUS === 'success') {
            this.friendsList = response.DATA;
            this.enableSpinner = false;

          }
        });
      } else {
        this.router.navigate(['/account/login']);
      }
    });
  }

  public getMyFriends() {
    this.enableSpinner = true;
    this.localStorage.getItem('token').subscribe(token => {
      if (token) {
        const url = constants.getURL('friends/my');
        this.http.get(url, {headers: {Authorization: `Bearer ${token}`}}).subscribe((response: any) => {
          if (response && response.STATUS && response.STATUS === 'success') {
            this.enableSpinner = false;
            this.friendsList = response.DATA;
          }
        });
      } else {
        this.router.navigate(['/account/login']);
      }
    });
  }

}
