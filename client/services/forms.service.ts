import { Injectable } from '@angular/core';
import { FormStructure } from 'api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FormsService {

  private _dummy = new BehaviorSubject<FormStructure>({
    id: 1,
    editors: [],
    title: 'Formulario de Prueba',
    description: 'Oh si, la descripción funciona, perfecto',
    sections: [
      {
        title: 'Titulo original',
        description: 'Si, la sección también lleva descripción',
        tags: ['primera'],
        questions: [
          {
            title: 'Nombre',
            description: 'Creo que sabes qué va ahí',
            required: true,
            type: 'short text',
            tags: ['nombre']
          },
          {
            title: 'Apellido',
            required: false,
            type: 'short text',
            tags: ['apellido']
          }
        ]
      },
      {
        title: 'Una segunda seccion',
        tags: ['segunda'],
        dependencies: ['primera'],
        questions: [
          {
            title: 'Edad',
            required: false,
            type: 'numeric',
            data: { min: 10, max: 100 }
          },
          {
            title: 'Año de cursado',
            required: false,
            type: 'slide',
            dependencies: ['apellido']
          }
        ]
      }
    ]
  });

  getFormStructure(_id: number): Observable<FormStructure> {
    return this._dummy;
  }
}
