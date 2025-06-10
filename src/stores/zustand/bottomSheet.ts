import {create} from 'zustand';

type BottomSheetContent = React.ReactElement | (() => React.ReactElement);

type BottomStateType = {
  isVisible: boolean;
  content: BottomSheetContent | null;
  height: number;
  isHandler: boolean;
};
type BottomSheetState = {
  bottomState: BottomStateType;
  setBottomSheetVisible: (
    isVisible: boolean,
    content: BottomSheetContent | null,
    height: number,
    isHandler: boolean,
  ) => void;
  removeBottomSheet: () => void;
};

export const useBottomSheetStore = create<BottomSheetState>(set => ({
  bottomState: {
    isVisible: false,
    content: null,
    height: 0,
    isHandler: false,
  },
  setBottomSheetVisible: (
    isVisible: boolean,
    content: BottomSheetContent | null,
    height: number,
    isHandler: boolean,
  ) => {
    set({bottomState: {isVisible, content, height, isHandler}});
  },
  removeBottomSheet: () => {
    set(state => ({bottomState: {...state.bottomState, isVisible: false}}));
  },
}));
