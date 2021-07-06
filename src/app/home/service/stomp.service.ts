import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Frame} from 'stompjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StompService {
  private stompClient: any;
  constructor() {
    this.stompClient = Stomp.over(new SockJS(environment.wsServer));
    this.stompClient.connect({}, (frame: Frame) => {
      console.log('frame: ', frame);
    });
  }

  getStompClient(): any
  {
    return this.stompClient;
  }
}
