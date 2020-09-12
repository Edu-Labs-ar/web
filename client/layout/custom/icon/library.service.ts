import { Injectable } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition, IconName } from '@fortawesome/fontawesome-svg-core';
import { AsyncSubject, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { FreeIconPrefix } from './free-icon-prefix';

@Injectable()
export class IconLibrary {

  private loadedIcons: string[] = [];
  private faIcons: { [key: string]: IconDefinition } = {};

  private afterInit: AsyncSubject<void> = new AsyncSubject();
  private loadingIcons: { [key: string]: Observable<void> } = {};

  private done: AsyncSubject<void> = new AsyncSubject();

  constructor(private library: FaIconLibrary) {
    this.done.next();
    this.done.complete();

    const jobs = [];
    jobs.push(import('@fortawesome/free-solid-svg-icons').then(
      icons => {
        for (const icon of Object.values(icons)) {
          const faIcon = icon as IconDefinition;
          this.faIcons[`fas-${faIcon.iconName}`] = faIcon;
        }
      }
    ));

    jobs.push(import('@fortawesome/free-regular-svg-icons').then(
      icons => {
        for (const icon of Object.values(icons)) {
          const faIcon = icon as IconDefinition;
          this.faIcons[`far-${faIcon.iconName}`] = faIcon;
        }
      }
    ));

    jobs.push(import('@fortawesome/free-brands-svg-icons').then(
      icons => {
        for (const icon of Object.values(icons)) {
          const faIcon = icon as IconDefinition;
          this.faIcons[`fab-${faIcon.iconName}`] = faIcon;
        }
      }
    ));

    Promise.all(jobs).then(() => {
      this.afterInit.next();
      this.afterInit.complete();
    });
  }

  onLoad(prefix: FreeIconPrefix, name: IconName): Observable<void> {
    const idName = `${prefix}-${name}`;

    return this.afterInit.pipe(mergeMap(() => {
      if (!this.loadedIcons.includes(idName)) {
        this.loadedIcons.push(idName);

        // Si un icono se usa mucho, podría tener problemas de concurrencia.
        // Por eso implemento este bloqueo
        const subject = new AsyncSubject<void>();
        this.loadingIcons[idName] = subject;
        this.library.addIcons(this.faIcons[idName]);
        subject.next();
        subject.complete();
        delete this.loadingIcons[idName];
      } else if (idName in this.loadingIcons)
        return this.loadingIcons[idName];
      return this.done;
    }));
  }
}
