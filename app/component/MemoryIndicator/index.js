import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {colors} from '../../constants/colors';
import {useUsedMemory, getTotalMemory} from '../../lib/InfoDog';
import Pie from '../Pie';
import {styles} from './styles';

const MemoryIndicator = () => {
  const usedMemory = useUsedMemory();
  const totalMemory = useRef(null);
  useEffect(() => {
    (async function IIFE() {
      totalMemory.current = await getTotalMemory();
    })();
  }, []);

  return (
    <View style={styles.container}>
      {totalMemory.current && (
        <Pie
          fill={Math.floor((usedMemory / totalMemory.current) * 100)}
          color={colors.danger}
          icon={'memory'}
        />
      )}
    </View>
  );
};
export default React.memo(MemoryIndicator);
