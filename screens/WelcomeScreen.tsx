import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

// Type for this screen's navigation prop
type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <SafeAreaView className="flex-1 bg-[#F0F4F8]">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 250, 
          paddingHorizontal: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          className="text-center"
          style={{
            color: "#334155",
            fontSize: 52,
            fontWeight: "700",
            letterSpacing: -1,
            marginBottom: 0,
            fontFamily: "System",
          }}
        >
          CALM
        </Text>

        <View
          style={{
            alignItems: 'center',
            height: 6,
            width: "60%",
            backgroundColor: "#60A5FA",
            borderRadius: 12,
            marginVertical: 10,
             marginBottom: 30,
          }}
        />

        <Text
          className="text-center"
          style={{
            color: "#475569",
            fontSize: 22,
            fontWeight: "600",
            letterSpacing: 0.5,
            marginBottom: 16,
          }}
        >
          Illuminate Your Emotions
        </Text>

        <Text
          style={{
            color: "#64748B",
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 26,
            marginBottom: 36,
            textAlign: "justify",
          }}
        >
          Select how you feel — receive gentle guidance, evidence-based insights, 
          and personalized steps toward balance. Your connected lights respond 
          instantly with soothing, mood-aligned colors to support your journey.
        </Text>

        {/* Continue Button */}
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#3B82F6",
            paddingVertical: 14,
            paddingHorizontal: 44,
            borderRadius: 32,
            shadowColor: "#334155",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 6,
          }}
          onPress={() => navigation.navigate("Dashboard")} // ✅ Navigate to Dashboard
        >
          <Text
            style={{
              color: "#FFFFFF",
              textAlign: 'center',
              fontSize: 18,
              fontWeight: "600",
              letterSpacing: 0.5,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}