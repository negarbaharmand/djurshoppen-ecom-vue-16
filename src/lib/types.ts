export type AnimalSize = 'S' | 'M' | 'L';
export type AnimalCategory = 'normal' | 'exotisk';

export interface Animal {
  id: string;
  namn: string;
  slug: string;
  kategori: AnimalCategory;
  kortBeskrivning: string;
  pris: Record<AnimalSize, number>;
  lager: Record<AnimalSize, number>;
  bildUrl: string;
}

export interface CartItem {
  id: string;
  namn: string;
  slug: string;
  storlek: AnimalSize;
  pris: number;
  kvantitet: number;
  bildUrl: string;
}

export interface CartStore {
  items: CartItem[];
  addItem: (animal: Animal, storlek: AnimalSize, kvantitet: number) => void;
  updateQuantity: (id: string, storlek: AnimalSize, kvantitet: number) => void;
  removeItem: (id: string, storlek: AnimalSize) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}