import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { colors } from '../../constants/colors';
import { getUsedMemory, getTotalMemory } from '../../lib/InfoDog.ts';
import Pie from '../Pie';
import { styles } from './styles';

/** @constant {number} */
const frequency = 1000;

/**
 * Component for shows a circular progress of
 * memory comsumption updated each 1s change event.
 * @module
 */

const MemoryIndicator = () => {
  const [usedMemory, setUsedMemory] = useState(0);
  const totalMemory = useRef(null);
  const interval = useRef(null);
  useEffect(() => {
    (async function IIFE() {
      totalMemory.current = await getTotalMemory();
    }());
    interval.current = setInterval(() => {
      // requesting setUsedMemory level each 1000 second
      (async function IIFE() {
        const memory = await getUsedMemory();
        if (totalMemory.current) {
          setUsedMemory(Math.floor((memory / totalMemory.current) * 100));
        }
      }());
    }, frequency);
    return () => clearInterval(interval.current);
  }, []);

  return (
    <View style={styles.container}>
      <Pie fill={usedMemory} color={colors.danger} icon="memory" />
    </View>
  );
};
export default React.memo(MemoryIndicator);
