import { StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingStart: 4,
    paddingEnd: 4,
  },
  chartContainer: {
    height: WIDTH / 2,
    width: WIDTH,
  },
  scrollContainer: {
    // padding: 20,
  },
  barStyle: {
    height: WIDTH / 2,
  },
});
