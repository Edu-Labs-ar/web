import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'edu-description',
  template: `<ng-content></ng-content>`,
  host: { class: 'edu-description' }
})
export class DescriptionComponent implements OnInit {

  description: string;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.description = this.el.nativeElement.innerText;
  }
}
