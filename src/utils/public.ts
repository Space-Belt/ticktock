import { Dimensions, Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
