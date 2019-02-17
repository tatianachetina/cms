import { Injectable } from '@angular/core';

@Injectable()
export class WindRefService {
    constructor() {}
 
    getNative() {
        return window;
    }
}