import { Component, OnInit } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  subscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangeEvent
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  // onAddMessage(message: Message) {
  //   this.messages.push(message);
  //   console.log(message);
  // }

}
