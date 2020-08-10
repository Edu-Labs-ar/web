import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'edu-content',
  template: `<ng-template #templateRef><ng-content></ng-content></ng-template>`
})
export class ContentComponent {
  @ViewChild('templateRef') template: TemplateRef<any>;
}
