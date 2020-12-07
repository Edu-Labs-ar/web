export interface Distinguishable {
  id: number;
}

export interface Taggable {
  tags?: string[];
  dependencies?: string[];
}

export interface TitledElement {
  title?: string;
}

export interface DescriptibleElement extends TitledElement {
  title: string;
  description?: string;
}

export type EntitledElement = TitledElement | DescriptibleElement;
