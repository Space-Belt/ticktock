declare module '*.svg' {
  import * as React from 'react';
  import {SvgProps} from 'react-native-svg';
  import {StyleProp, TextStyle} from 'react-native';

  interface ExtendedSvgProps extends SvgProps {
    style?: StyleProp<TextStyle>; // 👈 color 허용!
  }

  const content: React.FC<ExtendedSvgProps>;
  export default content;
}
