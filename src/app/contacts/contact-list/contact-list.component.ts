import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContcatListComponent implements OnInit, OnDestroy {
 
  contacts: Contact[] = [];
  private subscription: Subscription;

  constructor(private contactService: ContactService) { 
  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  

  // onSelected(contact: Contact) {
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }

  this.subscription = this.contactService.contactChangedEvent
    .subscribe(
      (contact: Contact[]) => {
        this.contacts = contact;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  

}