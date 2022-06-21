import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


import { MessagingComponent } from '../messaging/messaging.component';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  
  webSocketEndPoint: string = 'http://localhost:8096/socket';
  topic: string = "/topic/chat";
  stompClient: any;

  constructor(){}

  _connect() {
    console.log("Initialize WebSocket Connection");
    let socket = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
        _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
            _this.onMessageReceived(sdkEvent);
        });
        //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
     console.log("Initialize WebSocket Connection");
  };

  _disconnect() {
    if (this.stompClient !== null) {
        this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
        this._connect();
    }, 5000);
  }

  /**
  * Send message to sever via web socket
  * @param {*} message 
  */
   _send(message) {
    console.log("Msg Sended");
    console.log(this.stompClient)
    this.stompClient.send("/app/chat", {},JSON.stringify(message));
  }

  onMessageReceived(message) {
      console.log("Message Recieved from Server :: " + message);
      //this.messagingComponent.handleMessage(JSON.stringify(message.body));
  }









/* 
  constructor() {
     this.initializeWebSocketConnection();
    }


    public stompClient;
    public msg = [];
    initializeWebSocketConnection() {
      const serverUrl = 'http://localhost:8096/socket';
      const ws = new SockJS(serverUrl);
      this.stompClient = Stomp.over(ws);
      const that = this;
      // tslint:disable-next-line:only-arrow-functions
      this.stompClient.connect({}, function(frame) {
        that.stompClient.subscribe('/message', (message) => {
          if (message.body) {
            that.msg.push(message.body);
          }
        });
      });
    }

    sendMessage(message) {
      this.stompClient.send('/app/send/message' , {}, message);
    } */



    }