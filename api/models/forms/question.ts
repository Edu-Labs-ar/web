import { Taggable } from 'api/utils';

export interface SlideData {
  tags: string[];
  tooltip: boolean;
  sideLabels: boolean;
}

export interface Selection {
  options: string[];
}

export interface Fillable {
  placeholder?: string;
}

export interface OptionsData extends Selection {
  others?: boolean;
}

export interface MultipleChoiceData extends Selection {
  others?: boolean;
}

export interface NumberData extends Fillable {
  min?: number;
  max?: number;
  step?: number;
}

export interface ButtonsData extends Selection {
  inline: boolean;
}

export interface MultiButtonData {
  header: string;
  buttons: string[];
}

export type QuestionData = SlideData | OptionsData | MultipleChoiceData | ButtonsData | NumberData | MultiButtonData[];

export interface Question extends Taggable {
  title: string;
  description?: string;
  required: boolean;
  type: 'long text' | 'short text' | 'slide' | 'options' | 'multiple choice' | 'buttons' | 'multi button' | 'numeric';
  data?: QuestionData;
  dependentData?: { [key: string]: QuestionData };
}

