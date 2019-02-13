import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../../document.model';
import { DocumentService } from '../../documents.service';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Document;
  // @Output () documentSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  // onSelected() {
  //   this.documentSelected.emit();
  //   // console.log(this.document);
  // }

}
 