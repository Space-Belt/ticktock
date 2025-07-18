import TickTockMainStackHeader from '@components/TickTockMainStackHeader';
import TickTockTextInput from '@components/TickTockTextInput';
import { BASIC_TODO_DAY, BASIC_WEEK, PRIORITY_LIST, REPEAT_LIST } from '@entities/todo';
import { LoggedInStackNavigationProp } from '@navigations/loggedIn/LoggedInStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { useModal } from '@stores/zustand/modal';
import { Font } from '@styles/font';
import moment from 'moment';
import React from 'react';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import AlarmOffIcon from '@assets/images/icon_alarm_off.svg';
import AlarmOnIcon from '@assets/images/icon_alarm_on.svg';
import TimeIcon from '@assets/images/icon_time.svg';
import TickTockButton from '@components/TickTockButton';
import { SCREEN_WIDTH } from '@utils/public';
import { runOnJS } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ColorPicker, {
  HueSlider,
  OpacitySlider,
  Panel1,
  Preview,
  Swatches,
} from 'reanimated-color-picker';
import CalendarModalComponent from './components/CalendarModalComponent';
import DayAndRepeatPicker from './components/DayAndRepeatPicker';
import SelectColor from './components/SelectColor';
import StartEndTimePicker from './components/StartEndTimePicker';
import ToggleButton from './components/ToggleButton';
import DatePicker from 'react-native-date-picker';

const BOTTOM_BUTTON_HEIGHT = 45;

const AddTodoScreen = () => {
  const { bottom } = useSafeAreaInsets();

  const { setModalState, removeModal } = useModal();
  const navigation = useNavigation<LoggedInStackNavigationProp>();
  const handleBackNavigtion = () => {
    navigation.goBack();
  };

  const [title, setTitle] = React.useState('');

  const [color, setColor] = React.useState('#F9C9D2');

  const [priority, setPriority] = React.useState<number>(0);

  const [showCalendar, setShowCalendar] = React.useState<boolean>(false);
  const [goalStartDate, setGoalStartDate] = React.useState<string | null>();
  const [goalEndDate, setGoalEndDate] = React.useState<string | null>();

  const [selectedDates, setSelectedDates] = React.useState<string[]>([]);

  const markedDates = React.useMemo(() => {
    return selectedDates.reduce((acc: any, date) => {
      acc[date] = { selected: true, selectedColor: 'blue' };
      return acc;
    }, {});
  }, [selectedDates]);

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

  const [isStartToEnd, setIsStartToEnd] = React.useState<boolean>(false);

  const [showEndDate, setShowEndDate] = React.useState<boolean>(false);
  const [endDate, setEndDate] = React.useState<Date>(new Date());

  const displayedMarkedDates = React.useMemo(() => {
    return isStartToEnd ? generateMarkedDates() : markedDates;
  }, [isStartToEnd, goalStartDate, goalEndDate, markedDates]);

  const [basicDayValue, setBasicDayValue] = React.useState<number>(0);

  const [isTimeSet, setIsTimeSet] = React.useState<boolean>(false);
  const [isStartTimeModal, setIsStartTimeModal] = React.useState<boolean>(false);
  const [selectedStartTime, setSelectedStartTime] = React.useState<Date>(new Date());
  const [isEndTimeModal, setIsEndTimeModal] = React.useState<boolean>(false);
  const [selectedEndTime, setSelectedEndTime] = React.useState<Date>(new Date());

  const [isRepeat, setIsRepeat] = React.useState<boolean>(false);

  const [repeatYear, setRepeatYear] = React.useState<boolean>(false);
  const [isEveryDay, setIsEveryDay] = React.useState<boolean>(false);

  const [repeat, setRepeat] = React.useState<string>('daily');

  const [repeatDays, setRepeatDays] = React.useState<
    ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[]
  >([]);

  const [settingAlarm, setSettingAlarm] = React.useState<boolean>(false);

  const handleRepeatWeek = (value: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun') => {
    if (repeatDays.includes(value)) {
      setRepeatDays(prev => prev.filter(el => el !== value));
    } else {
      setRepeatDays(prev => [...prev, value]);
    }
  };

  const onModalClose = () => {
    setShowCalendar(false);
    removeModal();
  };

  React.useEffect(() => {
    if (!showCalendar) return;
    setModalState(
      true,
      '날짜 선택',
      '',
      <CalendarModalComponent
        isStartToEnd={isStartToEnd}
        goalStartDate={goalStartDate}
        goalEndDate={goalEndDate}
        setGoalStartDate={setGoalStartDate}
        setGoalEndDate={setGoalEndDate}
        setSelectedDates={setSelectedDates}
        setIsStartToEnd={setIsStartToEnd}
        displayedMarkedDates={displayedMarkedDates}
        repeatYear={repeatYear}
        setRepeatYear={setRepeatYear}
      />,
      '선택',
      '',
      onModalClose,
      onModalClose,
    );
    setBasicDayValue(-2);
  }, [showCalendar, displayedMarkedDates, isStartToEnd, goalStartDate, goalEndDate]);

  React.useEffect(() => {
    if (!isStartToEnd) {
      setGoalStartDate(null);
      setGoalEndDate(null);
    } else {
      setSelectedDates([]);
    }
  }, [isStartToEnd]);

  React.useEffect(() => {
    if (basicDayValue === -1) {
      setBasicDayValue(0);
    }
  }, [basicDayValue]);

  return (
    <View style={styles.wholeContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
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
          <DayAndRepeatPicker
            selectNumberDataObject={{
              value: basicDayValue,
              setValue: setBasicDayValue,
              mappingData: BASIC_TODO_DAY,
            }}
            secondChild={
              <TouchableOpacity
                onPress={() => {
                  setShowCalendar(prev => !prev);
                }}
                style={styles.basicTodoElement(showCalendar)}>
                <Text>달력선택</Text>
              </TouchableOpacity>
            }
          />
        )}
        {basicDayValue !== 5 && !isRepeat && (
          <ToggleButton
            title="매일 반복"
            setToggleStatus={setIsEveryDay}
            toggleStatus={isEveryDay}
          />
        )}

        {basicDayValue === 5 && !isEveryDay && (
          <View>
            {!isStartToEnd && (
              <>
                <Text style={styles.repeatCategory}>반복</Text>
                <DayAndRepeatPicker
                  selectStringDataObject={{
                    value: repeat,
                    setValue: setRepeat,
                    mappingData: REPEAT_LIST,
                  }}
                />
              </>
            )}
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
                <Text style={styles.timeTextStyle}>
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
                <Text style={styles.timeTextStyle}>
                  {selectedEndTime ? moment(selectedEndTime).format('HH:mm') : '시작 시간 선택'}
                </Text>
              </View>
              <TimeIcon />
            </Pressable>
          </>
        )}
        {!isEveryDay && (
          <ToggleButton
            title="매주 반복 일정"
            setToggleStatus={setIsRepeat}
            toggleStatus={isRepeat}
          />
        )}

        {isRepeat && (
          <View>
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

            <TouchableOpacity
              style={styles.endButtonStyle}
              onPress={() => {
                setShowEndDate(prev => !prev);
              }}>
              <Text style={styles.endDateTextStyle}>
                종료일: {moment(endDate).format('YYYY-MM-DD')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <SelectColor
          selectedColor={color}
          setSelectedColor={setColor}
          setColorPicker={() => {
            setModalState(
              true,
              '색 선택',
              '',
              <ColorPicker
                value={color}
                onCompleteJS={colorObj => {
                  runOnJS(setColor)(colorObj.hex);
                }}>
                <Preview />
                <Panel1 />
                <HueSlider />
                <OpacitySlider />
                <Swatches />
              </ColorPicker>,
              '선택',
              '',
              () => {
                removeModal();
              },
              () => {
                removeModal();
              },
            );
          }}
        />
        <Text style={[styles.categoryStyle, styles.priorityStyle]}>우선도(선택)</Text>
        <DayAndRepeatPicker
          selectNumberDataObject={{
            value: priority,
            setValue: setPriority,
            mappingData: PRIORITY_LIST,
          }}
        />
      </ScrollView>
      <View style={styles.buttonWrapper(bottom)}>
        <TickTockButton title="챌린지 생성" onPress={() => {}} width={SCREEN_WIDTH - 32} />
      </View>
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
      <DatePicker
        modal
        title={'종료일을 선택하세요'}
        date={endDate}
        onConfirm={(select: Date) => {
          setEndDate(select);
        }}
        onCancel={() => {
          setShowEndDate(false);
        }}
        mode={'date'}
        confirmText="설정"
        cancelText="취소"
        open={showEndDate}
      />
    </View>
  );
};

export default AddTodoScreen;

const styles = StyleSheet.create(theme => ({
  wholeContainer: {
    paddingBottom: 100,
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainerStyle: {
    flex: 1,
    // marginBottom: bottom,
  },
  calendarStyle: {
    backgroundColor: theme.colors.background.primary,
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
    width: 60,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: theme.colors.background.accent,
    // backgroundColor: isSelected
    //   ? theme.colors.background.secondary
    //   : theme.colors.background.overlay,
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
  priorityStyle: {
    marginBottom: 6,
    marginTop: 16,
  },
  timeTextStyle: {
    ...Font.bodySmallBold,
  },
  timePressBtnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginBottom: 16,
    paddingVertical: 10,
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
  buttonWrapper: (bottom: number) => ({
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    marginHorizontal: 16,
    bottom: bottom,
  }),
  repeatCategory: {
    ...Font.bodyMediumBold,
    marginVertical: 16,
  },

  whiteBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 2,
    overflow: 'hidden',
  },
  colorPickerStyle: {
    borderRadius: 20,
  },
  confirmBtn: {
    backgroundColor: theme.colors.button.primary,
    paddingVertical: 20,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  confirmBtnText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700',
  },
  endButtonStyle: {
    backgroundColor: theme.colors.button.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginBototm: 10,
  },
  endDateTextStyle: {
    ...Font.bodyMediumBold,
    color: theme.colors.text.secondary,
    flex: 1,
  },
}));
