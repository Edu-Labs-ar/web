import { Component, Input } from '@angular/core';

@Component({
  selector: 'edu-question[title]',
  templateUrl: 'question.component.html'
})
export class QuestionComponent {

  private _required = false;
  @Input()
  set required(value: boolean) {
    this._required = !(typeof value === 'undefined' || value === false);
  }
  get required(): boolean {
    return this._required;
  }

  private _emplace = false;
  @Input()
  set emplace(value: boolean) {
    this._emplace = !(typeof value === 'undefined' || value === false);
  }
  get emplace(): boolean {
    return this._emplace;
  }

  private _horizontal = false;
  @Input()
  set horizontal(value: boolean) {
    this._horizontal = !(typeof value === 'undefined' || value === false);
  }
  get horizontal(): boolean {
    return this._horizontal;
  }


  @Input() title: string;
  @Input() description: string;

}
