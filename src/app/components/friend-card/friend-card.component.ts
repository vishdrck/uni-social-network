import {Component, Input, OnInit} from '@angular/core';
import constants from '../../services/constants.service';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxSpinnerService} from "ngx-spinner";
import {LocalStorage} from "@ngx-pwa/local-storage";

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent implements OnInit {

  @Input() firstName = '';
  @Input() lastName = '';
  @Input() faculty = '';
  @Input() acadamicYear = '';
  @Input() isAFriend = 'false';
  @Input() profilePhoto = 'background-image: url(\'/assets/uploads/profile.jpg\');';
  @Input() _uid = '';


  constructor(private http: HttpClient,
              private localStorage: LocalStorage,
              private router: Router,
              private snackbar: MatSnackBar,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
  }

  public getAvatar() {
    return this.profilePhoto ? `background-image: url('${this.profilePhoto}');` : 'background-image: url(\'/assets/uploads/profile.jpg\');';
  }

  public addFriend(fuid: string) {
    this.spinner.show('spinner_' + this._uid.toString());
    this.localStorage.getItem('token').subscribe(token => {
      if (token) {
        const url = constants.getURL(`friends/add?fuid=${fuid}`);
        this.http.post(url, {}, {headers: {Authorization: `Bearer ${token}`}}).subscribe((response: any) => {
          if(response && response.STATUS && response.STATUS === 'success') {
            this.snackbar.open('Friend added successfully','close', {duration: 3000}).afterDismissed().subscribe(e =>{
            window.location.reload();
            });
          } else {
            this.spinner.hide();
            this.snackbar.open('Something went wrong!','close', {duration: 3000});
          }
        });
      } else {
        this.router.navigate(['/account/login']);
      }
    });

  }

}
