import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DescriptionModule, PanelModule, TitleModule } from 'layout/custom';
import { SectionComponent } from './section.component';


@NgModule({
  imports: [CommonModule, TitleModule, DescriptionModule, PanelModule],
  exports: [SectionComponent, TitleModule, DescriptionModule],
  declarations: [SectionComponent],
  providers: [],
})
export class SectionModule { }
