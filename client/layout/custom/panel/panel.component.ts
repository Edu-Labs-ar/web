import { Component, Input } from '@angular/core';

@Component({
  selector: 'edu-panel',
  templateUrl: 'panel.component.html',
  host: { class: 'edu-panel edu-container', '[class.wide]': 'wide' }
})
export class PanelComponent {

  private _stripe = false;
  @Input()
  set stripe(value: boolean) {
    this._stripe = !(typeof value === 'undefined' || value === false);
  }
  get stripe(): boolean {
    return this._stripe;
  }

  private _wide = false;
  @Input()
  set wide(value: boolean) {
    this._wide = !(typeof value === 'undefined' || value === false);
  }
  get wide(): boolean {
    return this._wide;
  }


}
