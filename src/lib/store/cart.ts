import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore, CartItem, Animal, AnimalSize, AnimalCategory } from '@/lib/types';
import { animals } from '@/data/animals';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (animal: Animal, storlek: AnimalSize, kvantitet: number) => {
        const existingItemIndex = get().items.findIndex(
          item => item.slug === animal.slug && item.storlek === storlek
        );
        
        if (existingItemIndex > -1) {
          // Uppdatera befintlig vara (max 10 totalt)
          set(state => ({
            items: state.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, kvantitet: Math.min(item.kvantitet + kvantitet, 10) }
                : item
            )
          }));
        } else {
          // Lägg till ny vara
          const newItem: CartItem = {
            id: animal.id,
            namn: animal.namn,
            slug: animal.slug,
            bildUrl: animal.bildUrl,
            kategori: animal.kategori,
            storlek,
            pris: animal.pris[storlek],
            kvantitet: Math.min(kvantitet, 10)
          };
          
          set(state => ({
            items: [...state.items, newItem]
          }));
        }
      },
      
      updateQuantity: (slug: string, storlek: AnimalSize, kvantitet: number) => {
        if (kvantitet <= 0) {
          get().removeItem(slug, storlek);
          return;
        }
        
        set(state => ({
          items: state.items.map(item =>
            item.slug === slug && item.storlek === storlek
              ? { ...item, kvantitet: Math.min(Math.max(kvantitet, 1), 10) }
              : item
          )
        }));
      },
      
      updateVariant: (slug: string, oldStorlek: AnimalSize, newStorlek: AnimalSize) => {
        const state = get();
        const item = state.items.find(item => item.slug === slug && item.storlek === oldStorlek);
        if (!item) return;
        
        // Hitta djuret för att få nytt pris
        const animal = animals.find(a => a.slug === slug);
        if (!animal) return;
        
        // Ta bort gamla varianten
        state.removeItem(slug, oldStorlek);
        
        // Lägg till ny variant med uppdaterat pris
        const newItem: CartItem = {
          ...item,
          storlek: newStorlek,
          pris: animal.pris[newStorlek]
        };
        
        set(state => ({
          items: [...state.items, newItem]
        }));
      },
      
      removeItem: (slug: string, storlek: AnimalSize) => {
        set(state => ({
          items: state.items.filter(
            item => !(item.slug === slug && item.storlek === storlek)
          )
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.kvantitet, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.pris * item.kvantitet), 0);
      }
    }),
    {
      name: 'djurshoppen-cart',
    }
  )
);