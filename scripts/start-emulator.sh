#!/bin/bash

# Find Pixel 9 Pro XL AVD (case-insensitive search)
AVD_NAME=$(emulator -list-avds | grep -i "Pixel_9_Pro_XL" | head -n 1)

if [ -z "$AVD_NAME" ]; then
  echo "Pixel_9_Pro_XL emulator not found. Please create it in Android Studio."
  exit 1
fi

echo "Starting emulator: $AVD_NAME"

if [ -z "$ANDROID_HOME" ]; then
  echo "ANDROID_HOME is not set"
  exit 1
fi

# Start emulator in background
$ANDROID_HOME/emulator/emulator -avd "$AVD_NAME" -netdelay none -netspeed full &

# Wait until emulator is booted
boot_completed=""
until [[ "$boot_completed" == "1" ]]; do
  sleep 2
  boot_completed=$($ANDROID_HOME/platform-tools/adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
  echo "Waiting for emulator to start..."
done

echo "Emulator is ready!"
