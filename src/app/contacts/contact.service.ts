import { EventEmitter, Injectable } from '@angular/core';
import { Contact} from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();  
  contactListChangedEvent = new Subject<Contact[]>();
    
  contacts: Contact[] = [];
  maxContactId: number;
  contactsListClone: Contact[];

  constructor(private httpClient: HttpClient, private contactService: ContactService) {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
    }

    // getContacts(): Contact[] {
    //   return this.contacts.slice();
    // }

    getContacts() {
      this.httpClient.get('http://localhost:3000/contacts')
        .subscribe(
          (contacts: Contact[]) => {
            this.contacts = contacts;
            this.maxContactId = this.getMaxId();
            this.contactListChangedEvent.next(this.contacts.slice());
          }
        );
      //error function
      (error: any) => {
        console.log(error);
      }
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

    // deleteContact(contact: Contact) { 
    //   if (contact == null || contact == undefined) {
    //     return;
    //   }

    //   const pos = this.contacts.indexOf(contact);
    //   if (pos < 0) {
    //       return;
    //   }

    //   this.contactsListClone = this.contacts.slice();
    //   this.contactListChangedEvent.next(this.contactsListClone);
    // }

    deleteContact(contact: Contact) {
      if (!contact) {
        return;
      }
  
      this.httpClient.delete('http://localhost:3000/contacts/' + contact.id)
        // .map(
        //   (res: Response) => {
        //     return res.json().obj;
        // })
        .subscribe(
          (contacts: Contact[]) => {
            this.contacts = contacts;
            this.contactListChangedEvent.next(this.contacts.slice());
          });
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

//     addContact(newContact: Contact) {
      
//       if (newContact == undefined || newContact == null) {
//         return;
//       }

//       this.maxContactId++
//       newContact.id = this.maxContactId.toString();
//       this.contacts.push(newContact);
//       this.contactsListClone = this.contacts.slice();
//       this.contactListChangedEvent.next(this.contactsListClone);
// }

addContact(newContact: Contact) {
  if(!newContact){
    return
  }
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  newContact.id = '';
  const strContact = JSON.stringify(newContact);
  
  this.httpClient.post('http://localhost:3000/contacts', strContact, {headers: headers})
  // .map((response: Response) => {
  //   return response.json()
  // })
  .subscribe((contacts: Contact[]) => {
    this.contacts = contacts;
    this.contactListChangedEvent.next(this.contacts.slice())
  })
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