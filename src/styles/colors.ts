export interface UnistylesThemeType {
  colors: {
    background: {
      primary: string;
    };
    text: {
      primary: string;
    };
  };
}

export const lightTheme: UnistylesThemeType = {
  colors: {
    background: {
      primary: '#FFFBEC',
    },
    text: {
      primary: '#2A2A2A',
    },
  },
};

export const darkTheme: UnistylesThemeType = {
  colors: {
    background: {
      primary: '#2A2A2A',
    },
    text: {
      primary: '#FFFBEC',
    },
  },
};

export const light = {
  colors: {
    background: lightTheme.colors.background,
    text: lightTheme.colors.text,
  },
};

export const dark = {
  colors: {
    background: darkTheme.colors.background,
    text: darkTheme.colors.text,
  },
};
