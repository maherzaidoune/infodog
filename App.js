/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  Text,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useBatteryLevel} from './InfoDog';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const batteryLevel = useBatteryLevel();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{backgroundColor: 'white', flex: 1}}>
        <Text style={{color: '#000'}}>{batteryLevel}</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
