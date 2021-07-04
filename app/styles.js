import {StyleSheet} from 'react-native';
import {colors} from './constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  indicators: {
    flex: 1,
    flexDirection: 'row',
  },
  charts: {
    flex: 3,
    justifyContent: 'space-evenly',
  },
});
