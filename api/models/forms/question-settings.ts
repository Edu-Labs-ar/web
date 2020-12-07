export interface Fillable {
  placeholder?: string;
}

export interface TextSettings extends Fillable {
  minLength?: number;
  maxLength?: number;
}

export interface NumericSettings {
  min?: number;
  max?: number;
  step?: number;
}

export interface Selection {
  options: string[];
}

export type ExtraSettings = (TextSettings & { title?: string }) | boolean;

export interface ExtraInput {
  others?: ExtraSettings;
}


export interface NumberSettings extends NumericSettings, Fillable {
}

export interface OptionsSettings extends Selection, ExtraInput {
}

export type ButtonsSettings = Selection;

export interface SliderDataBase extends NumericSettings {
  tooltip?: boolean;
  sideLabels?: boolean;
  defaultValue?: number;
}

export interface SliderDataPrefab extends SliderDataBase {
  tagType?: 'relative' | 'qualitative';
}

export interface SliderDataFree extends SliderDataBase {
  tags: string[];
}

export type SliderSettings = SliderDataFree | SliderDataPrefab;


export type QuestionSettings = TextSettings | NumberSettings | OptionsSettings | ButtonsSettings | SliderSettings;
