import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import BatteryIndicator from './component/BatteryIndicator';
import BatteryLevelBar from './component/BatteryLevelBar';
import BatteryLevelLine from './component/BatteryLevelLine';
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
        <View style={{flex: 2, justifyContent: 'space-evenly'}}>
          <BatteryLevelBar />
          <BatteryLevelLine />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Main;
