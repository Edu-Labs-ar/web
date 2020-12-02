import { Component, Input } from '@angular/core';
import { InlinedQuestion, Question, EntitledElement } from 'api';

@Component({
  selector: 'edu-question-panel[question]',
  templateUrl: 'question-panel.component.html'
})
export class QuestionPanelComponent {

  private _emplace = false;
  @Input()
  set emplace(value: boolean) {
    this._emplace = !(typeof value === 'undefined' || value === false);
  }
  get emplace(): boolean {
    return this._emplace;
  }

  @Input() question: Question;

  get title(): string {
    return (this.question as EntitledElement)?.title;
  }

  get description(): string {
    return (this.question as EntitledElement)?.description;
  }

  get horizontal(): boolean {
    return (this.question as InlinedQuestion)?.inline;
  }

}
