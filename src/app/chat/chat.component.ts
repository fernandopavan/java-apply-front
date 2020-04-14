import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { API_CONFIG } from '../config/api.config';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  topic = '/topic/public';
  stompClient: any;
  message: string;
  username: string;
  msgRecebida: string;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.username = this.storageService.getLocalUser().email;
  }

  connect() {
    this.stompClient = Stomp.over(new SockJS(API_CONFIG.baseUrl + '/ws'));
    this.stompClient.connect({}, this.connectionSuccess());
  }

  connectionSuccess() {
    if (this.stompClient === null || this.stompClient === undefined) {
      return this.connect();
    }

    console.log('Conectado!');

    setTimeout(() => {
      this.stompClient.subscribe('/topic/public', (message) => {
        this.onMessageReceived(message);
      });
    }, 2000);

    setTimeout(() => {
      this.stompClient.send('/chat.add', {}, JSON.stringify({ sender: this.username, type: 'JOIN' }));
    }, 2000);

  }

  disconnect() {
    if (this.stompClient !== null || this.stompClient !== undefined) {
      this.stompClient.disconnect();
    }
    console.log('Desconectado!');
    this.msgRecebida = this.username + ' SAIU no CHAT!';
  }

  sendMessage() {
    const chatMessage = {
      sender: this.username,
      content: this.message,
      type: 'CHAT'
    };

    console.log('Enviando mensagem: ' + chatMessage.sender + ' = ' + chatMessage.content);
    this.stompClient.send('/chat.send', {}, JSON.stringify(chatMessage));
    this.message = '';
  }

  onMessageReceived(message) {
    const messageParse = JSON.parse(message.body);

    console.log('Recebida: ' + messageParse);

    const type = messageParse.type;
    const user = messageParse.sender;

    if (type === 'JOIN') {
      this.msgRecebida = user + ' ENTROU no CHAT!';
      return;
    }

    if (type === 'CHAT') {
      this.msgRecebida = user + ' diz: ' + messageParse.content;
      return;
    }

    if (type === 'LEAVE') {
      this.msgRecebida = user + ' SAIU no CHAT!';
    }
  }

}
