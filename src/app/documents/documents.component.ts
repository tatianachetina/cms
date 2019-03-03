import { Component, OnInit, Injectable } from '@angular/core';

//import { Document } from './document.model';
//import { DocumentService } from './documents.service';
//import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  //selectedDocument: Document;

  constructor(
    //private documentService: DocumentService
    ) {

    }

  ngOnInit() {
    // this.documentService.documentSelectedEvent
    // .subscribe(
    //   (document: Document) => {
    //     this.selectedDocument = document;
    //   }
    // );
  }

}
