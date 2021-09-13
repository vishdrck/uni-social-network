import { Component, OnInit } from '@angular/core';
import { IconService } from './services/icon.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'uni-social-network';
  constructor(private iconService: IconService) {
    iconService.registerIcons();
  }

}
