export interface ITodo {
  id: string; // 고유 ID
  title: string; // 제목
  completed: boolean; // 완료 여부

  created_at: string; // 생성 날짜

  color?: string;

  goalStartDate?: string; // 목표 시작일
  goalEndDate?: string; // 목표 종료일

  tags?: string[]; // 할 일 관련 태그 (범용성 있게 사용 가능)

  priority?: 'low' | 'medium' | 'high'; // 우선순위 설정 (선택 사항)

  // 추가적으로 일정에 맞춰 반복되는 할 일이나 완료된 날짜 등을 추적할 수 있는 필드
  completedDates?: string[]; // 완료된 날짜 (배열 형태로 여러 번 완료 가능)

  // 반복
  repeat?: 'daily' | 'weekly' | 'monthly' | 'yearly'; // 반복 주기 설정
  repeatStartDate?: string; // 반복 시작일
  repeatEndDate?: string; // 반복 종료일
  repeatInterval?: number; // 반복 간격

  repeatDays?: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
}
