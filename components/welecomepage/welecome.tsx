import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const WelcomePage = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white p-5">
    
      <View className="w-full flex-1 justify-center">
          <Text className="text-3xl font-bold text-center mb-10">Welcome Back</Text>
        {/* Premium Card */}
        <TouchableOpacity
          className="bg-yellow-500 p-6 mb-7 rounded-3xl shadow-2xl"
          onPress={() => router.push("/buyer")}
          activeOpacity={0.85}
        >
          <Text className="text-white text-2xl font-bold text-center mb-4">
            Premium
          </Text>
          <Text className="text-white text-center opacity-90 mb-6">
            Enjoy full access with no restrictions.
          </Text>
          <View className="pl-4 ">
            <Text className="text-white mb-1 text-center">Unlimited products</Text>
            <Text className="text-white mb-1 text-center">Create & manage freely</Text>
            <Text className="text-white mb-1 text-center">Priority support</Text>
            <Text className="text-white mb-1 text-center">Advanced analytics & tools</Text>
          </View>
        </TouchableOpacity>

        {/* Free Plan Card */}
        <TouchableOpacity
          className="bg-blue-500 p-6 rounded-3xl shadow-lg"
          onPress={() => router.push("/seller")}
          activeOpacity={0.85}
        >
          <Text className="text-white text-2xl font-bold text-center mb-4">
            Free Plan
          </Text>
          <Text className="text-white text-center opacity-90 mb-6">
            Get started at no cost with limited features.
          </Text>
          <View className="pl-4">
            <Text className="text-white mb-1 text-center">Up to 5 active products</Text>
            <Text className="text-white mb-1 text-center">Can create 1 product at a time</Text>
            <Text className="text-white mb-1 text-center">Basic analytics</Text>
            <Text className="text-white mb-1 text-center">Standard support</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;
