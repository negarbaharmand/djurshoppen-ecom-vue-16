import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore, CartItem, Animal, AnimalSize } from '@/lib/types';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (animal: Animal, storlek: AnimalSize, kvantitet: number) => {
        const existingItemIndex = get().items.findIndex(
          item => item.id === animal.id && item.storlek === storlek
        );
        
        if (existingItemIndex > -1) {
          // Uppdatera befintlig vara
          set(state => ({
            items: state.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, kvantitet: item.kvantitet + kvantitet }
                : item
            )
          }));
        } else {
          // Lägg till ny vara
          const newItem: CartItem = {
            id: animal.id,
            namn: animal.namn,
            slug: animal.slug,
            storlek,
            pris: animal.pris[storlek],
            kvantitet,
            bildUrl: animal.bildUrl
          };
          
          set(state => ({
            items: [...state.items, newItem]
          }));
        }
      },
      
      updateQuantity: (id: string, storlek: AnimalSize, kvantitet: number) => {
        if (kvantitet <= 0) {
          get().removeItem(id, storlek);
          return;
        }
        
        set(state => ({
          items: state.items.map(item =>
            item.id === id && item.storlek === storlek
              ? { ...item, kvantitet }
              : item
          )
        }));
      },
      
      removeItem: (id: string, storlek: AnimalSize) => {
        set(state => ({
          items: state.items.filter(
            item => !(item.id === id && item.storlek === storlek)
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