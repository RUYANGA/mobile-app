import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import logo1 from "@/assets/images/logo1.png";
import { Link } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const Register = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="flex-1 justify-center bg-gray-100 p-5">
      <Image source={logo1} />
      <Text className="text-3xl font-bold text-center mb-8  text-blue-700">
        Create Account
      </Text>
      <Text className="text-2xl">User Name</Text>
      <TextInput
        placeholder="User Name"
        className="rounded-lg text-lg border border-gray-400 bg-white p-5 mb-4 "
      />

      <Text className="text-2xl">Email</Text>
      <TextInput
        placeholder="Email"
        className="rounded-lg text-lg border border-gray-400 bg-white p-5 mb-4 "
      />

      <Text className="text-2xl">Password</Text>
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

      <TouchableOpacity className="bg-blue-600 p-4 rounded-lg">
        <Text className="text-white font-bold text-center text-lg">
          Sign Up
        </Text>
      </TouchableOpacity>
      <Text className="text-center p-3">
        Don't have an account?{" "}
        <Link href="/login" asChild>
          <Text className="text-blue-800 underline">Login</Text>
        </Link>
      </Text>
    </View>
  );
};

export default Register;
