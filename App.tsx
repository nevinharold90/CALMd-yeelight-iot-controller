import "./global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <HomeScreen />
    </SafeAreaView>
  );
}