import CloudIcon from '@assets/images/icon_cloud.svg';
import RainIcon from '@assets/images/icon_rainy.svg';
import SnowIcon from '@assets/images/icon_snow.svg';
import SunIcon from '@assets/images/icon_sunny.svg';
import ThunderIcon from '@assets/images/icon_thunder.svg';
import WindIcon from '@assets/images/icon_wind.svg';

type WeatherConditions = {
  [key: number]: {
    name: string;
    icon: React.FC;
  };
};

export const WEATHER_CONDITIONS: WeatherConditions = {
  200: { name: '가벼운 비를 동반한 천둥구름', icon: ThunderIcon },
  201: { name: '비를 동반한 천둥구름', icon: ThunderIcon },
  202: { name: '폭우를 동반한 천둥구름', icon: ThunderIcon },
  210: { name: '약한 천둥구름', icon: ThunderIcon },
  211: { name: '천둥구름', icon: ThunderIcon },
  212: { name: '강한 천둥구름', icon: ThunderIcon },
  221: { name: '불규칙적 천둥구름', icon: ThunderIcon },
  230: { name: '약한 연무를 동반한 천둥구름', icon: WindIcon },
  231: { name: '연무를 동반한 천둥구름', icon: WindIcon },
  232: { name: '강한 안개비를 동반한 천둥구름', icon: WindIcon },

  701: { name: '박무', icon: WindIcon },
  711: { name: '연기', icon: WindIcon },
  731: { name: '모래 먼지', icon: WindIcon },
  741: { name: '안개', icon: WindIcon },

  771: { name: '돌풍', icon: WindIcon },
  781: { name: '토네이도', icon: WindIcon },

  300: { name: '가벼운 안개비', icon: RainIcon },
  301: { name: '안개비', icon: RainIcon },
  302: { name: '강한 안개비', icon: RainIcon },
  310: { name: '가벼운 적은비', icon: RainIcon },
  311: { name: '적은비', icon: RainIcon },
  312: { name: '강한 적은비', icon: RainIcon },
  313: { name: '소나기와 안개비', icon: RainIcon },
  314: { name: '강한 소나기와 안개비', icon: RainIcon },
  321: { name: '소나기', icon: RainIcon },

  500: { name: '약한 비', icon: RainIcon },
  501: { name: '중간 비', icon: RainIcon },
  502: { name: '강한 비', icon: RainIcon },
  503: { name: '매우 강한 비', icon: RainIcon },
  504: { name: '극심한 비', icon: RainIcon },
  511: { name: '우박', icon: RainIcon },

  520: { name: '약한 소나기 비', icon: RainIcon },
  521: { name: '소나기 비', icon: RainIcon },
  522: { name: '강한 소나기 비', icon: RainIcon },
  531: { name: '불규칙적 소나기 비', icon: RainIcon },

  600: { name: '가벼운 눈', icon: SnowIcon },
  601: { name: '눈', icon: SnowIcon },
  602: { name: '강한 눈', icon: SnowIcon },
  611: { name: '진눈깨비', icon: SnowIcon },
  612: { name: '소나기 진눈깨비', icon: SnowIcon },
  615: { name: '약한 비와 눈', icon: SnowIcon },
  616: { name: '비와 눈', icon: SnowIcon },
  620: { name: '약한 소나기 눈', icon: SnowIcon },
  621: { name: '소나기 눈', icon: SnowIcon },
  622: { name: '강한 소나기 눈', icon: SnowIcon },

  800: { name: '구름 한 점 없는 맑은 하늘', icon: SunIcon },
  801: { name: '약간의 구름이 낀 하늘', icon: SunIcon },
  802: { name: '드문드문 구름이 낀 하늘', icon: SunIcon },
  803: { name: '구름이 거의 없는 하늘', icon: SunIcon },
  804: { name: '구름으로 뒤덮인 흐린 하늘', icon: SunIcon },

  900: { name: '토네이도', icon: CloudIcon },
  901: { name: '태풍', icon: CloudIcon },
  902: { name: '허리케인', icon: CloudIcon },
  903: { name: '한랭', icon: CloudIcon },
  904: { name: '고온', icon: CloudIcon },
  905: { name: '바람부는', icon: CloudIcon },
  906: { name: '우박', icon: CloudIcon },

  951: { name: '바람이 거의 없는', icon: CloudIcon },
  952: { name: '약한 바람', icon: CloudIcon },
  953: { name: '부드러운 바람', icon: CloudIcon },
  954: { name: '중간 세기 바람', icon: CloudIcon },
  955: { name: '신선한 바람', icon: CloudIcon },
  956: { name: '센 바람', icon: CloudIcon },
};

export interface IWeatherData {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  name: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: Array<{
    [key: string]: any;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
}
