import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import { DescriptionComponent, TitleComponent } from 'client/layout/custom';

@Component({
  selector: 'edu-section',
  templateUrl: 'section.component.html'
})
export class SectionComponent {

  @ContentChild(TitleComponent) title: TitleComponent;
  @ContentChild(DescriptionComponent) description: DescriptionComponent;
  @ContentChild('contentTemplate') content: TemplateRef<any>;

  @ViewChild('sectionTemplate') sectionTemplate: TemplateRef<any>;

  @Input()
  key: string;

}
