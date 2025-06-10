import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const STORAGE_KEYS = {
  language: 'app_language',
};
