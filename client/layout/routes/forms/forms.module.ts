import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms.component';
import { PanelModule, TitleModule } from 'client/layout/custom';
import { FormsService } from 'client/services';
import { SectionModule } from './custom';

const routes: Routes = [
  { path: '', component: FormsComponent },
  { path: 'inicial', loadChildren: () => import('./routes/inicial').then(m => m.FormInicialModule) },
];

@NgModule({
  imports: [
    CommonModule,
    PanelModule,
    TitleModule,
    SectionModule,
    RouterModule.forChild(routes)
  ],
  providers: [ FormsService ],
  declarations: [FormsComponent]
})
export class FormsModule { }
