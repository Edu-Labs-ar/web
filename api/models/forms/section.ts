import { Distinguishable, EntitledElement, Taggable } from 'api/utils';
import { QuestionType } from './question';

export interface SectionBase extends Taggable {
  questions: QuestionType[];
}

export interface FirstSection extends SectionBase {
  id: 1;
}

export type Section = SectionBase & Distinguishable & EntitledElement;

export interface DependentSection extends SectionBase, Distinguishable {
  dependencies: string[];
  dependentSettings: { [key: string]: EntitledElement };
}

export type SectionType = Section | (DependentSection & EntitledElement) | FirstSection;

