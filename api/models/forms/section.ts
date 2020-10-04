import { Taggable } from 'api/utils';
import { Question } from './question';

export interface Section extends Taggable {
  title: string;
  description?: string;
  questions: Question[];
}
