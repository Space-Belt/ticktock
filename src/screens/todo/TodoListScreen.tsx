import CalendarIcon from '@assets/images/icon_calendar.svg';
import TickTockPanel from '@components/TickTockPanel';
import { ITodo } from '@entities/todo';
import { LoggedInStackNavigationProp } from '@navigations/loggedIn/LoggedInStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { Font } from '@styles/font';
import { SCREEN_WIDTH } from '@utils/public';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import RepeatLists from './components/RepeatLists';
import TodayLists from './components/TodayLists';
import TodoListHeader from './components/TodoListHeader';

type Props = {};

const TodoListScreen = (props: Props) => {
  const navigation = useNavigation<LoggedInStackNavigationProp>();

  const [selectedPanel, setSelectedPanel] = React.useState(0);
  const handleChangePanel = (index: number) => {
    setSelectedPanel(index);
  };

  const [todoList, setTodoList] = React.useState<ITodo[]>([]);

  const translateX = useSharedValue(0);
  const tempTranslateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onStart(event => {
      tempTranslateX.value = translateX.value;
    })
    .onUpdate(event => {
      const next = tempTranslateX.value + event.translationX;
      translateX.value = Math.min(Math.max(next, -SCREEN_WIDTH), 0);
    })
    .onEnd(() => {
      if (translateX.value < -SCREEN_WIDTH / 3) {
        translateX.value = withSpring(-SCREEN_WIDTH);
        runOnJS(handleChangePanel)(1);
      } else {
        translateX.value = withSpring(0);
        runOnJS(handleChangePanel)(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  React.useEffect(() => {
    translateX.value = withSpring(selectedPanel === 0 ? 0 : -SCREEN_WIDTH);
  }, [selectedPanel]);

  return (
    <View style={styles.container}>
      <TodoListHeader
        handleNavigation={() => navigation.goBack()}
        children={
          <Pressable
            style={styles.calendarWrapper}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={styles.calendarText}>달력</Text>
            <CalendarIcon />
          </Pressable>
        }
      />
      <TickTockPanel
        panelList={[{ title: '할일' }, { title: '반복' }]}
        selectedPanel={selectedPanel}
        handleChangePanel={handleChangePanel}
      />
      <ScrollView>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.pagerContainer, animatedStyle]}>
            <View style={styles.page}>
              <TodayLists />
            </View>
            <View style={styles.page}>
              <RepeatLists />
            </View>
          </Animated.View>
        </GestureDetector>
      </ScrollView>
    </View>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create(theme => ({
  container: {
    // flex: 1,
  },
  calendarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  calendarText: {
    ...Font.bodySmallExtraBold,
    color: theme.colors.text.primary,
  },
  gestureHandlerRootStyle: {
    flex: 1,
  },
  pagerContainer: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 2, // 탭 개수만큼 넓이 확보
  },
  page: {
    width: SCREEN_WIDTH, // 각 페이지는 화면 한 폭
    flex: 1,
  },
}));
