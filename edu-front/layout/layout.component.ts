import { Component } from '@angular/core';
import { ThemeService } from 'services';

@Component({
  selector: 'edu-root',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

  isDark: boolean;

  constructor(theme: ThemeService) {
    this.isDark = theme.getDarkTheme();
    theme.isDarkTheme.subscribe((dark: boolean) => (this.isDark = dark));
  }
}
