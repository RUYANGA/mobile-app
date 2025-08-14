import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ToastAndroid,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

interface OtpVerifyResponse {
  message: string;
  success: boolean;
  token: string;
}

const OtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);
  const router = useRouter();

  const handleChange = (text: string, index: number) => {
    if (text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < otp.length - 1) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      Alert.alert("Error", "Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        Alert.alert("Error", "No user ID found. Please register again.");
        return;
      }

      const { data } = await axios.post<OtpVerifyResponse>(
        "https://e-market-api-0k8r.onrender.com/auth/verify",
        { otp: code, userId },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        ToastAndroid.showWithGravity(
          data.message || "Verification successful!",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );

        await AsyncStorage.setItem("token", data.token);

        router.push("/dashboard/home");
      } else {
        Alert.alert("Error", data.message || "OTP verification failed.");
      }
    } catch (err) {
      let message = "Something went wrong. Please try again.";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message ?? err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white px-5 justify-center items-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text className="text-3xl font-bold mb-2">Verify OTP</Text>
      <Text className="text-base text-gray-500 text-center mb-8">
        Enter the 6-digit code sent to your email
      </Text>

      <View className="flex-row justify-between w-11/12 mb-8">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }}
            className="border border-gray-300 w-12 h-14 text-center text-xl rounded-lg"
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity
        className={`py-4 px-12 rounded-lg mb-6 ${loading ? "bg-gray-400" : "bg-blue-500"}`}
        onPress={handleVerify}
        disabled={loading}
      >
        <Text className="text-white text-lg font-bold">
          {loading ? "Verifying..." : "Verify"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text className="text-blue-500 text-lg">Resend OTP</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default OtpPage;
