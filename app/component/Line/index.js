import React from 'react';
import { View } from 'react-native';
import {
  LineChart, Grid, YAxis,
} from 'react-native-svg-charts';
import { colors } from '../../constants/colors';
import { styles } from './styles';

/**
 * Generic Line chart component
 * @module
 */
const Line = ({ data = [], formatLabel = (label) => label }) => {
  const Yaxis = data.map((i) => Math.floor(i));

  return (
    <View style={styles.container}>
      <YAxis
        data={Yaxis}
        contentInset={{
          top: 6, bottom: 10, left: 10, right: 0,
        }}
        numberOfTicks={10}
        svg={{
          fill: 'grey',
          fontSize: 10,
        }}
        formatLabel={formatLabel}
      />
      <View style={[styles.chartContainer]}>
        <LineChart
          style={[styles.barStyle]}
          data={data}
          svg={{
            stroke: colors.main,
            strokeLinejoin: 'round',
            strokeWidth: 2,
            strokeLinecap: 'round',
          }}
          contentInset={{ top: 0, left: 5, right: 0 }}
        >
          <Grid />
        </LineChart>
      </View>
    </View>
  );
};

export default React.memo(Line);
