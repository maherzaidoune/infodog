//  Created by react-native-create-bridge

package com.infodog.infodog;

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


    private static String LOW_POWER_MODE = "lowPowerMode";
    private static String BATTERY_STATE = "batteryState";
    private static String BATTERY_LEVEL= "batteryLevel";


    public InfoDogModule(ReactApplicationContext context) {
        // Pass in the context to the constructor and save it so you can emit events
        // https://facebook.github.io/react-native/docs/native-modules-android.html#the-toast-module
        super(context);
        reactContext = context;
    }



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
                Boolean powerSaveState = powerState.getBoolean(LOW_POWER_MODE);

//                if(!mLastBatteryState.equalsIgnoreCase(batteryState) || mLastPowerSaveState != powerSaveState) {
//                    sendEvent(getReactApplicationContext(), "InfoDog_powerStateDidChange", batteryState);
//                    mLastBatteryState = batteryState;
//                    mLastPowerSaveState = powerSaveState;
//                }

                if(mLastBatteryLevel != batteryLevel) {
                    emitDeviceEvent("InfoDog_batteryLevelDidChange", batteryLevel);

//                    if(batteryLevel <= .15) {
//                        sendEvent(getReactApplicationContext(), "InfoDog_batteryLevelIsLow", batteryLevel);
//                    }

                    mLastBatteryLevel = batteryLevel;
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

    @ReactMethod
    public void getBatteryLevel(Promise p) {
        p.resolve(getBatteryLevel());
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

        return powerState;
    }
}