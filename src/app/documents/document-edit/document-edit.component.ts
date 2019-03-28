import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentService } from '../documents.service';
import {Document} from "../document.model";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor (private documentService: DocumentService,
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
        this.originalDocument = this.documentService.getDocument(id);
        if (this.originalDocument == undefined || this.originalDocument == null) {
          return;
        }

        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
}

onSubmit(form: NgForm) {
  const values = form.value // get values from form’s fields
  //Assign the values in the form fields to the corresponding properties in the newDocument
  var newDocument = new Document(values.name, values.description, values.url, null)
  
  if (this.editMode === true) {
   this.documentService.updateDocument(this.originalDocument, newDocument);
  } else {
   this.documentService.addDocument(newDocument);
  }
  this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }


}
