import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { useBatteryLevel } from '../../lib/InfoDog.ts';
import Bar from '../Bar';
import { styles } from '../BatteryLevelLine/styles';
import ChartHelper from '../ChartHelper';

/**
 * Component for shows a Bar chart of real time battery level's update in `frequency` seconds.
 * @module
 */
const BatteryLevelBar = () => {
  const batteryLevel = useBatteryLevel();
  const [data, setData] = useState([0]);
  const [frequency, setFrequency] = useState(1000);
  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      // update chart with latest battery level returned from native code;
      setData([...data, batteryLevel]);
    }, frequency);
    return () => clearInterval(interval.current);
  });

  const formatLabel = (label) => `${label}%`;

  return (
    <View style={styles.container}>
      <ChartHelper
        isTrackingEnabled={batteryLevel > 0}
        frequency={frequency / 1000}
        update={setFrequency}
      />
      <Bar data={data} formatLabel={formatLabel} />
    </View>
  );
};

export default BatteryLevelBar;
