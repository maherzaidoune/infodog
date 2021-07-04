import { StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    width: WIDTH / 2,
    height: WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
