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
  kategori: AnimalCategory;
}

export interface CartStore {
  items: CartItem[];
  addItem: (animal: Animal, storlek: AnimalSize, kvantitet: number) => void;
  updateQuantity: (slug: string, storlek: AnimalSize, kvantitet: number) => void;
  updateVariant: (slug: string, oldStorlek: AnimalSize, newStorlek: AnimalSize) => void;
  removeItem: (slug: string, storlek: AnimalSize) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}