/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  Text,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import { toMB } from './app/utils/helpers';
import {
  getTotalMemory,
  getUsedMemory,
  useBatteryLevel,
  usePowerSaveState,
  usePowerState,
} from './InfoDog';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const batteryLevel = useBatteryLevel();
  const powerstate = usePowerState();
  const powersave = usePowerSaveState();
  const [totalMemory, setTotalMemory] = useState(0);
  const [usedMemory, setUsedMemory] = useState(0);

  useEffect(() => {
    async function updateData() {
      const totalMem = await getTotalMemory();
      setTotalMemory(toMB(totalMem));
      const usedMem = await getUsedMemory();
      setUsedMemory(toMB(usedMem));
    }
    updateData();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{backgroundColor: 'white', flex: 1}}>
        <Text style={{color: '#000'}}>{batteryLevel}</Text>
        <Text style={{color: '#000'}}>
          {usedMemory}/{totalMemory}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
