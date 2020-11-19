import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PanelModule, TitleModule } from 'client/layout/custom';
import { QuestionWrapperComponent } from './question-wrapper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    PanelModule,
    TitleModule,

    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatListModule,
    MatSliderModule,
    MatButtonToggleModule
  ],
  exports: [QuestionWrapperComponent],
  declarations: [QuestionWrapperComponent],
  providers: [],
})
export class QuestionWrapperModule { }
