import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { discoverAndFilterBulb } from "../services/YeeLightServices";

type WelcomeScreenNavProp = NativeStackNavigationProp<RootStackParamList, "Welcome">;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavProp>();
  
  // 🎛️ State Controls for the UI
  const [isScanning, setIsScanning] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleStartScan = () => {
    setIsScanning(true);
    setIsError(false);
    setStatusMessage("Searching for CALMd environment...");

    discoverAndFilterBulb(
      // 🟢 SUCCESS
      (foundIp) => {
        // Show the success message the user asked for
        setStatusMessage(`✅ Bulb 1b193e40 found!`);
        
        // Pause for 1.5 seconds so they can actually read the success message
        setTimeout(() => {
          // Send them to the Dashboard and pass the IP!
          navigation.replace("Dashboard", { bulbIp: foundIp });
        }, 3000);
      },
      // 🔴 ERROR
      (errorMsg) => {
        setIsScanning(false);
        setIsError(true);
        setStatusMessage(errorMsg);
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4F8", justifyContent: "center", alignItems: "center" }}>
      
      {/* Branding */}
      <View style={{ alignItems: "center", marginBottom: 60 }}>
        <Text style={{ fontSize: 48, fontWeight: "800", color: "#334155", letterSpacing: 2 }}>
          CALM<Text style={{ color: "#3B82F6" }}>d</Text>
        </Text>
        <Text style={{ color: "#64748B", fontSize: 16, marginTop: 10 }}>
          Illuminate Your Emotions
        </Text>
      </View>

      {/* The Interaction Zone */}
      <View style={{ height: 120, justifyContent: "center", alignItems: "center", width: "100%", paddingHorizontal: 40 }}>
        
        {isScanning || statusMessage ? (
          // 🔄 LOADING / STATUS STATE
          <View style={{ alignItems: "center" }}>
            {isScanning && !statusMessage?.includes("✅") && (
              <ActivityIndicator size="large" color="#3B82F6" style={{ marginBottom: 15 }} />
            )}
            <Text style={{ color: isError ? "#EF4444" : "#10B981", fontSize: 16, textAlign: "center", fontWeight: "600" }}>
              {statusMessage}
            </Text>
            
            {/* Show Retry Button if Error */}
            {isError && (
              <TouchableOpacity onPress={handleStartScan} style={{ marginTop: 20, padding: 10 }}>
                <Text style={{ color: "#3B82F6", fontWeight: "bold" }}>Try Again</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          // ▶️ INITIAL BUTTON STATE
          <TouchableOpacity 
            onPress={handleStartScan}
            style={{ 
              backgroundColor: "#3B82F6", 
              paddingVertical: 16, 
              paddingHorizontal: 40, 
              borderRadius: 30,
              shadowColor: "#3B82F6",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
              Connect & Continue
            </Text>
          </TouchableOpacity>
        )}

      </View>
    </SafeAreaView>
  );
}