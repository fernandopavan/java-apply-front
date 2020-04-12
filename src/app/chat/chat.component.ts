import { Component, OnInit } from '@angular/core';
import { WebSocketAPI } from './web-socket-api';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  title = 'angular8-springboot-websocket';

  webSocketAPI: WebSocketAPI;
  greeting: any;
  message: string;

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new ChatComponent());
  }

  connect() {
    this.webSocketAPI.connect();
  }

  disconnect() {
    this.webSocketAPI.disconnect();
  }

  sendMessage() {
    this.webSocketAPI.send(this.message);
  }

  handleMessage(message) {
    this.greeting = message;
  }

}
