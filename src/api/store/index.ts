import {StoreMenuData} from '@entities/store';
import apiClient from '../apiClient';

type Language = 'ko' | 'en' | 'ja' | 'zh-Hans';

export const storeQueryKeys = {
  getStoreInfo: (language: Language) => ['getStoreInfo', language],
};

export const getStoreInfo = async (
  language: Language,
): Promise<StoreMenuData> => {
  try {
    const response = await apiClient.get<StoreMenuData>(`/menu/${language}`);
    console.log(response);
    return response.data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
