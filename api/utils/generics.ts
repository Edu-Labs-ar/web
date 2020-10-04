export interface Distinguishable {
  id: number;
}

export interface Taggable extends Distinguishable {
  tags?: string[];
  dependencies?: string[];
}
