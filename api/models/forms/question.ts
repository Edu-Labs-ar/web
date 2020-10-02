export interface SlideData {
  tags: string[];
  tooltip: boolean;
  sideLabels: boolean;
}

export interface Selection {
  options: string[];
}

export interface OptionsData extends Selection {
  others?: boolean;
}

export interface MultipleChoiceData extends Selection {
  others?: boolean;
}

export interface NumberData {
  min: number;
  max: number;
}

export interface ButtonsData extends Selection {
  inline: boolean;
}

export interface MultiButtonData {
  header: string;
  buttons: string[];
}

export type QuestionData = SlideData | OptionsData | MultipleChoiceData | ButtonsData | NumberData | MultiButtonData[];

export interface Question {
  title: string;
  description?: string;
  tags?: string[];
  dependencies?: string[];
  required: boolean;
  type: 'long text' | 'short text' | 'slide' | 'options' | 'multiple choice' | 'buttons' | 'multi button' | 'numeric';
  data?: QuestionData;
  dependentData?: { [key: string]: QuestionData };
}

