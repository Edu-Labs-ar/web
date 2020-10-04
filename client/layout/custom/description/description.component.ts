import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'edu-description',
  template: `<ng-content></ng-content>`,
  host: { class: 'edu-description' }
})
export class DescriptionComponent implements AfterViewInit {

  description: string;

  constructor(private el: ElementRef) { }
  ngAfterViewInit(): void {
    this.description = this.el.nativeElement.innerText;
  }
}
