import { Distinguishable, EntitledElement, Taggable } from 'api/utils';
import { ButtonsData, TextData, NumberData, OptionsData, SliderData } from './question-data';

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

export interface QuestionBase<DataType>
  extends IQuestion {
  data?: DataType;
}

export interface DependentQuestionBase<DataType>
  extends IQuestion {
  dependencies: string[];
  dependentData: { [key: string]: DataType };
}


export type QuestionShortText = { type: 'short text' } & InlinedQuestion
  & (QuestionBase<TextData> | DependentQuestionBase<TextData>);

export type QuestionLongText = { type: 'long text' }
  & (QuestionBase<TextData> | DependentQuestionBase<TextData>);

export type QuestionNumber = { type: 'numeric' } & InlinedQuestion
  & (QuestionBase<NumberData> | DependentQuestionBase<NumberData>);

export type QuestionOptions = { type: 'options' | 'multiple choice' } & InlinedQuestion
  & (QuestionBase<OptionsData> | DependentQuestionBase<OptionsData>);

export type QuestionButtons = { type: 'buttons' } & InlinedQuestion
  & (QuestionBase<ButtonsData> | DependentQuestionBase<ButtonsData>);

export type QuestionSlider = { type: 'slider' }
  & (QuestionBase<SliderData> | DependentQuestionBase<SliderData>);


export interface UntitledMultiQuestion extends IQuestion {
  type: 'multi question';
  fields: (BaseQuestion & HeadedQuestionBase)[];
}


export type QuestionData = TextData | NumberData | OptionsData | ButtonsData | SliderData;

export type BaseQuestion = QuestionShortText | QuestionLongText | QuestionNumber | QuestionOptions | QuestionButtons | QuestionSlider;

export type MultiQuestion = UntitledMultiQuestion | (UntitledMultiQuestion & EntitledElement);

export type Question = BaseQuestion | (BaseQuestion & EntitledElement);
