import { EventEmitter, Injectable } from '@angular/core';
import { Contact} from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
}

)
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();  
  contactListChangedEvent = new Subject<Contact[]>();
    
  contacts: Contact[] = [];
  maxContactId: number;
  contactsListClone: Contact[];

    constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
    }

    getContacts(): Contact[] {
      return this.contacts.slice();
    }


    getContact(id: string): Contact {

        for (let i = 0; i < this.contacts.length; i++) {
          if (this.contacts[i].id === id) {
            return this.contacts[i];
          }
        }
        return null;
    }

    deleteContact(contact: Contact) { 
      if (contact == null || contact == undefined) {
        return;
      }

      const pos = this.contacts.indexOf(contact);
      if (pos < 0) {
          return;
      }

      this.contactsListClone = this.contacts.slice();
      this.contactListChangedEvent.next(this.contactsListClone);
    }

    getMaxId(): number {

      let maxId = 0
  
      for (let i =0;  i < this.contacts.length; i++) {
        let currentId = +this.contacts[i].id;
  
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
  
      return maxId;
    }

    addContact(newContact: Contact) {
      
      if (newContact == undefined || newContact == null) {
        return;
      }

      this.maxContactId++
      newContact.id = this.maxContactId.toString();
      this.contacts.push(newContact);
      this.contactsListClone = this.contacts.slice();
      this.contactListChangedEvent.next(this.contactsListClone);
}

    updateContact(originalContact: Contact, newContact: Contact) {
      if (originalContact == undefined || originalContact == null 
        || newContact == undefined || newContact ==  null) {
          return;
        }
      

      var pos = this.contacts.indexOf(originalContact)
      if (pos < 0) {
          return;
      }

      newContact.id = originalContact.id
      this.contacts[pos] = newContact
      this.contactsListClone = this.contacts.slice()
      this.contactListChangedEvent.next(this.contactsListClone)
    }
}