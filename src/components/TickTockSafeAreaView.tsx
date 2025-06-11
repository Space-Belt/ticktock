import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

interface TickTockSafeAreaViewProps extends SafeAreaViewProps {
  flex?: boolean;
  children: React.ReactNode;
}

const TickTockSafeAreaView = ({ children, flex = true, ...props }: TickTockSafeAreaViewProps) => {
  return (
    <SafeAreaView style={styles.wrapper(flex)} {...props}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  wrapper: (flex: boolean) => ({
    flex: flex ? 1 : 0,
  }),
}));

export default TickTockSafeAreaView;
