import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar';
import { IconModule } from './custom';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => import('./routes/app').then(m => m.AppModule) },
  { path: 'forms', loadChildren: () => import('./routes/forms').then(m => m.FormsModule) },
];

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

    IconModule,

    MatButtonModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
