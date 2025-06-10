export interface UnistylesThemeType {
  colors: {
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      quinary?: string;
      senary?: string;
      septenary?: string;
      octonary?: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      quinary: string;
      senary?: string;
      septenary?: string;
      octonary?: string;
    };
  };
}

export const lightTheme: UnistylesThemeType = {
  colors: {
    background: {
      primary: '#ffffff',
      secondary: '#f4f4f4',
      tertiary: '#222127',
      quaternary: '#e3e0ff',
      quinary: '#ef3636',
      senary: '#e4e4e4',
      septenary: '#000000',
      octonary: '#7566ff',
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff',
      tertiary: '#222127',
      quaternary: '#383838',
      quinary: '#878787',
      senary: '#bcbcbc',
      septenary: '#7566ff',
      octonary: '#5e5e5e',
    },
  },
};

export const darkTheme: UnistylesThemeType = {
  colors: {
    background: {
      primary: '#161618',
      secondary: '#2b2b30',
      tertiary: '#7566ff',
      quaternary: '#484850',
      quinary: '#ef3636',
      senary: '#e4e4e4',
      septenary: '#65656f',
      octonary: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bcbcbc',
      tertiary: '#ffffff',
      quaternary: '#7b7b85',
      quinary: '#c8c2ff',
      septenary: '#7566ff',
      senary: '#484850',
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
