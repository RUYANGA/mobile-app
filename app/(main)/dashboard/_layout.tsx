import { Tabs } from "expo-router";
import { Text } from "@react-navigation/elements";

export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue",
        tabBarLabelStyle: { fontWeight: "bold"},
        //tabBarButton:
      }}
      
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIcon: () => <Text>🏠</Text> }}
      />
       <Tabs.Screen
        name="profile"
        options={{ title: "Setting", tabBarIcon: () => <Text>👤</Text> }}
      />
    </Tabs>
  );
}
