import { useCallback, useEffect, useState } from 'react';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

export function useBatteryLevel(): number | null {
    const [batteryLevel, setBatteryLevel] = useState<number | null>(0);
  
    useEffect(() => {
      const setInitialValue = async () => {
        const initialValue: number = await getBatteryLevel();     
        if(initialValue === -1) setBatteryLevel(-1) // SIMULATOR
        else setBatteryLevel(Math.floor(initialValue * 100));
      };
  
      const onChange = (level: number) => {
        setBatteryLevel(Math.floor(level * 100));
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
//TODO: implement `InfoDog_usedMemoryDidChange` listener
export function useUsedMemory(): number | null {
  const [usedMemory, setUsedMemory] = useState<number | null>(null);

  useEffect(() => {
    const setInitialValue = async () => {
      const initialValue: number = await getUsedMemory();                      
      setUsedMemory(initialValue);
    };

    const onChange = (level: number) => {
      setUsedMemory(level);
    };

    setInitialValue();

    const subscription = deviceInfoEmitter.addListener(
      'InfoDog_usedMemoryDidChange',
      onChange
    );

    return () => subscription.remove();
  }, []);

  return usedMemory;
}

export function usePowerState(): Partial<PowerState> {
  const [powerState, setPowerState] = useState<Partial<PowerState>>({});

  useEffect(() => {
    const setInitialValue = async () => {
      const initialValue: Partial<PowerState> = await getPowerState();
      setPowerState(initialValue);
    };

    const onChange = (state: PowerState) => {
      setPowerState(state);
    };

    setInitialValue();

    const subscription = deviceInfoEmitter.addListener(
      'InfoDog_powerStateDidChange',
      onChange
    );

    return () => subscription.remove();
  }, []);

  return powerState;
}

//Android ONLY
export function usePowerSaveState(): Boolean {
  const [powerSaveState, setPowerSaveState] = useState<Boolean>(false);

  useEffect(() => {
    const setInitialValue = () => {
      const initialValue: Boolean = getPowerSaveState();                      
      setPowerSaveState(initialValue);
    };

    const onChange = (level: Boolean) => {
      setPowerSaveState(level);
    };

    setInitialValue();

    const subscription = deviceInfoEmitter.addListener(
      'InfoDog_powerSaveModeDidChange',
      onChange
    );

    return () => subscription.remove();
  }, []);

  return powerSaveState;
}

//
export const getBatteryLevel = async (): Promise<number> => {
  return await InfoDogModule.getBatteryLevel();
}

export const getPowerState = async (): Promise<PowerState> => {
  return await InfoDogModule.getPowerState();
}

export const getPowerSaveState = (): Boolean => {
  return InfoDogModule.getPowerSaveMode();
}

export const getTotalMemory = async (): Promise<number> => {
  return await InfoDogModule.getTotalMemory();
}

export const getUsedMemory = async (): Promise<number> => {
  return await InfoDogModule.getUsedMemory();
}

//
const {InfoDogModule} = NativeModules;
const deviceInfoEmitter = new NativeEventEmitter(InfoDogModule);
type BatteryState = 'unknown' | 'unplugged' | 'charging' | 'full';
interface PowerState {
  batteryLevel: number;
  batteryState: BatteryState;
  lowPowerMode: boolean;
  batteryTechnology?: string;
  batteryTemperature?: number;
}