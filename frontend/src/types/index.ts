export interface TimeComplexity {
  best: string;
  average: string;
  worst: string;
}

export interface Algorithm {
  id: string;
  name: string;
  category: string;
  description: string;
  timeComplexity: TimeComplexity;
  spaceComplexity: string;
  pseudocode: string;
}

export interface AlgorithmSummary {
  id: string;
  name: string;
  category: string;
}

export type VisualizerSpeed = 'slow' | 'medium' | 'fast';
