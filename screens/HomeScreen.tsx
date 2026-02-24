import { Text, View, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-slate-950 p-6 justify-center items-center">
      <View className="w-40 h-40 rounded-full bg-orange-400 shadow-2xl shadow-orange-500/50 mb-10" />
      
      <Text className="text-white text-3xl font-bold text-center">
        Yeelight W3
      </Text>
      <Text className="text-slate-400 text-center mt-2">
        Status: Disconnected
      </Text>

      <TouchableOpacity 
        className="mt-10 bg-orange-500 px-8 py-4 rounded-2xl active:bg-orange-600"
      >
        <Text className="text-white font-bold text-lg">Search for Bulbs</Text>
      </TouchableOpacity>
    </View>
  );
}