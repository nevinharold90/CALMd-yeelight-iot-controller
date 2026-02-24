import { Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    return (
        /* We use w-full h-full to make sure it occupies the entire Safe Area */
        <SafeAreaView className="flex-1 w-full items-center justify-center ">      
            <Text className="text-white text-3xl font-bold uppercase tracking-widest">
                Yeelight W3
            </Text>
            <View className="h-1 w-20 bg-orange-500 mt-2 rounded-full" />
        </SafeAreaView>
    );
}