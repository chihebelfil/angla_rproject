import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import { MessageService } from 'primeng/api';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  title = 'websocket-frontend';

  name: string;
  chatMessage: any ;
  greeting: any;

  

  
constructor(private messagingService :MessagingService  ){}

  async ngOnInit() {
    //this.messagingService = new MessagingService (new MessagingComponent());
    //this.user = await this.tokenStorage.getUser();



  }

  connect(){
    this.messagingService._connect();
  }

  disconnect(){
    this.messagingService._disconnect();
  }

  sendMessage(){
    this.messagingService._send(this.name);
    this.name = '';
  }

  handleMessage(message){
    this.greeting = message;
  }

  /* sendMessage() {
    if (this.input) {
      this.messagingService.sendMessage(this.input);
      this.input = '';
    }
  } */




}
