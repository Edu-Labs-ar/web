import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'edu-title',
  template: `<ng-content></ng-content>`,
  host: { class: 'edu-title' }
})
export class TitleComponent implements AfterViewInit {
  title: string;

  constructor(private el: ElementRef) { }
  ngAfterViewInit(): void {
    this.title = this.el.nativeElement.innerText;
  }
}
