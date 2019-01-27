import { Component, EventEmitter, Output } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';

@Component({
    selector: 'cms-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent{
    @Output() featureSelected = new EventEmitter<string>();

    onSelect(feature: string) {
        this.featureSelected.emit(feature);
    
      }
    
}