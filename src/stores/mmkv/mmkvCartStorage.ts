import {ICart, ICartItem} from '@entities/cart';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();
const CART_KEY = 'cart';

export const getCart = (): ICart | null => {
  const json = storage.getString(CART_KEY);
  return json ? JSON.parse(json) : null;
};

export const addToCart = (item: ICartItem, storeName: string): void => {
  const existingCart = getCart();

  if (!existingCart) return;

  if (existingCart.storeName !== storeName) return;

  const updatedItems = [...existingCart.cartItems, item];
  const updatedPrice = updatedItems.reduce(
    (sum, i) => sum + (i.totalPrice ?? 0),
    0,
  );

  const updatedCart: ICart = {
    ...existingCart,
    cartItems: updatedItems,
    totalPrice: updatedPrice,
  };

  storage.set(CART_KEY, JSON.stringify(updatedCart));
};

export const createNewCart = (item: ICart): void => {
  storage.set(CART_KEY, JSON.stringify(item));
};

export const clearCart = () => {
  storage.delete(CART_KEY);
};
