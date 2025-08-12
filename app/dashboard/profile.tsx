import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';

const ProfileDetails = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    address: '123 Main Street, New York, USA',
    avatar: 'https://i.pravatar.cc/300',
    joined: 'January 2024',
    orders: 12,
    wishlist: 5,
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* Profile Header */}
      <View className="items-center mt-12">
        <Image
          source={{ uri: user.avatar }}
          style={{
            width: 130,
            height: 130,
            borderRadius: 65,
            borderWidth: 2,
            borderColor: '#3b82f6', // blue-500
          }}
          contentFit="cover"
        />
        <Text className="text-3xl font-extrabold mt-5 text-gray-900">{user.name}</Text>
        <Text className="text-gray-600 text-base mt-1">{user.email}</Text>
        <Text className="text-gray-400 text-sm mt-1">
          Member since {user.joined}
        </Text>
      </View>

      {/* Divider */}
      <View className="border-b border-gray-300 my-8" />

      {/* Contact Info */}
      <View
        className="bg-white rounded-xl p-5 shadow-md"
        style={{ elevation: 3 }}
      >
        <Text className="text-xl font-semibold text-gray-800 mb-4">
          Contact Information
        </Text>
        <View className="flex-row items-center mb-3">
          <Text className="text-2xl mr-3">📞</Text>
          <Text className="text-gray-700 text-base">{user.phone}</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-2xl mr-3">🏠</Text>
          <Text className="text-gray-700 text-base">{user.address}</Text>
        </View>
      </View>

      {/* Divider */}
      <View className="border-b border-gray-300 my-8" />

      {/* Account Summary */}
      <View
        className="bg-white rounded-xl p-5 shadow-md flex-row justify-around"
        style={{ elevation: 3 }}
      >
        <View className="items-center">
          <Text className="text-3xl font-bold text-gray-900">{user.orders}</Text>
          <Text className="text-gray-600 text-sm mt-1">Orders</Text>
        </View>
        <View className="items-center">
          <Text className="text-3xl font-bold text-gray-900">{user.wishlist}</Text>
          <Text className="text-gray-600 text-sm mt-1">Wishlist</Text>
        </View>
      </View>

      {/* Divider */}
      <View className="border-b border-gray-300 my-8" />

      {/* Account Settings */}
      <View>
        <Text className="text-xl font-semibold mb-4 text-gray-800">
          Account Settings
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-blue-600 py-4 rounded-xl mb-4"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Edit Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-yellow-500 py-4 rounded-xl mb-4"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Change Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-red-600 py-4 rounded-xl mb-20"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileDetails;
