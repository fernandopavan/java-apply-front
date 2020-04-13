// import SockJS from "sockjs-client"
// import { Stomp } from "@stomp/stompjs"
// import { ChatComponent } from './chat.component';
// import { API_CONFIG } from '../config/api.config';

// export class WebSocketAPI {

//   topic: string = "/topic/public";
//   stompClient: any;
//   chatComponent: ChatComponent;
//   username: string = "";

//   constructor(chatComponent: ChatComponent, username: string) {
//     this.chatComponent = chatComponent;
//     this.username = username;
//   }

//   connect() {
//     this.stompClient = Stomp.over(new SockJS(API_CONFIG.baseUrl + '/ws'));
//     this.stompClient.connect({}, this.connectionSuccess());
//   };

//   connectionSuccess() {
//     if (this.stompClient === null || this.stompClient === undefined) {
//       return this.connect();
//     }

//     console.log("Conectado!");

//     setTimeout(() => {
//       this.stompClient.subscribe("/topic/public", this.onMessageReceived);
//       this.stompClient.send("/chat.add", {}, JSON.stringify({ sender: this.username, type: 'JOIN' }));
//     }, 2000);

//   }

//   disconnect() {
//     if (this.stompClient !== null || this.stompClient !== undefined) {
//       this.stompClient.disconnect();
//     }
//     console.log("Desconectado!");
//   }

//   send(message) {
//     let chatMessage = {
//       sender: this.username,
//       content: message,
//       type: 'CHAT'
//     };

//     console.log("Enviando mensagem: " + chatMessage.sender + ' = ' + chatMessage.content);
//     this.stompClient.send("/chat.send", {}, JSON.stringify(chatMessage));
//   }

//   onMessageReceived(message) {
//     var message = JSON.parse(message.body);
//     console.log("Mensagem recebida: " + message.sender);
//   }

// }