import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import logo1 from "@/assets/images/logom.png";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const HandleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      ToastAndroid.showWithGravity(
        "Please enter email and password",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return;
    }

    setLoading(true);

    try {
      // Replace with your real backend URL
      const response = await fetch("https://e-market-platform.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      router.push("/dashboard/home");

    
      ToastAndroid.showWithGravity(
        "Login successful!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    } catch (error: any) {
      ToastAndroid.showWithGravity(
        error.message || "Something went wrong",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <SafeAreaView className="flex-1 bg-white p-5 justify-center">
        <View className="items-center justify-center ">
          <Image source={logo1} style={{ width: 160, height: 180 }} />
        </View>
        <View className="shadow-2xl bg-white rounded-lg p-4">
          <Text className="text-3xl font-bold text-center mb-8 text-blue-700">
          Creact account
        </Text>

          <Text className=" mb-2">User Name</Text>
        <TextInput
          placeholder="ex: Merci"
          className="rounded-lg  border border-gray-400 bg-white p-2 mb-4"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text className=" mb-2">Email</Text>
        <TextInput
          placeholder="ex: ruyanga@example.com"
          className="rounded-lg  border border-gray-400 bg-white p-2 mb-4"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View className="flex-row justify-between items-center mb-2">
          <Text className="">Password</Text>
          <Text className="text-blue-600">Forget password?</Text>
        </View>

        <View className="relative mb-6">
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            className="bg-white p-2 border border-gray-400 rounded-lg"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-2"
          >
            <AntDesign
              name={showPassword ? "eye" : "eyeo"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={HandleSubmit}
          disabled={loading}
          className={`p-4 rounded-lg mb-4 ${
            loading ? "bg-blue-400" : "bg-blue-600"
          }`}
        >
          <Text className="text-white font-bold text-center text-lg">
            {loading ? "Creating..." : "Sign Up"}
          </Text>
        </TouchableOpacity>


        <Text className="text-center ">
          Have an account?{" "}
          <Link href="/login" asChild>
            <Text className="text-blue-800 underline">Login</Text>
          </Link>
        </Text>
        </View>
      </SafeAreaView>
    </>
  );
}
