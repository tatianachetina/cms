import { Component, OnInit, OnDestroy } from '@angular/core';

import { Document } from '../document.model';
import { DocumentService } from '../documents.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
 
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();

    this.subscription = this.documentService.documentChangedEvent
    .subscribe(
      (document: Document[]) => {
        this.documents = document;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

