import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  Text,
  View,
} from 'react-native';
import BatteryIndicator from './component/BatteryIndicator';
import MemoryIndicator from './component/MemoryIndicator';
import {colors} from './constants/colors';

const Main = () => {
  return (
    <SafeAreaView>
      <View style={{backgroundColor: colors.background, flex: 1}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <BatteryIndicator />
          <MemoryIndicator />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Main;
