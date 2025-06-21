import { Alert, Text, View } from 'react-native';
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

const AddTodoScreen = () => {
  const navigation = useNavigation<LoggedInStackNavigationProp>();
  const handleBackNavigtion = () => {
    navigation.goBack();
  };

  const [title, setTitle] = React.useState('');

  const [color, setColor] = React.useState('#000000');
  const [priority, setPriority] = React.useState(0);
  const [goalStartDate, setGoalStartDate] = React.useState();
  const [goalEndDate, setGoalEndDate] = React.useState();

  const setModalState = useModal(state => state.setModalState);
  const removeModal = useModal(state => state.removeModal);

  const [isRepeat, setIsRepeat] = React.useState(false);
  const [repeat, setRepeat] = React.useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [repeatStartDate, setRepeatStartDate] = React.useState();
  const [repeatEndDate, setRepeatEndDate] = React.useState();
  const [repeatInterval, setRepeatInterval] = React.useState(1);
  const [repeatDays, setRepeatDays] = React.useState<
    ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[]
  >([]);

  const [tags, setTags] = React.useState<string[]>([]);

  return (
    <View>
      <TickTockMainStackHeader handleNavigation={handleBackNavigtion} />
      <TickTockTextInput label="할일" value={title} onChangeText={setTitle} placeholder="할일" />
      <TickTockButton
        title="날짜선택"
        onPress={() => {
          setModalState(
            true,
            '날짜선택',
            '',
            <Calendar
              // Customize the appearance of the calendar
              style={styles.calendarStyle}
              // Specify the current date
              current={'2012-03-01'}
              // Callback that gets called when the user selects a day
              onDayPress={day => {
                console.log('selected day', day);
              }}
              theme={styles.calendarStyles}
              // Mark specific dates as marked
              markedDates={{
                '2012-03-01': { selected: true, marked: true, selectedColor: 'blue' },
                '2012-03-02': { selected: true, marked: true, selectedColor: 'blue' },
                '2012-03-03': { selected: true, marked: true, selectedColor: 'blue' },
              }}
            />,
            '죽기',
            '죽기',
            () => {
              removeModal();
            },
            () => {
              removeModal();
            },
          );
        }}
      />
    </View>
  );
};

export default AddTodoScreen;

const styles = StyleSheet.create(theme => ({
  calendarStyle: {
    backgroundColor: theme.colors.background.primary,
    height: 350,
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
