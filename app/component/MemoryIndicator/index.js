import React, {useState, useEffect, useRef} from 'react';
import {View} from 'react-native';
import {colors} from '../../constants/colors';
import {getUsedMemory, getTotalMemory} from '../../lib/InfoDog';
import Pie from '../Pie';
import {styles} from './styles';

const MemoryIndicator = () => {
  const [usedMemory, setUsedMemory] = useState(0);
  const totalMemory = useRef(null);
  const interval = useRef(null);
  useEffect(() => {
    (async function IIFE() {
      totalMemory.current = await getTotalMemory();
    })();
    interval.current = setInterval(() => {
      //requesting setUsedMemory level each 1000 second
      (async function IIFE() {
        const memory = await getUsedMemory();
        if (totalMemory.current) {
          setUsedMemory(Math.floor((memory / totalMemory.current) * 100));
        }
      })();
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  return (
    <View style={styles.container}>
      <Pie fill={usedMemory} color={colors.danger} icon={'memory'} />
    </View>
  );
};
export default React.memo(MemoryIndicator);
