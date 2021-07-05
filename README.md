# InfoDog Documentation

## Getting started

This project is a Device health application

**Setup**

```shell
git clone
cd infodog
yarn
```
**Link assets**

```shell
react-native link
```
For iOS, install Cocoapods and run command

```shell
cd ios && pod install
```

## Start Metro Bundler

  ```shell
  npm start
  ```

## Running on Android

  ```shell
  npx react-native run-android
  adb reverse tcp:8081 tcp:8081   # required to ensure the Android app can access the Packager
  ```


## Running on iOS

  ```shell
  npx react-native run-ios
  ```

## Project documentation

  ```shell
  npm run open
  ```

## TODO

- [ ] Add support for mere device's metrics
- [ ] Add support for landscape mode
- [ ] User can select charts to be displayed
- [ ] Persist devices metrics to provide device' historic data
- [ ] Track device's metrics when app killed to have more detailed and continuos device's health charts
- [ ] Add support disable event listeners and request metrics on demand