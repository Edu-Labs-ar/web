import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DescriptionModule, PanelModule, TitleModule } from 'client/layout/custom';
import { QuestionComponent } from './question.component';


@NgModule({
  imports: [CommonModule, TitleModule, DescriptionModule, PanelModule],
  exports: [QuestionComponent, TitleModule, DescriptionModule],
  declarations: [QuestionComponent],
  providers: [],
})
export class QuestionModule { }
