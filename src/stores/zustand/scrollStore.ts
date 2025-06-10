import {create} from 'zustand';

type ScrollState = {
  scrollY: number;
  isScrolling: boolean;
  setScrollY: (scrollY: number) => void;
  setIsScrolling: (isScrolling: boolean) => void;
};

export const useScrollStore = create<ScrollState>(set => ({
  scrollY: 0,
  isScrolling: false,
  setScrollY: (scrollY: number) => set({scrollY}),
  setIsScrolling: (isScrolling: boolean) => set({isScrolling}),
}));
