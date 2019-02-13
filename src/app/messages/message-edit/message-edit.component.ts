import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  

  @ViewChild ('subjectInput') subjectInputRef: ElementRef;
  @ViewChild ('msgTextInput') msgTextInputRef: ElementRef;

  currentSender = "1";

  //@Output() addMessageEvent = new EventEmitter<Message>();

  

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message('1', subject, msgText, this.currentSender);
    //console.log('here');
    this.messageService.addMessage(newMessage);

  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }

}
