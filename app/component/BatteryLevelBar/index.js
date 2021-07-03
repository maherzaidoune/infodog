import React, {useEffect, useState, useRef} from 'react';
import {useBatteryLevel} from '../../lib/InfoDog';
import Bar from '../Bar';

const BatteryLevelBar = ({}) => {
  const batteryLevel = useBatteryLevel();
  const [data, setData] = useState([0]);
  const [frequence, setFrequence] = useState(1000);
  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      //update chart with latest battery level returned from native code;
      setData([...data, batteryLevel]);
    }, frequence);
    return () => clearInterval(interval.current);
  });

  const formatLabel = label => `${label}%`;

  useEffect(() => {
    //update data on batterylevel changes
  }, [batteryLevel]);

  return <Bar data={data} formatLabel={formatLabel} />;
};

export default BatteryLevelBar;
