import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contacts.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: any, [term]): any {
    let filteredArray:Contact[] = [];



    // for (let i=0; i<contacts.length; i++) {
    //   let contact = contacts[i];
    //   if(contact.name.toLowerCase90.includes(term)) {
    //     filteredArray.push(contact);
    //   }
    // }

    filteredArray = contacts.filter(
      (contact: Contact) => contact.name.toLocaleLowerCase().includes(term.toLowerCase())
    );
    
    if (filteredArray.length < 1) {
      return contacts;
    }
    return filteredArray;
  }

}
