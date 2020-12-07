import { Distinguishable } from '../../utils';
import { SectionType } from './section';

export interface FormStructure extends Distinguishable {
  title: string;
  description?: string;
  editors: number[];
  sections: (SectionType)[];
}

export interface FormData extends Distinguishable {
  asdf: number;
}

export interface Form extends FormStructure, FormData {
}
