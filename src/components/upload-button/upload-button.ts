import { Component } from '@angular/core';

/**
 * Generated class for the UploadButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'upload-button',
  templateUrl: 'upload-button.html'
})
export class UploadButtonComponent {

  text: string;

  constructor() {
    console.log('Hello UploadButtonComponent Component');
    this.text = 'Hello World';
  }

}
