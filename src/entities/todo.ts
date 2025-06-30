export interface ITodo {
  id: string; // 고유 ID
  title: string; // 제목
  completed: boolean; // 완료 여부

  created_at: string; // 생성 날짜

  color?: string;

  goalStartDate?: string; // 목표 시작일
  goalEndDate?: string; // 목표 종료일

  tags?: string[]; // 할 일 관련 태그 (범용성 있게 사용 가능)

  priority?: 1 | 2 | 3 | 4 | 5; // 우선순위 설정 (선택 사항)

  // 추가적으로 일정에 맞춰 반복되는 할 일이나 완료된 날짜 등을 추적할 수 있는 필드
  completedDates?: string[]; // 완료된 날짜 (배열 형태로 여러 번 완료 가능)

  // 반복
  repeat?: 'daily' | 'weekly' | 'monthly' | 'yearly'; // 반복 주기 설정
  repeatStartDate?: string; // 반복 시작일
  repeatEndDate?: string; // 반복 종료일

  repeatDays?: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
}

export const BASIC_TODO_DAY = [
  {
    name: '오늘',
    value: 0,
  },
  {
    name: '내일',
    value: 1,
  },
  {
    name: '모레',
    value: 2,
  },
  {
    name: '글피',
    value: 3,
  },
  {
    name: '그글피',
    value: 4,
  },
  {
    name: '달력',
    value: 5,
  },
];

export const PRIORITY_LIST = [
  {
    name: '많이중요',
    value: 1,
  },
  {
    name: '중요',
    value: 2,
  },
  {
    name: '보통',
    value: 3,
  },
  {
    name: '덜중요',
    value: 4,
  },
  {
    name: '안중요',
    value: 5,
  },
];

export const REPEAT_LIST = [
  {
    name: '매월',
    value: 'monthly',
  },
  {
    name: '매년',
    value: 'yearly',
  },
];

export const BASIC_WEEK: {
  name: string;
  value: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
}[] = [
  {
    name: '일',
    value: 'sun',
  },
  {
    name: '월',
    value: 'mon',
  },
  {
    name: '화',
    value: 'tue',
  },
  {
    name: '수',
    value: 'wed',
  },
  {
    name: '목',
    value: 'thu',
  },
  {
    name: '금',
    value: 'fri',
  },
  {
    name: '토',
    value: 'sat',
  },
];

export const TODO_COLORS: string[] = [
  '#F9C9D2', // 파스텔 핑크
  '#A7C7E7', // 파스텔 블루
  '#B8E0D2', // 파스텔 민트
  '#C5A0D1', // 파스텔 라벤더
  '#F4E29E', // 파스텔 옐로우
  '#F6B29C', // 파스텔 오렌지
  '#A8D8B9', // 파스텔 그린
];
