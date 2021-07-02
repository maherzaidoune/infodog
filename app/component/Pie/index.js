import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {colors} from '../../constants/colors';
import ExtraInfo from './ExtraInfo';
import {styles} from './styles';

const index = ({fill = 0, icon, color}) => {
  return (
    <AnimatedCircularProgress
      size={120}
      width={15}
      fill={fill}
      rotation={0}
      lineCap={'round'}
      tintColor={color}
      backgroundColor={colors.secondary}
      onAnimationComplete={() => console.log('onAnimationComplete')}>
      {() => <ExtraInfo fill={fill} icon={icon} color={color} />}
    </AnimatedCircularProgress>
  );
};

export default React.memo(index);
