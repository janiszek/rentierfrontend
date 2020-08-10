import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Message } from 'src/app/Model/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messageList: Message[];

  constructor() {
        this.messageList = [];
  }

  // change to the asynchronous comms
  getMessages(): Observable<Message[]> {
      return of(this.messageList);
  }

  add(message: Message){
    // add a new message to the array
    this.messageList.push(message);
  }

  clear(){
    this.messageList = [];
  }

}
