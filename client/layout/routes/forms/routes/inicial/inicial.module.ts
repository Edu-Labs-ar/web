import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule, Routes } from '@angular/router';
import { PanelModule, TitleModule } from 'client/layout/custom';
import { QuestionPanelModule, SectionModule } from '../../custom';
import { FormInicialComponent } from './inicial.component';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


const routes: Routes = [
  {
    path: '', component: FormInicialComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,

    PanelModule,
    TitleModule,
    SectionModule,
    QuestionPanelModule,

    MatInputModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSliderModule,
    MatListModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  declarations: [FormInicialComponent]
})
export class FormInicialModule { }
