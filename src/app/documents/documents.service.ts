import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model'
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class DocumentService {
    documentSelectedEvent = new EventEmitter<Document>();
    documentChangedEvent = new EventEmitter<Document[]>();
    documentListChangedEvent = new Subject<Document[]>();
     
    documents: Document[] = [];
    maxDocumentId: number;
    documentsListClone: Document[];
  

    constructor() {
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();

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

    deleteDocument(document: Document) {

        if (document == null || document == undefined) {
          return;
        }

        const pos = this.documents.indexOf(document);
        if (pos < 0) {
            return;
        }

        this.documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(this.documentsListClone);
    }

    getMaxId(): number {

      let maxId = 0
  
      for (let i =0;  i < this.documents.length; i++) {
        let currentId = +this.documents[i].id;
  
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
  
      return maxId;
    }

    addDocument(newDocument: Document) {
      
      if (newDocument == undefined || newDocument == null) {
        return;
      }

      this.maxDocumentId++
      newDocument.id = this.maxDocumentId.toString();
      this.documents.push(newDocument);
      this.documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(this.documentsListClone);
}

    updateDocument(originalDocument: Document, newDocument: Document) {
      if (originalDocument == undefined || originalDocument == null 
        || newDocument == undefined || newDocument ==  null) {
          return;
        }
      

      var pos = this.documents.indexOf(originalDocument)
      if (pos < 0) {
          return;
      }

      newDocument.id = originalDocument.id
      this.documents[pos] = newDocument
      this.documentsListClone = this.documents.slice()
      this.documentListChangedEvent.next(this.documentsListClone)
    }

}