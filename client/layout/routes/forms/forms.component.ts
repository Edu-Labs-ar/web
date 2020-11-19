import { AfterViewInit, Component, HostListener, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  Distinguishable,
  ExtraInput, FormStructure,
  MultiQuestion, Question, QuestionData, Taggable
} from 'api';
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
  private _workspaceRegistry: (Taggable & Distinguishable)[] = [];

  visibilities: { [key: string]: QuestionData | boolean } = {};

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
            // Agrego los controles de cada pregunta
            question => {
              const { id, control } = this._createControl(question);
              controls[id] = control;
            }
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

  private _createControl(question: Question | MultiQuestion): { id: number, control: AbstractControl } {
    let mainControl: AbstractControl;
    if (question.type === 'multi question') {
      const subControls: { [key: string]: AbstractControl } = {};

      question.fields.forEach(
        field => {
          const questionData = this._getInitialQuestionData(field);
          this.visibilities[`q${question.id}-${field.id}`] = questionData;

          const control = this._createSimpleControl(questionData, field?.required);
          subControls[field.id] = control;
        });
      mainControl = new FormGroup(subControls);
    } else {
      const questionData = this._getInitialQuestionData(question);
      this.visibilities[`q${question.id}`] = questionData;

      mainControl = this._createSimpleControl(questionData, question?.required);
    }

    // Actualizar etiquetas y secciones
    mainControl.valueChanges
      .pipe(debounceTime(100))
      .subscribe(() => this.updateVisibility(question, mainControl));

    return { id: question.id, control: mainControl };
  }

  private _createSimpleControl(data: QuestionData | undefined, required?: boolean): AbstractControl {
    const validators: ValidatorFn[] = [];
    if (required)
      validators.push(Validators.required);

    let baseControl: AbstractControl;
    const extras = (data as ExtraInput)?.others;

    if (data)
      validators.push(...this._createValidators(data));

    if (extras) {
      const extraValidators: ValidatorFn[] = [];
      if (!(typeof (extras) === 'boolean'))
        extraValidators.push(... this._createValidators(extras));

      baseControl = new FormGroup({
        value: new FormControl('', validators),
        extra: new FormControl('', extraValidators),
      });
    } else
      baseControl = new FormControl('', validators);

    return baseControl;
  }

  private _createValidators(data: QuestionData): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if ('minLength' in data) validators.push(Validators.minLength(data.minLength));
    if ('maxLength' in data) validators.push(Validators.maxLength(data.maxLength));
    if ('min' in data) validators.push(Validators.min(data.min));
    if ('max' in data) validators.push(Validators.max(data.max));
    return validators;
  }

  private _getInitialQuestionData(question: Question | MultiQuestion): QuestionData {
    if ('data' in question) return question.data;
    else if ('dependentData' in question)
      return question.dependentData[''];
    return undefined;
  }

  private _queryDependentValues(tags: string[]): string {
    let depValue = '';
    for (const tag of tags) {
      let questionId: number;
      for (const element of this._workspaceRegistry)
        if (element?.tags?.includes(tag)) {
          questionId = element.id;
          break;
        }
      if (questionId) {
        let value = this.form.get(questionId.toString()).value;
        if (typeof value === 'object' && 'value' in value) value = value.value;
        depValue = depValue.concat('|').concat(value);
      }
    }

    return depValue.substr(1);
  }


  /**
   * Manejo de datos
   */
  getQuestionData(question: Question | MultiQuestion): QuestionData | undefined {
    const depData = this.visibilities[`q${question.id}`];
    if (depData === undefined || typeof depData === 'boolean')
      return 'data' in question ? question?.data : undefined;
    return depData;
  }

  getSubQuestionData(question: Question | MultiQuestion, field: Question): QuestionData | undefined {
    const depData = this.visibilities[`q${question.id}-${field.id}`];
    if (depData === undefined || typeof depData === 'boolean')
      return 'data' in field ? field?.data : undefined;
    return depData;
  }

  isSimpleQuestion(question: Question | MultiQuestion): boolean {
    return question.type !== 'multi question';
  }

  asMultiQuestion(question: Question | MultiQuestion): MultiQuestion {
    return question as MultiQuestion;
  }


  getQuestionControl(question: Distinguishable): AbstractControl {
    return this.form.get(`${question.id}`);
  }

  getFieldControl(question: Distinguishable, field: Distinguishable): AbstractControl {
    return this.form.get(`${question.id}.${field.id}`);
  }


  /**
   * Relevante a la visibilidad
   */
  shouldDisplaySection(element: Taggable & Distinguishable): boolean {
    return element.dependencies === undefined || this.visibilities?.[`s${element.id}`] !== undefined;
  }

  shouldDisplayQuestion(element: Taggable & Distinguishable): boolean {
    return element.dependencies === undefined || this.visibilities?.[`q${element.id}`] !== undefined;
  }

  shouldDisplaySubQuestion(parent: Taggable & Distinguishable, child: Taggable & Distinguishable): boolean {
    return child.dependencies === undefined || this.visibilities?.[`q${parent.id}-${child.id}`] !== undefined;
  }

  updateVisibility(question: Question | MultiQuestion, control: AbstractControl): void {
    this.updateWorkspace(question, control.valid);
    if (question?.tags) this.recalculateVisibilities(question.tags);
    this.updateSections();
  }

  updateWorkspace(element: (Taggable & Distinguishable), valid: boolean): void {
    const exists = this._workspaceRegistry
      .find(tag => tag.id === element.id) !== undefined;

    valid = valid && 'tags' in element;

    if (exists && !valid) {
      // Quito un elemento existente
      this._workspaceRegistry = this._workspaceRegistry
        .filter(tag => tag.id !== element.id);

      // Recalculo el workspace
      this.workspace = [];
      this._workspaceRegistry.forEach(item => this.workspace.push(...item.tags));

      // Quitar duplicados
      this.workspace = [... new Set(this.workspace)];

    } else if (!exists && valid) {
      // Agrego un elemento nuevo
      this._workspaceRegistry.push(element);
      this.workspace = [... new Set([...this.workspace, ...element.tags])];
    }
  }

  recalculateVisibilities(changes: string[]): void {
    this.formsService.formStructure.sections.forEach(section => {
      if (section?.tags?.some(tag => changes.includes(tag)))
        this.visibilities[`s${section.id}`] = this.isDisplayable(section);

      section.questions.forEach(question => {
        if (question?.dependencies?.some(tag => changes.includes(tag))) {
          if (this.isDisplayable(question))
            if ('dependentData' in question) {
              let data = question.dependentData
                ?.[this._queryDependentValues(question?.dependencies)];
              if (!data) data = question.dependentData?.[''];

              this.form.setControl(`${question.id}`,
                this._createSimpleControl(data, question?.required));

              this.visibilities[`q${question.id}`] = data;
            } else
              this.visibilities[`q${question.id}`] = true;
          else
            this.visibilities[`q${question.id}`] = undefined;
        }
      });
    });
  }

  isDisplayable(element: Taggable): boolean {
    return !(element.dependencies?.every(tag => this.workspace.includes(tag)) === false);
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


  /**
   * Eventos
   */
  @HostListener('window:beforeUnload')
  safetyPrompt(_: any): boolean {
    return this.form.valid || !this.form.dirty;
  }

}
