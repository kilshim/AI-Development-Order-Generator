export interface PromptTemplate {
  title: string;
  description: string;
  template: string;
}

export interface IdeaMapping {
  keyword: string[];
  stack: string;
  features: string[];
}

export enum GenerationMode {
  STATIC = 'STATIC',
  GEMINI = 'GEMINI',
}

export interface GenerationRequest {
  idea: string;
  mode: GenerationMode;
}
