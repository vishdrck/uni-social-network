import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import constants from '../../services/constants.service';
import {LoggedUserDataStore} from '../../data/logged-user.data-store';
import {posix} from "path";
import {Router} from "@angular/router";
import {IDetailedPost, IDetailedPostResponse} from "../../common/post.types";
import {LocalStorage} from "@ngx-pwa/local-storage";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  loggedUserDataStore: LoggedUserDataStore = LoggedUserDataStore.getLoggedUserDateStore();
  enableSpinner = true;
  enableNoResults = false;
  allPosts: IDetailedPost[] = [];

  constructor(private http: HttpClient,private router: Router,private localstorage: LocalStorage) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  private getAllPosts() {
    this.enableSpinner = true;
    const url = constants.getURL('post');
    this.localstorage.getItem('token').subscribe((token) => {
      if (token) {
        this.http.get<IDetailedPostResponse>(url, {headers: {Authorization: `Bearer ${token}`}}).subscribe((dataPosts: any) => {
          if (dataPosts.STATUS && dataPosts.STATUS === 'success' && dataPosts.DATA.length && dataPosts.DATA.length > 0) {
            this.allPosts = dataPosts.DATA;
            this.enableSpinner = false;
          } else {
            this.enableNoResults = true;
            this.enableSpinner = false;
          }
        });
      } else {
        this.router.navigate(['/account/login']);
      }
    });
  }

}
