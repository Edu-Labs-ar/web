import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IconName, IconPrefix, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { IconLibrary } from './library.service';

@Component({
    selector: 'edu-icon[icon]',
    template: `<fa-icon [icon]="[lazyPrefix, lazyIcon]" [size]="size"></fa-icon>`
})

export class IconComponent implements OnChanges {
    @Input() icon: IconName;

    @Input() prefix: 'fas' | 'far' | 'fab' = 'fas';

    @Input() size: SizeProp = '1x';

    loaded = false;

    constructor(private library: IconLibrary) { }

    get lazyIcon(): IconName { if (this.loaded) return this.icon; return 'spinner'; }

    get lazyPrefix(): IconPrefix { if (this.loaded) return this.prefix; return 'fas'; }

    ngOnChanges(changes: SimpleChanges): void {
        this.loaded = false;
        this.library
            .onLoad(changes.prefix.currentValue, changes.icon.currentValue)
            .subscribe(() => this.loaded = true);
    }
}
