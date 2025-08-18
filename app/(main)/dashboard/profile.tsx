import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

interface UserProfile {
  id: string;
  email: string;
  username: string;
  role?: string;
  phone?: string;
  createdAt: string;
  emailVerified: boolean;
}

const ProfileDetails = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "Rwanda",
    avatar: "https://i.pravatar.cc/300",
    joined: "January 2024",
    orders: 12,
    wishlist: 5,
  };

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchProfile = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
        setError(null);
      } else {
        setLoading(true);
      }

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        const errorMsg = "No token found, please login again.";
        Alert.alert("Error", errorMsg);
        setError(errorMsg);
        if (isRefresh) setRefreshing(false);
        else setLoading(false);
        return;
      }

      const response = await axios.get<UserProfile>(
        "https://e-market-api-0k8r.onrender.com/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setProfile(response.data);
      setError(null);
    } catch (err) {
      let message = "Failed to fetch profile.";
      if (axios.isAxiosError(err)) {
        if (err.code === 'NETWORK_ERROR' || !err.response) {
          message = "Network error. Please check your internet connection and try again.";
        } else {
          message = err.response?.data?.message ?? err.message;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }
      
      setError(message);
      if (!isRefresh) {
        Alert.alert("Error", message);
      } else {
        ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("userId");

              ToastAndroid.showWithGravity(
                "You have been logged out successfully.",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );

              router.replace("/login");
            } catch (error) {
              console.error("Error logging out:", error);
              ToastAndroid.showWithGravity(
                "Something went wrong while logging out.",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#f8fafc",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{
          marginTop: 16,
          fontSize: 16,
          color: "#6b7280",
        }}>
          Loading profile...
        </Text>
      </View>
    );
  }

  if (!profile || error) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#f8fafc",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
      }}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
        
        {/* Error Icon */}
        <View style={{
          backgroundColor: "#fef2f2",
          borderRadius: 50,
          width: 100,
          height: 100,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}>
          <Text style={{ fontSize: 48 }}>�</Text>
        </View>

        <Text style={{
          fontSize: 24,
          fontWeight: "800",
          color: "#1f2937",
          textAlign: "center",
          marginBottom: 8,
        }}>
          Connection Problem
        </Text>
        
        <Text style={{
          fontSize: 16,
          color: "#6b7280",
          textAlign: "center",
          marginBottom: 8,
          lineHeight: 22,
        }}>
          {error || "We couldn't load your profile data."}
        </Text>
        
        <Text style={{
          fontSize: 14,
          color: "#9ca3af",
          textAlign: "center",
          marginBottom: 32,
        }}>
          Please check your internet connection and try again.
        </Text>

        {/* Action Buttons */}
        <View style={{ width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => fetchProfile(true)}
            disabled={refreshing}
            style={{
              backgroundColor: "#3b82f6",
              paddingHorizontal: 32,
              paddingVertical: 16,
              borderRadius: 16,
              marginBottom: 12,
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
              flexDirection: "row",
              alignItems: "center",
              opacity: refreshing ? 0.7 : 1,
            }}
          >
            {refreshing ? (
              <ActivityIndicator size="small" color="white" style={{ marginRight: 8 }} />
            ) : (
              <Text style={{ fontSize: 16, marginRight: 8 }}>🔄</Text>
            )}
            <Text style={{
              color: "white",
              fontWeight: "700",
              fontSize: 16,
            }}>
              {refreshing ? "Refreshing..." : "Try Again"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/(auth)/login")}
            style={{
              backgroundColor: "transparent",
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "#d1d5db",
            }}
          >
            <Text style={{
              color: "#6b7280",
              fontWeight: "600",
              fontSize: 14,
            }}>
              Go to Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header Background */}
        <View style={{
          backgroundColor: "#3b82f6",
          paddingTop: 60,
          paddingBottom: 100,
          paddingHorizontal: 24,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}>
            <Text style={{
              fontSize: 24,
              fontWeight: "800",
              color: "white",
            }}>
              My Profile
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: 8,
                borderRadius: 12,
              }}
            >
              <Text style={{ fontSize: 20 }}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Card */}
        <View style={{
          marginHorizontal: 24,
          marginTop: -60,
          backgroundColor: "white",
          borderRadius: 24,
          padding: 32,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 8,
          alignItems: "center",
        }}>
          {/* Avatar */}
          <View style={{
            position: "relative",
            marginBottom: 20,
          }}>
            <Image
              source={{ uri: user.avatar }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                borderWidth: 4,
                borderColor: "#3b82f6",
              }}
              contentFit="cover"
            />
            {profile.emailVerified && (
              <View style={{
                position: "absolute",
                bottom: 4,
                right: 4,
                backgroundColor: "#10b981",
                borderRadius: 12,
                width: 24,
                height: 24,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 3,
                borderColor: "white",
              }}>
                <Text style={{ fontSize: 12, color: "white" }}>✓</Text>
              </View>
            )}
          </View>

          {/* User Info */}
          <Text style={{
            fontSize: 28,
            fontWeight: "800",
            color: "#1f2937",
            marginBottom: 8,
            textAlign: "center",
          }}>
            {profile.username}
          </Text>
          
          <Text style={{
            fontSize: 16,
            color: "#6b7280",
            marginBottom: 4,
          }}>
            {profile.email}
          </Text>

          <View style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: profile.emailVerified ? "#dcfce7" : "#fef3c7",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
            marginBottom: 16,
          }}>
            <Text style={{ 
              fontSize: 12,
              marginRight: 4,
            }}>
              {profile.emailVerified ? "✅" : "⚠️"}
            </Text>
            <Text style={{
              fontSize: 12,
              fontWeight: "600",
              color: profile.emailVerified ? "#16a34a" : "#d97706",
            }}>
              {profile.emailVerified ? "Verified Account" : "Unverified Account"}
            </Text>
          </View>

          <Text style={{
            fontSize: 14,
            color: "#9ca3af",
            textAlign: "center",
          }}>
            Member since {new Date(profile.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={{
          flexDirection: "row",
          paddingHorizontal: 24,
          marginTop: 24,
          gap: 12,
        }}>
          <View style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 16,
            padding: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}>
            <Text style={{
              fontSize: 32,
              fontWeight: "800",
              color: "#3b82f6",
              marginBottom: 4,
            }}>
              {user.orders}
            </Text>
            <Text style={{
              fontSize: 14,
              color: "#6b7280",
              fontWeight: "500",
            }}>
              Orders
            </Text>
          </View>

          <View style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 16,
            padding: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}>
            <Text style={{
              fontSize: 32,
              fontWeight: "800",
              color: "#ef4444",
              marginBottom: 4,
            }}>
              {user.wishlist}
            </Text>
            <Text style={{
              fontSize: 14,
              color: "#6b7280",
              fontWeight: "500",
            }}>
              Wishlist
            </Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={{
          marginHorizontal: 24,
          marginTop: 24,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: 20,
          }}>
            Contact Information
          </Text>
          
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}>
            <View style={{
              backgroundColor: "#dbeafe",
              borderRadius: 12,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}>
              <Text style={{ fontSize: 18 }}>📞</Text>
            </View>
            <View>
              <Text style={{
                fontSize: 14,
                color: "#6b7280",
                marginBottom: 2,
              }}>
                Phone Number
              </Text>
              <Text style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1f2937",
              }}>
                {profile.phone || "Not provided"}
              </Text>
            </View>
          </View>

          <View style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
            <View style={{
              backgroundColor: "#dcfce7",
              borderRadius: 12,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}>
              <Text style={{ fontSize: 18 }}>🏠</Text>
            </View>
            <View>
              <Text style={{
                fontSize: 14,
                color: "#6b7280",
                marginBottom: 2,
              }}>
                Location
              </Text>
              <Text style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1f2937",
              }}>
                {user.address}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{
          paddingHorizontal: 24,
          marginTop: 24,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: 16,
          }}>
            Account Settings
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: "#3b82f6",
              borderRadius: 16,
              paddingVertical: 16,
              paddingHorizontal: 24,
              marginBottom: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 12 }}>✏️</Text>
            <Text style={{
              color: "white",
              fontSize: 16,
              fontWeight: "700",
            }}>
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: "#f59e0b",
              borderRadius: 16,
              paddingVertical: 16,
              paddingHorizontal: 24,
              marginBottom: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#f59e0b",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 12 }}>🔐</Text>
            <Text style={{
              color: "white",
              fontSize: 16,
              fontWeight: "700",
            }}>
              Change Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.8}
            style={{
              backgroundColor: "#ef4444",
              borderRadius: 16,
              paddingVertical: 16,
              paddingHorizontal: 24,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#ef4444",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Text style={{ fontSize: 18, marginRight: 12 }}>🚪</Text>
            <Text style={{
              color: "white",
              fontSize: 16,
              fontWeight: "700",
            }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileDetails;
