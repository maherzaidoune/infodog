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
import Pie from './component/Pie';
import {colors} from './constants/colors';
import {useBatteryLevel} from './lib/InfoDog';

const Main = () => {
  return (
    <SafeAreaView>
      <View style={{backgroundColor: colors.background, flex: 1}}>
        <BatteryIndicator />
      </View>
    </SafeAreaView>
  );
};

export default Main;
