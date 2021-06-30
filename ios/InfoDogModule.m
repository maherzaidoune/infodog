//
//  InfoDogModule.m
//  infodog
//
//  Created by Zaidoun on 6/30/21.
//

#import <Foundation/Foundation.h>
#import "InfoDogModule.h"
#import <DeviceCheck/DeviceCheck.h>


@implementation InfoDogModule
{
    bool hasListeners;
}

// To export a module named InfoDogModule
RCT_EXPORT_MODULE();

- (void)startObserving {
    hasListeners = YES;
}

- (void)stopObserving {
    hasListeners = NO;
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"InfoDog_batteryLevelDidChange", @"InfoDog_batteryLevelIsLow", @"InfoDog_powerStateDidChange"];
}

_lowBatteryThreshold = 0.20;
- (void) batteryLevelDidChange:(NSNotification *)notification {
    if (!hasListeners) {
        return;
    }

    float batteryLevel = [self.powerState[@"batteryLevel"] floatValue];
    [self sendEventWithName:@"InfoDog_batteryLevelDidChange" body:@(batteryLevel)];

//    if (batteryLevel <= _lowBatteryThreshold) {
//        [self sendEventWithName:@"InfoDog_batteryLevelIsLow" body:@(batteryLevel)];
//    }
}

- (void) powerStateDidChange:(NSNotification *)notification {
    if (!hasListeners) {
        return;
    }
    [self sendEventWithName:@"InfoDog_powerStateDidChange" body:self.powerState];
}

- (float) getBatteryLevel {
    return [self.powerState[@"batteryLevel"] floatValue];
}

RCT_EXPORT_METHOD(getBatteryLevel:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.getBatteryLevel));
}

//- (unsigned long) getUsedMemory {
//    struct task_basic_info info;
//    mach_msg_type_number_t size = sizeof(info);
//    kern_return_t kerr = task_info(mach_task_self(),
//                                   TASK_BASIC_INFO,
//                                   (task_info_t)&info,
//                                   &size);
//    if (kerr != KERN_SUCCESS) {
//      return -1;
//    }
//
//    return (unsigned long)info.resident_size;
//}

//RCT_EXPORT_METHOD(getUsedMemory:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
//    unsigned long usedMemory = self.getUsedMemory;
//    if (usedMemory == -1) {
//        reject(@"fetch_error", @"task_info failed", nil);
//    } else {
//        resolve(@(usedMemory));
//    }
//}

- (NSDictionary *) powerState {
#if RCT_DEV && (!TARGET_IPHONE_SIMULATOR) && !TARGET_OS_TV
    if ([UIDevice currentDevice].isBatteryMonitoringEnabled != true) {
        RCTLogWarn(@"Battery monitoring is not enabled. "
                   "You need to enable monitoring with `[UIDevice currentDevice].batteryMonitoringEnabled = TRUE`");
    }
#endif
#if RCT_DEV && TARGET_IPHONE_SIMULATOR && !TARGET_OS_TV
    if ([UIDevice currentDevice].batteryState == UIDeviceBatteryStateUnknown) {
        RCTLogWarn(@"Battery state `unknown` and monitoring disabled, this is normal for simulators and tvOS.");
    }
#endif

    return @{
#if TARGET_OS_TV
             @"batteryLevel": @1,
             @"batteryState": @"full",
#else
             @"batteryLevel": @([UIDevice currentDevice].batteryLevel),
             @"batteryState": [@[@"unknown", @"unplugged", @"charging", @"full"] objectAtIndex: [UIDevice currentDevice].batteryState],
             @"lowPowerMode": @([NSProcessInfo processInfo].isLowPowerModeEnabled),
#endif
             };
}

@end
