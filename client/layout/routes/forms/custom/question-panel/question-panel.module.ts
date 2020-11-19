import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DescriptionModule, PanelModule, TitleModule } from 'client/layout/custom';
import { QuestionPanelComponent } from './question-panel.component';


@NgModule({
  imports: [CommonModule, TitleModule, DescriptionModule, PanelModule],
  exports: [QuestionPanelComponent, TitleModule, DescriptionModule],
  declarations: [QuestionPanelComponent],
  providers: [],
})
export class QuestionPanelModule { }
