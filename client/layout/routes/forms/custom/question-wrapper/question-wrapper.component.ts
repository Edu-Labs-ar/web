import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ButtonsSettings, ExtraInput, ExtraSettings,
  InlinedQuestion,
  NumberSettings, OptionsSettings, ProcesableQuestion, SliderSettings, TextSettings
} from 'api';

@Component({
  selector: 'edu-question-wrapper[question]',
  templateUrl: 'question-wrapper.component.html',
  host: {
    class: 'd-flex',
    '[class.flex-column]': 'vertical'
  }
})
export class QuestionWrapperComponent {

  @Input() question: ProcesableQuestion & { control: FormGroup };


  /**
   * Manejo de Datos
   */
  get control(): FormGroup {
    return this.question.control as FormGroup;
  }

  get vertical(): boolean {
    return !(this.question as InlinedQuestion)?.inline;
  }

  get textData(): TextSettings | undefined {
    return this.question?.settings as TextSettings;
  }

  get numberData(): NumberSettings | undefined {
    return this.question?.settings as NumberSettings;
  }

  get optionsData(): OptionsSettings | undefined {
    return this.question?.settings as OptionsSettings;
  }

  get buttonsData(): ButtonsSettings | undefined {
    return this.question?.settings as ButtonsSettings;
  }

  get sliderData(): SliderSettings | undefined {
    return this.question?.settings as SliderSettings;
  }

  get extraData(): ExtraSettings | undefined {
    return (this.question?.settings as ExtraInput)?.others;
  }

  get extraDataFull(): (TextSettings & { title?: string }) | undefined {
    return (this.question?.settings as { others?: (TextSettings & { title?: string }) })?.others;
  }

  hasExtraHeading(): boolean {
    return this.extraDataFull?.title !== '';
  }

  getExtraHeading(defaultLabel: string): string {
    return `${this.extraDataFull?.title ?? defaultLabel}: `;
  }

  get heading(): string | undefined {
    return (this.question as { heading?: string })?.heading;
  }

  sliderFormat(data: SliderSettings): (_: number) => string {
    let tags: string[];
    if ('tagType' in data)
      switch (data.tagType) {
        case 'qualitative':
          tags = ['Insuficiente', 'Escaso', 'Regular', 'Sobresaliente', 'Excepcional'];
          break;
        case 'relative':
          tags = ['Muy Poco', 'Poco', 'Algo', 'Bastante', 'Mucho'];
          break;
      }
    else if ('tags' in data)
      tags = data.tags;
    else tags = [];

    const factor = (tags.length - 1) / ((data?.max ?? 100) - (data?.min ?? 0));

    if (tags.length === 0)
      return (_) => _.toString();
    else
      return (value: number) => tags[Math.round((value - (data?.min ?? 0)) * factor)];
  }
}
