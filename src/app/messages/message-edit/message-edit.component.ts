import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  

  @ViewChild ('subjectInput') subjectInputRef: ElementRef;
  @ViewChild ('msgTextInput') msgTextInputRef: ElementRef;

  currentSender = "Tatiana Chetina";

  @Output() addMessageEvent = new EventEmitter<Message>();

  

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const message = new Message('1', subject, msgText, this.currentSender);
    console.log(message);
    this.addMessageEvent.emit(message);

  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }

}
