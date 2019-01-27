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
    const mesSubject = this.subjectInputRef.nativeElement.value;
    const mesText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message('1', mesSubject, mesText, this.currentSender);
    this.addMessageEvent.emit(newMessage);

  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }

}
