import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F0F4F8]">
      {/* ScrollView ensures it works on small screens and allows vertical centering */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* App Name */}
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

        {/* Accent Bar */}
        <View
          style={{
            height: 6,
            width: 80,
            backgroundColor: "#60A5FA",
            borderRadius: 12,
            marginVertical: 10,
          }}
        />

        {/* Tagline */}
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

        {/* Description */}
        <Text
            style={{
                color: "#64748B",
                fontSize: 16,
                fontWeight: "400",
                lineHeight: 26,
                marginBottom: 36,
                textAlign: "justify", // ← This makes it justified
            }}
            >
            Select how you feel — receive gentle guidance, evidence-based insights, 
            and personalized steps toward balance. Your connected lights respond 
            instantly with soothing, mood-aligned colors to support your journey.
        </Text>

        {/* Start Button */}
        <TouchableOpacity
          style={{
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
          onPress={() => console.log("Start your calm journey")}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: "600",
              letterSpacing: 0.5,
            }}
          >
            Begin Your Journey
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}