export type WeekdayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface WeekdayInfo {
  label: string; // 한글 요일
  color: string; // 해당 요일에 어울리는 색상 (파스텔 톤)
}

const WEEKDAY_MAP: Record<WeekdayKey, WeekdayInfo> = {
  mon: { label: '월', color: '#FFCDD2' }, // 연한 레드
  tue: { label: '화', color: '#FFE0B2' }, // 연한 오렌지
  wed: { label: '수', color: '#FFF9C4' }, // 연한 옐로우
  thu: { label: '목', color: '#C8E6C9' }, // 연한 그린
  fri: { label: '금', color: '#BBDEFB' }, // 연한 블루
  sat: { label: '토', color: '#D1C4E9' }, // 연한 퍼플
  sun: { label: '일', color: '#F8BBD0' }, // 연한 핑크
};

/**
 * 영어 약어(예: 'mon') 를 한글 요일(월화수목금토일)로 반환합니다.
 */
export const getWeekdayInfo = (day: WeekdayKey): WeekdayInfo => {
  return WEEKDAY_MAP[day];
};
