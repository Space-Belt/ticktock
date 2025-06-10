import {ICart, ICartItem} from '@entities/cart';
import {create} from 'zustand';

interface CartStore {
  cart: ICart | null;
  setCart: (cart: ICart) => void;
  addCartItem: (item: ICartItem, storeName: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>(set => ({
  cart: null,

  setCart: cart => set({cart}),

  addCartItem: (item, storeName) =>
    set(state => {
      const existingCart = state.cart;

      if (!existingCart || existingCart.storeName !== storeName) {
        return state;
      }

      const updatedItems = [...existingCart.cartItems, item];
      const updatedPrice = updatedItems.reduce(
        (sum, i) => sum + (i.totalPrice ?? 0),
        0,
      );

      return {
        cart: {
          ...existingCart,
          cartItems: updatedItems,
          totalPrice: updatedPrice,
        },
      };
    }),

  clearCart: () => set({cart: null}),
}));
