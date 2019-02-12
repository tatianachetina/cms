import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model'
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';


@Injectable()
export class DocumentService {
    documentSelectedEvent = new EventEmitter<Document>();
     
    documents: Document[] = [];

    constructor() {
        this.documents = MOCKDOCUMENTS;
    }

    getDocuments(): Document[] {
        return this.documents.slice();
    }

    getDocument(id: string): Document {
        for (let i = 0; i < this.documents.length; i++) {
          if (this.documents[i].id === id) {
            return this.documents[i];
          }
        }
        return null;

    }
}