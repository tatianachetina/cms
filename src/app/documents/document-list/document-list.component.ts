import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'CIT 260 - Object Oriented Programming', 'Description', 'url', 'children'),
    new Document('2', 'CIT 366 - Web Stack Development', 'Description', 'url', 'children'),
    new Document('2', 'CIT 425 - Data Warehousing', 'Description', 'url', 'children'),
    new Document('2', 'CIT 460 - Enterprise Development', 'Description', 'url', 'children'),
    new Document('2', 'CIT 495 - Senior Practicum', 'Description', 'url', 'children'),
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
   }

}

