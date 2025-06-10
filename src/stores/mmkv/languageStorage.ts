import {storage} from './storage';

const LANGUAGE_KEY = 'app_language';

export type LanguageType = 'ko' | 'en' | 'ja' | 'zh-Hans';

export const getSelectedLanguage = (): LanguageType => {
  const lang = storage.getString(LANGUAGE_KEY);
  if (lang === 'en' || lang === 'ja' || lang === 'zh-Hans') return lang;
  return 'ko';
};

export const setSelectedLanguage = (lang: LanguageType) => {
  storage.set(LANGUAGE_KEY, lang);
};
