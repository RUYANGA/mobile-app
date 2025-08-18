import logo1 from "@/assets/images/icon.png";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input validation
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) setEmailError("");
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) setPasswordError("");
  };

  const HandleSubmit = async () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validation
    let hasError = false;
    
    if (!email.trim()) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 4) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://e-market-api-0k8r.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.trim(), password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      await AsyncStorage.setItem("token", data.token);
      
      ToastAndroid.showWithGravity(
        "Welcome back! Login successful",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );

      router.push("/(main)/dashboard/home");
    } catch (error: any) {
      let errorMessage = "Something went wrong. Please try again.";
      
      if (error.message.includes("network") || error.message.includes("fetch")) {
        errorMessage = "Network error. Please check your connection.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      ToastAndroid.showWithGravity(
        errorMessage,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ 
            flex: 1, 
            paddingHorizontal: 24, 
            paddingVertical: 40,
            justifyContent: "center",
          }}>
            {/* Header Section */}
            <View style={{ alignItems: "center", marginBottom: 40 }}>
            
              
              <Text style={{
                fontSize: 32,
                fontWeight: "800",
                color: "#1f2937",
                marginBottom: 8,
                letterSpacing: -0.5,
              }}>
                Welcome Back
              </Text>
              
              <Text style={{
                fontSize: 16,
                color: "#6b7280",
                textAlign: "center",
              }}>
                Sign in to your account to continue
              </Text>
            </View>

            {/* Login Form */}
            <View style={{
              backgroundColor: "white",
              borderRadius: 24,
              padding: 32,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.15,
              shadowRadius: 20,
              elevation: 12,
            }}>
              {/* Email Input */}
              <View style={{ marginBottom: 20 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: 8,
                }}>
                  Email Address
                </Text>
                <View style={{
                  backgroundColor: "#f9fafb",
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: emailError ? "#ef4444" : email ? "#3b82f6" : "#e5e7eb",
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                }}>
                  <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#9ca3af"
                    style={{
                      fontSize: 16,
                      color: "#1f2937",
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    value={email}
                    onChangeText={handleEmailChange}
                  />
                </View>
                {emailError ? (
                  <Text style={{
                    fontSize: 14,
                    color: "#ef4444",
                    marginTop: 4,
                  }}>
                    {emailError}
                  </Text>
                ) : null}
              </View>

              {/* Password Input */}
              <View style={{ marginBottom: 8 }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#374151",
                  }}>
                    Password
                  </Text>
                  <TouchableOpacity>
                    <Text style={{
                      fontSize: 14,
                      color: "#3b82f6",
                      fontWeight: "500",
                    }}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
                
                <View style={{
                  backgroundColor: "#f9fafb",
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: passwordError ? "#ef4444" : password ? "#3b82f6" : "#e5e7eb",
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#9ca3af"
                    style={{
                      flex: 1,
                      fontSize: 16,
                      color: "#1f2937",
                    }}
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                    value={password}
                    onChangeText={handlePasswordChange}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{
                      padding: 4,
                    }}
                  >
                    <AntDesign
                      name={showPassword ? "eye" : "eyeo"}
                      size={20}
                      color="#6b7280"
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text style={{
                    fontSize: 14,
                    color: "#ef4444",
                    marginTop: 4,
                  }}>
                    {passwordError}
                  </Text>
                ) : null}
              </View>

              {/* Login Button */}
              <TouchableOpacity
                onPress={HandleSubmit}
                disabled={loading}
                style={{
                  backgroundColor: loading ? "#93c5fd" : "#3b82f6",
                  borderRadius: 16,
                  paddingVertical: 16,
                  alignItems: "center",
                  marginTop: 24,
                  marginBottom: 24,
                  shadowColor: "#3b82f6",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: loading ? 0.2 : 0.3,
                  shadowRadius: 8,
                  elevation: loading ? 4 : 6,
                }}
              >
                {loading ? (
                  <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                    <ActivityIndicator size="small" color="white" />
                    <Text style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "700",
                      marginLeft: 8,
                    }}>
                      Signing In...
                    </Text>
                  </View>
                ) : (
                  <Text style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "700",
                  }}>
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>

              {/* Register Link */}
              <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <Text style={{
                  fontSize: 14,
                  color: "#6b7280",
                }}>
                  Don't have an account?{" "}
                </Text>
                <Link href="/register" asChild>
                  <TouchableOpacity>
                    <Text style={{
                      fontSize: 14,
                      color: "#3b82f6",
                      fontWeight: "600",
                    }}>
                      Create Account
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>

            {/* Footer */}
            <View style={{
              alignItems: "center",
              marginTop: 32,
            }}>
              <Text style={{
                fontSize: 12,
                color: "#9ca3af",
                textAlign: "center",
              }}>
                By signing in, you agree to our Terms of Service{"\n"}and Privacy Policy
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
