export interface Fillable {
  placeholder?: string;
}

export interface TextData extends Fillable {
  minLength?: number;
  maxLength?: number;
}

export interface NumericData {
  min?: number;
  max?: number;
  step?: number;
}

export interface Selection {
  options: string[];
}

export type ExtraData = (TextData & { title?: string }) | boolean;

export interface ExtraInput {
  others?: ExtraData;
}


export interface NumberData extends NumericData, Fillable {
}

export interface OptionsData extends Selection, ExtraInput {
}

export type ButtonsData = Selection;

export interface SliderDataBase extends NumericData {
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

export type SliderData = SliderDataFree | SliderDataPrefab;

