import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { discoverAndFilterBulb } from "../services/YeeLightServices";

type LoadingScreenNavProp = NativeStackNavigationProp<RootStackParamList, "Loading">;

export default function LoadingScreen() {
  const navigation = useNavigation<LoadingScreenNavProp>();
  
  // State to handle if the bulb is offline or not found
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    startNetworkScan();
  }, []);

  const startNetworkScan = () => {
    // Reset error state and start spinner
    setErrorMessage(null);
    console.log("Starting background scan for Yeelight...");

    discoverAndFilterBulb(
      // 🟢 SUCCESS: We found it! Move to Welcome screen.
      (foundIp) => {
        console.log("✅ Connection Verified! IP:", foundIp);
        // Replace prevents the user from swiping "back" to the loading screen
        navigation.replace("Welcome", { bulbIp: foundIp }); 
      },
      // 🔴 ERROR: Timeout or network failure.
      (errorMsg) => {
        console.log("❌ Scan Failed:", errorMsg);
        setErrorMessage(errorMsg);
      }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F0F4F8", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 48, fontWeight: "700", color: "#334155", marginBottom: 20 }}>
        CALM
      </Text>
      
      {!errorMessage ? (
        <>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={{ marginTop: 20, color: "#64748B", fontSize: 16 }}>
            Connecting to your environment...
          </Text>
        </>
      ) : (
        <View style={{ alignItems: "center", paddingHorizontal: 40 }}>
          <Text style={{ color: "#EF4444", marginBottom: 20, textAlign: "center", fontSize: 16 }}>
            {errorMessage}
          </Text>
          <TouchableOpacity 
            onPress={startNetworkScan}
            style={{ backgroundColor: "#3B82F6", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>Retry Connection</Text>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>Make sure you have the same network connection</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}