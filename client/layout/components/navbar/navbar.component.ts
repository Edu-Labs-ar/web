import { Component } from '@angular/core';
import { ThemeService } from 'client/services';

@Component({
  selector: 'edu-navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

  isDark: boolean;

  constructor(private _theme: ThemeService) {
    this.isDark = _theme.getDarkTheme();
  }

  nightModeToggle(): void {
    this.isDark = !this.isDark;
    this._theme.setDarkTheme(this.isDark);
  }

}
