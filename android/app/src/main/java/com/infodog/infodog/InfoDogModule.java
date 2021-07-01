//  Created by react-native-create-bridge

package com.infodog.infodog;

import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;
import android.os.PowerManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.jetbrains.annotations.Nullable;

import java.util.HashMap;
import java.util.Map;

import static android.os.BatteryManager.BATTERY_STATUS_CHARGING;
import static android.os.BatteryManager.BATTERY_STATUS_FULL;

@ReactModule(name = InfoDogModule.REACT_CLASS)
public class InfoDogModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "InfoDogModule";
    private static ReactApplicationContext reactContext = null;

    private BroadcastReceiver receiver;

    private double mLastBatteryLevel = -1;
    private String mLastBatteryState = "";
    private boolean mLastPowerSaveState = false;
    private Double mLastBatteryTemperature = 0d;


    private static String LOW_POWER_MODE = "lowPowerMode";
    private static String BATTERY_STATE = "batteryState";
    private static String BATTERY_LEVEL= "batteryLevel";
    private static String BATTERY_TECHNOLOGY= "batteryTechnology";
    private static String BATTERY_TEMPERATURE= "batteryTemperature";




    public InfoDogModule(ReactApplicationContext context) {
        // Pass in the context to the constructor and save it so you can emit events
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void getBatteryLevel(Promise p) {
        p.resolve(getBatteryLevel());
    }

    @ReactMethod
    public void getPowerState(Promise p) {
        p.resolve(getPowerState());
    }

    @ReactMethod
    public Boolean getPowerSaveMode() {
        return  mLastPowerSaveState;
    }

    @ReactMethod
    public void getUsedMemory(Promise p) { p.resolve(getUsedMemory()); }

    @ReactMethod
    public void getTotalMemory(Promise p) { p.resolve(getTotalMemory()); }

    @Override
    public void initialize() {
        super.initialize();
        IntentFilter filter = new IntentFilter();
        filter.addAction(Intent.ACTION_BATTERY_CHANGED);
        filter.addAction(Intent.ACTION_POWER_CONNECTED);
        filter.addAction(Intent.ACTION_POWER_DISCONNECTED);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
            filter.addAction(PowerManager.ACTION_POWER_SAVE_MODE_CHANGED);
        }

        receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                WritableMap powerState =  getPowerStateFromIntent(intent);

                if(powerState == null) {
                    return;
                }

                String batteryState = powerState.getString(BATTERY_STATE);
                Double batteryLevel = powerState.getDouble(BATTERY_LEVEL);
                Double batteryTemperature = powerState.getDouble(BATTERY_LEVEL);
                Boolean powerSaveState = powerState.getBoolean(LOW_POWER_MODE);

                if(mLastBatteryLevel != batteryLevel) {
                    emitDeviceEvent("InfoDog_batteryLevelDidChange", batteryLevel);
                    mLastBatteryLevel = batteryLevel;
                }

                if(mLastPowerSaveState != powerSaveState){
                    emitDeviceEvent( "InfoDog_powerSaveModeDidChange", powerSaveState);
                    mLastPowerSaveState = powerSaveState;
                }

                if(!mLastBatteryState.equalsIgnoreCase(batteryState) || mLastBatteryTemperature != batteryTemperature) {
                    emitDeviceEvent( "InfoDog_powerStateDidChange", powerState);
                    mLastBatteryState = batteryState;
                    mLastBatteryTemperature = batteryTemperature;
                }

            }
        };

        getReactApplicationContext().registerReceiver(receiver, filter);
    }

    @Override
    public String getName() {
        // Tell React the name of the module
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        return REACT_CLASS;
    }

    @Override
    public Map<String, Object> getConstants() {
        // Export any constants to be used in your native module
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        final Map<String, Object> constants = new HashMap<>();
        constants.put("INFODOG", "TEST");

        return constants;
    }

    private double getBatteryLevel(){
        Intent intent = getReactApplicationContext().registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
        WritableMap powerState = getPowerStateFromIntent(intent);

        if(powerState == null) {
            return 0;
        }

        return powerState.getDouble(BATTERY_LEVEL);
    }

    private WritableMap getPowerState(){
        Intent intent = getReactApplicationContext().registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
        return getPowerStateFromIntent(intent);
    }

    public double getTotalMemory() {
        ActivityManager.MemoryInfo manager = new ActivityManager.MemoryInfo();
        ActivityManager activityManager = (ActivityManager) getReactApplicationContext()
                .getSystemService(Context.ACTIVITY_SERVICE);
        if (activityManager != null) {
            activityManager.getMemoryInfo(manager);
            return (double) manager.totalMem;
        }
        System.err.println("Can't get total memory");
        return -1;
    }

    public double getUsedMemory() {
        ActivityManager.MemoryInfo manager = new ActivityManager.MemoryInfo();
        ActivityManager activityManager = (ActivityManager) getReactApplicationContext()
                .getSystemService(Context.ACTIVITY_SERVICE);
        if (activityManager != null) {
            activityManager.getMemoryInfo(manager);
            return (double) manager.totalMem - manager.availMem;
        }
        System.err.println("Can't get used memory");
        return -1;
    }

    private static void emitDeviceEvent(String eventName, @Nullable Object eventData) {
        // A method for emitting from the native side to JS
        // https://facebook.github.io/react-native/docs/native-modules-android.html#sending-events-to-javascript
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, eventData);
    }

    private WritableMap getPowerStateFromIntent (Intent intent) {
        if(intent == null) {
            return null;
        }

        int batteryLevel = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int batteryScale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
        int isPlugged = intent.getIntExtra(BatteryManager.EXTRA_PLUGGED, -1);
        int status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
        //TODO add support to retrive more info from battery
        float temperature = ((float) intent.getIntExtra(BatteryManager.EXTRA_TEMPERATURE, 0)) / 10;
        String technology = intent.getExtras().getString(BatteryManager.EXTRA_TECHNOLOGY);


        float batteryPercentage = batteryLevel / (float)batteryScale;

        String batteryState = "unknown";

        if(isPlugged == 0) {
            batteryState = "unplugged";
        } else if(status == BATTERY_STATUS_CHARGING) {
            batteryState = "charging";
        } else if(status == BATTERY_STATUS_FULL) {
            batteryState = "full";
        }

        PowerManager powerManager = (PowerManager)getReactApplicationContext().getSystemService(Context.POWER_SERVICE);
        boolean powerSaveMode = false;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP) {
            powerSaveMode = powerManager.isPowerSaveMode();
        }

        WritableMap powerState = Arguments.createMap();
        powerState.putString(BATTERY_STATE, batteryState);
        powerState.putDouble(BATTERY_LEVEL, batteryPercentage);
        powerState.putBoolean(LOW_POWER_MODE, powerSaveMode);
        powerState.putString(BATTERY_TECHNOLOGY, technology);
        powerState.putDouble(BATTERY_TEMPERATURE, temperature);


        return powerState;
    }
}
