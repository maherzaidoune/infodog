import React, {useState} from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import Dialog from 'react-native-dialog';
import {colors} from '../../constants/colors';
import {Strings} from '../../constants/Strings';
import {styles} from './styles';

const ChartHelper = ({frequency = 1, update = () => {}}) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [value, setValue] = useState(frequency);
  const updateFrequency = newFrequency => {
    setDialogVisible(false);
    if (!newFrequency || isNaN(newFrequency)) {
      return;
    }
    update(newFrequency * 1000);
  };
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.1}
          onPress={() => setDialogVisible(true)}>
          <Text>{`every ${frequency} seconds`}</Text>
        </TouchableOpacity>
      </View>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>{Strings.UPDATE_FREQUENCY_TITLE}</Dialog.Title>
        <Dialog.Input
          keyboardType={'number-pad'}
          placeholder={'Frequency in seconds'}
          autoFocus={Platform.OS === 'ios'}
          onChangeText={text => setValue(text)}
        />
        <Dialog.Button
          label={Strings.CANCEL}
          onPress={() => setDialogVisible(false)}
        />
        <Dialog.Button
          label={Strings.UPDATE}
          onPress={() => updateFrequency(value)}
        />
      </Dialog.Container>
    </>
  );
};

export default React.memo(ChartHelper);
