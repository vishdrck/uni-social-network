import { Component, OnInit } from '@angular/core';
import {MatSelectionListChange} from "@angular/material/list";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messageView: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  changeMessageView(event: MatSelectionListChange) {
    this.messageView = true;
  }

}
