import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingEnd: 20,
    backgroundColor: colors.secondary,
    marginBottom: 10,
  },
  update: {
    flexDirection: 'row',
  },
  currentConfig: {
    fontSize: 16,
    paddingEnd: 5,
  },
});
