import { View, ScrollView, Image } from "react-native";
import LoginForm from "./(auth)/login";

export default function Index() {
  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 "
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%" }}
      >
        <View className="flex-1 mt-0">
          <LoginForm/>
        </View>
      </ScrollView>
    </View>
  );
}
