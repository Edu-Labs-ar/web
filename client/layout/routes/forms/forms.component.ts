import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { FormStructure, NumberData, Question, Taggable } from 'api';
import { FormsService } from 'client/services';

@Component({
  selector: 'edu-forms',
  templateUrl: './forms.component.html'
})
export class FormsComponent implements OnInit {

  form: FormGroup;

  structure: FormStructure;

  workspace: string[];
  private _workspaceRegistry: Taggable[];

  constructor(private formsService: FormsService) {
  }

  ngOnInit(): void {
    this.formsService.getFormStructure(1)
      .subscribe(structure => {
        const controls = {};
        structure.sections.forEach(section =>
          section.questions.forEach(
            question => controls[question.id] = this._createControl(question)
          )
        );

        this.form = new FormGroup(controls);
        this.structure = structure;
      });
  }

  private _createControl(question: Question): FormControl {
    const validators: ValidatorFn[] = [];
    if (question.required)
      validators.push(Validators.required);

    switch (question.type) {
      case 'numeric':
        const data = question.data as NumberData;
        if (data?.min) validators.push(Validators.min(data?.min));
        if (data?.max) validators.push(Validators.min(data?.max));
        break;
    }

    return new FormControl('', validators);
  }

  getNumberData(question: Question): NumberData | undefined {
    return question?.data as NumberData;
  }

  shouldDisplay(element: Taggable): boolean {
    return element.tags?.every(tag => this.workspace.includes(tag)) || true;
  }

  updateStatus(element: Taggable, filled: boolean): void {
    const exists = this._workspaceRegistry
      .find(tag => tag.id === element.id) === undefined;

    if (exists && !filled) {
      // Quito un elemento existente
      this._workspaceRegistry = this._workspaceRegistry
        .filter(tag => tag.id !== element.id);

      // Recalculo el workspace
      this.workspace = [];
      this._workspaceRegistry.forEach(tag => this.workspace.push(...tag.tags));
    } else if (!exists && filled) {
      // Agrego un elemento nuevo
      this._workspaceRegistry.push(element);
      this.workspace.push(...element.tags);
    }
  }

}
