import { Component } from '@angular/core';
import { FormStructure } from 'api';

@Component({
  selector: 'edu-forms',
  templateUrl: './forms.component.html'
})
export class FormsComponent {

  structure: FormStructure;

}
