import React, {useEffect, useState, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import {BarChart, Grid, YAxis} from 'react-native-svg-charts';
import {colors} from '../../constants/colors';
import {getBatteryLevel, useBatteryLevel} from '../../lib/InfoDog';
import {styles} from './styles';

const Bar = () => {
  const batteryLevel = useBatteryLevel();
  const [data, setData] = useState([0]);
  const [frequence, setFrequence] = useState(1000);
  const interval = useRef(null);
  const scrollview = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      (async function IIFE() {
        const updatedData = await getBatteryLevel();
        setData([...data, updatedData]);
        scrollview.current.scrollToEnd({animated: true});
      })();
    }, frequence);
    return () => clearInterval(interval.current);
  });

  useEffect(() => {
    console.log('batteryLevel = ', batteryLevel);
  }, [batteryLevel]);

  return (
    <ScrollView
      ref={scrollview}
      horizontal={true}
      contentContainerStyle={{padding: 20}}>
      <View style={[styles.container, {width: data.length * 20}]}>
        <BarChart
          style={[styles.barStyle, {width: data.length * 20}]}
          data={data}
          svg={{fill: colors.main}}
          contentInset={{top: 0, left: 0}}>
          <Grid />
        </BarChart>
      </View>
    </ScrollView>
  );
};

export default React.memo(Bar);
