import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContcatListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContcatListComponent,
    ContactDetailComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
