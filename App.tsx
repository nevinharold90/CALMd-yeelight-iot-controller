import "./global.css";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 1️⃣ Import the new Loading Screen
import LoadingScreen from "./screens/LoadingScreen"; 
import WelcomeScreen from "./screens/WelcomeScreen";
import Dashboard from "./screens/Dashboard";

// 2️⃣ Update the types so TypeScript knows we are passing the IP address around
export type RootStackParamList = {
  Loading: undefined; 
  Welcome: { bulbIp: string };   // Expects the IP from Loading
  Dashboard: { bulbIp: string }; // Expects the IP from Welcome
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator 
          initialRouteName="Loading" // 🚀 Start here instead of Welcome!
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}