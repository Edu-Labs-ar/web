export interface Distinguishable {
  id: number;
}

export interface Taggable {
  tags?: string[];
  dependencies?: string[];
}

export interface EntitledElement {
  title: string;
  description?: string;
}
