import TickTockMainStackHeader from '@components/TickTockMainStackHeader';
import TickTockTextInput from '@components/TickTockTextInput';
import TickTockToggleButton from '@components/TickTockToggleButton';
import { BASIC_TODO_DAY, BASIC_WEEK } from '@entities/todo';
import { LoggedInStackNavigationProp } from '@navigations/loggedIn/LoggedInStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { useModal } from '@stores/zustand/modal';
import { Font } from '@styles/font';
import moment from 'moment';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { StyleSheet } from 'react-native-unistyles';

import AlarmOffIcon from '@assets/images/icon_alarm_off.svg';
import AlarmOnIcon from '@assets/images/icon_alarm_on.svg';
import TimeIcon from '@assets/images/icon_time.svg';
import StartEndTimePicker from './components/StartEndTimePicker';
import ToggleButton from './components/ToggleButton';

const AddTodoScreen = () => {
  const date = new Date();
  const today = moment().format('YYYY-MM-DD');
  const navigation = useNavigation<LoggedInStackNavigationProp>();
  const handleBackNavigtion = () => {
    navigation.goBack();
  };

  const [title, setTitle] = React.useState('');

  const [color, setColor] = React.useState('#000000');
  const [priority, setPriority] = React.useState(0);

  const [goalStartDate, setGoalStartDate] = React.useState<string | null>();
  const [goalEndDate, setGoalEndDate] = React.useState<string | null>();

  const [selectedDates, setSelectedDates] = React.useState<string[]>([]);
  const handleDayPress = (day: any) => {
    const date = day.dateString;
    setSelectedDates(prevSelectedDates =>
      prevSelectedDates.includes(date)
        ? prevSelectedDates.filter(d => d !== date)
        : [...prevSelectedDates, date],
    );
  };
  const handleStartDayToEndDayPress = (day: DateData) => {
    const date = day.dateString;
    if (!goalStartDate) {
      setGoalStartDate(date);
    } else if (!goalEndDate) {
      if (date < goalStartDate) {
        setGoalStartDate(date);
        setGoalEndDate(null);
      } else {
        setGoalEndDate(date);
      }
    } else {
      setGoalStartDate(date);
      setGoalEndDate(null);
    }
  };

  const markedDates = selectedDates.reduce((acc: any, date) => {
    acc[date] = { selected: true, selectedColor: 'blue' };
    return acc;
  }, {});
  const generateMarkedDates = () => {
    const marked: any = {};

    if (goalStartDate) {
      marked[goalStartDate] = { selected: true, selectedColor: 'blue' };
    }

    if (goalEndDate) {
      marked[goalEndDate] = { selected: true, selectedColor: 'blue' };
    }

    if (goalStartDate && goalEndDate) {
      let start = new Date(goalStartDate);
      let end = new Date(goalEndDate);
      while (start <= end) {
        const dateString = start.toISOString().split('T')[0];
        marked[dateString] = { selected: true, selectedColor: 'blue' };
        start.setDate(start.getDate() + 1);
      }
    }

    return marked;
  };

  const setModalState = useModal(state => state.setModalState);
  const removeModal = useModal(state => state.removeModal);

  const [isToday, setIsToday] = React.useState<boolean>(true);

  const [basicDayValue, setBasicDayValue] = React.useState<number>(0);

  const [isTimeSet, setIsTimeSet] = React.useState<boolean>(false);
  const [isStartTimeModal, setIsStartTimeModal] = React.useState<boolean>(false);
  const [selectedStartTime, setSelectedStartTime] = React.useState<Date>(new Date());
  const [isEndTimeModal, setIsEndTimeModal] = React.useState<boolean>(false);
  const [selectedEndTime, setSelectedEndTime] = React.useState<Date>(new Date());

  const [isRepeat, setIsRepeat] = React.useState<boolean>(false);
  const [isEveryDay, setIsEveryDay] = React.useState<boolean>(false);

  const [isStartToEnd, setIsStartToEnd] = React.useState<boolean>(false);

  const [repeat, setRepeat] = React.useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [repeatStartDate, setRepeatStartDate] = React.useState();
  const [repeatEndDate, setRepeatEndDate] = React.useState();
  const [repeatInterval, setRepeatInterval] = React.useState(1);
  const [repeatDays, setRepeatDays] = React.useState<
    ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[]
  >([]);

  const [tags, setTags] = React.useState<string[]>([]);

  const [settingAlarm, setSettingAlarm] = React.useState<boolean>(false);

  const handleBasicDay = (value: number) => {
    setBasicDayValue(value);
  };

  const toggleButton = (
    setValue: React.Dispatch<React.SetStateAction<boolean>>,
    callBack?: () => void,
  ) => {
    setValue(prev => !prev);
    callBack && callBack();
  };

  const handleRepeatWeek = (value: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun') => {
    if (repeatDays.includes(value)) {
      setRepeatDays(prev => prev.filter(el => el !== value));
    } else {
      setRepeatDays(prev => [...prev, value]);
    }
  };

  React.useEffect(() => {
    console.log(selectedDates);
  }, [selectedDates]);
  React.useEffect(() => {
    if (!isStartToEnd) {
      setGoalStartDate(null);
      setGoalEndDate(null);
    } else {
      setSelectedDates([]);
    }
  }, [isStartToEnd]);

  return (
    <View style={styles.container}>
      <TickTockMainStackHeader handleNavigation={handleBackNavigtion} />
      <TickTockTextInput
        textSubChildren={
          <Pressable
            onPress={() => {
              setSettingAlarm(prev => !prev);
            }}>
            {settingAlarm ? <AlarmOnIcon /> : <AlarmOffIcon />}
          </Pressable>
        }
        label="제목"
        value={title}
        onChangeText={setTitle}
        placeholder="제목"
      />
      {!isRepeat && !isEveryDay && (
        <View style={styles.basicTodoWrapper}>
          {BASIC_TODO_DAY.map((basicEl, basicIndex) => (
            <Pressable
              key={basicEl.value}
              onPress={() => handleBasicDay(basicEl.value)}
              style={styles.basicTodoElement(basicDayValue === basicEl.value)}>
              <Text>{basicEl.name}</Text>
            </Pressable>
          ))}
        </View>
      )}
      {basicDayValue === 5 && (
        <View>
          <ToggleButton
            title="시작 종료 전체선택"
            setToggleStatus={setIsStartToEnd}
            toggleStatus={isStartToEnd}
          />

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
            markedDates={isStartToEnd ? generateMarkedDates() : markedDates}
          />
        </View>
      )}

      <ToggleButton title="시간 설정" setToggleStatus={setIsTimeSet} toggleStatus={isTimeSet} />

      {isTimeSet && (
        <>
          <Text style={styles.categoryStyle}>시작 시간</Text>
          <Pressable
            onPress={() => setIsStartTimeModal(prev => !prev)}
            style={styles.timePressBtnStyle}>
            <View>
              <Text>
                {selectedStartTime ? moment(selectedStartTime).format('HH:mm') : '시작 시간 선택'}
              </Text>
            </View>
            <TimeIcon />
          </Pressable>
          <Text style={styles.categoryStyle}>종료 시간</Text>
          <Pressable
            onPress={() => setIsEndTimeModal(prev => !prev)}
            style={styles.timePressBtnStyle}>
            <View>
              <Text>
                {selectedEndTime ? moment(selectedEndTime).format('HH:mm') : '시작 시간 선택'}
              </Text>
            </View>
            <TimeIcon />
          </Pressable>
        </>
      )}

      {!isRepeat && (
        <ToggleButton
          title="매일 반복 일정 여부"
          setToggleStatus={setIsEveryDay}
          toggleStatus={isEveryDay}
        />
      )}
      {!isEveryDay && (
        <ToggleButton
          title="매주 반복 일정 여부"
          setToggleStatus={setIsRepeat}
          toggleStatus={isRepeat}
        />
      )}

      {isRepeat && (
        <>
          <View style={styles.repeatDaysWrapper}>
            {BASIC_WEEK.map((weekEl, weekIndex) => (
              <Pressable
                key={weekEl.value}
                onPress={() => handleRepeatWeek(weekEl.value)}
                style={styles.repeatStyle(repeatDays.includes(weekEl.value))}>
                <Text>{weekEl.name}</Text>
              </Pressable>
            ))}
          </View>
        </>
      )}
      <ToggleButton
        title="알림 설정"
        setToggleStatus={setSettingAlarm}
        toggleStatus={settingAlarm}
      />

      <StartEndTimePicker
        isStartTimeModal={isStartTimeModal}
        selectedStartTime={selectedStartTime}
        isEndTimeModal={isEndTimeModal}
        selectedEndTime={selectedEndTime}
        setIsStartTimeModal={setIsStartTimeModal}
        setSelectedStartTime={setSelectedStartTime}
        setIsEndTimeModal={setIsEndTimeModal}
        setSelectedEndTime={setSelectedEndTime}
      />
    </View>
  );
};

export default AddTodoScreen;

const styles = StyleSheet.create(theme => ({
  container: {
    paddingHorizontal: 16,
  },
  calendarStyle: {
    backgroundColor: theme.colors.background.primary,
    height: 350,
  },
  basicTodoWrapper: {
    flexDirection: 'row',
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
  basicTodoElement: (isSelected: boolean) => ({
    width: 55,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: isSelected
      ? theme.colors.background.secondary
      : theme.colors.background.overlay,
    marginBottom: 16,
  }),
  isRepeatWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  repeatDaysWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  repeatStyle: (isSelected: boolean) => ({
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderColor: isSelected ? theme.colors.border.secondary : theme.colors.border.primary,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isSelected ? theme.colors.background.overlay : theme.colors.background.primary,
  }),
  repeatTextStyle: (isSelected: boolean) => ({
    fontSize: 12,
    color: isSelected ? theme.colors.text.primary : theme.colors.text.secondary,
    fontFamily: isSelected ? 'NanumSquare Neo ExtraBold' : 'NanumSquare Neo Regular',
  }),
  categoryStyle: {
    ...Font.bodyMediumBold,
  },

  timePressBtnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginBottom: 16,
  },

  dateTimeWrapper: {
    marginVertical: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#282829',
    borderRadius: 8,
  },
  dateTimeInnerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectBtnTextStyle: {
    ...Font.bodyMediumBold,
    color: theme.colors.text.primary,
  },
}));
