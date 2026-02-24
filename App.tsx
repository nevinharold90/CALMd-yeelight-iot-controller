import "./global.css";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* We put the background color here so it covers the whole screen, 
        including the status bar and navigation bar areas.
      */}
      <SafeAreaProvider className="flex-1 bg-slate-950">
        <StatusBar style="light" />
        <HomeScreen />
      </SafeAreaProvider>
    </SafeAreaProvider>
  );
}