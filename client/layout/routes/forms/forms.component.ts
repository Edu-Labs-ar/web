import { AfterViewInit, Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { Validators, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { FormStructure, NumberData, Question, Taggable } from 'api';
import { FormsService } from 'client/services';
import { debounceTime } from 'rxjs/operators';
import { SectionComponent } from './custom/section/section.component';

@Component({
  selector: 'edu-forms',
  templateUrl: './forms.component.html'
})
export class FormsComponent implements OnInit, AfterViewInit {

  // Generales
  form: FormGroup;
  structure: FormStructure;

  mainContainer: HTMLElement;

  // Etiquetas
  workspace: string[] = [];
  private _workspaceRegistry: Taggable[] = [];

  // Secciones
  @ViewChildren(SectionComponent) sections: QueryList<SectionComponent>;
  sectionTemplate: TemplateRef<any>;
  hasNextSection = false;
  hasPrevSection = false;
  sectionIdx = 0;
  sectionKey: string;

  // Intentar no meterle logica
  constructor(private formsService: FormsService) {
  }

  // Inicializacion de los formularios,
  // principalmente eventos.
  ngOnInit(): void {
    this.formsService
      .getFormStructure(1)
      .subscribe(structure => {
        const controls = {};
        // Para todas las preguntas
        structure.sections.forEach(section =>
          section.questions.forEach(
            // Agrego un control para cada pregunta
            question => controls[question.id] = this._createControl(question)
          )
        );

        // Actualizo los datos relevantes
        this.form = new FormGroup(controls);
        this.structure = structure;
      });

    this.mainContainer = document.getElementById('mainContainer');
  }

  // Cosas que deben ejecutarse después del render inicial
  ngAfterViewInit(): void {
    setTimeout(this.updateSections.bind(this));
  }

  private _createControl(question: Question): FormControl {
    const validators: ValidatorFn[] = [];
    if (question.required)
      validators.push(Validators.required);

    switch (question.type) {
      case 'numeric':
        const data = question.data as NumberData;
        if (data?.min) validators.push(Validators.min(data?.min));
        if (data?.max) validators.push(Validators.max(data?.max));
        break;
    }

    const control = new FormControl('', validators);

    // Actualizar etiquetas y secciones
    control.valueChanges
      .pipe(debounceTime(100))
      .subscribe(() => this.updateVisibility(question, control.valid));
    return control;
  }


  /**
   * Manejo de Datos
   */
  getNumberData(question: Question): NumberData | undefined {
    return question?.data as NumberData;
  }


  /**
   * Relevante a la visibilidad
   */
  shouldDisplay(element: Taggable): boolean {
    return element.dependencies?.every(tag => this.workspace.includes(tag)) || true;
  }

  updateVisibility(element: Taggable, valid: boolean): void {
    const exists = this._workspaceRegistry
      .find(tag => tag.id === element.id) === undefined;

    if (exists && !valid) {
      // Quito un elemento existente
      this._workspaceRegistry = this._workspaceRegistry
        .filter(tag => tag.id !== element.id);

      // Recalculo el workspace
      this.workspace = [];
      this._workspaceRegistry.forEach(tag => this.workspace.push(...tag.tags));
    } else if (!exists && valid) {
      // Agrego un elemento nuevo
      this._workspaceRegistry.push(element);
      this.workspace.push(...element.tags);
    }

    this.updateSections();
  }


  /**
   * Manejo de secciones
   */
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
