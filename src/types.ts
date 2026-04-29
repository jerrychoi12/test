export interface Product {
  id: number;
  category: string;
  category2: string;
  name: string;
  features: string;
  model: string;
  color_size: string;
  package: string;
  manufacturer: string;
  origin: string;
  spec: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  img5: string;
}

export type View = 'home' | 'catalog' | 'partners' | 'history' | 'admin';
