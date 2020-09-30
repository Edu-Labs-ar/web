import { Component, OnInit } from '@angular/core';
import { FormStructure } from 'api';
import { FormsService } from 'client/services';

@Component({
  selector: 'edu-forms',
  templateUrl: './forms.component.html'
})
export class FormsComponent implements OnInit {

  structure: FormStructure;


  constructor(private formsService: FormsService) {
  }

  ngOnInit(): void {
    this.formsService.getFormStructure(1)
      .subscribe(structure => this.structure = structure);
  }

}
