import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import BatteryIndicator from './component/BatteryIndicator';
import BatteryLevelBar from './component/BatteryLevelBar';
import BatteryLevelLine from './component/BatteryLevelLine';
import MemoryIndicator from './component/MemoryIndicator';
import {styles} from './styles';

const Main = () => {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.indicators}>
        <BatteryIndicator />
        <MemoryIndicator />
      </View>
      <View style={styles.charts}>
        <BatteryLevelBar />
        <BatteryLevelLine />
      </View>
    </SafeAreaView>
  );
};

export default Main;
