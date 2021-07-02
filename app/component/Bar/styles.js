import {StyleSheet, Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  barStyle: {
    height: WIDTH / 2,
    padding: 5,
  },
});
