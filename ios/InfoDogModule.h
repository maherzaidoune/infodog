//
//  InfoDogModule.h
//  infodog
//
//  Created by Zaidoun on 6/30/21.
//
#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
#import <sys/utsname.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTLog.h>
@interface InfoDogModule : RCTEventEmitter <RCTBridgeModule>
@property (nonatomic) float lowBatteryThreshold;
@end
