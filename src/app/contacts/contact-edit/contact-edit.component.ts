import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Contact } from '../contacts.model';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact: Contact = null;
  originalContact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupContact;


  constructor (private contactService: ContactService,
    private  router: Router,
    private route: ActivatedRoute) {
}

ngOnInit () {
  this.route.params
    .subscribe(
      (params: Params) => {
        const id = params.id;
        if (id == undefined || id == null) {
          this.editMode = false; 
          return;
        }
        this.originalContact = this.contactService.getContact(id);
        if (this.originalContact == undefined || this.originalContact == null) {
          return;
        }

        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        if (this.contact.group == undefined || this.contact.group == null) {
          return;
        }
        this.hasGroup = true;
        if (this.hasGroup) {
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group)).slice();
        }
      }
    )
}


onSubmit(form: NgForm) {
  const values = form.value // get values from form’s fields
  //Assign the values in the form fields to the corresponding properties in the newDocument
  var newContact = new Contact('', values.name, values.email, values.phone, values.imageUrl, this.groupContacts)
  
  if (this.editMode === true) {
   this.contactService.updateContact(this.originalContact, newContact);
  } else {
   this.contactService.addContact(newContact);
  }
  this.router.navigate(['/contacts']);
  }

  onCancel() {
    
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }

    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

}
