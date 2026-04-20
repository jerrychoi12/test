export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
  spec?: string;
  packing?: string;
  feature?: string;
  manufacturer?: string;
  origin?: string;
}

export type View = 'home' | 'catalog' | 'partners' | 'history';
