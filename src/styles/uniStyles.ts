import { darkTheme, lightTheme, UnistylesThemeType } from './colors';

import { StyleSheet } from 'react-native-unistyles';

type AppThemes = {
  dark: UnistylesThemeType;
  light: UnistylesThemeType;
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  settings: {
    adaptiveThemes: true,
  },
});
