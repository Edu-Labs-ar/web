import { Taggable, Distinguishable, EntitledElement } from 'api/utils';
import { MultiQuestion, Question } from './question';

export interface SectionBase extends Taggable {
  questions: (Question | MultiQuestion)[];
}

export interface FirstSection extends SectionBase {
  id: 1;
}

export type Section = SectionBase & Distinguishable & EntitledElement;

export interface DependentSection extends Distinguishable {
  dependentData: { [key: string]: EntitledElement };
}
