import { useCallback, useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';


const {InfoDogModule} = NativeModules;

const getBatteryLevel = async (): Promise<number> => {
    return InfoDogModule.getBatteryLevel();
}

const deviceInfoEmitter = new NativeEventEmitter(InfoDogModule);

//Get real time batteryLevel updates
export function useBatteryLevel(): number | null {
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  
    useEffect(() => {
      const setInitialValue = async () => {
        const initialValue: number = await getBatteryLevel();                
        setBatteryLevel(initialValue);
      };
  
      const onChange = (level: number) => {
        setBatteryLevel(level);
      };
  
      setInitialValue();
  
      const subscription = deviceInfoEmitter.addListener(
        'InfoDog_batteryLevelDidChange',
        onChange
      );
  
      return () => subscription.remove();
    }, []);
  
    return batteryLevel;
  }