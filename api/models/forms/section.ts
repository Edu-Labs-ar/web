import { Question } from './question';

export interface Section {
  title: string;
  description?: string;
  tags?: string[];
  dependencies?: string[];
  questions: Question[];
}
