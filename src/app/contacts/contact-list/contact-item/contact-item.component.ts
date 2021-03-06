import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../contacts.model';
import { ContactService } from '../../contact.service';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;


  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  onSelected() {
    this.contactService.contactSelectedEvent.emit(this.contact);
  }


}
