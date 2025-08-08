import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import logo1 from "@/assets/images/logo1.png";
import { AntDesign } from "@expo/vector-icons";

export default function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <SafeAreaView className="flex-1 bg-gray-100 p-5 justify-center">
        <Image source={logo1} className="w-32 h-32 self-center mb-8" />
        <Text className="text-3xl font-bold text-center mb-8 text-blue-700">
          Login
        </Text>

        <Text className="text-2xl mb-2">Email</Text>
        <TextInput
          placeholder="Email"
          className="rounded-lg font-bold border border-gray-400 bg-white p-5 mb-4"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-2xl">Password</Text>
          <Text className="text-blue-600">Forget password?</Text>
        </View>

        <View className="relative mb-6">
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            className="bg-white p-5 border border-gray-400 rounded-lg"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-5"
          >
            <AntDesign
              name={showPassword ? "eye" : "eyeo"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="bg-blue-600 p-4 rounded-lg mb-4">
          <Text className="text-white font-bold text-center text-lg">
            Login
          </Text>
        </TouchableOpacity>

        <Text className="text-center p-3">
          Don't have an account?{" "}
          <Link href="/register" asChild>
            <Text className="text-blue-800 underline">Register</Text>
          </Link>
        </Text>
      </SafeAreaView>
    </>
  );
}
