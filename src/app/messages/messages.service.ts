import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model'
import { MOCKMESSAGES } from './MOCKMESSAGES';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";


@Injectable({
    providedIn: 'root'
  })
export class MessageService {
    messageChangeEvent = new EventEmitter<Message[]>();
     
    messages: Message[] = [];
    maxMessageId:number;

    constructor(private httpClient: HttpClient, private messageService: MessageService) {
        this.messages = MOCKMESSAGES;
        this.maxMessageId = this.getMaxId();
        this.initMessages();
    }

    getMessages(): Message[] {
        return this.messages.slice();
    }

    getMessage(id: string): Message {
        for (let i = 0; i < this.messages.length; i++) {
          if (this.messages[i].id === id) {
            return this.messages[i];
          }
        }
        return null;

    }

    addMessage(message: Message)  {
        this.messages.push(message);
        this.messageChangeEvent.emit(this.messages.slice());
        this.storeMessages()
        
    }


    getMaxId(): number {

      let maxId = 0
  
      for (let i =0;  i < this.messages.length; i++) {
        let currentId = +this.messages[i].id;
  
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
    return maxId;
    }

initMessages() {
  this.httpClient.get('https://rkjcms-f94a6.firebaseio.com/messages.json')
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageChangeEvent.next(this.messages.slice());
      }
    );
  //error function
  (error: any) => {
    console.log(error);
  }
  return this.messages.slice();
}

storeMessages() {
  JSON.stringify(this.messages);
  const headers = new HttpHeaders({
    "Content-Type":"application/json"
  });
  
  this.httpClient.put('https://rkjcms-f94a6.firebaseio.com/messages.json', this.messages, {headers: headers})
  .subscribe(
    () => {
      const messageListClone = this.messages.slice();
      this.messageChangeEvent.next(messageListClone);
  });
}
}
