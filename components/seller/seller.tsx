import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Fashion" },
  { id: 3, name: "Dish" },
  { id: 4, name: "Food" },
];

const products = [
  {
    id: 1,
    name: "Smartphone",
    price: "$299",
    img: "https://picsum.photos/200/300?random=1",
  },
  {
    id: 2,
    name: "Headphones",
    price: "$59",
    img: "https://picsum.photos/200/300?random=2",
  },
  {
    id: 3,
    name: "Shoes",
    price: "$89",
    img: "https://picsum.photos/200/300?random=3",
  },
  {
    id: 4,
    name: "Smartphone",
    price: "$299",
    img: "https://picsum.photos/200/300?random=4",
  },
  {
    id: 5,
    name: "Headphones",
    price: "$59",
    img: "https://picsum.photos/200/300?random=5",
  },
  {
    id: 6,
    name: "Shoes",
    price: "$89",
    img: "https://picsum.photos/200/300?random=6",
  },
  {
    id: 7,
    name: "Shoes",
    price: "$89",
    img: "https://picsum.photos/200/300?random=3",
  },
  {
    id: 8,
    name: "Shoes",
    price: "$89",
    img: "https://picsum.photos/200/300?random=3",
  },
];

const SellerProductPage = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-10 ">
      <View className="items-center mb-6">
        <Text className="text-xl font-bold mt-7 ">Welcome to ShopMate</Text>
        <Text className="text-gray-500">Your one-stop online store</Text>
      </View>
      <View className="flex-row justify-between gap-3  items-center ">
        <Text className="text-lg font-semibold mb-15">Categories</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#60a5fa",
            padding: 7,
            marginBottom:10,
            borderRadius: 8,
          }}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            Create Product
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row gap-3 mb-6 flex-wrap">
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            className="bg-blue-100 px-4 py-2 rounded-lg"
          >
            <Text className="text-blue-700 font-medium">{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Products */}
      <Text className="text-lg font-semibold mb-3">Featured Products</Text>
      <View className="flex-row flex-wrap justify-between mb-12">
        {products.map((product) => (
          <View
            key={product.id}
            className="bg-gray-100 p-3 rounded-lg mb-4 w-[48%]"
          >
            <Image
              source={{ uri: product.img }}
              style={{ height: 100, borderRadius: 8 }}
              className="w-full"
              contentFit="cover"
            />
            <Text className="mt-2 font-semibold">{product.name}</Text>
            <Text className="text-gray-600 font-bold">{product.price}</Text>
            <TouchableOpacity
              className="bg-blue-500 py-2 rounded-lg mt-2"
              onPress={() => console.log(`Shop ${product.name}`)}
            >
              <Text className="text-white text-center font-medium">Oder</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default SellerProductPage;
