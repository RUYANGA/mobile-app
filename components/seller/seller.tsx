import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

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
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-white px-4"
      contentContainerStyle={{ paddingBottom: 20 }}
      stickyHeaderIndices={[0]} // Make first child sticky
    >
      {/* Sticky Header */}
      <View
        style={{
          backgroundColor: "white",
          paddingTop: 40,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
          zIndex: 10,
        }}
      >
        <View className="flex-row justify-between items-center gap-3 mt-6">
          <Text className="text-lg font-semibold">Categories</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/(product)/create");
            }}
            style={{
              backgroundColor: "#60a5fa",
              padding: 7,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Create Product
            </Text>
          </TouchableOpacity>
        </View>
        {/* Categories */}
        <View className="flex-row gap-3 mb-6 flex-wrap mt-4">
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              className="bg-blue-100 px-4 py-2 rounded-lg"
            >
              <Text className="text-blue-700 font-medium">{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text className="text-lg font-semibold mb-3">Featured Products</Text>
      </View>

      {/* Products */}

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
              <Text className="text-white text-center font-medium">Order</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default SellerProductPage;
