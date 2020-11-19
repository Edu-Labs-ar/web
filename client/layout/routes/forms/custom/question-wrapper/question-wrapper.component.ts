import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Question, ExtraData, ExtraInput, InlinedQuestion,
  TextData, NumberData, OptionsData, ButtonsData, SliderData, QuestionData
} from 'api';

@Component({
  selector: 'edu-question-wrapper[question][questionData][control]',
  templateUrl: 'question-wrapper.component.html',
  host: {
    class: 'd-flex',
    '[class.flex-column]': 'vertical'
  }
})
export class QuestionWrapperComponent {

  @Input() question: Question;

  @Input() questionData: QuestionData;

  @Input() control: FormGroup;


  /**
   * Manejo de Datos
   */
  get vertical(): boolean {
    return !(this.question as InlinedQuestion)?.inline;
  }

  get textData(): TextData | undefined {
    return this.questionData as TextData;
  }

  get numberData(): NumberData | undefined {
    return this.questionData as NumberData;
  }

  get optionsData(): OptionsData | undefined {
    return this.questionData as OptionsData;
  }

  get buttonsData(): ButtonsData | undefined {
    return this.questionData as ButtonsData;
  }

  get sliderData(): SliderData | undefined {
    return this.questionData as SliderData;
  }

  get extraData(): ExtraData | undefined {
    return (this.questionData as ExtraInput)?.others;
  }

  get extraDataFull(): (TextData & { title?: string }) | undefined {
    return (this.questionData as { others?: (TextData & { title?: string }) })?.others;
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

  sliderFormat(data: SliderData): (_: number) => string {
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
      return (value: number) => tags[Math.round(value * factor)];
  }
}
