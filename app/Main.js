import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  Text,
  View,
} from 'react-native';
import Bar from './component/Bar';
import BatteryIndicator from './component/BatteryIndicator';
import MemoryIndicator from './component/MemoryIndicator';
import {colors} from './constants/colors';

const Main = () => {
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={{backgroundColor: colors.background, flex: 1}}>
      <View style={{backgroundColor: colors.background, flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <BatteryIndicator />
          <MemoryIndicator />
        </View>
        <View style={{flex: 1}}>
          <Bar />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Main;
