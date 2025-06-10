/**
 * @format
 */

import './src/services/api/apiClient';
// ? Unistyles configuration을 불러오기 위해 import 필요 (RootStackNavigator의 import문 위에 위치해야 합니다.)
import './src/styles/uniStyles';

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';

AppRegistry.registerComponent(appName, () => App);
