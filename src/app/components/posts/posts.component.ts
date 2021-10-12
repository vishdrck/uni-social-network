import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import constants from '../../services/constants.service';
import {LoggedUserDataStore} from '../../data/logged-user.data-store';
import {posix} from "path";
import {Router} from "@angular/router";
import {IDetailedPost, IDetailedPostResponse} from "../../common/post.types";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  loggedUserDataStore: LoggedUserDataStore = LoggedUserDataStore.getLoggedUserDateStore();
  enableSpinner = true;
  allPosts: IDetailedPost[] = [];

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  private getAllPosts() {
    const url = constants.getURL('post');
    if (this.loggedUserDataStore.headers) {
      this.http.get<IDetailedPostResponse>(url, this.loggedUserDataStore.headers).subscribe((dataPosts:any)=>{
        console.log(dataPosts);
        if (dataPosts.STATUS && dataPosts.STATUS === 'success') {
          this.allPosts = dataPosts.DATA;
        }
      });
    } else {
      this.router.navigate(['/account/login']);
    }
  }

}
