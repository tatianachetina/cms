import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model'
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


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
  
    constructor(private httpClient: HttpClient, private documentService: DocumentService) {
        //this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
        this.getDocuments();

    }

    // getDocuments(): Document[] {
    //     return this.documents.slice();
    // }
  

  getDocuments() {
    this.httpClient.get('http://localhost:3000/documents')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
    //error function
    (error: any) => {
      console.log(error);
    }
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

    // deleteDocument(document: Document) {

    //     if (document == null || document == undefined) {
    //       return;
    //     }

    //     const pos = this.documents.indexOf(document);
    //     if (pos < 0) {
    //         return;
    //     }

    //     this.documentsListClone = this.documents.slice();
    //     //this.documentListChangedEvent.next(this.documentsListClone);
    //     this.storeDocuments();
    // }

    deleteDocument(document: Document) {
      if (!document) {
        return;
      }
  
      this.httpClient.delete('http://localhost:3000/documents/' + document.id)
        // .map(
        //   (res: Response) => {
        //     return res.json().obj;
        // })
        .subscribe(
          (documents: Document[]) => {
            this.documents = documents;
            this.documentListChangedEvent.next(this.documents.slice());
          });
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

//     addDocument(newDocument: Document) {
      
//       if (newDocument == undefined || newDocument == null) {
//         return;
//       }

//       this.maxDocumentId++
//       newDocument.id = this.maxDocumentId.toString();
//       this.documents.push(newDocument);
//       this.documentsListClone = this.documents.slice();
//       //this.documentListChangedEvent.next(this.documentsListClone);
//        this.storeDocuments()
// }

  addDocument(newDocument: Document){
  if(!newDocument){
    return
  }
  
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'

  });
  
  newDocument.id = '';
  const strDocument = JSON.stringify(newDocument);
  
  this.httpClient.post('http://localhost:3000/documents', strDocument, {headers: headers})
  // .map((response: Response) => {
  //   return response.json()
  // })
  .subscribe((documents: Document[]) => {
    this.documents = documents;
    this.documentListChangedEvent.next(this.documents.slice())
  })
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
      //this.documentListChangedEvent.next(this.documentsListClone)
      this.storeDocuments()
    }

    storeDocuments() {
      JSON.stringify(this.documents);
      const headers = new HttpHeaders({
        "Content-Type":"application/json"
      });
      
      this.httpClient.put('http://localhost:3000/documents', this.documents, {headers: headers})
      .subscribe(
        () => {
          const documentListClone = this.documents.slice();
          this.documentListChangedEvent.next(documentListClone);
      });
  }
}