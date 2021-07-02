import React from 'react';
import {View} from 'react-native';
import {colors} from '../../constants/colors';
import {useBatteryLevel, usePowerState} from '../../lib/InfoDog';
import Pie from '../Pie';
import {styles} from './styles';

const batteryState = {
  unknown: 'battery-unknown',
  unplugged: 'power-plug-off',
  charging: 'battery-charging',
  full: 'battery',
};

const threshold = 20;
const BatteryIndicator = () => {
  const batteryLevel = useBatteryLevel();
  const powerState = usePowerState();
  return (
    <View style={styles.container}>
      <Pie
        fill={batteryLevel}
        icon={batteryState[powerState.batteryState]}
        color={batteryLevel > threshold ? colors.safe : colors.danger}
      />
    </View>
  );
};
export default React.memo(BatteryIndicator);
