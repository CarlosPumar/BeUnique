export type AIImageOptionsType = {
  size: number;
  zIndex: number;
};

export type AIImageOptionsTypeOptional = {
  size?: number;
  zIndex?: number;
};

export type AIImageType = {
  id: string;
  src: string;
  options: AIImageOptionsType;
};
