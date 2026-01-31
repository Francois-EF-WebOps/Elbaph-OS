export enum LayerType {
  TOOL_SOVEREIGNTY = 'TOOL_SOVEREIGNTY',
  RESOURCE_SUBSTRATE = 'RESOURCE_SUBSTRATE',
  ENERGY = 'ENERGY',
  FOOD_BIOMASS = 'FOOD_BIOMASS',
  KNOWLEDGE = 'KNOWLEDGE',
  CIVIL_STACK = 'CIVIL_STACK',
}

export interface SpecificationDoc {
  id: string;
  title: string;
  layer: LayerType;
  content: string;
  timestamp: number;
  status: 'generating' | 'complete' | 'error';
  command: string;
}

export interface LayerConfig {
  id: LayerType;
  label: string;
  description: string;
  defaultFiles: string[];
  icon: string;
}
