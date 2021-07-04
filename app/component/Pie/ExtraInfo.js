import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';

/**
 * Information to be shown inside the Circular progreee
 * @module
 */
export default function ExtraInfo({ fill, icon, color }) {
  return (
    <View style={styles.infoContainer}>
      {icon && <Icon name={icon} size={21} color={color} />}
      <Text style={styles.infoText}>
        {fill}
        %
      </Text>
    </View>
  );
}
