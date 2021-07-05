//
//  InfoDogModule.m
//  infodog
//
//  Created by Zaidoun on 6/30/21.
//

#import <mach/mach.h>
#import <Foundation/Foundation.h>
#import "InfoDogModule.h"
#import <DeviceCheck/DeviceCheck.h>
#include <ifaddrs.h>
#include <arpa/inet.h>

@implementation InfoDogModule
{
    bool hasListeners;
}

// To export a module named InfoDogModule
RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"InfoDog_batteryLevelDidChange", @"InfoDog_powerStateDidChange",@"InfoDog_powerSaveModeDidChange"];
}

- (void)startObserving {
    hasListeners = YES;
}

- (void)stopObserving {
    hasListeners = NO;
}

- (id)init
{
    if ((self = [super init])) {
        [[UIDevice currentDevice] setBatteryMonitoringEnabled:YES];

        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(batteryLevelDidChange:)
                                                     name:UIDeviceBatteryLevelDidChangeNotification
                                                   object: nil];
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(powerStateDidChange:)
                                                     name:UIDeviceBatteryStateDidChangeNotification
                                                   object: nil];
//        [[NSNotificationCenter defaultCenter] addObserver:self
//                                                 selector:@selector(powerStateDidChange:)
//                                                     name:NSProcessInfoPowerStateDidChangeNotification
//                                                   object: nil];
    }

    return self;
}

- (void) batteryLevelDidChange:(NSNotification *)notification {
    if (!hasListeners) {
        return;
    }

    float batteryLevel = [self.powerState[@"batteryLevel"] floatValue];
    [self sendEventWithName:@"InfoDog_batteryLevelDidChange" body:@(batteryLevel)];
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

RCT_EXPORT_METHOD(getPowerState:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(self.powerState);
}

RCT_EXPORT_METHOD(getBatteryLevel:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.getBatteryLevel));
}


- (BOOL) isBatteryCharging {
    return [self.powerState[@"batteryState"] isEqualToString:@"charging"];
}

RCT_EXPORT_METHOD(isBatteryCharging:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.isBatteryCharging));
}


- (bool) isPowerSaveEnabled {
    return self.powerState[@"lowPowerMode"];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getPowerSaveMode) {
  return @(self.isPowerSaveEnabled);
}


- (unsigned long) getUsedMemory {
    struct task_basic_info info;
    mach_msg_type_number_t size = sizeof(info);
    kern_return_t kerr = task_info(mach_task_self(),
                                   TASK_BASIC_INFO,
                                   (task_info_t)&info,
                                   &size);
    if (kerr != KERN_SUCCESS) {
      return -1;
    }

    return (unsigned long)info.resident_size;
}

RCT_EXPORT_METHOD(getUsedMemory:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    unsigned long usedMemory = self.getTotalMemory - self.freeMemory;
    if (usedMemory == -1) {
        reject(@"fetch_error", @"task_info failed", nil);
    } else {
        resolve(@(usedMemory));
    }
}

- (double) getTotalMemory {
    return [NSProcessInfo processInfo].physicalMemory;
}

RCT_EXPORT_METHOD(getTotalMemory:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve(@(self.getTotalMemory));
}

- (double) freeMemory {
    // Find the total amount of free memory
  @try {
        // Set up the variables
        double totalMemory = 0.00;
    vm_statistics_data_t vmStats;
    mach_msg_type_number_t infoCount = HOST_VM_INFO_COUNT;
    kern_return_t kernReturn = host_statistics(mach_host_self(), HOST_VM_INFO, (host_info_t)&vmStats, &infoCount);

    if(kernReturn != KERN_SUCCESS) {
      return -1;
    }

      totalMemory = vm_page_size * vmStats.free_count;
      if (totalMemory <= 0) {
          // Error, invalid memory value
          return -1;
      }

      return totalMemory;
  }
  @catch (NSException *exception) {
        // Error
        return -1;
  }
}


- (NSDictionary *) powerState {

    return @{
             @"batteryLevel": @([UIDevice currentDevice].batteryLevel),
             @"batteryState": [@[@"unknown", @"unplugged", @"charging", @"full"] objectAtIndex: [UIDevice currentDevice].batteryState],
             @"lowPowerMode": @([NSProcessInfo processInfo].isLowPowerModeEnabled),
             };
}

@end


