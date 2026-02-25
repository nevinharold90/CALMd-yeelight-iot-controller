import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Animated,
  StyleSheet,
  Platform,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { discoverAndFilterBulb } from "../services/YeeLightServices";

type WelcomeScreenNavProp = NativeStackNavigationProp<RootStackParamList, "Welcome">;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavProp>();

  const [isScanning, setIsScanning] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // New: separate success phase

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(30)).current;
  const checkScale = useRef(new Animated.Value(0.6)).current;
  const checkPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(contentSlide, {
        toValue: 0,
        friction: 9,
        tension: 70,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(checkPulse, {
          toValue: 1.15,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(checkPulse, {
          toValue: 1,
          duration: 800,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleStartScan = () => {
    setIsScanning(true);
    setIsError(false);
    setIsSuccess(false);
    setStatusMessage("Scanning for your CALMd light…");

    discoverAndFilterBulb(
      (foundIp) => {
        setIsScanning(false);
        setIsSuccess(true);
        setStatusMessage("Connected successfully!");
        setTimeout(() => {
          setStatusMessage("Ready! Redirecting you...");
        }, 1200);

        // Start celebratory pulse
        startPulse();

        // Navigate after short delay so user sees success + ready message
        setTimeout(() => {
          navigation.replace("Dashboard", { bulbIp: foundIp });
        }, 2800);
      },
      (errorMsg) => {
        setIsScanning(false);
        setIsError(true);
        setIsSuccess(false);
        setStatusMessage(errorMsg || "Couldn't find the bulb.\nIs it powered on & on the same Wi-Fi?");
      }
    );
  };

  const statusColor = isError
    ? "#ef4444"
    : isSuccess
    ? "#10b981"
    : "#64748b";

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.inner,
          { opacity: fadeAnim, transform: [{ translateY: contentSlide }] },
        ]}
      >
        {/* Branding */}
        <View style={styles.brand}>
          <Text style={styles.logo}>
            CALM<Text style={styles.logoAccent}>d</Text>
          </Text>
          <Text style={styles.tagline}>Illuminate Your Emotions</Text>
          <Text style={styles.intro}>
            Share how you feel — get gentle, science-backed steps and watch your lights respond with soothing, mood-matched colors.
          </Text>
        </View>

        {/* Main interactive area */}
        <View style={styles.actionArea}>
          {isScanning || statusMessage ? (
            <View style={styles.feedback}>
              {/* Spinner only during active scanning */}
              {isScanning && (
                <ActivityIndicator size="large" color="#3b82f6" style={styles.spinner} />
              )}

              {/* Success check icon - stays visible */}
              {isSuccess && (
                <Animated.View
                  style={[
                    styles.checkContainer,
                    { transform: [{ scale: Animated.multiply(checkScale, checkPulse) }] },
                  ]}
                >
                  <Text style={styles.checkIcon}>✅</Text>
                </Animated.View>
              )}

              <Text
                style={[
                  styles.statusText,
                  {
                    color: statusColor,
                    fontWeight: isSuccess ? "700" : "600",
                    fontSize: isSuccess ? 20 : 17,
                  },
                ]}
              >
                {statusMessage}
              </Text>

              {isError && (
                <TouchableOpacity
                  onPress={handleStartScan}
                  style={styles.retryBtn}
                  activeOpacity={0.85}
                >
                  <Text style={styles.retryText}>Try Again</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleStartScan}
              activeOpacity={0.9}
              style={styles.connectButton}
            >
              <Text style={styles.connectText}>Connect to CALMd Bulb</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Subtle hint */}
        {!isScanning && !statusMessage && (
          <Text style={styles.hint}>
            Ensure your bulb is powered on and connected to the same Wi-Fi network
          </Text>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 36,
  },
  brand: {
    alignItems: "center",
    marginBottom: 68,
  },
  logo: {
    fontSize: 62,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -1.5,
  },
  logoAccent: {
    color: "#3b82f6",
  },
  tagline: {
    fontSize: 22,
    fontWeight: "600",
    color: "#334155",
    marginTop: 12,
    marginBottom: 20,
  },
  intro: {
    fontSize: 16,
    lineHeight: 26,
    color: "#64748b",
    textAlign: "center",
    maxWidth: 380,
  },
  actionArea: {
    width: "100%",
    
    justifyContent: "center",
    alignItems: "center",
  },
  connectButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 20,
    paddingHorizontal: 56,
    borderRadius: 999,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: Platform.select({ android: 12, ios: 0 }),
  },
  connectText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  feedback: {
    alignItems: "center",
    paddingVertical: 40,
  },
  spinner: {
    marginBottom: 32,
  },
  checkContainer: {
    marginBottom: 24,
  },
  checkIcon: {
    fontSize: 72,
    color: "#10b981",
  },
  statusText: {
    textAlign: "center",
    lineHeight: 28,
    maxWidth: 360,
  },
  retryBtn: {
    marginTop: 32,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: "#3b82f6",
    borderRadius: 999,
  },
  retryText: {
    color: "#3b82f6",
    fontSize: 16,
    fontWeight: "700",
  },
  hint: {
    marginTop: 56,
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 340,
  },
});