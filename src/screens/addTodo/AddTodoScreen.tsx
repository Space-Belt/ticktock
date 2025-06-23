import { Alert, Pressable, Text, View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native-unistyles';
import TickTockMainStackHeader from '@components/TickTockMainStackHeader';
import { useNavigation } from '@react-navigation/native';
import { LoggedInStackNavigationProp } from '@navigations/loggedIn/LoggedInStackNavigator';
import TickTockTextInput from '@components/TickTockTextInput';
import ColorPicker from 'reanimated-color-picker';
import TickTockButton from '@components/TickTockButton';
import { useModal } from '@stores/zustand/modal';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import TickTockToggleButton from '@components/TickTockToggleButton';
import { Font } from '@styles/font';
import { BASIC_TODO_DAY, BASIC_WEEK } from '@entities/todo';
import { SCREEN_WIDTH } from '@utils/public';

const AddTodoScreen = () => {
  const today = moment().format('YYYY-MM-DD');
  const navigation = useNavigation<LoggedInStackNavigationProp>();
  const handleBackNavigtion = () => {
    navigation.goBack();
  };

  const [title, setTitle] = React.useState('');

  const [color, setColor] = React.useState('#000000');
  const [priority, setPriority] = React.useState(0);

  // '2012-03-01': { selected: true, marked: true, selectedColor: 'blue' },
  // '2012-03-02': { selected: true, marked: true, selectedColor: 'blue' },
  // '2012-03-03': { selected: true, marked: true, selectedColor: 'blue' },

  const [goalStartDate, setGoalStartDate] = React.useState();
  const [goalEndDate, setGoalEndDate] = React.useState();

  const setModalState = useModal(state => state.setModalState);
  const removeModal = useModal(state => state.removeModal);

  const [isToday, setIsToday] = React.useState<boolean>(true);

  const [basicDayValue, setBasicDayValue] = React.useState<number>(0);

  const [isRepeat, setIsRepeat] = React.useState<boolean>(false);
  const [repeat, setRepeat] = React.useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [repeatStartDate, setRepeatStartDate] = React.useState();
  const [repeatEndDate, setRepeatEndDate] = React.useState();
  const [repeatInterval, setRepeatInterval] = React.useState(1);
  const [repeatDays, setRepeatDays] = React.useState<
    ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[]
  >([]);

  const [timeset, setTimeSet] = React.useState<string>();

  const [tags, setTags] = React.useState<string[]>([]);

  const handleIsRepeatToggle = () => {
    setIsRepeat(prev => !prev);
  };
  const handleIsTodayToggle = () => {
    setIsToday(prev => !prev);
  };
  const handleBasicDayToggle = (value: number) => {
    setBasicDayValue(value);
  };
  const handleRepeatWeek = (value: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun') => {
    if (repeatDays.includes(value)) {
      setRepeatDays(prev => prev.filter(el => el !== value));
    } else {
      setRepeatDays(prev => [...prev, value]);
    }
  };

  return (
    <View style={styles.container}>
      <TickTockMainStackHeader handleNavigation={handleBackNavigtion} />
      <TickTockTextInput label="제목" value={title} onChangeText={setTitle} placeholder="제목" />
      <View style={styles.basicTodoWrapper}>
        {BASIC_TODO_DAY.map((basicEl, basicIndex) => (
          <Pressable
            key={basicIndex}
            onPress={() => handleBasicDayToggle(basicEl.value)}
            style={styles.basicTodoElement(basicDayValue === basicEl.value)}>
            <Text>{basicEl.name}</Text>
          </Pressable>
        ))}
      </View>
      {basicDayValue === 5 && (
        <View>
          <Calendar
            style={styles.calendarStyle}
            current={today}
            onDayPress={day => {
              console.log('selected day', day);
            }}
            theme={styles.calendarStyles}
            markedDates={{}}
          />
        </View>
      )}
      <View style={styles.isRepeatWrapper}>
        <Text style={styles.categoryStyle}>반복 여부</Text>
        <TickTockToggleButton value={isRepeat} onValueChange={handleIsRepeatToggle} />
      </View>

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
    backgroundColor: isSelected ? theme.colors.background.overlay : theme.colors.background.card,
  }),
  repeatTextStyle: (isSelected: boolean) => ({
    fontSize: 12,
    color: isSelected ? theme.colors.text.primary : theme.colors.text.secondary,
    fontFamily: isSelected ? 'NanumSquare Neo ExtraBold' : 'NanumSquare Neo Regular',
  }),
  categoryStyle: {
    ...Font.bodyMediumBold,
  },
}));
