import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model'
import { MOCKMESSAGES } from './MOCKMESSAGES';


@Injectable({
    providedIn: 'root'
  })
export class MessageService {
    messageChangeEvent = new EventEmitter<Message[]>();
     
    messages: Message[] = [];

    constructor() {
        this.messages = MOCKMESSAGES;
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
        
    }

}