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
            settings: {
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
            id: 1,
            inline: true,
            title: 'Edad',
            required: true,
            type: 'numeric',
            settings: { min: 1, max: 100 }
          },
          {
            id: 2,
            title: 'Género',
            required: true,
            type: 'options',
            settings: {
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
            id: 1,
            title: '¿Qué carrera estás cursando?',
            tags: ['carrera'],
            required: true,
            type: 'options',
            settings: {
              options: ['Licenciatura en Biotecnología', 'Bioquímica', 'Licenciatura en Nutrición'],
              others: true
            }
          },
          {
            id: 2,
            title: '¿Qué año estás cursando?',
            tags: ['año'],
            required: true,
            type: 'slider',
            settings: { min: 1, max: 5, tooltip: true }
          },
          {
            id: 3,
            title: '¿Cursaste alguna de estas materias de manera PRESENCIAL?',
            required: true,
            type: 'multiple choice',
            tags: ['presenciales'],
            dependencies: ['carrera', 'año'],
            dependentSettings: {
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
        dependencies: ['presenciales'],
        dependentSettings: {
          '?#presenciales': {
            title: '#presenciales',
            description: 'Pruebo agregarle una descripcion a #presenciales.'
          }
        },
        questions: [
          {
            id: 1,
            title: '¿Tuvo la materia complementos audiovisuales para facilitar los contenidos?',
            description: 'Por fuera de los típicos apuntes y presentaciones',
            type: 'multiple choice',
            settings: {
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
            id: 2,
            title: 'Antes de cada trabajo práctico, ¿Lograste comprender la técnica correctamente?',
            type: 'slider',
            settings: { min: 0, max: 4, tagType: 'relative', sideLabels: true }
          },
          {
            id: 3,
            title: 'Luego de cada trabajo práctico, ¿Lograste comprender la técnica correctamente?',
            type: 'slider',
            settings: { min: 0, max: 4, tagType: 'relative', sideLabels: true }
          },
          {
            id: 4,
            title: 'En que grado creés que la realización del trabajo práctico te preparó para realizar las técnicas dictadas, en la vida profesional.',
            type: 'slider',
            settings: { min: 0, max: 4, tagType: 'relative', sideLabels: true }
          },
        ]
      },
      {
        id: 5,
        title: 'Cursado Virtual',
        questions: [
          {
            id: 1,
            title: '¿Cursaste alguna de estas materias de manera VIRTUAL?',
            required: true,
            type: 'multiple choice',
            dependencies: ['carrera', 'año'],
            dependentSettings: {
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
            id: 2,
            title: '¿Tuviste los medios para cursarlas?',
            fields: [
              {
                id: 1,
                inline: true,
                heading: 'Computadora',
                type: 'buttons',
                settings: { options: ['No dispone', 'Precario', 'Óptimo'] }
              },
              {
                id: 2,
                inline: true,
                heading: 'Celular',
                type: 'buttons',
                settings: { options: ['No dispone', 'Precario', 'Óptimo'] }
              },
              {
                id: 3,
                inline: true,
                heading: 'Acceso a Internet',
                type: 'buttons',
                settings: { options: ['No dispone', 'Precario', 'Óptimo'] }
              },
              {
                id: 4,
                inline: true,
                heading: 'Espacio de Estudio',
                type: 'buttons',
                settings: { options: ['No dispone', 'Precario', 'Óptimo'] }
              }
            ]
          },
          {
            id: 3,
            title: '¿Cómo calificarías el desarrollo de los contenidos dictados de manera virtual?',
            type: 'slider',
            settings: { min: 0, max: 4, tagType: 'qualitative', sideLabels: true }
          },
          {
            id: 4,
            title: '¿En qué grado se adaptaron las materias a la modalidad virtual?',
            type: 'slider',
            settings: { min: 0, max: 4, tagType: 'qualitative', sideLabels: true }
          },
          {
            id: 5,
            title: '¿Alguna de las materias que cursaste adaptó sus trabajos prácticos a la virtualidad? ¿Cómo?',
            type: 'long text',
            settings: { placeholder: 'Tu Respuesta' }
          },
          {
            id: 6,
            title: 'La instancia virtual ¿Fué suficiente para alcanzar la regularidad?',
            type: 'options',
            settings: {
              options: ['Si', 'No'],
              others: { title: '', placeholder: 'Comentarios' }
            }
          },
          {
            id: 7,
            title: '¿En qué grado considerás que comprendiste las técnicas de laboratorio con las metodologías utilizadas?',
            type: 'slider',
            settings: { min: 0, max: 4, tagType: 'qualitative', sideLabels: true }
          },
        ]
      },
      {
        id: 6,
        title: 'Consideraciones Finales',
        questions: [
          {
            id: 1,
            title: '¿En qué grado considerás que te adaptaste a la virtualidad?',
            description: 'Pensa en cosas como tu manejo con los programas utilizados o métodos y herramientas utilizados para comunicarte con tus compañeros',
            type: 'slider',
            settings: { min: 0, max: 4, tagType: 'qualitative', sideLabels: true }
          },
          {
            id: 2,
            title: '¿En qué grado considerás que la carrera te brinda herramientas que vayas a utilizar en el mundo profesional?',
            type: 'slider',
            settings: { min: 0, max: 4, tagType: 'qualitative', sideLabels: true }
          },
          {
            id: 3,
            title: '¿Considerás que en la carrera se desarrollan temas que no tienen aplicación, directa o indirecta, en el mundo profesional? ¿Cuáles?',
            type: 'long text',
            settings: { placeholder: 'Tu respuesta' }
          },
          {
            id: 4,
            title: '¿Tuviste algún acercamiento a la práctica profesional?',
            description: 'Pasantías, tesinas, etc',
            type: 'options',
            settings: { options: ['Si', 'No'] }
          },
          {
            id: 5,
            title: '¿Considerás que la incorporación de herramientas virtuales mejoraría el dictado de clases presenciales?',
            type: 'slider',
            settings: { min: 0, max: 4, tagType: 'relative', sideLabels: true }
          },
        ]
      },
      {
        id: 7,
        title: 'Videojuegos',
        questions: [
          {
            id: 1,
            title: 'Nombre al primer videojuego que se le venga a la cabeza',
            type: 'short text',
            settings: { maxLength: 60 }
          },
          {
            id: 2,
            title: '¿Jugás videojuegos?',
            type: 'options',
            settings: { options: ['Si', 'No'] }
          },
          {
            id: 3,
            title: '¿Usarías un videojuego como herramienta de aprendizaje?',
            type: 'options',
            settings: { options: ['Si', 'No'] }
          },
          {
            id: 4,
            title: '¿Usarías un simulador como herramienta de aprendizaje?',
            type: 'options',
            settings: { options: ['Si', 'No'] }
          },
          {
            id: 5,
            title: 'De 3 características de los videojuegos',
            fields: [
              {
                id: 1,
                type: 'short text',
                settings: {
                  maxLength: 30,
                  placeholder: 'Caracteristica #1'
                }
              },
              {
                id: 2,
                type: 'short text',
                settings: {
                  maxLength: 30,
                  placeholder: 'Caracteristica #2'
                }
              },
              {
                id: 3,
                type: 'short text',
                settings: {
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
