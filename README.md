This project is dedicated to our friend's daughter for their final project to pass grade 12; proceeding to college. The project uses "Yeelight" lighting technologies where it emphasizes what kind of light to use to a certain mood that is triggered in the app. 

# Folder Structure
- screens/: This is where the main views live (e.g., HomeScreen.tsx, LampDetails.tsx).
- components/: For reusable UI bits (e.g., PowerButton.tsx, ColorPicker.tsx).
- services/: This is crucial fir Yeelight. This is where TCP/UDP socket logic will live.
- App.tsx: The "Entry Point" that wraps everything in a Navigator.

# Resources for now
- https://www.yeelight.com/en_US/developer
- https://www.nativewind.dev/ 
- https://reactnative.dev/ and https://reactnative.dev/docs/typescript

# Dependencies 
Run this after cloning
- ```npm install```

# Error faced
- Inside the App.tsx, "<SafeAreaProvider>" should be use, not "safe-area-view". 