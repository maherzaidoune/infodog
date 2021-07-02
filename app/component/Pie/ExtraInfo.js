import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './styles';

export default function ExtraInfo({fill, powerState, color}) {
  return (
    <View style={styles.infoContainer}>
      <Icon name={powerState} size={21} color={color} />
      <Text style={styles.infoText}>{fill}%</Text>
    </View>
  );
}
