import { AfterViewInit, Component, OnInit, QueryList, TemplateRef, ViewChildren, DoCheck, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SectionComponent } from '../../custom/section/section.component';

interface GroupControls { [key: string]: AbstractControl; }
interface Assignature { name: string; interest?: boolean; }
interface Career {
  name: string;
  [key: number]: Assignature[][];
}

const materias: { [key: number]: Career } = {
  1: {
    name: 'Bioquímica',
    4: [
      // Presencial
      [
        { name: 'Morfología Normal', interest: true },
        { name: 'Química Biológica', interest: true },
        { name: 'Control de Calidad', interest: true },
        { name: 'Microbiología General', interest: true }
      ],

      // Virtual
      [
        { name: 'Inmunología Básica' },
        { name: 'Fisiología Humana' },
        { name: 'Bromatología' },
        { name: 'Nutrición' },
        { name: 'Metodología de la Investigación' }
      ]
    ],
    5: [
      // Presencial
      [
        { name: 'Bacteriología Clínica', interest: true },
        { name: 'Micología', interest: true },
        { name: 'Virología', interest: true },
        { name: 'Patología Humana', interest: true },
        { name: 'Bioquímica Clínica y Cuantitativa I', interest: true }
      ],

      // Virtual
      [
        { name: 'Bioquímica Clínica y Cuantitativa II' },
        { name: 'Bioquímica Clínica y Cuantitativa III' },
        { name: 'Parasitología' },
        { name: 'Toxicología, Farmacología y Bioquímica Legal' }
      ]
    ]
  },

  0: {
    name: 'Biotecnología',
    4: [
      // Presencial
      [
        { name: 'Química Biológica', interest: true },
        { name: 'Microbiología General', interest: true },
        { name: 'Métodos Matemáticos', interest: true }
      ],

      // Virtual
      [
        { name: 'Inmunología Básica' },
        { name: 'Operaciones y Procesos Biotecnológicos I' }
      ]
    ],
    5: [
      // Presencial
      [
        { name: 'Operaciones y Procesos Biotecnológicos II', interest: true },
        { name: 'Microbiología Aplicada', interest: true },
        { name: 'Elementos de Economía para Biotecnología', interest: true },
        { name: 'Biología Vegetal', interest: true },
        { name: 'Ética Profesional', interest: true }
      ],

      // Virtual
      [
        { name: 'Tratamiendo de Efluentes' },
        { name: 'Ingeniería Genética' },
        { name: 'Ingeniería y Diseño Enzimático' },
        { name: 'Tecnología Inmunológica' }
      ]
    ]
  }
};

@Component({
  selector: 'form-inicial',
  templateUrl: './inicial.component.html'
})
export class FormInicialComponent implements OnInit, DoCheck, AfterViewInit {

  inicialForm = this.fb.group({
    estudiaFBCB: [''],
    demograficos: this.fb.group({
      edad: [''],
      genero: [''],
      generoLibre: ['']
    }),
    academicos: this.fb.group({
      carrera: [''],
      nombreCarreraLibre: [''],
      año: [''],
      presenciales: [''],
      virtuales: ['']
    })
  });

  get form(): GroupControls { return this.inicialForm.controls; }
  get demograficos(): GroupControls { return (this.form.demograficos as FormGroup).controls; }
  get academicos(): GroupControls { return (this.form.academicos as FormGroup).controls; }

  mainContainer: HTMLElement;

  afterSectionUpdate = new Subject<void>();
  dirtySection = false;

  lastAssignatures: Assignature[];
  virtualAssignatures: Assignature[];
  interestingAssignatures: Observable<Assignature[]>;

  materias = materias;

  @ViewChildren(SectionComponent) sections: QueryList<SectionComponent>;
  sectionTemplate: TemplateRef<any>;
  hasNextSection = false;
  hasPrevSection = false;
  sectionIdx = 0;
  sectionKey: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const assignaturesBase =
      merge(this.afterSectionUpdate, this.academicos.carrera.valueChanges, this.academicos.año.valueChanges)
        .pipe(
          tap(() => this.updateSections()),
          map(() => ({ carrera: this.academicos.carrera.value, año: this.academicos.año.value })),
          map(({ carrera, año }) => materias[carrera]?.[año])
        );

    assignaturesBase.pipe(map(data => data?.[0])).subscribe(assignatures => this.lastAssignatures = assignatures);
    assignaturesBase.pipe(map(data => data?.[1])).subscribe(assignatures => this.virtualAssignatures = assignatures);

    this.interestingAssignatures = this.academicos.presenciales.valueChanges.pipe(
      tap(() => this.updateSections()),
      map((assignatures: number[]) => (
        {
          career: this.academicos.carrera.value as number,
          year: this.academicos.año.value as number,
          assignatures
        })),
      map(({ career, year, assignatures }) => {
        const course = materias[career]?.[year]?.[0];
        return assignatures
          .map(index => course?.[index])
          .filter(assignature => assignature?.interest);
      })
    );

    this.mainContainer = document.getElementById('mainContainer');
  }

  ngDoCheck(): void {
    if (this.dirtySection) {
      this.afterSectionUpdate.next();
      this.dirtySection = false;
    }
  }

  dummy(): void {
    console.log('hi');
    this.demograficos.genero.setValue('3');
  }

  ngAfterViewInit(): void {
    setTimeout(this.updateSections.bind(this));
  }

  relativeFormat(value: number): string {
    return ['Muy Poco', 'Poco', 'Algo', 'Bastante', 'Mucho'][value];
  }

  qualitativeFormat(value: number): string {
    return ['Insuficiente', 'Escaso', 'Regular', 'Sobresaliente', 'Excepcional'][value];
  }

  nextSection(): void {
    ++this.sectionIdx;
    this.mainContainer?.scrollTo(0, 0);
    this.updateSections();
  }

  prevSection(): void {
    --this.sectionIdx;
    this.mainContainer?.scrollTo(0, 0);
    this.updateSections();
  }

  private updateSections(): void {
    const section = this.sections?.toArray()?.[this.sectionIdx];
    this.sectionTemplate = section?.sectionTemplate;
    this.sectionKey = section?.key;
    this.hasNextSection = this.sectionIdx < this.sections?.length - 1;
    this.hasPrevSection = this.sectionIdx > 0;
  }
}
