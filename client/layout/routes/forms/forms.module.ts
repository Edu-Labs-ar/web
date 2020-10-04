import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms.component';
import { PanelModule, TitleModule } from 'client/layout/custom';
import { FormsService } from 'client/services';
import { QuestionModule, SectionModule } from './custom';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: '', component: FormsComponent },
  { path: 'inicial', loadChildren: () => import('./routes/inicial').then(m => m.FormInicialModule) },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,

    PanelModule,
    TitleModule,
    SectionModule,
    QuestionModule,

    MatInputModule,
    MatButtonModule
  ],
  providers: [ FormsService ],
  declarations: [FormsComponent]
})
export class FormsModule { }
