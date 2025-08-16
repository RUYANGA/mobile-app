import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";

const WelcomePage = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ 
          flex: 1, 
          paddingHorizontal: 24, 
          paddingVertical: 40,
          justifyContent: "center",
        }}>
          {/* Header Section */}
          <View style={{ alignItems: "center", marginBottom: 50 }}>
            <View style={{
              backgroundColor: "#3b82f6",
              borderRadius: 30,
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
            }}>
              <Text style={{ fontSize: 28, color: "white" }}>🏪</Text>
            </View>
            
            <Text style={{
              fontSize: 32,
              fontWeight: "800",
              color: "#1f2937",
              textAlign: "center",
              marginBottom: 12,
              letterSpacing: -0.5,
            }}>
              Welcome to Commerce
            </Text>
            
            <Text style={{
              fontSize: 16,
              color: "#64748b",
              textAlign: "center",
              lineHeight: 24,
              paddingHorizontal: 20,
            }}>
              Choose your plan and start building your business today
            </Text>
          </View>

          {/* Premium Plan Card */}
          <TouchableOpacity
            onPress={() => router.push("/(main)/seller")}
            activeOpacity={0.95}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 24,
              padding: 28,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.15,
              shadowRadius: 20,
              elevation: 12,
              borderWidth: 2,
              borderColor: "#fbbf24",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Premium Badge */}
            <View style={{
              position: "absolute",
              top: 20,
              right: 20,
              backgroundColor: "#fbbf24",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 12,
            }}>
              <Text style={{
                color: "white",
                fontSize: 12,
                fontWeight: "700",
                textTransform: "uppercase",
              }}>
                Recommended
              </Text>
            </View>

            {/* Plan Header */}
            <View style={{ 
              flexDirection: "row", 
              alignItems: "center", 
              marginBottom: 16 
            }}>
              <View style={{
                backgroundColor: "#fef3c7",
                borderRadius: 16,
                width: 48,
                height: 48,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}>
                <Text style={{ fontSize: 24 }}>👑</Text>
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: "800",
                  color: "#1f2937",
                  marginBottom: 4,
                }}>
                  Premium Plan
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: "#6b7280",
                }}>
                  Unlimited access to all features
                </Text>
              </View>
            </View>

            {/* Features List */}
            <View style={{ marginBottom: 24 }}>
              {[
                "Unlimited products & listings",
                "Advanced analytics & insights", 
                "Priority customer support",
                "Custom branding options",
                "Bulk import/export tools"
              ].map((feature, index) => (
                <View key={index} style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}>
                  <View style={{
                    backgroundColor: "#dcfce7",
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}>
                    <Text style={{ fontSize: 12, color: "#16a34a" }}>✓</Text>
                  </View>
                  <Text style={{
                    fontSize: 15,
                    color: "#374151",
                    fontWeight: "500",
                  }}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>

            {/* CTA Button */}
            <View style={{
              backgroundColor: "#fbbf24",
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: "center",
            }}>
              <Text style={{
                color: "white",
                fontSize: 16,
                fontWeight: "700",
              }}>
                Start Premium Experience
              </Text>
            </View>
          </TouchableOpacity>

          {/* Free Plan Card */}
          <TouchableOpacity
            onPress={() => router.push("/seller")}
            activeOpacity={0.95}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 24,
              padding: 28,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.1,
              shadowRadius: 16,
              elevation: 8,
              borderWidth: 1,
              borderColor: "#e5e7eb",
            }}
          >
            {/* Plan Header */}
            <View style={{ 
              flexDirection: "row", 
              alignItems: "center", 
              marginBottom: 16 
            }}>
              <View style={{
                backgroundColor: "#dbeafe",
                borderRadius: 16,
                width: 48,
                height: 48,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}>
                <Text style={{ fontSize: 24 }}>🚀</Text>
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: "800",
                  color: "#1f2937",
                  marginBottom: 4,
                }}>
                  Free Plan
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: "#6b7280",
                }}>
                  Perfect for getting started
                </Text>
              </View>
            </View>

            {/* Features List */}
            <View style={{ marginBottom: 24 }}>
              {[
                "Up to 5 active products",
                "Basic analytics dashboard",
                "Standard customer support",
                "Essential selling tools"
              ].map((feature, index) => (
                <View key={index} style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}>
                  <View style={{
                    backgroundColor: "#dbeafe",
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}>
                    <Text style={{ fontSize: 12, color: "#2563eb" }}>✓</Text>
                  </View>
                  <Text style={{
                    fontSize: 15,
                    color: "#374151",
                    fontWeight: "500",
                  }}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>

            {/* CTA Button */}
            <View style={{
              backgroundColor: "#3b82f6",
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: "center",
            }}>
              <Text style={{
                color: "white",
                fontSize: 16,
                fontWeight: "700",
              }}>
                Start Free Trial
              </Text>
            </View>
          </TouchableOpacity>

          {/* Footer */}
          <View style={{ 
            alignItems: "center", 
            marginTop: 32,
            paddingHorizontal: 20,
          }}>
            <Text style={{
              fontSize: 14,
              color: "#9ca3af",
              textAlign: "center",
              lineHeight: 20,
            }}>
              No credit card required • Cancel anytime • Upgrade when ready
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomePage;
