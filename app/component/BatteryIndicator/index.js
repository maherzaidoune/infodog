import React from 'react';
import { View } from 'react-native';
import { colors } from '../../constants/colors';
import { useBatteryLevel, usePowerState } from '../../lib/InfoDog.ts';
import Pie from '../Pie';
import { styles } from './styles';

/**
 * Enum for batteryState values.
 * @readonly
 * @enum {String}
 */
const batteryState = {
  unknown: 'battery-unknown',
  unplugged: 'power-plug-off',
  charging: 'battery-charging',
  full: 'battery',
};

/** @constant {number} */
const threshold = 10;

/**
 * Component for shows a circular progress of battery level updated on battery level's change event.
 * @module
 */
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
export default BatteryIndicator;
