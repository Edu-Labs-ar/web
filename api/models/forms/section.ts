import { Taggable, Distinguishable } from 'api/utils';
import { MultiQuestion, Question } from './question';

export interface SectionBase extends Taggable {
  questions: (Question | MultiQuestion)[];
}

export interface FirstSection extends SectionBase {
  id: 1;
}

export interface Section extends SectionBase, Distinguishable {
  title: string;
  description?: string;
}
