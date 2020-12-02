import { DependentSection, FirstSection, Section } from './section';
import { Distinguishable } from '../../utils';

export interface FormStructure extends Distinguishable {
  title: string;
  description?: string;
  editors: number[];
  sections: (Section | FirstSection)[];
}

export interface FormData extends Distinguishable {
  asdf: number;
}

export interface Form extends FormStructure, FormData {
}
