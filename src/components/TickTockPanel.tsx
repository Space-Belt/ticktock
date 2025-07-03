import {
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { Font } from '@styles/font';
import { useLayout } from '@hooks/useLayout';

type Props = {
  panelList: {
    title: string;
  }[];
  selectedPanel: number;
  handleChangePanel: (index: number) => void;
  duration?: number;
};

const TickTockPanel = ({ panelList, selectedPanel, handleChangePanel, duration }: Props) => {
  const tabChange = useSharedValue(0);

  const [layout, onLayout] = useLayout();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (layout.width !== 0) {
        let tempNumber = selectedPanel;
        tabChange.value = withTiming(layout.width * tempNumber, {
          duration: duration ? duration : 500,
        });
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [layout.width, selectedPanel]);

  const tabAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: tabChange.value,
    };
  });

  const tabBoxWidth: StyleProp<ViewStyle> = {
    width: `${100 / panelList.length}%`,
  };

  React.useEffect(() => {
    return () => {
      if (handleChangePanel) {
        handleChangePanel(0);
      }
    };
  }, []);

  return (
    <View style={styles.tabContainer}>
      <Animated.View
        onLayout={onLayout}
        style={[tabBoxWidth, styles.animateTabBox, tabAnimatedStyle]}
      />
      {panelList.map((tabEl, index) => (
        <View style={[tabBoxWidth, styles.tabBox]} key={`${tabEl}_${index}`}>
          <Pressable
            style={styles.buttonArea}
            onPress={() => {
              handleChangePanel(index);
            }}>
            <Animated.View style={[styles.tabStyle]}>
              <Text style={[styles.tabText, styles.panelStyle(index == selectedPanel)]}>
                {tabEl.title}
              </Text>
            </Animated.View>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.6,
    borderBottomColor: theme.colors.button.success,
  },
  panelStyle: (selected: boolean) => ({
    color: selected ? theme.colors.text.primary : theme.colors.text.secondary,
    ...(selected ? Font.bodySmallExtraBold : Font.bodySmall),
  }),
  animateTabBox: {
    position: 'absolute',
    height: 43,
    borderBottomWidth: 1.5,
    borderBottomColor: theme.colors.text.link,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  buttonArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  tabBox: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabStyle: { alignItems: 'center' },
  tabText: {
    ...Font.bodySmall,
    color: theme.colors.text.primary,
    textAlign: 'center',
    lineHeight: 22,
  },
}));
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 8,
//     marginBottom: 16,
//   },

export default TickTockPanel;
