

import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";




const WElcomePage = () => {
  const router=useRouter()
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white px-4">
      <Text className="text-2xl font-bold mb-8">Welcome</Text>

      <View className="w-full gap-6">
        {/* Buyer Card */}
        <TouchableOpacity
          className="bg-green-500 p-6 rounded-2xl shadow-lg"
          onPress={() => router.push("/buyer")}
        >
          <Text className="text-xl font-semibold text-center text-white mb-2">Continue as Buyer</Text>
          <Text className="text-white text-center opacity-80">
            Browse and purchase items from sellers.
          </Text>
        </TouchableOpacity>

        {/* Seller Card */}
        <TouchableOpacity
          className="bg-blue-500 p-6 rounded-2xl shadow-lg"
          onPress={() => router.push('/seller')}
        >
          <Text className="text-xl font-semibold text-center text-white mb-2">Continue as Seller</Text>
          <Text className="text-white text-center opacity-80">
            List your products and sell to buyers.
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WElcomePage;

