import { Injectable } from '@angular/core';
import { FormStructure } from 'api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FormsService {

  private _currStructure: FormStructure = {
    id: 1,
    editors: [],
    title: 'Encuesta a estudiantes de la FBCB',
    description: 'Somos un grupo de estudiantes de la FBCB (UNL), que nos reunimos para dar lugar a un proyecto que busca generar herramientas para complementar el aprendizaje de los estudiantes de nuestra facultad.\
Esta encuesta tiene como objetivo conocer la experiencia de los estudiantes a lo largo de la carrera, a fines de identificar qué aspectos de las herramientas utilizadas actualmente de nuestra formación son necesarios mejorar.\
No te pediremos datos personales que permitan tu identificación.\
La encuesta es voluntaria, la participación en la misma no presenta ningún riesgo, no representa un motivo de resarcimiento y no afectará el cursado de la carrera.\
Completar y enviar la encuesta significará aceptar, bajo consentimiento informado, la participación en este estudio. \
Ante cualquier consulta, podés comunicarte a contacto@edulabs.com.ar',
    sections: [
      {
        id: 1,
        questions: [
          {
            id: 1,
            title: '¿Sos estudiante de la FBCB?',
            required: true,
            type: 'options',
            data: {
              options: ['Si', 'No']
            }
          }
        ]
      },
      {
        id: 2,
        title: 'Datos Generales',
        questions: [
          {
            id: 2,
            inline: true,
            title: 'Edad',
            required: true,
            type: 'numeric',
            data: { min: 1, max: 100 }
          },
          {
            id: 3,
            title: 'Género',
            required: true,
            type: 'options',
            data: {
              options: ['Mujer', 'Hombre', 'Prefiero no decirlo'],
              others: {
                title: '',
                placeholder: 'Otro'
              }
            }
          }
        ]
      },
      {
        id: 3,
        title: 'Datos Académicos',
        questions: [
          {
            id: 4,
            title: '¿Qué carrera estás cursando?',
            tags: ['carrera'],
            required: true,
            type: 'options',
            data: {
              options: ['Licenciatura en Biotecnología', 'Bioquímica', 'Licenciatura en Nutrición'],
              others: true
            }
          },
          {
            id: 5,
            title: '¿Qué año estás cursando?',
            tags: ['año'],
            required: true,
            type: 'slider',
            data: { min: 1, max: 5, tooltip: true }
          },
          {
            id: 6,
            title: '¿Cursaste alguna de estas materias de manera PRESENCIAL?',
            required: true,
            type: 'multiple choice',
            tags: ['presenciales'],
            dependencies: ['carrera', 'año'],
            dependentData: {
              '0|4': {
                options: ['Química Biológica', 'Microbiología General', 'Métodos Matemáticos']
              },
              '0|5': {
                options: ['Operaciones y Procesos Biotecnológicos II', 'Microbiología Aplicada', 'Elementos de Economía para Biotecnología', 'Biología Vegetal', 'Ética Profesional']
              },
              '1|4': {
                options: ['Morfología Normal', 'Química Biológica', 'Control de Calidad', 'Microbiología General']
              },
              '1|5': {
                options: ['Bacteriología Clínica', 'Micología', 'Virología', 'Patología Humana', 'Bioquímica Clínica y Cuantitativa I']
              }
            }
          }
        ]
      },
      {
        id: 4,
        title: 'Cursado',
        questions: [
          {
            id: 7,
            title: '¿Tuvo la materia complementos audiovisuales para facilitar los contenidos?',
            description: 'Por fuera de los típicos apuntes y presentaciones',
            type: 'multiple choice',
            data: {
              options: [
                'Videos / Animaciones',
                'Realidad Aumentada',
                'Programa de preguntas y respuestas en tiempo real',
                'Encuestas fuera de clase (Mediante Software)',
                'No hubieron complementos audiovisuales'
              ],
              others: true
            }
          },
          {
            id: 8,
            title: 'Antes de cada trabajo práctico, ¿Lograste comprender la técnica correctamente?',
            type: 'slider',
            data: { min: 0, max: 4, tagType: 'relative', sideLabels: true }
          },
          {
            id: 9,
            title: 'Luego de cada trabajo práctico, ¿Lograste comprender la técnica correctamente?',
            type: 'slider',
            data: { min: 0, max: 4, tagType: 'relative', sideLabels: true }
          },
          {
            id: 10,
            title: 'En que grado creés que la realización del trabajo práctico te preparó para realizar las técnicas dictadas, en la vida profesional.',
            type: 'slider',
            data: { min: 0, max: 4, tagType: 'relative', sideLabels: true }
          },
        ]
      },
      {
        id: 5,
        title: 'Cursado Virtual',
        questions: [
          {
            id: 11,
            title: '¿Cursaste alguna de estas materias de manera VIRTUAL?',
            required: true,
            type: 'multiple choice',
            dependencies: ['carrera', 'año'],
            dependentData: {
              '1|4': {
                options: ['Inmunología Básica', 'Fisiología Humana', 'Bromatología', 'Nutrición', 'Metodología de la Investigación']
              },
              '1|5': {
                options: ['Bioquímica Clínica y Cuantitativa II', 'Bioquímica Clínica y Cuantitativa III']
              },
              '2|4': {
                options: ['Inmunología Básica', 'Operaciones y Procesos Biotecnológicos I']
              },
              '2|5': {
                options: ['Tratamiento de Efluentes', 'Ingeniería Genética', 'Ingeniería y Diseño Enzimático', 'Tecnología Inmunológica']
              }
            }
          },
          {
            id: 12,
            title: '¿Tuviste los medios para cursarlas?',
            type: 'multi question',
            fields: [
              {
                id: 1,
                inline: true,
                heading: 'Computadora',
                type: 'buttons',
                data: { options: ['No dispone', 'Precario', 'Óptimo'] }
              },
              {
                id: 2,
                inline: true,
                heading: 'Celular',
                type: 'buttons',
                data: { options: ['No dispone', 'Precario', 'Óptimo'] }
              },
              {
                id: 3,
                inline: true,
                heading: 'Acceso a Internet',
                type: 'buttons',
                data: { options: ['No dispone', 'Precario', 'Óptimo'] }
              },
              {
                id: 4,
                inline: true,
                heading: 'Espacio de Estudio',
                type: 'buttons',
                data: { options: ['No dispone', 'Precario', 'Óptimo'] }
              }
            ]
          },
          {
            id: 13,
            title: '¿Cómo calificarías el desarrollo de los contenidos dictados de manera virtual?',
            type: 'slider',
            data: { min: 0, max: 4, tagType: 'qualitative', sideLabels: true }
          },
          {
            id: 14,
            title: '¿En qué grado se adaptaron las materias a la modalidad virtual?',
            type: 'slider',
            data: { min: 0, max: 4, tagType: 'qualitative', sideLabels: true }
          },
          {
            id: 15,
            title: '¿Alguna de las materias que cursaste adaptó sus trabajos prácticos a la virtualidad? ¿Cómo?',
            type: 'long text',
            data: { placeholder: 'Tu Respuesta' }
          },
          {
            id: 16,
            title: 'La instancia virtual ¿Fué suficiente para alcanzar la regularidad?',
            type: 'options',
            data: {
              options: ['Si', 'No'],
              others: { title: '', placeholder: 'Comentarios' }
            }
          },
          {
            id: 17,
            title: '¿En qué grado considerás que comprendiste las técnicas de laboratorio con las metodologías utilizadas?',
            type: 'slider',
            data: { min: 0, max: 4, tagType: 'qualitative', sideLabels: true }
          },
        ]
      },
      {
        id: 6,
        title: 'Consideraciones Finales',
        questions: [
          {
            id: 18,
            title: '¿En qué grado considerás que te adaptaste a la virtualidad?',
            description: 'Pensa en cosas como tu manejo con los programas utilizados o métodos y herramientas utilizados para comunicarte con tus compañeros',
            type: 'slider',
            data: { min: 0, max: 4, tagType: 'qualitative', sideLabels: true }
          },
          {
            id: 19,
            title: '¿En qué grado considerás que la carrera te brinda herramientas que vayas a utilizar en el mundo profesional?',
            type: 'slider',
            data: { min: 0, max: 4, tagType: 'qualitative', sideLabels: true }
          },
          {
            id: 20,
            title: '¿Considerás que en la carrera se desarrollan temas que no tienen aplicación, directa o indirecta, en el mundo profesional? ¿Cuáles?',
            type: 'long text',
            data: { placeholder: 'Tu respuesta' }
          },
          {
            id: 21,
            title: '¿Tuviste algún acercamiento a la práctica profesional?',
            description: 'Pasantías, tesinas, etc',
            type: 'options',
            data: { options: ['Si', 'No'] }
          },
          {
            id: 22,
            title: '¿Considerás que la incorporación de herramientas virtuales mejoraría el dictado de clases presenciales?',
            type: 'slider',
            data: { min: 0, max: 4, tagType: 'relative', sideLabels: true }
          },
        ]
      },
      {
        id: 7,
        title: 'Videojuegos',
        questions: [
          {
            id: 23,
            title: 'Nombre al primer videojuego que se le venga a la cabeza',
            type: 'short text',
            data: { maxLength: 60 }
          },
          {
            id: 24,
            title: '¿Jugás videojuegos?',
            type: 'options',
            data: { options: ['Si', 'No'] }
          },
          {
            id: 25,
            title: '¿Usarías un videojuego como herramienta de aprendizaje?',
            type: 'options',
            data: { options: ['Si', 'No'] }
          },
          {
            id: 26,
            title: '¿Usarías un simulador como herramienta de aprendizaje?',
            type: 'options',
            data: { options: ['Si', 'No'] }
          },
          {
            id: 27,
            title: 'De 3 características de los videojuegos',
            type: 'multi question',
            fields: [
              {
                id: 1,
                type: 'short text',
                data: {
                  maxLength: 30,
                  placeholder: 'Caracteristica #1'
                }
              },
              {
                id: 2,
                type: 'short text',
                data: {
                  maxLength: 30,
                  placeholder: 'Caracteristica #2'
                }
              },
              {
                id: 3,
                type: 'short text',
                data: {
                  maxLength: 30,
                  placeholder: 'Caracteristica #3'
                }
              }
            ]
          }
        ]
      }
    ]
  };

  private _formSubject = new BehaviorSubject<FormStructure>(this._currStructure);

  get formStructure(): FormStructure { return this._currStructure; }

  getFormStructure(_id: number): Observable<FormStructure> {
    return this._formSubject;
  }
}
