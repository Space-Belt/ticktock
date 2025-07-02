import { Text, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet } from 'react-native-unistyles';
import moment from 'moment';
import ToggleButton from './ToggleButton';

type Props = {
  isStartToEnd: boolean;
  goalStartDate: string | null | undefined;
  goalEndDate: string | null | undefined;
  setGoalStartDate: Dispatch<SetStateAction<string | null | undefined>>;
  setGoalEndDate: Dispatch<SetStateAction<string | null | undefined>>;
  setSelectedDates: Dispatch<SetStateAction<string[]>>;
  setIsStartToEnd: Dispatch<SetStateAction<boolean>>;
  displayedMarkedDates: any;
};

const CalendarModalComponent = ({
  isStartToEnd,
  goalStartDate,
  goalEndDate,
  setGoalStartDate,
  setGoalEndDate,
  setSelectedDates,
  setIsStartToEnd,
  displayedMarkedDates,
}: Props) => {
  const today = moment().format('YYYY-MM-DD');

  const handleStartDayToEndDayPress = (day: DateData) => {
    const clicked = day.dateString;

    // 1) startDate가 아직 없으면, 무조건 시작 날짜로 설정
    if (!goalStartDate) {
      setGoalStartDate(clicked);
      setGoalEndDate(null);
      return;
    }

    // 2) startDate만 있고 endDate가 없을 때
    if (goalStartDate && !goalEndDate) {
      // 2-1) 같은 날을 또 클릭하면 → 초기화
      if (clicked === goalStartDate) {
        setGoalStartDate(null);
        setGoalEndDate(null);
      }
      // 2-2) 클릭한 날짜가 기존 start보다 과거면 → start를 갱신
      else if (clicked < goalStartDate) {
        setGoalStartDate(clicked);
      }
      // 2-3) 클릭한 날짜가 이후면 → end로 설정
      else {
        setGoalEndDate(clicked);
      }
      return;
    }

    // 3) 이미 start와 end가 모두 설정된 상태에서 다시 클릭하면 → 새로운 start로 재설정
    setGoalStartDate(clicked);
    setGoalEndDate(null);
  };

  const handleDayPress = (day: any) => {
    const date = day.dateString;
    setSelectedDates(prevSelectedDates =>
      prevSelectedDates.includes(date)
        ? prevSelectedDates.filter(d => d !== date)
        : [...prevSelectedDates, date],
    );
  };
  return (
    <>
      <Calendar
        style={styles.calendarStyle}
        current={today}
        onDayPress={day => {
          if (isStartToEnd) {
            handleStartDayToEndDayPress(day);
          } else {
            handleDayPress(day);
          }
        }}
        theme={styles.calendarStyles}
        markedDates={displayedMarkedDates}
      />
      <ToggleButton
        title="시작 종료 전체선택"
        setToggleStatus={setIsStartToEnd}
        toggleStatus={isStartToEnd}
      />
    </>
  );
};

export default CalendarModalComponent;

const styles = StyleSheet.create(theme => ({
  calendarStyle: {
    backgroundColor: theme.colors.background.primary,
  },
  calendarStyles: {
    backgroundColor: theme.colors.background.primary,
    calendarBackground: theme.colors.background.primary,
    textSectionTitleColor: theme.colors.background.primary,
    // selectedDayBackgroundColor: '#00adf5',
    // selectedDayTextColor: '#ffffff',
    // todayTextColor: '#00adf5',
    // dayTextColor: '#2d4150',
    // textDisabledColor: '#dd99ee',
  },
}));
