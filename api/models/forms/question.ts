import { Distinguishable, EntitledElement, Taggable } from 'api/utils';
import { ButtonsSettings, NumberSettings, OptionsSettings, SliderSettings, TextSettings } from './question-settings';

export type NonDependentQuestion =
  ({ type: 'short text' } & QuestionBase<TextSettings> & InlinedQuestion)
  | ({ type: 'long text' } & QuestionBase<TextSettings>)
  | ({ type: 'numeric' } & QuestionBase<NumberSettings> & InlinedQuestion)
  | ({ type: 'options' | 'multiple choice' } & QuestionBase<OptionsSettings> & InlinedQuestion)
  | ({ type: 'buttons' } & QuestionBase<ButtonsSettings> & InlinedQuestion)
  | ({ type: 'slider' } & QuestionBase<SliderSettings>) & HeadedQuestionBase;


export type ProcesableQuestion =
  (NonDependentQuestion | { fields: NonDependentQuestion[] }) & EntitledElement;

export interface IQuestion
  extends Taggable, Distinguishable {
  required?: boolean;
}

export interface InlinedQuestion {
  inline?: boolean;
}

export interface HeadedQuestionBase {
  heading?: string;
}

export interface QuestionBase<DataSettings>
  extends IQuestion {
  settings?: DataSettings;
}

export interface DependentQuestionBase<DataSettings>
  extends IQuestion {
  dependencies: string[];
  dependentSettings: { [key: string]: DataSettings };
}


export type QuestionShortText = { type: 'short text' } & InlinedQuestion
  & (QuestionBase<TextSettings> | DependentQuestionBase<TextSettings>);

export type QuestionLongText = { type: 'long text' }
  & (QuestionBase<TextSettings> | DependentQuestionBase<TextSettings>);

export type QuestionNumber = { type: 'numeric' } & InlinedQuestion
  & (QuestionBase<NumberSettings> | DependentQuestionBase<NumberSettings>);

export type QuestionOptions = { type: 'options' | 'multiple choice' } & InlinedQuestion
  & (QuestionBase<OptionsSettings> | DependentQuestionBase<OptionsSettings>);

export type QuestionButtons = { type: 'buttons' } & InlinedQuestion
  & (QuestionBase<ButtonsSettings> | DependentQuestionBase<ButtonsSettings>);

export type QuestionSlider = { type: 'slider' }
  & (QuestionBase<SliderSettings> | DependentQuestionBase<SliderSettings>);


export interface UntitledMultiQuestion extends IQuestion {
  fields: (BaseQuestion & HeadedQuestionBase)[];
}


export type BaseQuestion = QuestionShortText | QuestionLongText | QuestionNumber | QuestionOptions | QuestionButtons | QuestionSlider;

export type MultiQuestion = UntitledMultiQuestion | (UntitledMultiQuestion & EntitledElement);

export type Question = BaseQuestion | (BaseQuestion & EntitledElement);

export type QuestionType = Question | MultiQuestion;

