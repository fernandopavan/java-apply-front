import SockJS from "sockjs-client"
import { Stomp } from "@stomp/stompjs"
import { ChatComponent } from './chat.component';

export class WebSocketAPI {

  username = localStorage.getItem('localUser')['email'];

  topic: string = "/topic/public";
  stompClient: any;
  chatComponent: ChatComponent;

  constructor(chatComponent: ChatComponent) {
    this.chatComponent = chatComponent;
  }

  connect() {
    let ws = new SockJS('http://localhost:8080/api/ws');
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, function (frame) {
      this.stompClient.subscribe("/topic/public", function (sdkEvent) {
        this.onMessageReceived(sdkEvent);
        this.stompClient.send("/chat.add", {},
          JSON.stringify({ sender: this.username, type: 'JOIN' }))
      });

    }, this.errorCallBack);

  };

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Desconectado!");
  }

  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  send(message) {
    let chatMessage = {
      sender: this.username,
      content: message,
      type: 'CHAT'
    };
    console.log("chamando a API de chat via soquete da web");
    this.stompClient.send("/chat.send", {}, JSON.stringify(chatMessage));
  }

  onMessageReceived(message) {
    var message = JSON.parse(message.body);

    console.log("Mensagem recebida: " + message);

    this.chatComponent.handleMessage(this.username + ': ' + JSON.stringify(message.body));
  }

}