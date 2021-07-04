import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { colors } from '../../constants/colors';
import ExtraInfo from './ExtraInfo';

const index = ({ fill = 0, icon, color }) => (
  <AnimatedCircularProgress
    size={120}
    width={15}
    fill={fill}
    rotation={0}
    lineCap="round"
    tintColor={color}
    backgroundColor={colors.secondary}
  >
    {() => <ExtraInfo fill={fill} icon={icon} color={color} />}
  </AnimatedCircularProgress>
);

export default React.memo(index);
